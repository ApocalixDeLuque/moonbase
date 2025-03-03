"use client"

import { Check, Minus } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"
import ReactMarkdown from "react-markdown"

interface FeatureItemProps {
  feature: string
  description: string
  included: boolean
  value?: string
}

export default function FeatureItem({ feature, description, included, value }: FeatureItemProps) {
  return (
    <div className="flex items-start gap-2 mb-4">
      {included ? (
        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
      ) : (
        <Minus className="w-5 h-5 text-foreground/30 flex-shrink-0 mt-0.5" />
      )}
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`text-left border-b border-dashed border-accent/60 hover:border-foreground-secondary ${
              included ? "text-foreground" : "text-foreground/50"
            }`}
          >
            <span className="cursor-help">
              {feature}
              {value && (
                <>
                  {": "}
                  <ReactMarkdown
                    components={{
                      strong: ({ children }) => (
                        <span className="font-semibold text-foreground-secondary">{children}</span>
                      ),
                    }}
                  >
                    {value}
                  </ReactMarkdown>
                </>
              )}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-accent text-accent-foreground p-3 rounded-md max-w-[270px] text-sm z-50 !duration-0 !transform-none !transition-none !animate-none [&[data-state]]:!opacity-100 [&[data-state]]:!transform-none"
        >
          <ReactMarkdown
            components={{
              strong: ({ children }) => (
                <span className={`border-b border-dashed border-accent/40 ${
                  included ? "text-foreground" : "text-foreground/50"
                }`}>
                  {children}
                </span>
              ),
            }}
          >
            {description}
          </ReactMarkdown>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

export function FeatureList({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0} disableHoverableContent>
      <ul className="space-y-3">{children}</ul>
    </TooltipProvider>
  )
}

