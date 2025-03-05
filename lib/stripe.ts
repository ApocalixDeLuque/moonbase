import { loadStripe, Stripe } from '@stripe/stripe-js';

// Carga de Stripe en el lado del cliente
let stripePromise: Promise<Stripe | null>;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
}; 