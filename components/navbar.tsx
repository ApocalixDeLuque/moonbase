"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import ThemeSelector from "./theme-selector"

export default function Navbar() {
  // Initialize showFullMenu as true so the full logo shows on page load
  const [isScrolled, setIsScrolled] = useState(false)
  const [showFullMenu, setShowFullMenu] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const scrollTimer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY.current) {
        setShowFullMenu(false)
      } else {
        setShowFullMenu(true)
      }

      setIsScrolled(currentScrollY > 20)
      lastScrollY.current = currentScrollY

      // Clear the existing timer
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current)
      }

      // Set a new timer to show the full menu after 3 seconds of no scrolling
      scrollTimer.current = setTimeout(() => {
        setShowFullMenu(true)
      }, 20000)
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current)
      }
    }
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background-overlay/90 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - improved transition between full logo and isotipo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="relative h-10 w-auto overflow-hidden">
                {/* Full logo */}
                <div className={`flex items-center justify-center transition-all w-32 duration-300 ${
                  showFullMenu ? "opacity-100 relative" : "opacity-0 absolute pointer-events-none"
                }`}>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NS-Marca%20oficial_blanco-3HrsmBrLXqfzV9vyLY30gu2JHLA33b.png"
                    alt="Nightly Software"
                    width={300}
                    height={100}
                    className="h-10 w-auto"
                  />
                </div>

                {/* Isotipo */}
                <div className={`flex items-center justify-center transition-all w-32 duration-300 ${
                  showFullMenu ? "opacity-0 absolute pointer-events-none" : "opacity-100 relative"
                }`}>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NS-Isotipo_blanco-g1yVsmA9mL5ufhgw3XyHqT5gIIX6ie.png"
                    alt="Nightly Software Icon"
                    width={50}
                    height={50}
                    className="h-10 w-auto"
                  />
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div
            className={`hidden md:flex items-center space-x-8 transition-opacity duration-300 ${
              showFullMenu ? "opacity-100" : "opacity-0"
            }`}
          >
            <Link href="#" className="text-foreground hover:text-foreground-secondary font-medium transition-colors">
              Inicio
            </Link>
            <Link href="#" className="text-foreground hover:text-foreground-secondary font-medium transition-colors">
              Servicios
            </Link>
            <Link href="#" className="text-foreground hover:text-foreground-secondary font-medium transition-colors">
              Precios
            </Link>
            <Link href="#" className="text-foreground hover:text-foreground-secondary font-medium transition-colors">
              Portafolio
            </Link>
            <Link href="#" className="text-foreground hover:text-foreground-secondary font-medium transition-colors">
              Contacto
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div
              className={`hidden md:block transition-opacity duration-300 ${showFullMenu ? "opacity-100" : "opacity-0"}`}
            >
              <button className="py-2 px-4 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors">
                Cotizar Proyecto
              </button>
            </div>

            {/* Theme Selector */}
            <div className={`transition-opacity duration-300 ${showFullMenu ? "opacity-100" : "opacity-0"}`}>
              <ThemeSelector />
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-foreground p-2">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-4">
            <Link href="#" className="text-foreground hover:text-foreground-secondary font-medium transition-colors">
              Inicio
            </Link>
            <Link href="#" className="text-foreground hover:text-foreground-secondary font-medium transition-colors">
              Servicios
            </Link>
            <Link href="#" className="text-foreground hover:text-foreground-secondary font-medium transition-colors">
              Precios
            </Link>
            <Link href="#" className="text-foreground hover:text-foreground-secondary font-medium transition-colors">
              Portafolio
            </Link>
            <Link href="#" className="text-foreground hover:text-foreground-secondary font-medium transition-colors">
              Contacto
            </Link>
            <button className="py-2 px-4 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors w-full">
              Cotizar Proyecto
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 