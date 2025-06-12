import React, { useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)"
}) => {
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false; // Disable effects on mobile (< 768px)
  
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (isMobile || !divRef.current || isFocused) return; // Disable on mobile

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    if (isMobile) return; // Disable on mobile
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    if (isMobile) return; // Disable on mobile
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    if (isMobile) return; // Disable on mobile
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    if (isMobile) return; // Disable on mobile
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onFocus={isMobile ? undefined : handleFocus}
      onBlur={isMobile ? undefined : handleBlur}
      onMouseEnter={isMobile ? undefined : handleMouseEnter}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
      className={`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-4 md:p-8 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;