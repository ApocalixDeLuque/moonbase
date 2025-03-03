"use client"

import { motion } from "framer-motion"

interface LoadingMoonProps {
  size?: number
  color?: string
}

export default function LoadingMoon({ size = 40, color = "currentColor" }: LoadingMoonProps) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
      >
        <defs>
          <radialGradient id="moonSurface" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="85%" stopColor={color} stopOpacity="1" />
            <stop offset="95%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.8" />
          </radialGradient>
          
          <mask id="moonMask">
            <rect x="0" y="0" width="100" height="100" fill="white" />
            <motion.circle
              cx="40"
              cy="50"
              r="40"
              initial={{ cx: 55 }}
              animate={{ cx: 140 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "loop"
              }}
              fill="black"
            />
          </mask>
        </defs>
        
        {/* Luna con cráteres */}
        <circle cx="50" cy="50" r="40" fill="url(#moonSurface)" mask="url(#moonMask)" />
        
        {/* Cráteres lunares */}
        <circle cx="35" cy="35" r="5" fill="rgba(0,0,0,0.2)" mask="url(#moonMask)" />
        <circle cx="60" cy="40" r="7" fill="rgba(0,0,0,0.15)" mask="url(#moonMask)" />
        <circle cx="30" cy="60" r="6" fill="rgba(0,0,0,0.18)" mask="url(#moonMask)" />
        <circle cx="65" cy="65" r="4" fill="rgba(0,0,0,0.2)" mask="url(#moonMask)" />
        <circle cx="50" cy="30" r="3" fill="rgba(0,0,0,0.15)" mask="url(#moonMask)" />
        <circle cx="45" cy="70" r="8" fill="rgba(0,0,0,0.12)" mask="url(#moonMask)" />
        <circle cx="75" cy="55" r="5" fill="rgba(0,0,0,0.17)" mask="url(#moonMask)" />
      </svg>
    </div>
  )
} 