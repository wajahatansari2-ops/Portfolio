"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import VideoModal from "@/components/ui/VideoModal";
import { Icon } from "@/components/ui/Icons";
import data from "@/data/videos.json";

/**
 * VideoGallery — drag/scroll carousel of demo reels.
 * Hover = silent preview plays. Click = elegant popup player (no autoplay
 * until user opts in). ➜ Manage videos in data/videos.json.
 */
export default function VideoGallery() {
  const [active, setActive] = useState<{ src: string; title: string; poster?: string } | null>(
    null
  );
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) =>
    trackRef.current?.scrollBy({ left: dir * 420, behavior: "smooth" });

  return (
    <section id="videos" className="section-shell !max-w-none overflow-hidden !px-0">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading
          kicker="Video Showcase"
          title="Watch the Automations Work"
          goldWord="Work"
          lede="Short demo reels of live systems — hover to preview, click to watch in full."
        />
      </div>

      <Reveal variant="blur">
        <div className="relative">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-royal-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-royal-950 to-transparent" />

          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-7 overflow-x-auto px-[8vw] pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {data.videos.map((v, i) => (
              <motion.button
                key={v.id}
                onClick={() => setActive({ src: v.src, title: v.title, poster: v.poster })}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                whileHover={{ y: -8 }}
                className="group relative w-[78vw] max-w-md shrink-0 snap-center overflow-hidden rounded-3xl border border-white/10 text-left shadow-royal-depth transition-shadow duration-500 hover:border-gold-500/50 hover:shadow-gold-glow"
                aria-label={`Play ${v.title}`}
              >
                <div className="relative aspect-video">
                  {/* hover preview: muted inline playback */}
                  <video
                    src={v.src}
                    poster={v.poster}
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="h-full w-full object-cover"
                    onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-950/90 via-transparent to-transparent" />
                  <span className="absolute right-4 top-4 rounded-full bg-royal-950/70 px-3 py-1 text-[11px] font-medium text-gold-300 backdrop-blur-sm">
                    {v.duration}
                  </span>
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                    <p className="font-display text-lg text-cream">{v.title}</p>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold-400/60 bg-royal-950/60 text-gold-300 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                      <Icon name="play" className="h-4 w-4 translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* carousel arrows */}
          <div className="mt-2 flex justify-center gap-4">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => scrollBy(dir)}
                aria-label={dir === -1 ? "Previous videos" : "Next videos"}
                className="grid h-12 w-12 place-items-center rounded-full border border-gold-500/40 text-gold-400 transition hover:bg-gold-500/10 hover:shadow-gold-glow"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`h-5 w-5 ${dir === -1 ? "rotate-180" : ""}`}
                >
                  <path d="M9 5l7 7-7 7-1.4-1.4L13.2 12 7.6 6.4 9 5z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <VideoModal video={active} onClose={() => setActive(null)} />
    </section>
  );
}
