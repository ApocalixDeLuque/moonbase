import { Code, Smartphone, Zap, Bot, Database, ShoppingCart } from "lucide-react"

export default function Services() {
  const services = [
    {
      icon: Code,
      title: "Sitios Web Profesionales",
      description: "Páginas web modernas y rápidas que convierten visitantes en clientes y crecen con tu negocio.",
      features: ["Diseño profesional", "Adaptable a móviles", "Carga súper rápida"]
    },
    {
      icon: ShoppingCart,
      title: "Tiendas Online",
      description: "Vendé online las 24 horas con tiendas que son fáciles de usar para tus clientes.",
      features: ["Catálogo de productos", "Pagos seguros", "Panel de administración"]
    },
    {
      icon: Zap,
      title: "Automatización de Tareas",
      description: "Hacemos que tu negocio funcione solo: automatizamos tareas repetitivas para ahorrar tiempo.",
      features: ["Ahorro de tiempo", "Menos errores", "Más eficiencia"]
    },
    {
      icon: Bot,
      title: "Asistentes Inteligentes",
      description: "Chatbots que atienden a tus clientes automáticamente y mejoran tu servicio al cliente.",
      features: ["Atención 24/7", "Respuestas instantáneas", "Clientes más satisfechos"]
    },
    {
      icon: Database,
      title: "Sistemas de Gestión",
      description: "Organizá toda tu información en un solo lugar: clientes, ventas, inventario y más.",
      features: ["Todo organizado", "Acceso desde cualquier lugar", "Reportes automáticos"]
    },
    {
      icon: Smartphone,
      title: "Diseño que Vende",
      description: "Diseños atractivos y fáciles de usar que hacen que tus clientes quieran comprar.",
      features: ["Se ve en móviles", "Fácil de usar", "Más conversiones"]
    }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#16213e] to-[#1a1a2e]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#B5C7FF]/10 backdrop-blur-sm border border-[#B5C7FF]/20 rounded-full px-4 py-2 mb-6">
            <span className="text-[#B5C7FF] text-sm font-medium">Nuestros Servicios</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Qué podemos hacer por tu empresa?
          </h2>
          <p className="text-xl text-[#DADFFE] max-w-3xl mx-auto">
            Te ayudamos a digitalizar tu negocio con soluciones que realmente funcionan y generan resultados
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-black/30 transition-all duration-300 hover:border-[#B5C7FF]/30"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-[#B5C7FF]/20 rounded-lg mr-4 group-hover:bg-[#B5C7FF]/30 transition-colors">
                  <service.icon className="w-6 h-6 text-[#B5C7FF]" />
                </div>
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
              </div>
              
              <p className="text-[#DADFFE] mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-[#DADFFE] flex items-center">
                    <div className="w-2 h-2 bg-[#B5C7FF] rounded-full mr-3 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 