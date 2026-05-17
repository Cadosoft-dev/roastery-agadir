"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/lib/constants";

export function Introduction() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="bg-[var(--color-ivory)] py-28 text-[var(--text-on-light)]">
      <div className="section-shell grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          className="relative min-h-[520px] overflow-hidden rounded-sm"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Image
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
            alt="ROASTERY Agadir dining room atmosphere"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="animate-ken-burns object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <SectionLabel>{t.sections.intro_subtitle}</SectionLabel>
          <h2 className="font-display mt-6 text-h2 font-light">{t.sections.intro_title}</h2>
          <div className="gold-divider my-8 w-20" />
          <p className="max-w-2xl text-body leading-9 text-[var(--color-charcoal)]/85">
            {t.sections.intro_body}
          </p>
          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)]">Cuisine</dt>
              <dd className="mt-2 text-sm text-[var(--text-muted)]">{siteConfig.cuisines}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)]">Rating</dt>
              <dd className="mt-2 text-sm text-[var(--text-muted)]">{siteConfig.rating} / 5 TripAdvisor</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)]">Lieu</dt>
              <dd className="mt-2 text-sm text-[var(--text-muted)]">{t.sections.intro_stat_location}</dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
