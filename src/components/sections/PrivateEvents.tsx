"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function PrivateEvents() {
  const { t } = useLanguage();

  return (
    <section id="events" className="grid bg-[var(--color-espresso)] lg:grid-cols-[1.1fr_0.9fr]">
      <div className="px-8 py-28 lg:px-20">
        <SectionLabel>{t.sections.events_label}</SectionLabel>
        <h2 className="font-display mt-6 max-w-2xl whitespace-pre-line text-h2 font-light">{t.sections.events_title}</h2>
        <p className="mt-7 max-w-2xl text-body text-[var(--text-on-dark)]/72">
          {t.sections.events_body}
        </p>
        <div className="my-9 grid gap-4 text-sm uppercase tracking-[0.12em] text-[var(--text-on-dark)]/70 sm:grid-cols-2">
          {["Espace privatisé", "Menus personnalisés", "Service dédié", "Décoration sur mesure"].map((item) => (
            <p key={item} className="border-l border-[var(--color-gold)] ps-4">
              {item}
            </p>
          ))}
        </div>
        <Button href="#contact" variant="ghost">
          Nous écrire pour votre événement
        </Button>
      </div>
      <div className="relative min-h-[560px]">
        <Image
          src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1200&q=80"
          alt="Candlelit private dining table"
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--color-overlay)]" />
      </div>
    </section>
  );
}
