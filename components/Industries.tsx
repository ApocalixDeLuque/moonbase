import { Building, Dna, HeartPulse, LandPlot, Store, Factory } from "lucide-react"
import { useWindowSize } from "@uidotdev/usehooks"
import ChromaGrid from "./chroma-grid"

export default function Industries() {
  const { width } = useWindowSize()
  const isMobile = width ? width < 768 : false // Disable animations on mobile (< 768px)

  // Empty array - no mock data
  const industries = [
    {
      icon: Store,
      title: "Retail y E-commerce",
      description: "Soluciones de e-commerce y punto de venta para optimizar inventario, ventas y la experiencia de compra de tus clientes.",
      image: "https://images.unsplash.com/photo-1726607424623-6d9fee974241?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #1a1a2e)",
    },
    {
      icon: Building,
      title: "Servicios Profesionales",
      description: "Plataformas digitales para agencias, consultorías y firmas legales que mejoran la gestión de clientes y servicios.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #1a1a2e)",
    },
    {
      icon: Factory,
      title: "Manufactura",
      description: "Software de gestión para producción y logística. Aumenta la eficiencia y reduce costos operativos en plantas industriales.",
      image: "https://images.unsplash.com/photo-1581091212911-f4efc3f71c48?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      borderColor: "#F97316",
      gradient: "linear-gradient(145deg, #F97316, #1a1a2e)",
    },
    {
      icon: HeartPulse,
      title: "Salud y Bienestar",
      description: "Aplicaciones para clínicas y profesionales de la salud. Optimizamos la gestión de citas y la calidad de atención al paciente.",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2688&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      borderColor: "#6366F1",
      gradient: "linear-gradient(180deg, #6366F1, #1a1a2e)",
    },
    {
      icon: LandPlot,
      title: "Inmobiliaria",
      description: "Plataformas para la gestión de propiedades. Simplificamos la venta, alquiler y administración de tus bienes raíces.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      borderColor: "#EC4899",
      gradient: "linear-gradient(145deg, #EC4899, #1a1a2e)",
    },
    {
      icon: Dna,
      title: "Negocios Locales",
      description: "Soluciones digitales para negocios locales. Digitalizamos operaciones para restaurantes, salones y más, impulsando su crecimiento.",
      image: "https://images.unsplash.com/photo-1728044849221-851cf8587fac?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      borderColor: "#FBBF24",
      gradient: "linear-gradient(180deg, #FBBF24, #1a1a2e)",
    }
  ]

  const items = industries.map(industry => ({
    image: industry.image,
    title: industry.title,
    subtitle: industry.description,
    borderColor: industry.borderColor,
    gradient: industry.gradient,
    url: "#",
    Icon: industry.icon,
  }));

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#16213e] to-[#1a1a2e] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#B5C7FF]/10 backdrop-blur-sm border border-[#B5C7FF]/20 rounded-full px-4 py-2 mb-6">
            <span className="text-[#B5C7FF] text-sm font-medium">Industrias que Servimos</span>
          </div>
          <h2 className="text-3xl tracking-tighter md:text-4xl font-bold text-white mb-6">
            Soluciones a la medida de tu sector
          </h2>
          <p className="text-xl text-[#DADFFE] max-w-4xl mx-auto leading-relaxed">
            Hemos trabajado con una amplia gama de industrias, adaptando nuestras soluciones para satisfacer las necesidades específicas de cada una.
          </p>
        </div>

        {items.length > 0 ? (
          <ChromaGrid 
            items={items}
            radius={isMobile ? 0 : 350} // Disable radius effect on mobile
            damping={isMobile ? 0 : 0.4} // Disable damping animation on mobile
            fadeOut={isMobile ? 0 : 0.2} // Disable fade animation on mobile
            ease="power3.out"
          />
        ) : (
          <div className="text-center py-16">
            <p className="text-[#DADFFE]/70 text-lg">
              No hay datos de industrias disponibles en este momento.
            </p>
          </div>
        )}

      </div>
    </section>
  )
} 