"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import dynamic from 'next/dynamic'

// Importamos el nuevo componente con carga dinámica para evitar problemas de SSR
const MoonSplineScene = dynamic(() => import('@/components/MoonSplineScene'), { ssr: false })

export default function SplineHero() {
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

  // Calculate opacity for arrow (fade out faster)
  const transitionPoint = getHeroHeight() * 0.3
  const arrowOpacity = Math.max(0, 1 - (scrollY / (transitionPoint * 0.7)))
  
  return (
    <div
      ref={heroRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Usamos el nuevo componente MoonSplineScene */}
      <MoonSplineScene scrollY={scrollY} heroHeight={getHeroHeight()} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Transformamos <span className="text-[#B5C7FF]">ideas</span> en soluciones digitales
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-[#DADFFE] md:text-2xl">
            En Nightly Software, llevamos tu visión al siguiente nivel con desarrollo web y soluciones tecnológicas innovadoras
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button
              variant="default"
              size="lg"
              className="bg-[#B5C7FF] text-black hover:bg-[#9DB0FF]"
            >
              Nuestros servicios
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#DADFFE] text-[#DADFFE] hover:bg-[#DADFFE]/10"
            >
              Conoce más
            </Button>
          </div>
        </div>
        
        {/* Down Arrow - Fades out on scroll */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          style={{ opacity: arrowOpacity, transition: 'opacity 0.2s ease-out' }}
        >
          <svg 
            ref={arrowRef}
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#DADFFE" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="animate-bounce"
          >
            <path d="M7 13l5 5 5-5"></path>
            <path d="M7 7l5 5 5-5"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}
