import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';

// Función para verificar la firma del webhook de Stripe
async function getStripeEvent(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature') as string;
  
  try {
    // Verificar que el evento viene realmente de Stripe
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    return event;
  } catch (err: any) {
    console.error(`Error al verificar webhook: ${err.message}`);
    throw new Error(`Webhook Error: ${err.message}`);
  }
}

export async function POST(req: Request) {
  try {
    const event = await getStripeEvent(req);
    
    // Gestionar diferentes tipos de eventos
    switch (event.type) {
      // Cuando se crea una suscripción (primer pago exitoso)
      case 'customer.subscription.created': {
        const subscription = event.data.object as any;
        console.log('Nueva suscripción creada:', subscription.id);
        break;
      }
      
      // Cuando se procesa un pago de suscripción
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as any;
        
        // Solo procesamos facturas de suscripciones
        if (invoice.subscription) {
          console.log(`Pago recibido para suscripción: ${invoice.subscription}`);
          
          // Obtener detalles de la suscripción
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
          
          // Obtener el número total de meses del plan desde los metadatos
          const totalMonths = parseInt(subscription.metadata.totalMonths || '0');
          
          // Si no hay metadata de totalMonths, no hacemos nada
          if (!totalMonths) {
            console.log(`No se encontró información de totalMonths para la suscripción: ${subscription.id}`);
            break;
          }
          
          // Obtener la información de facturación para contar los pagos
          const invoices = await stripe.invoices.list({
            subscription: subscription.id,
            status: 'paid',
          });
          
          // Contar el número de facturas pagadas
          const paymentCount = invoices.data.length;
          
          console.log(`Pago ${paymentCount} de ${totalMonths} para suscripción: ${subscription.id}`);
          
          // Si ya se han realizado todos los pagos, cancelamos la suscripción
          if (paymentCount >= totalMonths) {
            console.log(`Cancelando suscripción ${subscription.id} después de ${paymentCount} pagos`);
            
            await stripe.subscriptions.update(subscription.id, {
              cancel_at_period_end: true,
              metadata: {
                ...subscription.metadata,
                cancelReason: 'Plan completado - Todos los pagos realizados'
              }
            });
            
            console.log(`Suscripción ${subscription.id} programada para cancelación al final del período actual`);
          }
        }
        break;
      }
      
      // Cuando una suscripción es cancelada
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any;
        console.log(`Suscripción ${subscription.id} cancelada`);
        break;
      }
      
      // Otros eventos...
      default:
        console.log(`Evento no gestionado: ${event.type}`);
    }
    
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Error al procesar webhook:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
} 