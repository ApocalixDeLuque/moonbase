'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import AnimateOnScroll from "./AnimateOnScroll";

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

  return (
    <section 
      className="py-16 bg-gradient-to-b from-[#140E35] to-[#16213e] overflow-hidden"
      style={{ '--bg-from': '#140E35', '--bg-to': '#16213e' } as React.CSSProperties}
    >
      <div className="max-w-6xl mx-auto px-4">
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-2xl tracking-tight md:text-3xl font-bold text-white mb-4">
            Aliados que confían en nosotros
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="relative flex overflow-hidden">
            <motion.div
              className="flex flex-none gap-16 pr-16"
              initial={{ x: "0" }}
              animate={{ x: "-50%" }}
              transition={{
                ease: 'linear',
                duration: 25,
                repeat: Infinity,
              }}
            >
              {[...new Array(2)].fill(0).map((_, index) => (
                <React.Fragment key={index}>
                  {logos.map((logo) => (
                    <Image
                      key={logo.alt}
                      src={logo.src}
                      alt={logo.alt}
                      width={158}
                      height={48}
                      className="h-12 w-auto flex-none"
                    />
                  ))}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
