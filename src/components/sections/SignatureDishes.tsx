"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { menuItems } from "@/data/menu";
import { formatPrice } from "@/lib/utils";

const signatureDishes = [
  { id: "salade-roastery", tagline: "La mer rencontre les tropiques" },
  { id: "homard-thermidor", tagline: "Générosité et noblesse" },
  { id: "tagine-signature", tagline: "L'âme du Maroc réinventée" },
  { id: "filet-boeuf-angus", tagline: "La perfection dans la braise" },
  { id: "fondant-chocolat", tagline: "La fin heureuse" },
  { id: "risotto-truffes", tagline: "Le luxe, simplement" }
].map((s) => ({
  ...s,
  item: menuItems.find((m) => m.id === s.id)!
})).filter((s) => s.item);

export function SignatureDishes() {
  const { t, lang } = useLanguage();

  return (
    <section className="bg-[var(--color-espresso)] py-28">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-32"
        >
          <SectionLabel>{t.sections.signatures_label}</SectionLabel>
          <h2 className="font-display mt-6 text-h2 font-light">{t.sections.dishes_title}</h2>
        </motion.div>
      </div>
      <div className="mt-12 flex snap-x gap-6 overflow-x-auto px-[max(20px,calc((100vw-1180px)/2))] pb-6">
        {signatureDishes.map(({ item, tagline }) => {
          const name = lang === "fr" ? item.nameFR : lang === "en" ? item.nameEN : item.nameAR;
          return (
            <motion.article
              key={item.id}
              className="min-w-[320px] max-w-[360px] snap-start overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-smoke)] transition hover:-translate-y-2 hover:shadow-card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.photo ?? "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"}
                  alt={name}
                  fill
                  sizes="360px"
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl text-[var(--text-on-dark)]">{name}</h3>
                  <span className="text-sm text-[var(--color-gold)]">{formatPrice(item.price)}</span>
                </div>
                <p className="font-display mt-3 italic leading-relaxed text-[var(--text-on-dark)]/60">
                  {tagline}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
