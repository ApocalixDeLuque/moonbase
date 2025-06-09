import { Store, Briefcase, Factory, MapPin } from "lucide-react"

export default function Industries() {
  const industries = [
    {
      icon: Store,
      title: "Retail y E-commerce",
      description: "Plataformas de comercio electrónico robustas que impulsan las ventas en línea",
      examples: ["Tiendas en línea", "Sistemas de inventario", "Pasarelas de pago"]
    },
    {
      icon: Briefcase,
      title: "Servicios Profesionales",
      description: "Soluciones digitales para consultorías, bufetes y empresas de servicios",
      examples: ["Portales de clientes", "Sistemas de citas", "Automatización de procesos"]
    },
    {
      icon: Factory,
      title: "Manufactura",
      description: "Sistemas de gestión y control de producción para la industria manufacturera",
      examples: ["Control de producción", "Gestión de calidad", "Logística integrada"]
    },
    {
      icon: MapPin,
      title: "Negocios Locales",
      description: "Presencia digital sólida para empresas locales que buscan crecer",
      examples: ["Sitios web corporativos", "Sistemas de reservas", "Marketing digital"]
    }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#16213e] to-[#1a1a2e]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#B5C7FF]/10 backdrop-blur-sm border border-[#B5C7FF]/20 rounded-full px-4 py-2 mb-6">
            <span className="text-[#B5C7FF] text-sm font-medium">Sectores que Atendemos</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ayudamos empresas de todos los rubros
          </h2>
          <p className="text-xl text-[#DADFFE] max-w-3xl mx-auto">
            Tenemos experiencia trabajando con diferentes tipos de negocios y sabemos lo que cada uno necesita
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="group bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-black/30 transition-all duration-300 hover:border-[#B5C7FF]/30"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="p-4 bg-[#B5C7FF]/20 rounded-xl group-hover:bg-[#B5C7FF]/30 transition-colors flex-shrink-0">
                  <industry.icon className="w-8 h-8 text-[#B5C7FF]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">{industry.title}</h3>
                  <p className="text-[#DADFFE] leading-relaxed">{industry.description}</p>
                </div>
              </div>
              
              <div className="pl-20">
                <h4 className="text-lg font-semibold text-[#B5C7FF] mb-3">Soluciones Implementadas:</h4>
                <ul className="space-y-2">
                  {industry.examples.map((example, exampleIndex) => (
                    <li key={exampleIndex} className="text-[#DADFFE] flex items-center">
                      <div className="w-2 h-2 bg-[#B5C7FF] rounded-full mr-3 flex-shrink-0"></div>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#B5C7FF]/10 to-[#DADFFE]/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              ¿Tu Industria No Está Listada?
            </h3>
            <p className="text-lg text-[#DADFFE] leading-relaxed max-w-3xl mx-auto">
              No te preocupes. Nuestra experiencia en desarrollo personalizado nos permite 
              adaptarnos rápidamente a las necesidades específicas de cualquier sector. 
              Cada industria tiene sus propios desafíos, y nosotros tenemos las soluciones.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 