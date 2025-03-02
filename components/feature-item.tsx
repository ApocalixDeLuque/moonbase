import type React from "react"
import { Check, Minus } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"

interface FeatureItemProps {
  feature: string
  description: string
  included?: boolean
  value?: string
}

export default function FeatureItem({ feature, description, included = true, value }: FeatureItemProps) {
  // Function to safely get string value
  const safeString = (val: any): string => {
    if (typeof val !== 'string') return '';
    return val.replace(/\[object Object\]/g, '').trim();
  };
  
  // Function to render text with bold sections marked with **text**
  const renderBoldText = (text: string): React.ReactNode => {
    if (!text) return null;
    
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return (
      <>
        {parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
          }
          return <span key={index}>{part}</span>;
        })}
      </>
    );
  };
  
  // Handle special cases for feature display
  const getDisplayText = (): React.ReactNode => {
    const safeValue = safeString(value);
    
    // If no value, just return the feature name
    if (!safeValue) return feature;
    
    // Handle "Revisiones"
    if (feature === "Revisiones" && safeValue.includes("ronda")) {
      const num = safeValue.match(/\d+/)?.[0];
      return `${num} ${num === "1" ? "Revisión" : "Revisiones"}`;
    }
    
    // Handle "Informes Mensuales"
    if (feature === "Informes Mensuales") {
      return "Informes Mensuales";
    }
    
    // If dealing with bold text
    if (safeValue.includes("**")) {
      const parts = safeValue.split(/(\*\*.*?\*\*)/g);
      
      // If feature appears in value, only use the value
      if (safeValue.toLowerCase().includes(feature.toLowerCase())) {
        return (
          <>
            {parts.map((part, index) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
              }
              return <span key={index}>{part}</span>;
            })}
          </>
        );
      }
      
      // Otherwise combine feature with the value
      return (
        <>
          {feature}{' '}
          {parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return <span key={index}>{part}</span>;
          })}
        </>
      );
    }
    
    // Handle regular text
    if (safeValue.toLowerCase().includes(feature.toLowerCase())) {
      return safeValue;
    }
    
    // Default: feature + value
    return `${feature} ${safeValue}`;
  };

  return (
    <li className="flex gap-2 items-start group">
      {included ? (
        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
      ) : (
        <Minus className="w-5 h-5 text-[#DADFFE]/30 flex-shrink-0 mt-0.5" />
      )}
      {description ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className={`text-left border-b border-dashed border-[#7D5683]/60 hover:border-[#B5C7FF] ${
                included ? "text-[#DADFFE]" : "text-[#DADFFE]/50"
              }`}
            >
              {getDisplayText()}
            </button>
          </TooltipTrigger>
          <TooltipContent 
            side="bottom" 
            align="start" 
            sideOffset={10}
            className="bg-[#7D5683] text-white p-3 rounded-md max-w-[270px] text-sm z-50 !duration-0 !transform-none !transition-none !animate-none [&[data-state]]:!opacity-100 [&[data-state]]:!transform-none"
            style={{ 
              animation: 'none',
              transition: 'none'
            }}
          >
            {renderBoldText(description)}
          </TooltipContent>
        </Tooltip>
      ) : (
        <span className={`border-b border-dashed border-[#7D5683]/40 ${
          included ? "text-[#DADFFE]" : "text-[#DADFFE]/50"
        }`}>
          {getDisplayText()}
        </span>
      )}
    </li>
  )
}

export function FeatureList({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0} disableHoverableContent>
      <ul className="space-y-3">{children}</ul>
    </TooltipProvider>
  )
}

