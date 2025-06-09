'use client';

import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

interface Logo {
  src: string;
  alt: string;
}

export default function ClientLogos() {
  const logos: Logo[] = [
    { src: "/logos/translate3d.png", alt: "Translate3D" },
    { src: "/logos/sumiplas.png", alt: "Sumiplas" },
    { src: "/logos/microsoft.png", alt: "Microsoft" },
    { src: "/logos/lando.png", alt: "Lando" },
    { src: "/logos/irapuato.png", alt: "Irapuato" },
    { src: "/logos/gudfud.png", alt: "Gudfud" },
    { src: "/logos/executive_engineers.png", alt: "Executive Engineers" },
    { src: "/logos/cleen.png", alt: "Cleen" },
    { src: "/logos/amazon.png", alt: "Amazon" },
  ];

  // Duplicate the logos for a seamless scroll effect
  const extendedLogos = [...logos, ...logos];

  return (
    <section className="py-16 bg-[#140E35] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Empresas que confían en nosotros
          </h2>
          <p className="text-[#DADFFE] max-w-2xl mx-auto">
            Hemos ayudado a empresas de todos los tamaños a transformar sus negocios digitalmente
          </p>
        </div>

        <div 
          className="w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
        >
          <div className="flex animate-logo-scroll">
            {extendedLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0 mx-8">
                <Image 
                  src={logo.src} 
                  alt={logo.alt} 
                  width={158} 
                  height={48} 
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes logo-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-logo-scroll {
          display: flex;
          animation: logo-scroll 40s linear infinite;
        }
        .animate-logo-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
} 