import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle, Mail } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f23]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-[#B5C7FF]/10 to-[#DADFFE]/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-xl text-[#DADFFE] mb-8 leading-relaxed max-w-3xl mx-auto">
            En Nightly Software transformamos desafíos empresariales en oportunidades digitales. 
            Somos una empresa tecnológica mexicana especializada en crear soluciones digitales a medida.
          </p>
          
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-2xl font-bold text-[#B5C7FF] mb-4">
              ¿Qué nos distingue?
            </h3>
            <p className="text-[#DADFFE] leading-relaxed">
              No solo construimos sitios web o aplicaciones - creamos ecosistemas digitales integrales 
              diseñados para el crecimiento. Nuestro enfoque comienza con un diseño centrado en el ser humano, 
              y cada solución es elaborada desde cero por expertos en software que entienden no solo lo que 
              quieres, sino lo que tu negocio realmente necesita.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-2">Para Startups</h4>
              <p className="text-[#DADFFE] text-sm">
                Establece tu presencia digital desde el principio con soluciones escalables
              </p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-2">Para Empresas</h4>
              <p className="text-[#DADFFE] text-sm">
                Transforma digitalmente tu operación con tecnología de vanguardia
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-[#B5C7FF] text-black hover:bg-[#9DB0FF] shadow-2xl backdrop-blur-sm border border-white/20 font-semibold text-lg px-8 py-3"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Comencemos tu proyecto
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10 backdrop-blur-sm shadow-xl font-semibold text-lg px-8 py-3"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contacta con nosotros
            </Button>
          </div>

          <p className="text-sm text-[#DADFFE]/70 mt-6">
            Con nuestro historial comprobado en e-commerce, automatización empresarial e integración de IA, 
            no solo actualizamos negocios a la era digital - los posicionamos para liderar en ella.
          </p>
        </div>
      </div>
    </section>
  )
} 