"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import data from "@/data/testimonials.json";

const AUTOPLAY_MS = 6000;

/**
 * Testimonials — 3D rotating glass slider with smooth autoplay.
 * ➜ Edit quotes in data/testimonials.json.
 */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = data.testimonials.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setIndex((i) => (i + dir + total) % total);
    },
    [total]
  );

  /* smooth autoplay, resets whenever the user navigates */
  useEffect(() => {
    const t = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [index, go]);

  const t = data.testimonials[index];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 120, rotateY: d * 28, scale: 0.92 }),
    center: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: d * -120, rotateY: d * -28, scale: 0.92 }),
  };

  return (
    <section id="testimonials" className="section-shell">
      <div className="aurora-blob left-[-12%] bottom-[0%] h-[28rem] w-[28rem] bg-royal-600/20" />

      <SectionHeading
        kicker="Testimonials"
        title="Trusted by Dubai's Best"
        goldWord="Dubai's Best"
      />

      <Reveal variant="blur">
        <div className="relative mx-auto max-w-3xl" style={{ perspective: 1200 }}>
          {/* oversized quote mark */}
          <span className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 font-display text-[10rem] leading-none text-gold-500/15 select-none">
            &ldquo;
          </span>

          <div className="relative min-h-[21rem] sm:min-h-[17rem]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.figure
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="glass-gold absolute inset-0 flex flex-col justify-between !rounded-3xl p-9 sm:p-12"
              >
                <blockquote className="font-display text-lg leading-relaxed text-cream sm:text-xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  {/* gold initial medallion */}
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-gradient font-display font-bold text-royal-950">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-mist">
                      {t.role} — {t.company}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* controls + dots */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-gold-500/40 text-gold-400 transition hover:bg-gold-500/10 hover:shadow-gold-glow"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 rotate-180">
                <path d="M9 5l7 7-7 7-1.4-1.4L13.2 12 7.6 6.4 9 5z" />
              </svg>
            </button>
            <div className="flex gap-2.5">
              {data.testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-400 ${
                    i === index ? "w-8 bg-gold-gradient" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-gold-500/40 text-gold-400 transition hover:bg-gold-500/10 hover:shadow-gold-glow"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M9 5l7 7-7 7-1.4-1.4L13.2 12 7.6 6.4 9 5z" />
              </svg>
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
