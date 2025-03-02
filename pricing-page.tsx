"use client"

import { useState } from "react"
import Image from "next/image"
import { TooltipProvider } from "@/components/ui/tooltip"
import FeatureItem from "@/components/feature-item"
import FeatureList from "@/components/feature-list"

// Define standard features for all packages
const standardFeatures = [
  {
    feature: "Páginas",
    description:
      "Número total de páginas web únicas incluidas en tu sitio. Cada página puede tener su propio diseño y contenido personalizado.",
    included: {
      starter: true,
      business: true,
      enterprise: true,
    },
    level: {
      starter: "Hasta 3 páginas",
      business: "5-8 páginas",
      enterprise: "10+ páginas",
    },
  },
  {
    feature: "Diseño Premium",
    description:
      "Plantillas y diseños profesionales optimizados para una experiencia de usuario excepcional y una imagen de marca coherente.",
    included: {
      starter: true,
      business: true,
      enterprise: true,
    },
    level: {
      starter: "Diseño Básico",
      business: "Diseño Personalizado",
      enterprise: "Diseño Premium",
    },
  },
  {
    feature: "Elementor Pro",
    description:
      "Constructor de páginas premium que permite crear y editar tu sitio web con una interfaz visual intuitiva.",
    included: {
      starter: true,
      business: true,
      enterprise: true,
    },
  },
  {
    feature: "Hosting y Dominio",
    description:
      "Alojamiento web profesional con dominio gratuito por un año y certificado SSL para una conexión segura.",
    included: {
      starter: true,
      business: true,
      enterprise: true,
    },
  },
  {
    feature: "Mantenimiento",
    description: "Servicio de mantenimiento que incluye actualizaciones, copias de seguridad y monitoreo de seguridad.",
    included: {
      starter: true,
      business: true,
      enterprise: true,
    },
  },
  {
    feature: "SEO Optimizado",
    description:
      "Optimización para motores de búsqueda que ayuda a mejorar la visibilidad de tu sitio en Google y otros buscadores.",
    included: {
      starter: false,
      business: true,
      enterprise: true,
    },
  },
  {
    feature: "Soporte Prioritario",
    description: "Acceso a nuestro equipo de soporte técnico para resolver dudas y problemas.",
    included: {
      starter: false,
      business: true,
      enterprise: true,
    },
  },
  {
    feature: "E-commerce",
    description:
      "Funcionalidad completa de tienda en línea con WooCommerce, incluyendo carrito de compras, pagos en línea y gestión de inventario.",
    included: {
      starter: false,
      business: false,
      enterprise: true,
    },
  },
  {
    feature: "Capacitación",
    description: "Sesiones de capacitación y recursos para ayudarte a gestionar tu sitio web de manera efectiva.",
    included: {
      starter: true,
      business: true,
      enterprise: true,
    },
  },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"mensual" | "anual">("anual")

  // Calculate prices including deposit for monthly plans
  const getPriceInfo = (basePrice: number) => {
    if (billingCycle === "anual") {
      return {
        monthly: basePrice,
        total: basePrice * 12,
        deposit: 0,
        months: 12,
      }
    }
    // For monthly plans, take deposit from total months
    const deposit = 3000
    const monthlyPayment = basePrice
    const totalWithoutDeposit = monthlyPayment * 12
    const monthsCovered = Math.floor((totalWithoutDeposit - deposit) / monthlyPayment)

    return {
      monthly: monthlyPayment,
      total: monthlyPayment * monthsCovered + deposit,
      deposit,
      months: monthsCovered,
    }
  }

  const starterPrice = getPriceInfo(500)
  const businessPrice = getPriceInfo(900)
  const enterprisePrice = getPriceInfo(1400)

  return (
    <div className="min-h-screen bg-[#140E36] text-[#DADFFE] font-sans">
      <TooltipProvider delayDuration={0}>
        {/* Header */}
        <header className="container mx-auto px-4 py-12">
          <div className="flex justify-center mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NS-Marca%20oficial_blanco-3HrsmBrLXqfzV9vyLY30gu2JHLA33b.png"
              alt="Nightly Software"
              width={300}
              height={100}
              className="h-16 w-auto"
            />
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#B5C7FF] mb-4">Planes de Precios</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Opciones de precios refinadas y fáciles de entender, diseñadas para pequeñas y medianas empresas mexicanas
            </p>
            <div className="mt-8 inline-flex items-center p-1 bg-[#1A1A1A]/30 rounded-lg">
              <button
                onClick={() => setBillingCycle("mensual")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === "mensual" ? "bg-[#7D5683] text-white" : "text-[#DADFFE] hover:text-white"
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setBillingCycle("anual")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === "anual" ? "bg-[#7D5683] text-white" : "text-[#DADFFE] hover:text-white"
                }`}
              >
                Anual (Ahorra hasta 25%)
              </button>
            </div>
          </div>
        </header>

        {/* Pricing Cards */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Starter Package */}
            <div className="bg-[#1A1A1A]/30 rounded-2xl overflow-hidden border border-[#7D5683]/30 transition-all hover:shadow-xl hover:shadow-[#7D5683]/10 hover:translate-y-[-4px]">
              <div className="p-6 border-b border-[#7D5683]/20 h-[320px] flex flex-col">
                <h2 className="text-2xl font-bold mb-2">Paquete Inicial</h2>
                <p className="text-[#DADFFE]/70 mb-6 flex-grow">
                  Ideal para startups y pequeñas empresas que buscan una presencia en línea simple y profesional.
                </p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#B5C7FF]">${starterPrice.monthly}</span>
                  <span className="text-[#DADFFE]/70 mb-1">/mes</span>
                </div>
                <button className="w-full py-3 px-4 bg-[#7D5683] text-white font-medium rounded-lg hover:bg-[#7D5683]/90 transition-colors">
                  Comenzar
                </button>
                {billingCycle === "anual" ? (
                  <p className="text-center text-sm mt-2 text-[#B5C7FF]">Facturado como ${starterPrice.total}/año</p>
                ) : (
                  <p className="text-center text-sm mt-2 text-[#B5C7FF]">
                    Depósito inicial de ${starterPrice.deposit} MXN
                    <br />
                    Plan por {starterPrice.months} meses
                  </p>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-medium mb-4 text-[#B5C7FF]">Qué incluye:</h3>
                <FeatureList>
                  {standardFeatures.map((item) => (
                    <FeatureItem
                      key={item.feature}
                      feature={item.level?.starter || item.feature}
                      description={item.description}
                      included={item.included.starter}
                    />
                  ))}
                </FeatureList>
              </div>
            </div>

            {/* Business Package */}
            <div className="bg-[#1A1A1A]/30 rounded-2xl overflow-hidden border-2 border-[#7D5683] relative transition-all hover:shadow-xl hover:shadow-[#7D5683]/20 hover:translate-y-[-4px]">
              <div className="absolute top-0 right-0 bg-[#7D5683] text-white px-4 py-1 font-medium text-sm rounded-bl-lg">
                Popular
              </div>
              <div className="p-6 border-b border-[#7D5683]/20 h-[320px] flex flex-col">
                <h2 className="text-2xl font-bold mb-2">Paquete Empresarial</h2>
                <p className="text-[#DADFFE]/70 mb-6 flex-grow">
                  Empresas en crecimiento que necesitan un sitio web más robusto con páginas adicionales y funciones
                  básicas de marketing digital.
                </p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#B5C7FF]">${businessPrice.monthly}</span>
                  <span className="text-[#DADFFE]/70 mb-1">/mes</span>
                </div>
                <button className="w-full py-3 px-4 bg-[#7D5683] text-white font-medium rounded-lg hover:bg-[#7D5683]/90 transition-colors">
                  Comenzar
                </button>
                {billingCycle === "anual" ? (
                  <p className="text-center text-sm mt-2 text-[#B5C7FF]">Facturado como ${businessPrice.total}/año</p>
                ) : (
                  <p className="text-center text-sm mt-2 text-[#B5C7FF]">
                    Depósito inicial de ${businessPrice.deposit} MXN
                    <br />
                    Plan por {businessPrice.months} meses
                  </p>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-medium mb-4 text-[#B5C7FF]">Qué incluye:</h3>
                <FeatureList>
                  {standardFeatures.map((item) => (
                    <FeatureItem
                      key={item.feature}
                      feature={item.level?.business || item.feature}
                      description={item.description}
                      included={item.included.business}
                    />
                  ))}
                </FeatureList>
              </div>
            </div>

            {/* Enterprise Package */}
            <div className="bg-[#1A1A1A]/30 rounded-2xl overflow-hidden border border-[#7D5683]/30 transition-all hover:shadow-xl hover:shadow-[#7D5683]/10 hover:translate-y-[-4px]">
              <div className="p-6 border-b border-[#7D5683]/20 h-[320px] flex flex-col">
                <h2 className="text-2xl font-bold mb-2">Paquete Corporativo</h2>
                <p className="text-[#DADFFE]/70 mb-6 flex-grow">
                  Empresas establecidas que necesitan una presencia digital completa con funcionalidad avanzada.
                </p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#B5C7FF]">${enterprisePrice.monthly}</span>
                  <span className="text-[#DADFFE]/70 mb-1">/mes</span>
                </div>
                <button className="w-full py-3 px-4 bg-[#7D5683] text-white font-medium rounded-lg hover:bg-[#7D5683]/90 transition-colors">
                  Comenzar
                </button>
                {billingCycle === "anual" ? (
                  <p className="text-center text-sm mt-2 text-[#B5C7FF]">Facturado como ${enterprisePrice.total}/año</p>
                ) : (
                  <p className="text-center text-sm mt-2 text-[#B5C7FF]">
                    Depósito inicial de ${enterprisePrice.deposit} MXN
                    <br />
                    Plan por {enterprisePrice.months} meses
                  </p>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-medium mb-4 text-[#B5C7FF]">Qué incluye:</h3>
                <FeatureList>
                  {standardFeatures.map((item) => (
                    <FeatureItem
                      key={item.feature}
                      feature={item.level?.enterprise || item.feature}
                      description={item.description}
                      included={item.included.enterprise}
                    />
                  ))}
                </FeatureList>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#B5C7FF] mb-8 text-center">Preguntas Frecuentes</h2>
            <div className="space-y-6">
              <FaqItem
                question="¿Para qué es el depósito inicial?"
                answer="El depósito inicial de 3,000 MXN se requiere para comenzar a trabajar en tu proyecto. Esto cubre los costos iniciales de configuración y asegura el compromiso con el proyecto."
              />
              <FaqItem
                question="¿Puedo actualizar mi paquete más adelante?"
                answer="Sí, puedes actualizar tu paquete en cualquier momento. Prorratearemos la diferencia y la aplicaremos a tu nuevo plan."
              />
              <FaqItem
                question="¿Qué sucede después de que expire mi año gratuito de dominio?"
                answer="Después del primer año, la renovación del dominio se facturará a la tarifa estándar. Te notificaremos antes de la fecha de renovación."
              />
              <FaqItem
                question="¿Cómo funcionan los servicios de mantenimiento mensual?"
                answer="Nuestro equipo monitorea proactivamente tu sitio, realiza actualizaciones y te envía informes regulares. Esto asegura que tu sitio permanezca seguro, rápido y actualizado."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-[#1A1A1A]/30 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#B5C7FF] mb-4">¿Listo para Comenzar?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Lleva tu negocio en línea con nuestros servicios profesionales de desarrollo web. Contáctanos hoy para una
              consulta gratuita.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="py-3 px-8 bg-[#7D5683] text-white font-medium rounded-lg hover:bg-[#7D5683]/90 transition-colors">
                Contáctanos
              </button>
              <button className="py-3 px-8 bg-transparent border border-[#7D5683] text-[#B5C7FF] font-medium rounded-lg hover:bg-[#7D5683]/10 transition-colors">
                Más Información
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0D0923] py-12 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0 flex items-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NS-Isotipo_blanco-g1yVsmA9mL5ufhgw3XyHqT5gIIX6ie.png"
                  alt="Nightly Software Icon"
                  width={50}
                  height={50}
                  className="h-10 w-auto mr-3"
                />
                <div>
                  <h2 className="text-2xl font-bold text-[#B5C7FF]">Nightly Software</h2>
                  <p className="text-[#DADFFE]/70 mt-2">Soluciones web profesionales para empresas mexicanas</p>
                </div>
              </div>
              <div className="flex gap-6">
                <a href="#" className="text-[#DADFFE] hover:text-[#B5C7FF] transition-colors">
                  Términos
                </a>
                <a href="#" className="text-[#DADFFE] hover:text-[#B5C7FF] transition-colors">
                  Privacidad
                </a>
                <a href="#" className="text-[#DADFFE] hover:text-[#B5C7FF] transition-colors">
                  Contacto
                </a>
              </div>
            </div>
            <div className="border-t border-[#7D5683]/20 mt-8 pt-8 text-center text-[#DADFFE]/50 text-sm">
              &copy; {new Date().getFullYear()} Nightly Software. Todos los derechos reservados.
            </div>
          </div>
        </footer>
      </TooltipProvider>
    </div>
  )
}

// Helper Components

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-[#7D5683]/30 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-4 text-left font-medium focus:outline-none"
      >
        <span>{question}</span>
        <span className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#7D5683]"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 pt-0 text-[#DADFFE]/80">{answer}</div>
      </div>
    </div>
  )
}

