"use client"

import { useState } from "react"
import Image from "next/image"
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

import { useEffect, useRef} from "react"
import Link from "next/link"
import { Menu, X} from "lucide-react"

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
function Navbar() {
  // Initialize showFullMenu as true so the full logo shows on page load
  const [isScrolled, setIsScrolled] = useState(false)
  const [showFullMenu, setShowFullMenu] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY.current) {
        setShowFullMenu(false)
      } else {
        setShowFullMenu(true)
      }

      setIsScrolled(currentScrollY > 20)

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true
    })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
      <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
              isScrolled ? "bg-[#0D0923]/90 backdrop-blur-sm shadow-lg" : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - improved transition between full logo and isotipo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="relative h-10 w-auto overflow-hidden">
                  {/* Full logo */}
                  <div className={`transition-all duration-300 ${
                      showFullMenu ? "opacity-100 relative" : "opacity-0 absolute pointer-events-none"
                  }`}>
                    <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NS-Marca%20oficial_blanco-3HrsmBrLXqfzV9vyLY30gu2JHLA33b.png"
                        alt="Nightly Software"
                        width={300}
                        height={100}
                        className="h-10 w-auto"
                    />
                  </div>

                  {/* Isotipo */}
                  <div className={`transition-all duration-300 ${
                      showFullMenu ? "opacity-0 absolute pointer-events-none" : "opacity-100 relative"
                  }`}>
                    <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NS-Isotipo_blanco-g1yVsmA9mL5ufhgw3XyHqT5gIIX6ie.png"
                        alt="Nightly Software Icon"
                        width={50}
                        height={50}
                        className="h-10 w-auto"
                    />
                  </div>
                </div>
              </Link>
            </div>

            {/* Rest of the component remains the same */}
            <div
                className={`hidden md:flex items-center space-x-8 transition-opacity duration-300 ${
                    showFullMenu ? "opacity-100" : "opacity-0"
                }`}
            >
              <Link href="#" className="text-[#DADFFE] hover:text-[#B5C7FF] font-medium transition-colors">
                Inicio
              </Link>
              <Link href="#" className="text-[#DADFFE] hover:text-[#B5C7FF] font-medium transition-colors">
                Servicios
              </Link>
              <Link href="#" className="text-[#DADFFE] hover:text-[#B5C7FF] font-medium transition-colors">
                Precios
              </Link>
              <Link href="#" className="text-[#DADFFE] hover:text-[#B5C7FF] font-medium transition-colors">
                Portafolio
              </Link>
              <Link href="#" className="text-[#DADFFE] hover:text-[#B5C7FF] font-medium transition-colors">
                Contacto
              </Link>
            </div>

            <div
                className={`hidden md:block transition-opacity duration-300 ${showFullMenu ? "opacity-100" : "opacity-0"}`}
            >
              <button className="py-2 px-4 bg-[#7D5683] text-white font-medium rounded-lg hover:bg-[#7D5683]/90 transition-colors">
                Cotizar Proyecto
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#DADFFE] p-2">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          <div
              className={`md:hidden transition-all duration-300 overflow-hidden ${
                  isMobileMenuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
              }`}
          >
            <div className="flex flex-col space-y-4">
              <Link href="#" className="text-[#DADFFE] hover:text-[#B5C7FF] font-medium transition-colors">
                Inicio
              </Link>
              <Link href="#" className="text-[#DADFFE] hover:text-[#B5C7FF] font-medium transition-colors">
                Servicios
              </Link>
              <Link href="#" className="text-[#DADFFE] hover:text-[#B5C7FF] font-medium transition-colors">
                Precios
              </Link>
              <Link href="#" className="text-[#DADFFE] hover:text-[#B5C7FF] font-medium transition-colors">
                Portafolio
              </Link>
              <Link href="#" className="text-[#DADFFE] hover:text-[#B5C7FF] font-medium transition-colors">
                Contacto
              </Link>
              <button className="py-2 px-4 bg-[#7D5683] text-white font-medium rounded-lg hover:bg-[#7D5683]/90 transition-colors w-full">
                Cotizar Proyecto
              </button>
            </div>
          </div>
        </div>
      </nav>
  )
}

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

        {/* Footer */}
        <footer className="bg-[#0D0923] py-12 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <div className="flex flex-col items-center">
                  <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NS-Isotipo_blanco-g1yVsmA9mL5ufhgw3XyHqT5gIIX6ie.png"
                      alt="Nightly Software Icon"
                      width={50}
                      height={50}
                      className="h-12 w-auto mb-2"
                  />
                  <div className="flex items-center gap-3 mt-2">
                    <div className="h-[1px] w-10 bg-[#7D5683]/50"></div>
                    <p className="text-[#DADFFE]/70 text-sm">De noche, creamos el mañana</p>
                    <div className="h-[1px] w-10 bg-[#7D5683]/50"></div>
                  </div>
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

            {/* Social Media Links */}
            <div className="flex justify-start gap-6 mt-8">
              <a href="https://www.instagram.com/nightlysoftware/" className="text-[#DADFFE] hover:text-[#B5C7FF] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/></svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://www.facebook.com/nightlysoftware" className="text-[#DADFFE] hover:text-[#B5C7FF] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02"/></svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://x.com/NightlySoftware" className="text-[#DADFFE] hover:text-[#B5C7FF] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.2 4.2 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.52 8.52 0 0 1-5.33 1.84q-.51 0-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23"/></svg>
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://www.linkedin.com/company/nightlysoftware/" className="text-[#DADFFE] hover:text-[#B5C7FF] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"/></svg>
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://github.com/NightlySoftware" className="text-[#DADFFE] hover:text-[#B5C7FF] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>
                <span className="sr-only">GitHub</span>
              </a>
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

