"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

/* ── Edit the engagement process here ── */
const STEPS = [
  {
    num: "01",
    title: "Discover",
    body: "Deep-dive audit of your sales process, tools and bottlenecks to find the highest-ROI automation opportunities.",
  },
  {
    num: "02",
    title: "Design",
    body: "Blueprint of the automation architecture — every trigger, integration and AI decision mapped before a line is built.",
  },
  {
    num: "03",
    title: "Automate",
    body: "The system is built with production-grade AI agents, workflows and integrations, tested against real scenarios.",
  },
  {
    num: "04",
    title: "Deploy",
    body: "Seamless launch into your live operation with team training, monitoring and safety rails from day one.",
  },
  {
    num: "05",
    title: "Scale",
    body: "Continuous optimisation as volume grows — new channels, new agents, compounding time savings.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="section-shell">
      <div className="aurora-blob right-[-15%] top-[15%] h-[30rem] w-[30rem] bg-gold-600/8" />

      <SectionHeading
        kicker="The Process"
        title="From First Call to Full Autopilot"
        goldWord="Full Autopilot"
        lede="A proven five-step engagement that turns manual chaos into a measurable, self-running system."
      />

      <div ref={ref} className="relative">
        {/* connecting line: horizontal on desktop, vertical on mobile */}
        <div className="absolute left-6 top-0 h-full w-px bg-white/10 lg:left-0 lg:top-10 lg:h-px lg:w-full" />
        <motion.div
          className="absolute left-6 top-0 w-px origin-top bg-gold-gradient lg:left-0 lg:top-10 lg:h-px lg:w-full lg:origin-left"
          style={{ height: line }}
        />
        <motion.div
          className="absolute left-0 top-10 hidden h-px origin-left bg-gold-gradient lg:block"
          style={{ width: line }}
        />

        <div className="grid gap-12 pl-16 lg:grid-cols-5 lg:gap-6 lg:pl-0">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.12}>
              <div className="group relative lg:pt-20 lg:text-center">
                {/* numbered node */}
                <div className="absolute -left-16 top-0 lg:left-1/2 lg:-translate-x-1/2">
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-gold-500/50 bg-royal-900 font-display text-sm font-bold text-gold-400 shadow-gold-glow transition-transform duration-500 group-hover:scale-110 lg:h-[4.5rem] lg:w-[4.5rem] lg:text-base">
                    {s.num}
                  </div>
                </div>
                <h3 className="font-display text-2xl text-white transition-colors group-hover:text-gold-300">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
