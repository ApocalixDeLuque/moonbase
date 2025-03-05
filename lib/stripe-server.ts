import Stripe from 'stripe';

// Inicialización de Stripe en el lado del servidor
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16', // Usar la versión más reciente disponible
  appInfo: {
    name: 'Moonbase Web Services',
    version: '0.1.0',
  },
}); 