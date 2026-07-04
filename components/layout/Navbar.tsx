"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import site from "@/data/site.json";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

/**
 * Navbar — floating glass bar that condenses on scroll.
 * Mobile: full-screen luxury overlay menu.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10 ${
            scrolled
              ? "rounded-none border-b border-white/5 bg-royal-950/70 py-3 backdrop-blur-xl"
              : ""
          }`}
        >
          {/* MW monogram */}
          <a href="#top" className="group flex items-center gap-3" aria-label="Back to top">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-gold-500/50 font-display text-lg font-bold text-gold-400 shadow-gold-glow transition-transform duration-300 group-hover:rotate-[360deg]">
              {site.initials}
            </span>
            <span className="hidden font-display text-lg tracking-wide text-cream sm:block">
              {site.name.split(" ")[1]}
            </span>
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-sm font-medium tracking-wide text-mist transition-colors hover:text-cream"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold-gradient transition-all duration-400 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <MagneticButton href={site.bookCallUrl} className="btn-gold !px-6 !py-3 text-sm">
              Book a Call
            </MagneticButton>
          </div>

          {/* mobile burger */}
          <button
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span
                className={`block h-px w-5 bg-gold-400 transition-transform ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-gold-400 transition-transform ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center gap-8 bg-royal-950/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            animate={{ opacity: 1, clipPath: "circle(140% at 92% 6%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl text-cream transition-colors hover:text-gold-400"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href={site.bookCallUrl}
              className="btn-gold mt-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              onClick={() => setOpen(false)}
            >
              Book a Call
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
