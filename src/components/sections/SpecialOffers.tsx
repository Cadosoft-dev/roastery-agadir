"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { specialOffers } from "@/data/specialOffers";

export function SpecialOffers() {
  const { t, lang } = useLanguage();

  return (
    <section id="offers" className="bg-[var(--color-charcoal)] py-28">
      <div className="section-shell">
        <SectionLabel>{t.sections.offers_label}</SectionLabel>
        <h2 className="font-display mt-6 text-h2 font-light">{t.sections.offers_title}</h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {specialOffers.map((offer) => {
            const title = lang === "fr" ? offer.titleFR : lang === "en" ? offer.titleEN : offer.titleAR;
            const text = lang === "fr" ? offer.textFR : lang === "en" ? offer.textEN : offer.textAR;
            return (
              <article key={offer.titleFR} className="rounded-sm border border-[var(--color-border)] bg-[var(--color-smoke)] p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)]">{offer.price}</p>
                <h3 className="font-display mt-5 text-3xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--text-on-dark)]/68">{text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
