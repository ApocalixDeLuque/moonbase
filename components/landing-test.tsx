"use client"

import Technologies from "@/components/technologies"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import StarryNightHero from "@/components/StarryNightHero"

export default function LandingPage() {
    return (
        <div>
            <Navbar />
            <StarryNightHero />
            <Technologies />
            <Footer />
        </div>
    )
}

