import type { Config } from "tailwindcss";

/**
 * ═══════════════════════════════════════════════════════════════
 *  LUXURY DESIGN SYSTEM — Royal Blue × Premium Gold
 *  Change brand colors here and the entire site updates.
 * ═══════════════════════════════════════════════════════════════
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.json",
  ],
  theme: {
    extend: {
      colors: {
        // ── Royal Blue family (dark luxury base) ──
        royal: {
          950: "#050B1F", // deepest night navy — page background
          900: "#081130",
          800: "#0C1A45",
          700: "#132458",
          600: "#1C3272",
          500: "#27439B", // luxury royal blue
          400: "#3E5FC4",
        },
        // ── Premium Gold family ──
        gold: {
          300: "#F6E4B5", // champagne highlight
          400: "#EDD189",
          500: "#D9B85C", // primary gold
          600: "#C6A14B", // rich gold
          700: "#A67F33", // antique gold shadow
        },
        cream: "#FAF6EC", // very light cream
        mist: "#9AA7C2", // soft grey-blue for secondary text
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"], // Playfair Display — luxury headings
        sans: ["var(--font-sans)", "sans-serif"], // Sora — modern body
      },
      animation: {
        "spin-slow": "spin 14s linear infinite",
        float: "float 7s ease-in-out infinite",
        "float-delay": "float 9s ease-in-out 1.5s infinite",
        shimmer: "shimmer 2.8s linear infinite",
        aurora: "aurora 16s ease-in-out infinite alternate",
        "pulse-glow": "pulseGlow 3.2s ease-in-out infinite",
        "border-flow": "borderFlow 4s linear infinite",
        marquee: "marquee 36s linear infinite",
        "marquee-reverse": "marqueeReverse 42s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(2deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        aurora: {
          "0%": { transform: "translate(0,0) scale(1)", opacity: "0.55" },
          "50%": { transform: "translate(60px,-40px) scale(1.15)", opacity: "0.8" },
          "100%": { transform: "translate(-40px,30px) scale(0.95)", opacity: "0.55" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 24px 2px rgba(217,184,92,0.35)" },
          "50%": { boxShadow: "0 0 48px 8px rgba(217,184,92,0.6)" },
        },
        borderFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "300% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(110deg, #A67F33 0%, #D9B85C 30%, #F6E4B5 50%, #D9B85C 70%, #A67F33 100%)",
        "royal-radial":
          "radial-gradient(ellipse at top, #0C1A45 0%, #081130 45%, #050B1F 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 32px -4px rgba(217,184,92,0.45)",
        "gold-glow-lg": "0 0 64px -8px rgba(217,184,92,0.55)",
        "royal-depth": "0 24px 64px -16px rgba(3,7,20,0.85)",
        glass: "inset 0 1px 0 0 rgba(255,255,255,0.08), 0 20px 50px -20px rgba(3,7,20,0.9)",
      },
    },
  },
  plugins: [],
};

export default config;
