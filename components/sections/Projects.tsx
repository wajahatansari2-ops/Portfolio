"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import VideoModal from "@/components/ui/VideoModal";
import { Icon } from "@/components/ui/Icons";
import data from "@/data/projects.json";

/**
 * Projects — premium 3D-tilt cards with hover zoom, reflection & glow.
 *
 * ➜ HOW TO ADD A PROJECT / DEMO VIDEO:
 *   1. Open data/projects.json and copy an existing entry.
 *   2. Thumbnail  → drop image into /public/thumbnails/, set "thumbnail".
 *   3. Demo video → drop MP4 into /public/videos/, set "video".
 *      (Leave "video", "liveUrl" or "sourceUrl" as "" to hide that button.)
 */
export default function Projects() {
  const [active, setActive] = useState<{ src: string; title: string; poster?: string } | null>(
    null
  );

  return (
    <section id="projects" className="section-shell">
      <div className="aurora-blob left-[-10%] top-[20%] h-[34rem] w-[34rem] bg-royal-500/18" />

      <SectionHeading
        kicker="Selected Work"
        title="Projects That Print Results"
        goldWord="Results"
        lede="Real automation systems shipped for real estate teams — each one measured in hours saved and deals closed."
      />

      <div className="grid gap-9 md:grid-cols-2">
        {data.projects.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 0.12}>
            <TiltCard className="group h-full" maxTilt={6}>
              <article className="glass-gold flex h-full flex-col overflow-hidden !rounded-3xl">
                {/* thumbnail with hover zoom + play affordance */}
                <div className="relative aspect-video overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-950/80 via-transparent to-transparent" />
                  {p.video && (
                    <button
                      onClick={() => setActive({ src: p.video, title: p.title, poster: p.thumbnail })}
                      aria-label={`Watch ${p.title} demo`}
                      className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    >
                      <span className="grid h-16 w-16 place-items-center rounded-full border border-gold-400/70 bg-royal-950/60 text-gold-300 backdrop-blur-md transition-transform duration-300 hover:scale-110 shadow-gold-glow">
                        <Icon name="play" className="h-6 w-6 translate-x-0.5" />
                      </span>
                    </button>
                  )}
                  {/* impact badge */}
                  <span className="absolute left-4 top-4 rounded-full border border-gold-500/40 bg-royal-950/70 px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-gold-300 backdrop-blur-md">
                    {p.highlight}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-2xl text-white transition-colors group-hover:text-gold-300">
                    {p.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{p.description}</p>

                  {/* tech tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-wide text-mist"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* action buttons — hidden automatically when URL is "" */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold !px-5 !py-2.5 text-xs"
                      >
                        <Icon name="external" className="h-3.5 w-3.5" /> Live Demo
                      </a>
                    )}
                    {p.video && (
                      <button
                        onClick={() =>
                          setActive({ src: p.video, title: p.title, poster: p.thumbnail })
                        }
                        className="btn-ghost !px-5 !py-2.5 text-xs"
                      >
                        <Icon name="play" className="h-3.5 w-3.5" /> Watch Video
                      </button>
                    )}
                    {p.sourceUrl && (
                      <a
                        href={p.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost !border-white/15 !px-5 !py-2.5 text-xs !text-mist hover:!text-gold-400"
                      >
                        <Icon name="code" className="h-3.5 w-3.5" /> Source Code
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <VideoModal video={active} onClose={() => setActive(null)} />
    </section>
  );
}
