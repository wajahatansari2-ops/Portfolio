"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icons";
import site from "@/data/site.json";

const QUICK_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Videos", href: "#videos" },
  { label: "Contact", href: "#contact" },
];

/** Luxury footer — animated gold divider, quick links, social, copyright. */
export default function Footer() {
  return (
    <footer className="relative z-10 mt-8">
      {/* animated gold line sweeping across the top */}
      <div className="relative h-px w-full overflow-hidden">
        <div className="absolute inset-0 bg-gold-500/20" />
        <motion.div
          className="absolute inset-y-0 w-1/3 bg-gold-gradient"
          animate={{ x: ["-120%", "420%"] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-14 sm:px-10 md:flex-row md:justify-between">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-gold-500/50 font-display text-base font-bold text-gold-400">
            {site.initials}
          </span>
          <div>
            <p className="font-display text-cream">{site.name}</p>
            <p className="text-xs tracking-widest text-mist">{site.title.toUpperCase()}</p>
          </div>
        </a>

        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {QUICK_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-mist transition-colors hover:text-gold-400"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-4">
          {site.social.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              whileHover={{ y: -4, scale: 1.1 }}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-mist transition-colors hover:border-gold-500/60 hover:text-gold-400 hover:shadow-gold-glow"
            >
              <Icon name={s.icon} className="h-5 w-5" />
            </motion.a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 py-6 text-center text-xs tracking-wider text-mist/70">
        © {new Date().getFullYear()} {site.name} — AI Automation Consultant, Dubai. All rights
        reserved.
      </div>
    </footer>
  );
}
