# Muhammad Wajahat — AI Automation Consultant Portfolio

A premium, luxury portfolio built with **Next.js 15, React 19, TailwindCSS, Framer Motion,
Three.js / React Three Fiber and Lenis smooth scroll** — royal blue × premium gold design
language, 3D neural-network background, custom magnetic cursor, cinematic preloader and
glassmorphism throughout.

## 🚀 Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve production build
```

## 🗂 Project structure

```
app/                     Next.js app router (layout = SEO, page = section order)
components/
  providers/Experience   Preloader → Lenis smooth scroll → background → cursor shell
  loader/Preloader       MW monogram, neural canvas, % counter, curtain reveal
  cursor/CustomCursor    Glowing ring + dot, magnetic hover
  background/            React Three Fiber neural-network + aurora blobs
  layout/                Navbar, Footer, ScrollProgress, ScrollToTop
  sections/              Hero, About, Services, Projects, VideoGallery,
                         TechStack, Process, Achievements, Testimonials, Contact
  ui/                    Icons, MagneticButton, Reveal, SectionHeading,
                         TiltCard, VideoModal
data/                    ✏️ ALL editable content (see below)
public/thumbnails/       Project & video poster images (1280×720)
public/videos/           MP4 demo videos
public/resume/           Resume PDF
```

## ✏️ Updating content (no code needed)

| What                        | File                     |
| --------------------------- | ------------------------ |
| Name, tagline, email, links, typing words | `data/site.json` |
| Services cards              | `data/services.json`     |
| **Projects** (thumbnails, videos, buttons) | `data/projects.json` |
| Video gallery               | `data/videos.json`       |
| Achievement counters        | `data/achievements.json` |
| Testimonials                | `data/testimonials.json` |
| Tech stack marquees         | `data/techstack.json`    |

### Add a project
1. Duplicate an entry in `data/projects.json`.
2. Put a 1280×720 image in `public/thumbnails/` → set `"thumbnail": "/thumbnails/x.jpg"`.
3. Put an MP4 in `public/videos/` → set `"video": "/videos/x.mp4"`.
4. Leave `"liveUrl"`, `"sourceUrl"` or `"video"` as `""` to hide those buttons.

### Add a demo video to the gallery
Drop the MP4 in `public/videos/`, a poster in `public/thumbnails/`, add an entry to
`data/videos.json`. Hover previews and the popup player pick it up automatically.

## 🎨 Change brand colors
All colors live in `tailwind.config.ts` (`royal`, `gold`, `cream`, `mist`) and
`app/globals.css` CSS variables. Change once — the entire site follows.

## 🔍 SEO
- Open Graph + Twitter cards + JSON-LD (Person & ProfessionalService) in `app/layout.tsx`.
- Set your real domain in `app/layout.tsx` → `SITE_URL`.
- Add a 1200×630 `public/og.png` social share image.

## ⚡ Performance notes
- All below-the-fold sections are code-split (`next/dynamic`).
- The 3D background renders client-only with clamped DPR.
- Videos use `preload="none"`; images are lazy-loaded.
- Respects `prefers-reduced-motion`.
