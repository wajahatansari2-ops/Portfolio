"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { Icon } from "@/components/ui/Icons";
import data from "@/data/services.json";

/**
 * Services — 3D-tilting glass cards with gold glow.
 * ➜ Edit / add cards in data/services.json (icon keys live in ui/Icons.tsx).
 */
export default function Services() {
  return (
    <section id="services" className="section-shell">
      <div className="aurora-blob right-[-12%] top-[0%] h-[32rem] w-[32rem] bg-gold-600/8" />

      <SectionHeading
        kicker="Services"
        title="Intelligent Systems, Built to Order"
        goldWord="Intelligent Systems"
        lede="Every engagement is a bespoke automation system designed around how your business actually sells property."
      />

      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {data.services.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.1}>
            <TiltCard className="group h-full">
              <div className="glass-gold flex h-full flex-col p-8">
                <div
                  className="mb-6 grid h-14 w-14 place-items-center rounded-2xl border border-gold-500/30 bg-gold-500/10 text-gold-400 transition-all duration-500 group-hover:shadow-gold-glow group-hover:scale-110"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <Icon name={s.icon} className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl text-white transition-colors duration-300 group-hover:text-gold-300">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{s.description}</p>
                <div className="mt-6 h-px w-12 bg-gold-gradient opacity-40 transition-all duration-500 group-hover:w-full group-hover:opacity-90" />
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
