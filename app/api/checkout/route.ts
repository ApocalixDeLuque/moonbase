import { NextResponse } from 'next/server';
  import { stripe } from '@/lib/stripe-server';

  // Definimos los precios según el plan y método de pago
  const prices = {
    starter: {
      contado: 5999,
      "3msi": 6499,
      "6msi": 6699,
      "9msi": 6899,
      "12msi": 7199
    },
    business: {
      contado: 9999,
      "3msi": 10699,
      "6msi": 11099,
      "9msi": 11499,
      "12msi": 11899
    },
    enterprise: {
      contado: 15999,
      "3msi": 17099,
      "6msi": 17699,
      "9msi": 18299,
      "12msi": 18999
    }
  };

  // Nombres de los planes para mostrar en Stripe
  const planNames = {
    starter: "Paquete Inicial",
    business: "Paquete Negocio",
    enterprise: "Paquete Premium"
  };

  export async function POST(req: Request) {
    try {
      const { plan, paymentPlan } = await req.json();

      // Validar que el plan y método de pago sean válidos
      if (!plan || !paymentPlan || !prices[plan as keyof typeof prices] || !prices[plan as keyof typeof prices][paymentPlan as keyof typeof prices[keyof typeof prices]]) {
        return NextResponse.json({ error: 'Plan o método de pago inválido' }, { status: 400 });
      }

      const totalAmount = prices[plan as keyof typeof prices][paymentPlan as keyof typeof prices[keyof typeof prices]];
      const planName = planNames[plan as keyof typeof planNames];
      const months = paymentPlan === 'contado' ? 1 : parseInt(paymentPlan.replace('msi', ''));

      // Configurar metadata para saber qué plan y método de pago se eligió
      const metadata = {
        plan,
        paymentPlan,
        amountMXN: totalAmount.toString(),
        isMSI: months > 1 ? 'true' : 'false',
        msiMonths: months.toString()
      };

      // Crear un producto para esta compra específica
      const product = await stripe.products.create({
        name: planName,
        description: months > 1 ? `Servicio web - ${months} meses sin intereses` : 'Servicio web - Pago único',
        metadata
      });

      // Crear sesión de checkout para pago único con opción de MSI
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'mxn',
              product_data: {
                name: planName,
                description: months > 1 ? `Servicio web - ${months} meses sin intereses` : 'Servicio web - Pago único',
              },
              unit_amount: totalAmount * 100, // Stripe usa centavos
            },
            quantity: 1,
          },
        ],
        mode: 'payment', // Siempre modo payment, ya no usamos suscripciones
        payment_method_options: months > 1 ? {
          card: {
            installments: {
              enabled: true,
            },
          },
        } : undefined,
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pago-exitoso?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/#planes`,
        metadata
      });

      return NextResponse.json({ url: session.url });
    } catch (error) {
      console.error('Error al crear sesión de Stripe:', error);
      return NextResponse.json({ error: 'Error al procesar el pago' }, { status: 500 });
    }
  }
