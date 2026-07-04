import type { Metadata, Viewport } from "next";
import { Playfair_Display, Sora } from "next/font/google";
import "./globals.css";
import site from "@/data/site.json";

/* ── Premium typography: Playfair Display (display serif) × Sora (modern sans) ── */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://muhammadwajahat.com"; // ← update when domain is live

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — ${site.title} | Dubai Real Estate AI`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    "AI Automation Consultant Dubai",
    "Real Estate AI Automation",
    "CRM Automation Dubai",
    "AI Agents",
    "Lead Generation Automation",
    "WhatsApp Automation Dubai",
    "n8n consultant",
    "OpenAI integration",
  ],
  authors: [{ name: site.name, url: site.linkedin }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: `${site.name} — ${site.title}`,
    title: `${site.name} — ${site.title}`,
    description: site.tagline,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} — ${site.title}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.title}`,
    description: site.tagline,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050B1F",
  width: "device-width",
  initialScale: 1,
};

/* ── Structured data: Person + ProfessionalService for rich results ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: site.name,
      jobTitle: site.title,
      email: `mailto:${site.email}`,
      url: SITE_URL,
      sameAs: [site.linkedin],
      address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
      knowsAbout: ["AI Automation", "AI Agents", "CRM Automation", "Real Estate Technology"],
    },
    {
      "@type": "ProfessionalService",
      name: `${site.name} — AI Automation Consulting`,
      description: site.tagline,
      areaServed: "Dubai, United Arab Emirates",
      url: SITE_URL,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sora.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
