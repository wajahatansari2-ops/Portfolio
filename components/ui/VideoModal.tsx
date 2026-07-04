"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * VideoModal — elegant glass popup player.
 * Autoplay only starts once the user explicitly opened the modal;
 * ESC or backdrop click closes it.
 */
export default function VideoModal({
  video,
  onClose,
}: {
  video: { src: string; title: string; poster?: string } | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
        >
          {/* liquid-blur backdrop */}
          <div className="absolute inset-0 bg-royal-950/80 backdrop-blur-xl" />

          <motion.div
            className="glass relative w-full max-w-4xl overflow-hidden !rounded-3xl p-2 shadow-gold-glow-lg"
            initial={{ scale: 0.85, y: 60, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3">
              <h3 className="font-display text-lg text-gold-300">{video.title}</h3>
              <button
                onClick={onClose}
                aria-label="Close video"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-cream transition hover:border-gold-400 hover:text-gold-400"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M6.4 5L12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19 5 17.6 10.6 12 5 6.4 6.4 5z" />
                </svg>
              </button>
            </div>
            <video
              src={video.src}
              poster={video.poster}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full rounded-2xl bg-black"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
