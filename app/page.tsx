"use client"

import { useState } from "react"
import Image from "next/image"
import { TooltipProvider } from "@/components/ui/tooltip"
import FeatureItem from "@/components/feature-item"
import FeatureList from "@/components/feature-list"

// Define standard features for all packages
const standardFeatures = [
  // Características incluidas en TODOS los planes
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
      starter: "Hasta **3** páginas",
      business: "**4-6** páginas",
      enterprise: "**7-10** páginas",
    },
  },
  {
    feature: "Diseño",
    description:
      "Plantillas y diseños profesionales optimizados para una experiencia de usuario excepcional e imagen de marca consistente.",
    included: {
      starter: true,
      business: true,
      enterprise: true,
    },
    level: {
      starter: "Moderno y Atractivo",
      business: "Personalizado",
      enterprise: "**Premium**",
    },
  },
  {
    feature: "Elementor Pro",
    description:
      "Constructor de páginas premium que te permite crear y editar tu sitio web con una interfaz visual intuitiva.",
    included: {
      starter: true,
      business: true,
      enterprise: true,
    },
  },
  {
    feature: "Hosting",
    description:
      "Alojamiento web profesional con alta velocidad y rendimiento para asegurar que tu sitio esté siempre disponible y cargue rápidamente.",
    included: {
      starter: true,
      business: true,
      enterprise: true,
    },
  },
  {
    feature: "Dominio",
    description:
      "Nombre de dominio personalizado para tu sitio web **gratuito** por un año, elegido según la disponibilidad y relevancia para tu negocio.",
    included: {
      starter: true,
      business: true,
      enterprise: true,
    },
  },
  {
    feature: "Certificado SSL",
    description:
      "Protección de seguridad que garantiza una conexión segura para tus visitantes y mejora tu posicionamiento en buscadores.",
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
    level: {
      starter: "Esencial",
      business: "Mejorado",
      enterprise: "**Premium**",
    },
  },
  {
    feature: "Optimización Móvil",
    description: "Asegura que tu sitio web se vea y funcione perfectamente en todos los dispositivos y tamaños de pantalla.",
    included: {
      starter: true,
      business: true,
      enterprise: true,
    },
  },
  {
    feature: "Seguridad",
    description: "Medidas de seguridad avanzadas para proteger tu sitio web de amenazas y vulnerabilidades.",
    included: {
      starter: true,
      business: true,
      enterprise: true,
    },
    level: {
      starter: "Protección Esencial",
      business: "Protección Mejorada",
      enterprise: "Protección **Premium**",
    },
  },
  {
    feature: "Gestión de Contenido",
    description: "Sistema fácil de usar para actualizar y gestionar el contenido de tu sitio web.",
    included: {
      starter: true,
      business: true,
      enterprise: true,
    },
  },
  {
    feature: "Formulario de Contacto",
    description: "Formulario de contacto profesional para que los visitantes se comuniquen contigo directamente desde tu sitio web.",
    included: {
      starter: true,
      business: true,
      enterprise: true,
    },
  },
  {
    feature: "Integración Redes Sociales",
    description: "Conecta tu sitio web con tus perfiles de redes sociales para una mejor presencia online.",
    included: {
      starter: true,
      business: true,
      enterprise: true,
    },
  },
  {
    feature: "Capacitación",
    description: "Sesiones de capacitación y recursos para ayudarte a gestionar eficazmente tu sitio web.",
    included: {
      starter: true,
      business: true,
      enterprise: true,
    },
    level: {
      starter: "Guía Personalizada",
      business: "Guía Detallada",
      enterprise: "Capacitación **Completa**",
    },
  },
  {
    feature: "Revisiones",
    description: "Número de rondas de revisión incluidas en la fase inicial de diseño.",
    included: {
      starter: true,
      business: true,
      enterprise: true,
    },
    level: {
      starter: "**1** ronda",
      business: "**2** rondas",
      enterprise: "**2** rondas",
    },
  },
  {
    feature: "Informes Mensuales",
    description: "Informes regulares sobre el rendimiento del sitio web, tráfico y estado de seguridad.",
    included: {
      starter: false,
      business: true,
      enterprise: true,
    },
    level: {
      starter: "Informes Esenciales",
      business: "Análisis de Datos",
      enterprise: "Análisis **Completo**",
    },
  },
  
  // Características incluidas en BUSINESS y ENTERPRISE
  {
    feature: "Optimización SEO",
    description:
      "Optimización para motores de búsqueda que ayuda a mejorar la visibilidad de tu sitio en Google y otros buscadores.",
    included: {
      starter: false,
      business: true,
      enterprise: true,
    },
    level: {
      business: "Estratégicas",
      enterprise: "**Avanzadas**",
    },
  },
  {
    feature: "Soporte Prioritario",
    description: "Acceso a nuestro equipo de soporte técnico para resolver preguntas y problemas.",
    included: {
      starter: false,
      business: true,
      enterprise: true,
    },
    level: {
      business: "2 horas/mes",
      enterprise: "3 horas/mes",
    },
  },
  {
    feature: "Optimización de Rendimiento",
    description: "Técnicas para mejorar la velocidad de carga y el rendimiento general del sitio web.",
    included: {
      starter: false,
      business: true,
      enterprise: true,
    },
  },
  {
    feature: "Google Analytics",
    description: "Integración con Google Analytics para rastrear el comportamiento de los visitantes y el rendimiento del sitio web.",
    included: {
      starter: false,
      business: true,
      enterprise: true,
    },
  },
  {
    feature: "Configuración de Blog",
    description: "Sección de blog lista para usar para compartir noticias, artículos y actualizaciones con tu audiencia.",
    included: {
      starter: false,
      business: true,
      enterprise: true,
    },
  },
  
  // Características EXCLUSIVAS de ENTERPRISE
  {
    feature: "E-commerce",
    description:
      "Funcionalidad completa de tienda online con WooCommerce, incluyendo carrito de compras, pagos en línea y gestión de inventario.",
    included: {
      starter: false,
      business: false,
      enterprise: true,
    },
  },
  {
    feature: "Integraciones Personalizadas",
    description: "Integración con servicios y herramientas de terceros para mejorar la funcionalidad de tu sitio web.",
    included: {
      starter: false,
      business: false,
      enterprise: true,
    },
  },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"en_plazos" | "anual">("anual")

  // Calculate prices with the fixed values provided
  const getPriceInfo = (planType: 'starter' | 'business' | 'enterprise') => {
    // Fixed prices for each plan
    const prices = {
      starter: {
        annual: 5999,
        initialPayment: 3000,
        monthlyInstallment: 550,
        totalPayments: 7950
      },
      business: {
        annual: 9999,
        initialPayment: 5000,
        monthlyInstallment: 915,
        totalPayments: 13235
      },
      enterprise: {
        annual: 15999,
        initialPayment: 8000,
        monthlyInstallment: 1475,
        totalPayments: 21275
      }
    };
    
    const planPrices = prices[planType];
    
    if (billingCycle === "anual") {
      return {
        monthly: Math.round(planPrices.annual / 12), // Monthly equivalent for display
        total: planPrices.annual,
        deposit: 0,
        months: 12,
        currency: "MXN",
        savingsPercent: Math.round(((planPrices.totalPayments - planPrices.annual) / planPrices.annual) * 100)
      }
    }
    
    // For payment plan
    return {
      monthly: planPrices.monthlyInstallment,
      total: planPrices.totalPayments,
      deposit: planPrices.initialPayment,
      months: 9,
      currency: "MXN"
    }
  }

  const starterPrice = getPriceInfo('starter')
  const businessPrice = getPriceInfo('business')
  const enterprisePrice = getPriceInfo('enterprise')

  // Ordenar características: primero las incluidas, luego las no incluidas
  const sortFeaturesByInclusion = (features: typeof standardFeatures, plan: 'starter' | 'business' | 'enterprise') => {
    return [...features].sort((a, b) => {
      if (a.included[plan] && !b.included[plan]) return -1;
      if (!a.included[plan] && b.included[plan]) return 1;
      return 0;
    });
  };

  const starterFeatures = sortFeaturesByInclusion(standardFeatures, 'starter');
  const businessFeatures = sortFeaturesByInclusion(standardFeatures, 'business');
  const enterpriseFeatures = sortFeaturesByInclusion(standardFeatures, 'enterprise');

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
              Soluciones web profesionales diseñadas para impulsar el crecimiento de tu negocio
            </p>
            <div className="mt-8 inline-flex items-center p-1 bg-[#1A1A1A]/30 rounded-lg">
              <button
                onClick={() => setBillingCycle("en_plazos")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === "en_plazos" ? "bg-[#7D5683] text-white" : "text-[#DADFFE] hover:text-white"
                }`}
              >
                Plan de pagos
              </button>
              <button
                onClick={() => setBillingCycle("anual")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === "anual" ? "bg-[#7D5683] text-white" : "text-[#DADFFE] hover:text-white"
                }`}
              >
                Pago único (Ahorra hasta 33%)
              </button>
            </div>
          </div>
        </header>

        {/* Pricing Cards */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Starter Package */}
            <div className="bg-[#1A1A1A]/30 rounded-2xl overflow-hidden border border-[#7D5683]/30 transition-all hover:shadow-xl hover:shadow-[#7D5683]/10">
              <div className="p-6 border-b border-[#7D5683]/20 h-[320px] flex flex-col">
                <h2 className="text-2xl font-bold mb-2">Paquete Inicial</h2>
                <p className="text-[#DADFFE]/70 mb-6 flex-grow">
                  Presencia web profesional y atractiva para lanzar tu negocio al mundo digital con todas las funciones esenciales.
                </p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#B5C7FF]">${starterPrice.monthly}</span>
                  <span className="text-[#DADFFE]/70 mb-1">MXN/mes</span>
                </div>
                <button className="w-full py-3 px-4 bg-[#7D5683] text-white font-medium rounded-lg hover:bg-[#7D5683]/90 transition-colors">
                  Comenzar
                </button>
                {billingCycle === "anual" ? (
                  <p className="text-center text-sm mt-2 text-[#B5C7FF]">Facturado como ${starterPrice.total} MXN/año</p>
                ) : (
                  <p className="text-center text-sm mt-2 text-[#B5C7FF]">
                    Pago inicial de ${starterPrice.deposit} MXN
                    <br />
                    + ${starterPrice.monthly} MXN/mes por {starterPrice.months} meses
                  </p>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-medium mb-4 text-[#B5C7FF]">Qué incluye:</h3>
                <FeatureList>
                  {starterFeatures.map((item) => (
                    <FeatureItem
                      key={item.feature}
                      feature={item.feature}
                      value={item.level?.starter}
                      description={item.description}
                      included={item.included.starter}
                    />
                  ))}
                </FeatureList>
              </div>
            </div>

            {/* Business Package */}
            <div className="bg-[#1A1A1A]/30 rounded-2xl overflow-hidden border-2 border-[#7D5683] relative transition-all hover:shadow-xl hover:shadow-[#7D5683]/20">
              <div className="absolute top-0 right-0 bg-[#7D5683] text-white px-4 py-1 font-medium text-sm rounded-bl-lg">
                Popular
              </div>
              <div className="p-6 border-b border-[#7D5683]/20 h-[320px] flex flex-col">
                <h2 className="text-2xl font-bold mb-2">Paquete Negocio</h2>
                <p className="text-[#DADFFE]/70 mb-6 flex-grow">
                  Solución completa para negocios en crecimiento con herramientas de marketing digital y mayor alcance.
                </p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#B5C7FF]">${businessPrice.monthly}</span>
                  <span className="text-[#DADFFE]/70 mb-1">MXN/mes</span>
                </div>
                <button className="w-full py-3 px-4 bg-[#7D5683] text-white font-medium rounded-lg hover:bg-[#7D5683]/90 transition-colors">
                  Comenzar
                </button>
                {billingCycle === "anual" ? (
                  <p className="text-center text-sm mt-2 text-[#B5C7FF]">Facturado como ${businessPrice.total} MXN/año</p>
                ) : (
                  <p className="text-center text-sm mt-2 text-[#B5C7FF]">
                    Pago inicial de ${businessPrice.deposit} MXN
                    <br />
                    + ${businessPrice.monthly} MXN/mes por {businessPrice.months} meses
                  </p>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-medium mb-4 text-[#B5C7FF]">Qué incluye:</h3>
                <FeatureList>
                  {businessFeatures.map((item) => (
                    <FeatureItem
                      key={item.feature}
                      feature={item.feature}
                      value={item.level?.business}
                      description={item.description}
                      included={item.included.business}
                    />
                  ))}
                </FeatureList>
              </div>
            </div>

            {/* Enterprise Package */}
            <div className="bg-[#1A1A1A]/30 rounded-2xl overflow-hidden border border-[#7D5683]/30 transition-all hover:shadow-xl hover:shadow-[#7D5683]/10">
              <div className="p-6 border-b border-[#7D5683]/20 h-[320px] flex flex-col">
                <h2 className="text-2xl font-bold mb-2">Paquete Empresarial</h2>
                <p className="text-[#DADFFE]/70 mb-6 flex-grow">
                  Experiencia digital completa con e-commerce, integraciones avanzadas y funcionalidades premium para empresas establecidas.
                </p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#B5C7FF]">${enterprisePrice.monthly}</span>
                  <span className="text-[#DADFFE]/70 mb-1">MXN/mes</span>
                </div>
                <button className="w-full py-3 px-4 bg-[#7D5683] text-white font-medium rounded-lg hover:bg-[#7D5683]/90 transition-colors">
                  Comenzar
                </button>
                {billingCycle === "anual" ? (
                  <p className="text-center text-sm mt-2 text-[#B5C7FF]">Facturado como ${enterprisePrice.total} MXN/año</p>
                ) : (
                  <p className="text-center text-sm mt-2 text-[#B5C7FF]">
                    Pago inicial de ${enterprisePrice.deposit} MXN
                    <br />
                    + ${enterprisePrice.monthly} MXN/mes por {enterprisePrice.months} meses
                  </p>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-medium mb-4 text-[#B5C7FF]">Qué incluye:</h3>
                <FeatureList>
                  {enterpriseFeatures.map((item) => (
                    <FeatureItem
                      key={item.feature}
                      feature={item.feature}
                      value={item.level?.enterprise}
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
                answer="El depósito inicial de 3,000 MXN nos permite comenzar a trabajar en tu proyecto inmediatamente. Este monto cubre los costos iniciales de configuración y asegura nuestro compromiso mutuo con el proyecto."
              />
              <FaqItem
                question="¿Puedo actualizar mi paquete más adelante?"
                answer="¡Absolutamente! Puedes actualizar tu paquete en cualquier momento a medida que tu negocio crece. Calcularemos la diferencia prorrateada y la aplicaremos a tu nuevo plan sin complicaciones."
              />
              <FaqItem
                question="¿Qué sucede después de que expire mi año gratuito de dominio?"
                answer="Después del primer año, te notificaremos con anticipación sobre la renovación del dominio. La renovación se facturará a la tarifa estándar, pero siempre te mantendremos informado antes de cualquier cargo."
              />
              <FaqItem
                question="¿Cómo funcionan los servicios de mantenimiento mensual?"
                answer="Nuestro equipo monitorea proactivamente tu sitio, realiza actualizaciones de seguridad, optimiza el rendimiento y te envía informes detallados regularmente. Este mantenimiento preventivo garantiza que tu sitio permanezca seguro, rápido y actualizado en todo momento."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-[#1A1A1A]/30 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#B5C7FF] mb-4">¿Listo para Impulsar tu Negocio?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Transforma tu presencia digital con nuestras soluciones web profesionales. Contáctanos hoy para una consulta gratuita y personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="py-3 px-8 bg-[#7D5683] text-white font-medium rounded-lg hover:bg-[#7D5683]/90 transition-colors">
                Contáctanos
              </button>
              <button className="py-3 px-8 bg-transparent border border-[#7D5683] text-[#B5C7FF] font-medium rounded-lg hover:bg-[#7D5683]/10 transition-colors">
                Saber Más
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

