"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/Icons";

/** Glowing gold scroll-to-top button that appears after the first viewport. */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#top"
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-[65] grid h-12 w-12 place-items-center rounded-full border border-gold-500/40 bg-royal-900/70 text-gold-400 backdrop-blur-md animate-pulse-glow"
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          whileHover={{ scale: 1.12 }}
        >
          <Icon name="arrowUp" className="h-5 w-5" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
