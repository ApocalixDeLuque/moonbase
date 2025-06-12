import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle, Mail, Sparkles, Zap, Star, Rocket, Search, Palette, Code, Rocket as RocketLaunch } from "lucide-react"
import { useWindowSize } from "@uidotdev/usehooks"
import Carousel from "./carrousel"

export default function CTA() {
  const { width } = useWindowSize()
  
  // Calculate responsive carousel width
  const getCarouselWidth = () => {
    if (!width) return 450 // Default fallback
    
    if (width < 640) { // sm breakpoint
      return Math.min(width - 32, 320) // Account for padding, max 320px
    } else if (width < 768) { // md breakpoint
      return Math.min(width - 64, 380) // Account for padding, max 380px
    } else if (width < 1024) { // lg breakpoint
      return Math.min(width - 96, 420) // Account for padding, max 420px
    }
    
    return 450 // Full size for larger screens
  }

  const processSteps = [
    {
      title: "Análisis y Descubrimiento",
      description: "Entendemos tu negocio, objetivos y desafíos únicos para crear la estrategia perfecta.",
      id: 1,
      icon: <Search className="h-[16px] w-[16px] text-white" />,
    },
    {
      title: "Diseño de Solución",
      description: "Creamos prototipos y diseños centrados en la experiencia de usuario y tus objetivos de negocio.",
      id: 2,
      icon: <Palette className="h-[16px] w-[16px] text-white" />,
    },
    {
      title: "Desarrollo Ágil",
      description: "Construimos tu solución con metodologías ágiles, manteniéndote informado en cada iteración.",
      id: 3,
      icon: <Code className="h-[16px] w-[16px] text-white" />,
    },
    {
      title: "Lanzamiento y Soporte",
      description: "Implementamos tu solución y proporcionamos soporte continuo para garantizar el éxito a largo plazo.",
      id: 4,
      icon: <RocketLaunch className="h-[16px] w-[16px] text-white" />,
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f23] relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Main split layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center lg:items-end mb-16">
          {/* Left side - Content */}
          <div className="text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#B5C7FF]/10 border border-[#B5C7FF]/20 rounded-full px-4 py-2">
              <Rocket className="w-4 h-4 text-[#B5C7FF]" />
              <span className="text-[#B5C7FF] text-sm font-medium">Impulsa tu negocio</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tighter">
              ¿Listo para{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-[#B5C7FF] to-[#DADFFE] bg-clip-text text-transparent">
                  transformar
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#B5C7FF] to-[#DADFFE]"></div>
              </span>{" "}
              tu negocio?
            </h2>
            
            <p className="text-lg text-[#DADFFE] leading-relaxed">
              En Nightly Software transformamos desafíos empresariales en oportunidades digitales. 
              Somos una empresa tecnológica mexicana especializada en crear soluciones digitales a medida.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="group bg-[#B5C7FF] text-black hover:bg-[#9DB0FF] shadow-lg font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-[#B5C7FF]/30"
                onClick={() => {
                  const message = "¡Hola! Me interesa iniciar un proyecto de desarrollo de software con Nightly Software. Me gustaría conocer más sobre sus servicios y cómo pueden ayudarme a transformar mi negocio digitalmente.";
                  const whatsappUrl = `https://wa.me/524621111154?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Comencemos tu proyecto
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/5 font-semibold px-8 py-3 rounded-xl"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contacta con nosotros
              </Button>
            </div>
          </div>

          {/* Right side - Process Carousel */}
          <div className="flex justify-center">
            <Carousel
              items={processSteps}
              baseWidth={getCarouselWidth()}
              autoplay={true}
              autoplayDelay={5000}
              pauseOnHover={true}
              loop={true}
              round={false}
            />
          </div>
        </div>

        {/* Bottom section - Redesigned cards */}
        <div className="bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-4 py-8 md:p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#B5C7FF] mb-3 flex items-center justify-center gap-2">
              <Zap className="w-6 h-6" />
              ¿Qué nos distingue?
            </h3>
            <p className="text-[#DADFFE] max-w-3xl mx-auto">
              No solo construimos sitios web o aplicaciones - creamos ecosistemas digitales integrales 
              diseñados para el crecimiento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#B5C7FF]/20 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-black/30 border border-white/10 rounded-xl p-4 md:p-6 hover:border-[#B5C7FF]/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#B5C7FF]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-[#B5C7FF]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Para Startups</h4>
                    <p className="text-[#DADFFE] text-sm leading-relaxed">
                      Establece tu presencia digital desde el principio con soluciones escalables
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#DADFFE]/20 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-black/30 border border-white/10 rounded-xl p-4 md:p-6 hover:border-[#DADFFE]/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#DADFFE]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-[#DADFFE]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Para Empresas</h4>
                    <p className="text-[#DADFFE] text-sm leading-relaxed">
                      Transforma digitalmente tu operación con tecnología de vanguardia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 pt-6 border-t border-white/10">
            <p className="text-[#DADFFE]/70 text-sm max-w-4xl mx-auto">
              Con nuestro historial comprobado en e-commerce, automatización empresarial e integración de IA, 
              no solo actualizamos negocios a la era digital - los posicionamos para liderar en ella.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 