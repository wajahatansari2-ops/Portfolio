"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { Icon } from "@/components/ui/Icons";
import site from "@/data/site.json";

/* ── Typing effect cycling through specialities (from data/site.json) ── */
function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx % words.length];
    const speed = deleting ? 42 : 88;
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDeleting(true), 1700);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setWordIdx((i) => i + 1);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, words]);

  return text;
}

/* staggered word-by-word reveal for the huge name */
const nameContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } },
};
const nameWord = {
  hidden: { opacity: 0, y: 90, rotateX: -40 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const typed = useTypewriter(site.typingWords);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 text-center">
      {/* floating holographic glass panels (decorative 3D depth) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        <div className="glass absolute left-[7%] top-[24%] h-28 w-28 animate-float !rounded-3xl border-gold-500/20 opacity-70">
          <div className="grid h-full place-items-center text-gold-500/70">
            <Icon name="bot" className="h-10 w-10" />
          </div>
        </div>
        <div className="glass absolute right-[9%] top-[30%] h-24 w-24 animate-float-delay !rounded-3xl border-royal-400/30 opacity-70">
          <div className="grid h-full place-items-center text-royal-400/80">
            <Icon name="workflow" className="h-9 w-9" />
          </div>
        </div>
        <div
          className="glass absolute bottom-[22%] left-[14%] h-20 w-20 animate-float !rounded-2xl border-gold-500/20 opacity-60"
          style={{ animationDelay: "-3s" }}
        >
          <div className="grid h-full place-items-center text-gold-500/70">
            <Icon name="sparkles" className="h-8 w-8" />
          </div>
        </div>
        <div
          className="glass absolute bottom-[28%] right-[13%] h-24 w-24 animate-float-delay !rounded-3xl border-royal-400/30 opacity-60"
          style={{ animationDelay: "-5s" }}
        >
          <div className="grid h-full place-items-center text-royal-400/80">
            <Icon name="building" className="h-9 w-9" />
          </div>
        </div>
      </div>

      {/* location + availability badge */}
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="glass mb-8 flex max-w-[92vw] items-center gap-2.5 !rounded-full px-4 py-2.5 text-center text-xs text-mist sm:px-5 sm:text-sm"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold-500" />
        </span>
        Available for projects — {site.location}
      </motion.div>

      {/* the huge animated name */}
      <motion.h1
        variants={nameContainer}
        initial="hidden"
        animate="show"
        className="font-display text-[13vw] font-semibold leading-[0.95] text-white sm:text-7xl md:text-8xl lg:text-[6.5rem]"
        style={{ perspective: 800 }}
      >
        {site.name.split(" ").map((word, i) => (
          <motion.span
            key={word}
            variants={nameWord}
            className={`inline-block ${i === 1 ? "text-gold-shimmer" : ""}`}
          >
            {word}
            {i === 0 && <span className="inline-block w-[0.3em]" />}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="mt-5 text-xs font-medium uppercase tracking-[0.28em] text-mist sm:text-xl sm:tracking-[0.45em]"
      >
        {site.title}
      </motion.p>

      {/* typing speciality line */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.9 }}
        className="mt-6 flex min-h-[3rem] flex-wrap items-center justify-center px-2 font-display text-lg text-gold-300 sm:mt-8 sm:text-3xl"
        aria-live="polite"
      >
        <span className="mr-3 text-mist/70">I craft</span>
        <span className="min-w-[2ch]">{typed}</span>
        <span className="typing-caret" />
      </motion.div>

      {/* tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35, duration: 0.9 }}
        className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-mist sm:text-lg"
      >
        {site.tagline}
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.55, duration: 0.9 }}
        className="mt-11 flex flex-wrap items-center justify-center gap-5"
      >
        <MagneticButton href={site.bookCallUrl} className="btn-gold">
          <Icon name="phone" className="h-4 w-4" /> Book a Call
        </MagneticButton>
        <MagneticButton href="#projects" className="btn-ghost">
          View Projects
        </MagneticButton>
        <MagneticButton href={site.resumeUrl} download className="btn-ghost !border-white/15 !text-mist hover:!text-gold-400">
          Download Resume
        </MagneticButton>
      </motion.div>

      {/* scroll hint */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-gold-500/40 p-1.5">
          <motion.div
            className="h-2 w-1 rounded-full bg-gold-400"
            animate={{ y: [0, 18, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.a>
    </section>
  );
}
