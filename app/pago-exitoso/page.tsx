"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PagoExitosoPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [customerName, setCustomerName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/verify-payment?session_id=${sessionId}`);
        const data = await response.json();

        if (data.success) {
          setCustomerName(data.customer?.name || "");
        }
      } catch (error) {
        console.error("Error al verificar el pago:", error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#1A1A1A]/30 p-8 rounded-2xl border border-[#7D5683]">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin h-10 w-10 border-4 border-[#7D5683] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-[#DADFFE]">Verificando pago...</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle className="h-20 w-20 text-green-500" />
              </div>
              
              <h1 className="text-2xl font-bold mb-2 text-[#B5C7FF]">¡Pago Exitoso!</h1>
              
              {customerName && (
                <p className="text-[#DADFFE]/70 mb-6">
                  Gracias {customerName} por tu compra.
                </p>
              )}
              
              <p className="text-[#DADFFE]/70 mb-6">
                Hemos recibido tu pago correctamente. En breve nos pondremos en contacto contigo para comenzar a trabajar en tu proyecto.
              </p>
              
              <div className="bg-[#6A53FF]/20 p-4 rounded-lg mb-6">
                <p className="text-[#B5C7FF] text-sm">
                  Se ha enviado un correo de confirmación con los detalles de tu compra. Si no lo encuentras, revisa tu carpeta de spam.
                </p>
              </div>
              
              <Link 
                href="/"
                className="inline-block w-full py-3 px-4 bg-[#7D5683] text-white font-medium rounded-lg hover:bg-[#7D5683]/90 transition-colors"
              >
                Volver al inicio
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 