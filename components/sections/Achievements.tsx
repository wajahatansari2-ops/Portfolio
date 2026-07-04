"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import data from "@/data/achievements.json";

/** Counts 0 → value with ease-out once the element scrolls into view. */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-gold-shimmer font-display text-5xl font-bold sm:text-6xl">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

/** ➜ Edit the numbers in data/achievements.json. */
export default function Achievements() {
  return (
    <section id="achievements" className="section-shell">
      <SectionHeading
        kicker="Track Record"
        title="Numbers That Speak Quietly"
        goldWord="Speak"
      />

      <Reveal variant="scale">
        <div className="glass-gold grid grid-cols-2 gap-y-12 !rounded-[2.5rem] px-8 py-14 text-center sm:grid-cols-3 lg:grid-cols-5">
          {data.achievements.map((a) => (
            <div key={a.label} className="flex flex-col items-center gap-3">
              <Counter value={a.value} suffix={a.suffix} />
              <span className="max-w-[10rem] text-xs uppercase tracking-[0.2em] text-mist">
                {a.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
