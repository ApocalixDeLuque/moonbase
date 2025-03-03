"use client"

import Link from "next/link"
import { useTheme } from "./theme-provider"

export default function NotFound() {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex items-center justify-center text-9xl font-bold text-accent mb-4">
          4
          <div className="relative w-[1em] h-[1em] mx-[-0.1em]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              {theme === "starlit" && (
                <>
                  <path d="M19 3v4" />
                  <path d="M21 5h-4" />
                  <path d="m15 9-2 2" />
                </>
              )}
            </svg>
          </div>
          4
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground-secondary mb-6">
          Página no encontrada
        </h2>
        <p className="text-foreground/70 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida a otra ubicación.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center justify-center py-3 px-6 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors"
        >
          Volver al inicio
        </Link>
        <div className="mt-12 flex items-center justify-center gap-3">
          <div className="h-[1px] w-10 bg-accent/50"></div>
          <p className="text-foreground/70 text-sm">De noche, creamos el mañana</p>
          <div className="h-[1px] w-10 bg-accent/50"></div>
        </div>
      </div>
    </div>
  )
} 