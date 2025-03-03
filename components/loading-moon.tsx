"use client"

import { motion } from "framer-motion"

interface LoadingMoonProps {
  size?: number
  color?: string
}

export default function LoadingMoon({ size = 40, color = "currentColor" }: LoadingMoonProps) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Círculo base negro */}
      <svg
        viewBox="0 0 24 24"
        fill="var(--background)"
        className="w-full h-full"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>

      {/* Luna que se llena */}
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full"
        >
          <clipPath id="moon-clip">
            <motion.rect
              x="0"
              y="0"
              width="24"
              height="24"
              initial={{ x: -24 }}
              animate={{ x: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </clipPath>
          <circle
            cx="12"
            cy="12"
            r="10"
            fill={color}
            clipPath="url(#moon-clip)"
          />
        </svg>
      </div>
    </div>
  )
} 