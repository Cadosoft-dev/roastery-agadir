"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { galleryImages } from "@/data/gallery";

type GalleryImage = (typeof galleryImages)[number];

export function Gallery() {
  const { t } = useLanguage();
  const [active, setActive] = useState<GalleryImage | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const open = useCallback((img: GalleryImage, index: number) => {
    setActive(img);
    setActiveIndex(index);
  }, []);

  const close = useCallback(() => setActive(null), []);

  const prev = useCallback(() => {
    const i = (activeIndex - 1 + galleryImages.length) % galleryImages.length;
    setActive(galleryImages[i]);
    setActiveIndex(i);
  }, [activeIndex]);

  const next = useCallback(() => {
    const i = (activeIndex + 1) % galleryImages.length;
    setActive(galleryImages[i]);
    setActiveIndex(i);
  }, [activeIndex]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, prev, next]);

  return (
    <section id="gallery" className="bg-[var(--color-charcoal)] py-28">
      <div className="section-shell">
        <SectionLabel>{t.sections.gallery_label}</SectionLabel>
        <h2 className="font-display mt-6 max-w-3xl text-h2 font-light">{t.sections.gallery_title}</h2>
        <div className="mt-12 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((image, index) => (
            <button
              type="button"
              key={image.src}
              onClick={() => open(image, index)}
              className={`group relative overflow-hidden rounded-sm ${index === 0 || index === 5 ? "lg:row-span-2" : ""} ${index === 2 ? "lg:col-span-2" : ""}`}
            >
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-end bg-[var(--color-overlay)] p-4 opacity-0 transition group-hover:opacity-100">
                <span className="font-display text-sm italic text-[var(--text-on-dark)]">{image.alt}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[var(--color-espresso)]/95 p-4">
          <button
            type="button"
            onClick={close}
            className="absolute right-6 top-6 z-10 grid h-11 w-11 place-items-center rounded-sm border border-[var(--color-border)] text-[var(--color-gold)]"
            aria-label="Close image"
          >
            <X size={22} />
          </button>
          <button
            type="button"
            onClick={prev}
            className="absolute left-4 z-10 grid h-11 w-11 place-items-center rounded-sm border border-[var(--color-border)] text-[var(--color-gold)] max-sm:top-1/2 max-sm:-translate-y-1/2"
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-4 z-10 grid h-11 w-11 place-items-center rounded-sm border border-[var(--color-border)] text-[var(--color-gold)] max-sm:top-1/2 max-sm:-translate-y-1/2"
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>
          <div className="relative h-[80vh] w-full max-w-5xl">
            <Image src={active.src} alt={active.alt} fill sizes="90vw" className="object-contain" />
          </div>
          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-display text-sm italic text-[var(--text-on-dark)]/80">
            {active.alt}
          </p>
          <p className="absolute bottom-8 right-8 text-xs text-[var(--text-on-dark)]/40">
            {activeIndex + 1} / {galleryImages.length}
          </p>
        </div>
      )}
    </section>
  );
}
