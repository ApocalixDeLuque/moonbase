"use client"

import Technologies from "@/components/technologies"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SplineHero from "@/components/SplineHero"
import About from "@/components/About"
import Services from "@/components/Services"
import Philosophy from "@/components/Philosophy"
import Industries from "@/components/Industries"
import CTA from "@/components/CTA"
import ClientLogos from "@/components/ClientLogos"

export default function Landing2Page() {
  return (
    <div>
      <Navbar />
      <SplineHero />
      <About />
      <ClientLogos />
      <Services />
      <Philosophy />
      <Industries />
      {/* <Technologies /> */}
      <CTA />
      <Footer />
    </div>
  )
}
