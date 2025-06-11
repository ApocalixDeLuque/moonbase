"use client"

import { Button } from "@/components/ui/button"
import dynamic from 'next/dynamic'
import { useEffect, useState, useRef } from "react"

// Importación dinámica para evitar errores con SSR
const ThreeScene = dynamic(() => import('@/components/ThreeScene'), { ssr: false })

export default function StarryNightHero() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<SVGSVGElement>(null)
  
  // Calculate hero section height for transition effect
  const getHeroHeight = () => {
    return heroRef.current?.clientHeight || 0
  }

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate opacity values based on scroll position
  const transitionPoint = getHeroHeight() * 0.3 // Start transition at 30% of scroll through hero
  const transitionLength = getHeroHeight() * 0.3 // Complete transition over 30% of hero height
  
  // Calculate opacity for arrow (fade out faster)
  const arrowOpacity = Math.max(0, 1 - (scrollY / (transitionPoint * 0.7)))
  
  return (
    <div
      ref={heroRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Pass scroll position to ThreeScene */}
      <ThreeScene scrollY={scrollY} heroHeight={getHeroHeight()} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Transformamos <span className="text-[#B5C7FF]">ideas</span> en soluciones digitales
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-[#DADFFE] md:text-2xl">
            En Nightly Software, llevamos tu visión al siguiente nivel con desarrollo web y soluciones tecnológicas innovadoras
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button className="bg-[#7D5683] hover:bg-[#7D5683]/90 text-white" size="lg">
              Nuestros servicios
            </Button>
            <Button variant="outline" className="border-[#B5C7FF] text-[#B5C7FF] hover:bg-[#B5C7FF]/10" size="lg">
              Conoce más
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
          style={{ 
            opacity: arrowOpacity,
            transition: 'opacity 0.2s ease-out' 
          }}
        >
          <svg
            ref={arrowRef}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#DADFFE"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </div>
  )
}
