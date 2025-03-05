import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID no proporcionado' }, { status: 400 });
  }

  try {
    // Obtener la sesión de Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'payment_intent']
    });

    // Si el pago no fue exitoso, devolver error
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ 
        success: false, 
        message: 'El pago no ha sido completado' 
      });
    }

    // Obtener información del cliente
    const customerInfo = session.customer_details;

    return NextResponse.json({
      success: true,
      customer: {
        name: customerInfo?.name || '',
        email: customerInfo?.email || '',
      },
      paymentInfo: {
        amount: session.amount_total,
        currency: session.currency,
        paymentMethod: session.payment_method_types?.[0] || 'unknown',
      },
      metadata: session.metadata,
    });
  } catch (error) {
    console.error('Error al verificar el pago:', error);
    return NextResponse.json({ error: 'Error al verificar el pago' }, { status: 500 });
  }
} 