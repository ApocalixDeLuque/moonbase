"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "starlit" | "midnight"

interface ThemeProviderProps {
  children: React.ReactNode
}

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("starlit")

  useEffect(() => {
    // Recuperar el tema guardado del localStorage
    const savedTheme = localStorage.getItem("theme") as Theme
    if (savedTheme && (savedTheme === "starlit" || savedTheme === "midnight")) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    // Actualizar el atributo data-theme en el elemento root
    document.documentElement.setAttribute("data-theme", theme)
    // Guardar el tema en localStorage
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
} 