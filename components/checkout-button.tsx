"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getStripe } from "@/lib/stripe";

interface CheckoutButtonProps {
  plan: "starter" | "business" | "enterprise";
  paymentPlan: "contado" | "3msi" | "6msi" | "9msi" | "12msi";
  className?: string;
}

export default function CheckoutButton({
  plan,
  paymentPlan,
  className = "",
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      // Llamar a nuestra API de checkout
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan,
          paymentPlan,
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("Error al crear la sesión de checkout:", data.error);
        alert("Hubo un error al procesar tu pago. Por favor, intenta de nuevo.");
        setIsLoading(false);
        return;
      }

      // Redirigir a la página de checkout de Stripe
      const stripe = await getStripe();
      if (stripe) {
        router.push(data.url);
      }
    } catch (error) {
      console.error("Error en el checkout:", error);
      alert("Hubo un error al procesar tu pago. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={`w-full py-3 px-4 bg-[#7D5683] text-white font-medium rounded-lg hover:bg-[#7D5683]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? "Procesando..." : "Contratar ahora"}
    </button>
  );
} 