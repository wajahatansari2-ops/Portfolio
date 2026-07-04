import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";
import Experience from "@/components/providers/Experience";

/* ── Below-the-fold sections are code-split & lazy-loaded for performance ── */
const About = dynamic(() => import("@/components/sections/About"));
const Services = dynamic(() => import("@/components/sections/Services"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const VideoGallery = dynamic(() => import("@/components/sections/VideoGallery"));
const TechStack = dynamic(() => import("@/components/sections/TechStack"));
const Process = dynamic(() => import("@/components/sections/Process"));
const Achievements = dynamic(() => import("@/components/sections/Achievements"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
const Footer = dynamic(() => import("@/components/layout/Footer"));

export default function Home() {
  return (
    /* Experience wraps the page with: Preloader → Lenis smooth scroll →
       neural 3D background → custom cursor → scroll progress + to-top button */
    <Experience>
      <Navbar />
      <main id="top" className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Projects />
        <VideoGallery />
        <TechStack />
        <Process />
        <Achievements />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </Experience>
  );
}
