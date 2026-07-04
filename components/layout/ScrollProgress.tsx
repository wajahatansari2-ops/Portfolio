"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gold progress line pinned to the very top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[70] h-[2.5px] origin-left bg-gold-gradient"
      style={{ scaleX, backgroundSize: "200% auto" }}
      aria-hidden
    />
  );
}
