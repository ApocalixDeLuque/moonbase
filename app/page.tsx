"use client"

import { useState } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import FeatureItem from "@/components/feature-item"
import FeatureList from "@/components/feature-list"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

// Define standard features for all packages
const standardFeatures = [
  // Características incluidas en TODOS los planes
  {
    feature: "Páginas",
    description:
      "Número total de secciones web únicas incluidas en tu sitio. Cada sección puede tener su propio contenido personalizado.",
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
  const [paymentPlan, setPaymentPlan] = useState<"contado" | "3msi" | "6msi" | "9msi" | "12msi">("contado");
  
  // New pricing structure
  const pricingData = {
    basic: {
      contado: 5999,
      "3msi": 6499,
      "6msi": 6699,
      "9msi": 6899,
      "12msi": 7199
    },
    standard: {
      contado: 9999,
      "3msi": 10699,
      "6msi": 11099,
      "9msi": 11499,
      "12msi": 11899
    },
    premium: {
      contado: 15999,
      "3msi": 17099,
      "6msi": 17699,
      "9msi": 18299,
      "12msi": 18999
    }
  };

  const planMapping = {
    starter: 'basic',
    business: 'standard',
    enterprise: 'premium'
  } as const;

  const getMonthlyPayment = (plan: "starter" | "business" | "enterprise") => {
    const mappedPlan = planMapping[plan];
    const totalPrice = pricingData[mappedPlan][paymentPlan];
    const months = paymentPlan === "contado" ? 1 : parseInt(paymentPlan.replace("msi", ""));
    return Math.round(totalPrice / months);
  };

  const getPlanDetails = (plan: "starter" | "business" | "enterprise") => {
    const mappedPlan = planMapping[plan];
    const totalPrice = pricingData[mappedPlan][paymentPlan];
    const months = paymentPlan === "contado" ? 1 : parseInt(paymentPlan.replace("msi", ""));
    const monthlyPayment = getMonthlyPayment(plan);
    
    return {
      monthly: monthlyPayment,
      total: totalPrice,
      months: months,
      currency: "MXN",
    };
  };

  const starterPrice = getPlanDetails('starter')
  const businessPrice = getPlanDetails('business')
  const enterprisePrice = getPlanDetails('enterprise')

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
        <Navbar/>
        <header className="container mx-auto px-4 py-36">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#B5C7FF] mb-4">Planes de Precios</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Soluciones web profesionales diseñadas para impulsar el crecimiento de tu negocio
            </p>
            
            {/* Payment options selector */}
            <div className="mt-8 flex justify-center">
              <Select
                value={paymentPlan}
                onValueChange={(value) => setPaymentPlan(value as "contado" | "3msi" | "6msi" | "9msi" | "12msi")}
              >
                <SelectTrigger className="w-[200px] text-lg p-6 bg-[#1A1A1A]/30 border-[#7D5683]/30 text-[#DADFFE] focus:ring-[#7D5683]">
                  <SelectValue placeholder="Selecciona un plan de pago" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#7D5683]/30">
                  <SelectItem value="12msi" className="text-[#DADFFE] text-lg p-3 focus:bg-[#7D5683]/20 focus:text-[#DADFFE]">Pago a 12 meses</SelectItem>
                  <SelectItem value="9msi" className="text-[#DADFFE] text-lg p-3 focus:bg-[#7D5683]/20 focus:text-[#DADFFE]">Pago a 9 meses</SelectItem>
                  <SelectItem value="6msi" className="text-[#DADFFE] text-lg p-3 focus:bg-[#7D5683]/20 focus:text-[#DADFFE]">Pago a 6 meses</SelectItem>
                  <SelectItem value="3msi" className="text-[#DADFFE] text-lg p-3 focus:bg-[#7D5683]/20 focus:text-[#DADFFE]">Pago a 3 meses</SelectItem>
                  <SelectItem value="contado" className="text-[#DADFFE] text-lg p-3 focus:bg-[#7D5683]/20 focus:text-[#DADFFE]">Pago único</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>

        {/* Pricing Cards */}
        <section className="container mx-auto px-4 pb-12 pt-6">
          {/* Payment notice banner */}
          {/* <div className="bg-[#271E40] p-4 rounded-lg max-w-6xl mx-auto mb-8 text-center border border-[#7D5683]/40">
            <p className="text-[#B5C7FF] font-medium">
              {paymentPlan === "contado" 
                ? "Todos nuestros planes incluyen dominio gratuito por un año y certificado SSL" 
                : `Plan de pagos a ${paymentPlan.replace('msi', '')} meses`}
            </p>
          </div> */}

          {/* Pricing cards grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Starter Package */}
            <div className="bg-[#1A1A1A]/30 rounded-2xl overflow-hidden border border-[#7D5683]/30 transition-all hover:shadow-xl hover:shadow-[#7D5683]/10 relative mt-10">
              {/* Package content */}
              <div className="p-6 border-b border-[#7D5683]/20 flex flex-col">
              {/* <div className="absolute top-3 right-3">
                <div className="bg-[#6A53FF]/20 text-[#B5C7FF] font-medium text-xs rounded-full px-3 py-1">
                  AHORRA 30%
                </div>
              </div> */}
                <h2 className="text-2xl font-bold mb-2">Paquete Inicial</h2>
                <p className="text-[#DADFFE]/70 mb-6 flex-grow">
                  Presencia web profesional y atractiva para lanzar tu negocio al mundo digital con todas las funciones esenciales.
                </p>
                <div className="flex flex-col mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg text-[#DADFFE]/50 line-through decoration-[#7D5683]">${Math.round(starterPrice.monthly * 1.3)}</span>
                    <div className="bg-[#6A53FF]/20 text-[#B5C7FF] font-medium text-xs rounded-full px-3 py-1">
                      AHORRA 30%
                    </div>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-[#B5C7FF]">${starterPrice.monthly}</span>
                    {paymentPlan !== "contado" && (
                      <span className="text-[#DADFFE]/70 mb-1">MXN/mes</span>
                    )}
                  </div>
                </div>
                <button className="w-full py-3 px-4 bg-[#7D5683] text-white font-medium rounded-lg hover:bg-[#7D5683]/90 transition-colors">
                  Comenzar
                </button>
                {paymentPlan !== "contado" ? (
                  <p className="text-center text-sm mt-2 text-[#B5C7FF]">
                    Total: ${starterPrice.total} MXN (En {starterPrice.months} pagos)
                  </p>
                ) : (
                  <p className="text-center text-sm mt-2 text-[#B5C7FF]">
                    Pago único de ${starterPrice.total} MXN
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
            <div className="bg-[#1A1A1A]/30 rounded-2xl overflow-hidden border border-[#7D5683] relative transition-all hover:shadow-xl hover:shadow-[#7D5683]/20">
              {/* Popular badge */}
              <div className="w-full bg-[#7D5683] text-white py-2 text-center font-medium">
                MÁS POPULAR
              </div>
             {/*  <div className="absolute top-[46px] right-3">
                <div className="bg-[#6A53FF]/20 text-[#B5C7FF] font-medium text-xs rounded-full px-3 py-1">
                  AHORRA 30%
                </div>
              </div> */}
              <div className="p-6 border-b border-[#7D5683]/20 flex flex-col">
                <h2 className="text-2xl font-bold mb-2">Paquete Negocio</h2>
                <p className="text-[#DADFFE]/70 mb-6 flex-grow">
                  Solución completa para negocios en crecimiento con herramientas de marketing digital y mayor alcance.
                </p>
                <div className="flex flex-col mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg text-[#DADFFE]/50 line-through decoration-[#7D5683]">${Math.round(businessPrice.monthly * 1.3)}</span>
                    <div className="bg-[#6A53FF]/20 text-[#B5C7FF] font-medium text-xs rounded-full px-3 py-1">
                      AHORRA 30%
                    </div>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-[#B5C7FF]">${businessPrice.monthly}</span>
                    {paymentPlan !== "contado" && (
                      <span className="text-[#DADFFE]/70 mb-1">MXN/mes</span>
                    )}
                  </div>
                </div>
                <button className="w-full py-3 px-4 bg-[#7D5683] text-white font-medium rounded-lg hover:bg-[#7D5683]/90 transition-colors">
                  Comenzar
                </button>
                {paymentPlan !== "contado" ? (
                  <p className="text-center text-sm mt-2 text-[#B5C7FF]">
                    Total: ${businessPrice.total} MXN (En {businessPrice.months} pagos)
                  </p>
                ) : (
                  <p className="text-center text-sm mt-2 text-[#B5C7FF]">
                    Pago único de ${businessPrice.total} MXN
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
            <div className="bg-[#1A1A1A]/30 rounded-2xl overflow-hidden border border-[#7D5683]/30 transition-all hover:shadow-xl hover:shadow-[#7D5683]/10 relative mt-10">
              {/* <div className="absolute top-3 right-3">
                <div className="bg-[#6A53FF]/20 text-[#B5C7FF] font-medium text-xs rounded-full px-3 py-1">
                  AHORRA 30%
                </div>
              </div> */}
              <div className="p-6 border-b border-[#7D5683]/20 flex flex-col">
                <h2 className="text-2xl font-bold mb-2">Paquete Empresarial</h2>
                <p className="text-[#DADFFE]/70 mb-6 flex-grow">
                  Experiencia digital completa con e-commerce, integraciones avanzadas y funcionalidades premium para empresas establecidas.
                </p>
                <div className="flex flex-col mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg text-[#DADFFE]/50 line-through decoration-[#7D5683]">${Math.round(enterprisePrice.monthly * 1.3)}</span>
                    <div className="bg-[#6A53FF]/20 text-[#B5C7FF] font-medium text-xs rounded-full px-3 py-1">
                      AHORRA 30%
                    </div>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-[#B5C7FF]">${enterprisePrice.monthly}</span>
                    {paymentPlan !== "contado" && (
                      <span className="text-[#DADFFE]/70 mb-1">MXN/mes</span>
                    )}
                  </div>
                </div>
                <button className="w-full py-3 px-4 bg-[#7D5683] text-white font-medium rounded-lg hover:bg-[#7D5683]/90 transition-colors">
                  Comenzar
                </button>
                {paymentPlan !== "contado" ? (
                  <p className="text-center text-sm mt-2 text-[#B5C7FF]">
                    Total: ${enterprisePrice.total} MXN (En {enterprisePrice.months} pagos)
                  </p>
                ) : (
                  <p className="text-center text-sm mt-2 text-[#B5C7FF]">
                    Pago único de ${enterprisePrice.total} MXN
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
                answer="¡Por supuesto! Puedes actualizar tu paquete en cualquier momento a medida que tu negocio crece. Calcularemos la diferencia prorrateada y la aplicaremos a tu nuevo plan sin complicaciones."
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

        <Footer/>
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

