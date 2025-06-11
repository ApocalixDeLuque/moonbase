import { Users, Zap, Shield, TrendingUp } from "lucide-react"
import CardSwap, { Card } from "./card-swap"

export default function Philosophy() {
  const principles = [
    {
      icon: Users,
      title: "Pensamos en Tus Clientes",
      description: "Diseñamos todo pensando en que sea fácil y agradable de usar para tus clientes."
    },
    {
      icon: Zap,
      title: "Resultados que Se Ven",
      description: "Creamos soluciones que no solo se ven bonitas, sino que realmente mejoran tu negocio."
    },
    {
      icon: Shield,
      title: "Seguridad Garantizada",
      description: "Tu información y la de tus clientes está siempre protegida con la mejor seguridad."
    },
    {
      icon: TrendingUp,
      title: "Crece con Tu Negocio",
      description: "Lo que construimos hoy funciona perfectamente cuando tu empresa sea 10 veces más grande."
    }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div className="text-left">
            <div className="inline-block bg-[#B5C7FF]/10 backdrop-blur-sm border border-[#B5C7FF]/20 rounded-full px-4 py-2 mb-6">
              <span className="text-[#B5C7FF] text-sm font-medium">Nuestra Metodología</span>
            </div>
            <h2 className="text-3xl tracking-tighter md:text-4xl font-bold text-white mb-6">
              Cómo trabajamos para garantizar tu éxito
            </h2>
            <p className="text-xl text-[#DADFFE] max-w-2xl leading-relaxed mb-8">
              Seguimos una metodología probada que garantiza resultados excepcionales en cada proyecto.
            </p>
            <p className="text-[#DADFFE]/80 max-w-2xl leading-relaxed">
              Nos centramos en una colaboración estrecha, entendiendo tus objetivos para aplicar un diseño iterativo y desarrollo ágil. Esto nos permite adaptarnos y responder con rapidez, asegurando que el producto final supere tus expectativas.
            </p>
          </div>

          <div className="relative h-[450px]">
            <CardSwap
              width={500}
              height={240}
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={true}
            >
              {principles.map((principle, index) => (
                <Card key={index} customClass="p-8 bg-slate-900/50 backdrop-blur-md border-[#B5C7FF]/20 rounded-2xl">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-[#B5C7FF]/20 rounded-lg flex-shrink-0">
                      <principle.icon className="w-6 h-6 text-[#B5C7FF]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{principle.title}</h3>
                      <p className="text-[#DADFFE] leading-relaxed">{principle.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#B5C7FF]/10 to-[#DADFFE]/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-2xl tracking-tighter md:text-3xl font-bold text-white mb-6">
              Nuestro Compromiso Contigo
            </h3>
            <p className="text-lg text-[#DADFFE] leading-relaxed max-w-4xl mx-auto">
              Te acompañamos desde la idea inicial hasta el lanzamiento y más allá. Mantenemos comunicación 
              clara en todo momento, te damos soporte continuo y actualizamos tu solución para que siempre 
              esté al día con las últimas tecnologías.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 