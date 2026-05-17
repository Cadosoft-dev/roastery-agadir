"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { reviews } from "@/data/reviews";

export function Reviews() {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval>>();
  const hovering = useRef(false);

  useEffect(() => {
    timer.current = setInterval(() => {
      if (!hovering.current) {
        setActive((i) => (i + 1) % reviews.length);
      }
    }, 5000);
    return () => clearInterval(timer.current);
  }, []);

  const review = reviews[active];
  const quote = lang === "fr" ? review.quoteFR : lang === "en" ? review.quoteEN : review.quoteAR;
  const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

  return (
    <section
      className="bg-[var(--color-charcoal)] py-28"
      onMouseEnter={() => { hovering.current = true; }}
      onMouseLeave={() => { hovering.current = false; }}
    >
      <div className="section-shell text-center">
        <SectionLabel>{t.sections.reviews_label}</SectionLabel>
        <h2 className="font-display mt-6 text-h2 font-light italic">{t.sections.reviews_title}</h2>
        <div className="mx-auto mt-14 max-w-3xl">
          <span className="font-display text-7xl leading-none text-[var(--color-gold)] opacity-25">
            &ldquo;
          </span>
          <p className="font-display mt-2 text-2xl italic leading-relaxed text-[var(--text-on-dark)]">
            {quote}
          </p>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[var(--color-gold)]">
            {review.name} · {review.source} · {stars} {review.rating} {lang === "ar" ? "نجوم" : lang === "en" ? "Stars" : "Étoiles"}
          </p>
        </div>
        <div className="mt-10 flex justify-center gap-3">
          {reviews.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              className={`h-2 w-2 rounded-full transition ${
                index === active ? "bg-[var(--color-gold)]" : "bg-[var(--color-gold)]/25"
              }`}
              aria-label={`Review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
