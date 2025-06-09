import { Rocket, Users, Zap, Shield } from "lucide-react"
import SpotlightCard from "./spotlight-card"

export default function About() {
  const benefits = [
    {
      icon: Rocket,
      title: "Desarrollo Rápido",
      description: "Lanzamos tu proyecto en tiempo récord sin comprometer la calidad"
    },
    {
      icon: Users,
      title: "Centrado en el Usuario",
      description: "Diseñamos pensando en tus usuarios para máxima satisfacción"
    },
    {
      icon: Zap,
      title: "Tecnología Moderna",
      description: "Usamos las últimas herramientas para resultados superiores"
    },
    {
      icon: Shield,
      title: "100% Seguro",
      description: "Tu información y la de tus clientes siempre protegida"
    }
  ]

  return (
    <section className="py-20 px-4 bg-[#140E35]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#B5C7FF]/10 backdrop-blur-sm border border-[#B5C7FF]/20 rounded-full px-4 py-2 mb-6">
            <span className="text-[#B5C7FF] text-sm font-medium">¿Por qué elegirnos?</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Cómo ayudamos a que tu negocio triunfe
          </h2>
          <p className="text-xl text-[#DADFFE] max-w-3xl mx-auto">
            Transformamos desafíos empresariales en oportunidades digitales con soluciones personalizadas que realmente funcionan
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <SpotlightCard
              key={index}
              className="text-center p-6 backdrop-blur-sm !bg-black/10 !border-white/10"
              spotlightColor="rgba(181, 199, 255, 0.15)"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#B5C7FF]/20 to-[#B5C7FF]/10 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-6 h-6 text-[#B5C7FF]" />
              </div>
              <p className="text-lg text-start leading-tight font-bold text-white mb-3">{benefit.title}</p>
              <p className="text-[#DADFFE] text-xs text-start leading-relaxed">
                {benefit.description}
              </p>
            </SpotlightCard>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <p className="text-lg text-[#DADFFE] leading-relaxed">
              Especializados en crear soluciones digitales que transforman negocios y generan resultados reales.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
