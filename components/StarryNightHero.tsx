"use client"

import { Button } from "@/components/ui/button"
import dynamic from 'next/dynamic'

// Importación dinámica para evitar errores con SSR
const ThreeScene = dynamic(() => import('@/components/ThreeScene'), { ssr: false })

export default function StarryNightHero() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
    >
      {/* La escena 3D reemplaza al canvas */}
      <ThreeScene />

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
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0D0923] to-transparent" />

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
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
