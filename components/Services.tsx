import { Code, Smartphone, Zap, Bot, Database, ShoppingCart } from "lucide-react"
import TiltedCard from "./tilted-card"
import AnimateOnScroll from "./AnimateOnScroll"

export default function Services() {
  const services = [
    {
      icon: Code,
      title: "Desarrollo Web Profesional",
      description: "Creamos sitios y aplicaciones web robustas, escalables y de alto rendimiento optimizadas para la conversión.",
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce de Alto Impacto",
      description: "Construimos tiendas online diseñadas para vender, con catálogos dinámicos y pasarelas de pago seguras.",
    },
    {
      icon: Zap,
      title: "Automatización de Procesos",
      description: "Optimizamos tus operaciones implementando soluciones de software que aumentan la eficiencia y ahorran tiempo.",
    },
    {
      icon: Bot,
      title: "Asistentes con IA",
      description: "Implementamos chatbots inteligentes que ofrecen soporte 24/7, mejorando la satisfacción de tus clientes.",
    },
    {
      icon: Database,
      title: "Sistemas de Gestión a Medida",
      description: "Centraliza la información crítica de tu negocio con sistemas a medida para gestionar clientes, ventas e inventario.",
    },
    {
      icon: Smartphone,
      title: "Diseño UI/UX Estratégico",
      description: "Diseñamos interfaces y experiencias de usuario que cautivan, convierten y generan lealtad a tu marca.",
    },
  ]

  const transparentPixel = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#16213e] to-[#1a1a2e]">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <div className="inline-block bg-[#B5C7FF]/10 backdrop-blur-sm border border-[#B5C7FF]/20 rounded-full px-4 py-2 mb-6">
            <span className="text-[#B5C7FF] text-sm font-medium">Nuestros Servicios</span>
          </div>
          <h2 className="text-3xl tracking-tighter md:text-4xl font-bold text-white mb-6">
            ¿Qué podemos hacer por tu empresa?
          </h2>
          <p className="text-xl text-[#DADFFE] max-w-3xl mx-auto">
            Te ayudamos a digitalizar tu negocio con soluciones que realmente funcionan y generan resultados
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <TiltedCard
              key={index}
              imageSrc={transparentPixel}
              altText={service.title}
              captionText={service.title}
              containerHeight="360px"
              imageHeight="100%"
              imageWidth="100%"
              displayOverlayContent={true}
              overlayContent={
                <div 
                  className="flex flex-col group bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 h-full overflow-hidden"
                  style={{
                    backgroundImage: `url(/backgrounds/nightly_background.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="mb-6">
                    <div className="inline-block p-3 bg-[#B5C7FF]/20 rounded-lg mb-4">
                      <service.icon className="w-6 h-6 text-[#B5C7FF]" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed text-base flex-grow">
                    {service.description}
                  </p>
                </div>
              }
            />
          ))}
        </AnimateOnScroll>
      </div>
    </section>
  )
} 