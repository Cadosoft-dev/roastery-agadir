"use client";

import Image from "next/image";
import { Coffee } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function CoffeeProgram() {
  const { t } = useLanguage();

  return (
    <section className="grid bg-[var(--color-ivory)] text-[var(--text-on-light)] lg:grid-cols-2">
      <div className="relative min-h-[520px]">
        <Image
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1300&q=80"
          alt="Coffee being poured by a barista"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex items-center px-8 py-24 lg:px-20">
        <div>
          <SectionLabel>{t.sections.coffee_label}</SectionLabel>
          <h2 className="font-display mt-6 text-h2 font-light">{t.sections.coffee_title}</h2>
          <p className="mt-7 max-w-xl text-body text-[var(--color-charcoal)]">
            {t.sections.coffee_body}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            {["Espresso", "V60", "Cappuccino", "Thé à la menthe"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 border border-[var(--color-border)] px-4 py-2 text-xs uppercase tracking-[0.12em]">
                <Coffee size={14} /> {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
