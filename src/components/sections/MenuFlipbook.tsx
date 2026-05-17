"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { menuItems } from "@/data/menu";

const Flipbook = dynamic(() => import("@/components/ui/Flipbook").then((mod) => mod.Flipbook), { ssr: false });

export function MenuFlipbook() {
  const { t, lang } = useLanguage();

  return (
    <section id="menu" className="bg-[var(--color-charcoal)] py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>La carte</SectionLabel>
          <h2 className="font-display mt-6 text-h2 font-light">{t.sections.menu_title}</h2>
          <p className="mt-5 text-body text-[var(--text-on-dark)]/70">
            {t.sections.menu_tagline}
          </p>
        </div>
        <div className="mt-12">
          <Flipbook items={menuItems} lang={lang} />
        </div>
      </div>
    </section>
  );
}
