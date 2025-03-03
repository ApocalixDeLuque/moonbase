"use client"

import LoadingMoon from "@/components/loading-moon"

export default function LoadingTestPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <LoadingMoon size={60} color="hsl(var(--accent))" />
        <p className="text-foreground/70">Cargando...</p>
      </div>

      {/* Ejemplos de diferentes tamaños */}
      <div className="flex items-center gap-8 mt-12">
        <LoadingMoon size={24} color="hsl(var(--accent))" />
        <LoadingMoon size={40} color="hsl(var(--accent))" />
        <LoadingMoon size={80} color="hsl(var(--accent))" />
      </div>
    </div>
  )
} 