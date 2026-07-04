"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import data from "@/data/techstack.json";

/**
 * TechStack — two counter-flowing infinite marquees of gold-medallion chips.
 * ➜ Edit the tools in data/techstack.json.
 */
function MarqueeRow({
  items,
  reverse = false,
}: {
  items: { name: string; abbr: string }[];
  reverse?: boolean;
}) {
  // duplicate list for a seamless -50% translate loop
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-3" data-cursor>
      <div
        className={`flex w-max gap-6 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} hover:[animation-play-state:paused]`}
      >
        {doubled.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className="glass flex items-center gap-4 !rounded-full py-3 pl-3 pr-7 transition-all duration-300 hover:border-gold-500/50 hover:shadow-gold-glow"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gold-gradient font-display text-sm font-bold text-royal-950">
              {t.abbr}
            </span>
            <span className="whitespace-nowrap text-sm font-medium tracking-wide text-cream">
              {t.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section id="stack" className="section-shell !max-w-none overflow-hidden !px-0">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading
          kicker="Tech Stack"
          title="Powered by a World-Class Toolkit"
          goldWord="World-Class"
        />
      </div>
      <Reveal variant="blur">
        <div className="space-y-2">
          <MarqueeRow items={data.rowOne} />
          <MarqueeRow items={data.rowTwo} reverse />
        </div>
      </Reveal>
    </section>
  );
}
