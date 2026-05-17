"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Instagram, Star } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { siteConfig } from "@/lib/constants";

export function Footer() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  const links = [
    ["Accueil", "#top"],
    ["La Carte", "#menu"],
    ["L'expérience", "#experience"],
    ["Réservations", "#reservations"],
    ["Offres Spéciales", "#offers"],
    ["Événements Privés", "#events"],
    ["Contact", "#contact"]
  ];

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-espresso)] py-20">
      <div className="section-shell grid gap-12 lg:grid-cols-[1fr_1fr_1.1fr]">
        <div>
          <Image src="/logo/roastery-logo.jpeg" alt="ROASTERY Agadir logo" width={62} height={62} className="rounded-sm" />
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)]">ROASTERY</p>
          <p className="font-display mt-3 text-lg italic text-[var(--text-on-dark)]/65">{t.sections.footer_tagline}</p>
          <div className="mt-6 flex gap-4 text-[var(--text-on-dark)]/70">
            <Link href={siteConfig.instagramHref} aria-label="Instagram">
              <Instagram size={18} />
            </Link>
            <Link href="#" aria-label="TripAdvisor">
              <Star size={18} />
            </Link>
          </div>
        </div>

        <div>
          <p className="section-label">{t.sections.footer_navigation}</p>
          <div className="mt-6 grid gap-3">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="text-sm text-[var(--text-on-dark)]/65 transition hover:text-[var(--color-gold)]">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="section-label">{t.sections.footer_contact}</p>
          <form
            className="mt-7"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <div className="flex border-b border-[var(--text-on-dark)]/35">
              <input
                required
                type="email"
                placeholder={t.sections.newsletter_placeholder}
                className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[var(--text-on-dark)] placeholder:text-[var(--text-on-dark)]/45 focus:outline-none"
              />
              <button type="submit" className="px-3 text-[var(--color-gold)]" aria-label="Subscribe">
                <ArrowRight size={20} />
              </button>
            </div>
            <p className="font-display mt-3 text-sm italic text-[var(--text-on-dark)]/55">
              {sent ? t.sections.newsletter_thanks : t.sections.newsletter_nospam}
            </p>
          </form>
          <p className="mt-8 max-w-sm text-sm leading-7 text-[var(--text-on-dark)]/65">
            {siteConfig.phone} · {siteConfig.address}
          </p>
        </div>
      </div>
      <div className="section-shell mt-14 flex justify-between border-t border-[var(--text-on-dark)]/10 pt-7 text-xs text-[var(--text-on-dark)]/45 max-sm:flex-col max-sm:gap-3">
        <p>{t.sections.footer_copyright}</p>
        <p className="font-display italic">{t.sections.footer_designed}</p>
      </div>
    </footer>
  );
}
