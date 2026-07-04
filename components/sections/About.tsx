"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icons";

/* ── Edit the journey timeline here ── */
const TIMELINE = [
  {
    title: "The Problem I Solve",
    body: "Dubai real estate moves fast — but most agencies still run on manual follow-ups, copy-paste CRM entry and leads that go cold overnight. I remove that friction with AI.",
    icon: "target",
  },
  {
    title: "AI Agents & Chatbots",
    body: "I design autonomous AI agents that qualify enquiries, answer in Arabic & English, and book viewings — turning every channel into a 24/7 sales assistant.",
    icon: "bot",
  },
  {
    title: "Lead & CRM Automation",
    body: "Every lead captured, scored, routed and nurtured automatically. Full CRM integration means your pipeline stays immaculate without anyone typing a word.",
    icon: "database",
  },
  {
    title: "Workflow Optimization",
    body: "Using OpenAI APIs and no-code platforms like n8n, Make and Zapier, I connect your entire stack into one self-running machine — audited, monitored and built to scale.",
    icon: "workflow",
  },
];

export default function About() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="about" className="section-shell">
      <div className="aurora-blob left-[-15%] top-[10%] h-[30rem] w-[30rem] bg-royal-600/20" />

      <SectionHeading
        kicker="About Me"
        title="Automation With a Human Touch"
        goldWord="Human Touch"
        lede="I help Dubai real estate businesses automate repetitive work using AI — so their teams spend time on people, not paperwork."
      />

      <div className="relative mx-auto max-w-3xl" ref={lineRef}>
        {/* animated gold spine that draws as you scroll */}
        <div className="absolute bottom-4 left-6 top-4 w-px bg-white/10 sm:left-8" />
        <motion.div
          className="absolute bottom-4 left-6 top-4 w-px origin-top bg-gold-gradient sm:left-8"
          style={{ scaleY: lineScale }}
        />

        <div className="space-y-14">
          {TIMELINE.map((item, i) => (
            <Reveal key={item.title} variant={i % 2 ? "right" : "left"} delay={0.05}>
              <div className="group relative flex gap-7 pl-2 sm:gap-10">
                {/* node */}
                <div className="relative z-10 mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold-500/50 bg-royal-900 text-gold-400 shadow-gold-glow transition-transform duration-500 group-hover:scale-110 sm:h-12 sm:w-12">
                  <Icon name={item.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="glass-gold group flex-1 p-7">
                  <h3 className="font-display text-xl text-gold-300 sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-mist">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
