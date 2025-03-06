"use client"
import { useState, useRef, useEffect } from "react"
import { Mail, Phone } from "lucide-react"

export default function ContactButton() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="py-3 px-8 bg-[#7D5683] text-white font-medium rounded-lg hover:bg-[#7D5683]/90 transition-colors"
      >
        Contáctanos
      </button>

      {isOpen && (
        <div className="absolute mt-2 left-1/2 -translate-x-1/2 w-60 rounded-lg shadow-lg bg-[#1A1A1A] border border-[#7D5683]/30 z-10">
          <a
            href="https://wa.me/+524621111154?text=Hola%20Nightly%20Software,%20estoy%20interesado%20en%20sus%20servicios"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 hover:bg-[#7D5683]/10 transition-colors text-[#DADFFE]"
          >
            <Phone className="h-5 w-5 text-[#7D5683]" />
            <span>WhatsApp</span>
          </a>
          <a
            href="mailto:team@nightly.software?subject=Contacto%20desde%20la%20web"
            className="flex items-center gap-2 px-4 py-3 hover:bg-[#7D5683]/10 transition-colors text-[#DADFFE]"
          >
            <Mail className="h-5 w-5 text-[#7D5683]" />
            <span>Correo electrónico</span>
          </a>
        </div>
      )}
    </div>
  )
}
