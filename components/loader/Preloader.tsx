"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import site from "@/data/site.json";

/**
 * Preloader — cinematic entrance:
 * neural-particle canvas, MW monogram stroke-draw, expanding gold lines
 * and a 0→100% counter, then a curtain reveal into the site.
 */
export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ── Progress counter: eases toward 100 like real asset loading ── */
  useEffect(() => {
    let value = 0;
    const tick = () => {
      // fast at first, slows near the end — feels like genuine loading
      value += (100 - value) * 0.045 + 0.25;
      if (value >= 100) {
        setProgress(100);
        setTimeout(() => setDone(true), 450);
        setTimeout(onComplete, 1350);
        return;
      }
      setProgress(Math.floor(value));
      requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  /* ── Neural network canvas: drifting gold nodes with proximity links ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const N = Math.min(70, Math.floor(w / 22));
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.8 + 0.6,
    }));

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(217,184,92,0.75)";
        ctx.fill();
      }
      // connections
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(217,184,92,${0.16 * (1 - d / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-royal-950"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* curtain panels that slide away on completion */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-royal-950"
        animate={done ? { y: "-100%" } : {}}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-royal-950"
        animate={done ? { y: "100%" } : {}}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={done ? { opacity: 0, scale: 0.92, filter: "blur(8px)" } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* MW monogram — strokes draw themselves in gold */}
        <svg width="150" height="110" viewBox="0 0 150 110" fill="none" aria-label={site.initials}>
          <defs>
            <linearGradient id="goldStroke" x1="0" y1="0" x2="150" y2="110">
              <stop offset="0%" stopColor="#A67F33" />
              <stop offset="50%" stopColor="#F6E4B5" />
              <stop offset="100%" stopColor="#D9B85C" />
            </linearGradient>
          </defs>
          {/* M */}
          <motion.path
            d="M12 92 V22 L40 66 L68 22 V92"
            stroke="url(#goldStroke)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          {/* W */}
          <motion.path
            d="M82 22 L96 92 L114 42 L132 92 L146 22"
            stroke="url(#goldStroke)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut", delay: 0.35 }}
          />
        </svg>

        {/* expanding gold lines */}
        <div className="mt-8 flex w-64 items-center gap-4">
          <motion.div
            className="h-px flex-1 bg-gold-gradient"
            initial={{ scaleX: 0, transformOrigin: "right" }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.4 }}
          />
          <span className="font-display text-sm tracking-[0.4em] text-gold-400">
            {progress}%
          </span>
          <motion.div
            className="h-px flex-1 bg-gold-gradient"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.4 }}
          />
        </div>

        <motion.p
          className="mt-6 text-[11px] uppercase tracking-[0.5em] text-mist"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Initialising AI Systems
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
