"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

const languages = ["fr", "en", "ar"] as const;

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={cn("flex items-center gap-2", compact && "justify-center")}>
      {languages.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLang(item)}
          className={cn(
            "text-[0.7rem] font-medium uppercase tracking-[0.16em] text-[var(--text-on-dark)]/70 transition hover:text-[var(--color-gold)]",
            lang === item && "text-[var(--color-gold)]"
          )}
          aria-pressed={lang === item}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
