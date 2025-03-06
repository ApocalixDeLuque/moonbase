import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';
import { sendConfirmationEmail } from "@/lib/email-service";

// Función para verificar la firma del webhook de Stripe
async function getStripeEvent(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    return event;
  } catch (err: any) {
    throw new Error(`Error de Webhook: ${err.message}`);
  }
}

export async function POST(req: Request) {
  try {
    const event = await getStripeEvent(req);

    // Gestionar diferentes tipos de eventos
    switch (event.type) {
      // Cuando se completa una sesión de pago
      case 'checkout.session.completed': {
        const session = event.data.object as any;

        // Solo procesar si el pago fue exitoso
        if (session.payment_status === 'paid') {
          // Obtener los datos expandidos de la sesión para acceder a los detalles del cliente
          const expandedSession = await stripe.checkout.sessions.retrieve(
            session.id,
            { expand: ['customer', 'line_items.data.price.product'] }
          );

          // Extraer información del cliente
          const customerName = expandedSession.customer_details?.name || '';
          const customerEmail = expandedSession.customer_details?.email || '';

          // Obtener detalles de la compra
          const planType = session.metadata?.plan || 'N/A';
          const amount = session.amount_total ? session.amount_total / 100 : 0;
          const paymentMethod = session.payment_method_types?.[0] || 'card';

          //Extraer informacion del plan de pago

          const paymentPlan = session.metadata?.paymentPlan || 'contado';
          const isMSI = session.metadata?.isMSI === 'true';
          const msiMonths = parseInt(session.metadata?.msiMonths || '1');

          const paymentPlanText = isMSI
          ? `${msiMonths} meses sin intereses` : 'Pago único';

          // Mapear tipo de plan a nombre legible en español
          const planNames = {
            starter: "Paquete Inicial",
            business: "Paquete Negocio",
            enterprise: "Paquete Premium"
          };

          const planName = planNames[planType as keyof typeof planNames] || planType;

          // Enviar correo de confirmación
          if (customerEmail) {
            await sendConfirmationEmail(
              customerEmail,
              customerName,
              planName,
              amount,
              paymentMethod === 'card' ? 'Tarjeta' : paymentMethod,
              paymentPlanText
            );
          }
        }
        break;
      }

      // Cuando se crea una suscripción
      case 'customer.subscription.created': {
        const subscription = event.data.object as any;
        break;
      }

      // Cuando se procesa un pago de suscripción
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as any;

        // Solo procesamos facturas de suscripciones
        if (invoice.subscription) {
          // Obtener detalles de la suscripción
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription);

          // Obtener el número total de meses del plan desde los metadatos
          const totalMonths = parseInt(subscription.metadata.totalMonths || '0');

          // Si no hay metadata de totalMonths, no hacemos nada
          if (!totalMonths) {
            break;
          }

          // Obtener la información de facturación para contar los pagos
          const invoices = await stripe.invoices.list({
            subscription: subscription.id,
            status: 'paid',
          });

          // Contar el número de facturas pagadas
          const paymentCount = invoices.data.length;

          // Si ya se han realizado todos los pagos, cancelamos la suscripción
          if (paymentCount >= totalMonths) {
            await stripe.subscriptions.update(subscription.id, {
              cancel_at_period_end: true,
              metadata: {
                ...subscription.metadata,
                cancelReason: 'Plan completado - Todos los pagos realizados'
              }
            });
          }
        }
        break;
      }

      // Cuando una suscripción es cancelada
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any;
        break;
      }

      // Otros eventos...
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
