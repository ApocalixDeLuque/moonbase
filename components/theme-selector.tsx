"use client"

import { useTheme } from "@/app/theme-provider"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.button
      aria-label="Toggle theme"
      className={cn(
        "w-14 h-7 rounded-full p-1 relative transition-colors duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent/50",
        theme === "midnight" ? "bg-background-secondary" : "bg-accent/20"
      )}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "midnight" ? "starlit" : "midnight")}
    >
      <motion.div
        animate={{ x: theme === "midnight" ? 28 : 0 }}
        className={cn(
          "w-5 h-5 rounded-full shadow-md transform transition-transform duration-500 ease-in-out flex items-center justify-center",
          theme === "midnight" 
            ? "translate-x-7 bg-background" 
            : "translate-x-0 bg-background-overlay"
        )}
        transition={{ type: "tween", duration: 0.001 }}
      >
        {theme === "midnight" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-foreground-secondary"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-foreground-secondary"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            <path d="M19 3v4" />
            <path d="M21 5h-4" />
            <path d="m15 9-2 2" />
          </svg>
        )}
      </motion.div>
    </motion.button>
  )
} 