"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { Icon } from "@/components/ui/Icons";
import site from "@/data/site.json";

const FIELDS = [
  { name: "name", label: "Full Name", type: "text", required: true, span: 1 },
  { name: "email", label: "Email Address", type: "email", required: true, span: 1 },
  { name: "company", label: "Company", type: "text", required: false, span: 1 },
  { name: "phone", label: "Phone / WhatsApp", type: "tel", required: false, span: 1 },
] as const;

/**
 * Contact — luxury glass form.
 * Submissions open the visitor's mail client pre-filled (zero-backend).
 * To wire a real backend later: replace handleSubmit with a POST to your
 * API route or a service like Formspree/Resend.
 */
export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Project Enquiry — ${fd.get("name")} (${fd.get("company") || "—"})`);
    const body = encodeURIComponent(
      `Name: ${fd.get("name")}\nEmail: ${fd.get("email")}\nCompany: ${fd.get("company") || "-"}\nPhone: ${fd.get("phone") || "-"}\n\nMessage:\n${fd.get("message")}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inputCls =
    "peer w-full rounded-xl border border-white/10 bg-white/[0.04] px-5 pb-3 pt-6 text-cream outline-none backdrop-blur-md transition-all duration-300 focus:border-gold-500/60 focus:shadow-gold-glow placeholder-transparent";
  const labelCls =
    "pointer-events-none absolute left-5 top-2 text-[11px] uppercase tracking-[0.18em] text-gold-500/80 transition-all duration-300 peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-mist/70 peer-focus:top-2 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-gold-400";

  return (
    <section id="contact" className="section-shell">
      <div className="aurora-blob right-[-10%] bottom-[-10%] h-[32rem] w-[32rem] bg-gold-600/8" />

      <SectionHeading
        kicker="Contact"
        title="Let's Automate Your Growth"
        goldWord="Automate"
        lede="Tell me about your team and where the hours are leaking — I'll reply with a concrete automation plan."
      />

      <div className="grid gap-10 lg:grid-cols-5">
        {/* info panel */}
        <Reveal variant="left" className="lg:col-span-2">
          <div className="glass-gold flex h-full flex-col justify-between !rounded-3xl p-6 sm:p-9">
            <div>
              <h3 className="font-display text-2xl text-white">Direct Lines</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                Prefer email or LinkedIn? Reach out directly — I respond within one business day.
              </p>
              <div className="mt-8 space-y-5">
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-4 text-sm text-mist transition-colors hover:text-gold-300"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-gold-500/30 text-gold-400 transition group-hover:shadow-gold-glow">
                    <Icon name="mail" className="h-5 w-5" />
                  </span>
                  {site.email}
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 text-sm text-mist transition-colors hover:text-gold-300"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-gold-500/30 text-gold-400 transition group-hover:shadow-gold-glow">
                    <Icon name="linkedin" className="h-5 w-5" />
                  </span>
                  linkedin.com/in/its-wajahat-ansari
                </a>
                <div className="flex items-center gap-4 text-sm text-mist">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-gold-500/30 text-gold-400">
                    <Icon name="pin" className="h-5 w-5" />
                  </span>
                  {site.location}
                </div>
              </div>
            </div>

            {/* animated social icons */}
            <div className="mt-10 flex gap-4">
              {site.social.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12 }}
                  whileHover={{ y: -5, rotate: 6, scale: 1.08 }}
                  className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-gradient text-royal-950 shadow-gold-glow"
                >
                  <Icon name={s.icon} className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* form */}
        <Reveal variant="right" className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="glass !rounded-3xl p-6 sm:p-9">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid min-h-[24rem] place-items-center text-center"
              >
                <div>
                  <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-gold-gradient text-royal-950 animate-pulse-glow">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-9 w-9">
                      <path d="M9.55 15.15l8.5-8.5 1.4 1.4-9.9 9.9-5-5 1.4-1.4 3.6 3.6z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl text-white">Almost there!</h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm text-mist">
                    Your email client should have opened with the message pre-filled. Just press
                    send — I&apos;ll get back to you within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="btn-ghost mt-8 !px-6 !py-3 text-sm"
                  >
                    Write another message
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  {FIELDS.map((f) => (
                    <div key={f.name} className="relative">
                      <input
                        id={f.name}
                        name={f.name}
                        type={f.type}
                        required={f.required}
                        placeholder={f.label}
                        className={inputCls}
                      />
                      <label htmlFor={f.name} className={labelCls}>
                        {f.label}
                        {f.required && <span className="text-gold-400"> *</span>}
                      </label>
                    </div>
                  ))}
                  <div className="relative sm:col-span-2">
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Your Message"
                      className={`${inputCls} resize-none`}
                    />
                    <label htmlFor="message" className={labelCls}>
                      Your Message<span className="text-gold-400"> *</span>
                    </label>
                  </div>
                </div>
                <div className="mt-8">
                  <MagneticButton className="btn-gold w-full sm:w-auto">
                    Send Message
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M3 11l18-8-8 18-2.5-7.5L3 11z" />
                    </svg>
                  </MagneticButton>
                </div>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
