"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Reveal — scroll-triggered entrance used everywhere for consistency.
 * Variants: "up" (default), "left", "right", "blur" (luxury blur-in), "scale".
 */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  once = true,
}: {
  children: React.ReactNode;
  variant?: "up" | "left" | "right" | "blur" | "scale";
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();

  const hidden = {
    up: { opacity: 0, y: 48 },
    left: { opacity: 0, x: -56 },
    right: { opacity: 0, x: 56 },
    blur: { opacity: 0, filter: "blur(14px)", y: 24 },
    scale: { opacity: 0, scale: 0.88 },
  }[variant];

  return (
    <motion.div
      className={className}
      initial={reduce ? false : hidden}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
