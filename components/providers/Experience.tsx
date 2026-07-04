"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Preloader from "@/components/loader/Preloader";
import CustomCursor from "@/components/cursor/CustomCursor";
import ScrollProgress from "@/components/layout/ScrollProgress";
import ScrollToTop from "@/components/layout/ScrollToTop";

/* 3D neural background is client-only — never server-rendered */
const NeuralBackground = dynamic(
  () => import("@/components/background/NeuralBackground"),
  { ssr: false }
);

/**
 * Experience — the premium shell around the whole site.
 * Sequence: Preloader plays → site revealed → Lenis smooth scroll +
 * neural 3D background + custom cursor + scroll UI activate.
 */
export default function Experience({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  /* ── Lenis luxury smooth scrolling ── */
  useEffect(() => {
    if (loading) return;
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // silky ease-out
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    /* Anchor links scroll through Lenis for consistent easing */
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [loading]);

  /* Lock body scroll while the preloader plays */
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Living neural-network backdrop with mouse parallax */}
      <NeuralBackground />

      <CustomCursor />
      <ScrollProgress />
      <ScrollToTop />

      <div
        className={`transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"}`}
      >
        {children}
      </div>
    </>
  );
}
