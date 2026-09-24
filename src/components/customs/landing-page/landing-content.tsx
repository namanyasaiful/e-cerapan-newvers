'use client';

import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/customs/landing-page/sections/hero";
import AboutSection from "@/components/customs/landing-page/sections/about-section";
import StepsSection from "@/components/customs/landing-page/sections/steps-section";
import ServiceSection from "@/components/customs/landing-page/sections/service-section";
import CtaSection from "@/components/customs/landing-page/sections/cta-section";
import Footer from "@/components/ui/Footer";

export default function LandingContent() {
    return (
        <main>
            <Navbar />
            <Hero />
            <AboutSection />
            <StepsSection />
            <ServiceSection />
            <CtaSection />
            <Footer />
        </main>
    );
}

