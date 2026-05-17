"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { BookSpine } from "./BookSpine";
import { categoryLabels } from "@/data/menu";
import { formatPrice } from "@/lib/utils";
import type { MenuCategory, MenuItem } from "@/types/menu";

type Props = {
  items: MenuItem[];
  lang: "fr" | "en" | "ar";
};

export function Flipbook({ items, lang }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<any>(null);

  const fallbackImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80";
  const coverImage = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80";

  const categories = Array.from(new Set(items.map((item) => item.category)));

  const goToCategory = useCallback(
    (category: MenuCategory) => {
      const index = items.findIndex((item) => item.category === category);
      if (index >= 0 && flipRef.current) {
        flipRef.current.flip(index + 2);
        setCurrentPage(index + 2);
      }
    },
    [items]
  );

  const goNext = useCallback(() => {
    if (flipRef.current) {
      flipRef.current.flipNext();
    }
  }, []);

  const goPrev = useCallback(() => {
    if (flipRef.current) {
      flipRef.current.flipPrev();
    }
  }, []);

  useEffect(() => {
    if (!bookRef.current || typeof window === "undefined") return;

    import("page-flip").then(({ PageFlip }) => {
      if (!bookRef.current) return;
      const pageFlip = new PageFlip(bookRef.current, {
        width: 400,
        height: 560,
        size: "fixed",
        minWidth: 300,
        maxWidth: 500,
        minHeight: 400,
        maxHeight: 650,
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: true,
        swipeDistance: 30,
        usePortrait: false,
        startPage: 0,
        drawShadow: true,
        flippingTime: 600,
      });

      pageFlip.loadFromHTML(document.querySelectorAll(".flipbook-page"));

      pageFlip.on("flip", (e: any) => {
        setCurrentPage(e.data);
      });

      flipRef.current = pageFlip;
    });

    return () => {
      flipRef.current?.destroy();
      flipRef.current = null;
    };
  }, []);

  return (
    <div>
      <BookSpine
        categories={categories}
        activeCategory={items[currentPage - 2]?.category ?? items[0]?.category}
        lang={lang}
        onSelect={goToCategory}
      />

      {/* Desktop: real page-flip book */}
      <div className="relative mx-auto mt-10 hidden md:block">
        <div
          ref={bookRef}
          className="mx-auto shadow-book"
          style={{ maxWidth: "800px" }}
        >
          {/* Page 0: Cover */}
          <div className="flipbook-page" data-density="hard">
            <div className="relative h-[560px] overflow-hidden bg-[var(--color-espresso)]">
              <Image
                src={coverImage}
                alt="ROASTERY Agadir cover"
                fill
                sizes="400px"
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-center">
                  <span className="text-7xl text-[var(--color-gold)]">★</span>
                  <div className="mx-auto mt-4 h-px w-24 bg-[var(--color-gold)]" />
                  <span className="mt-4 block font-display text-8xl font-light text-[var(--color-gold)]">R</span>
                  <span className="text-xs text-[var(--color-gold)]">®</span>
                  <p className="mt-8 text-xs uppercase tracking-[0.4em] text-[var(--color-ivory)]/80">
                    {lang === "fr" ? "La Carte" : lang === "en" ? "The Menu" : "القائمة"}
                  </p>
                  <p className="mt-2 text-xs text-[var(--color-ivory)]/50">
                    ROASTERY AGADIR
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Page 1: Table of Contents */}
          <div className="flipbook-page bg-[var(--color-ivory)]" data-density="hard">
            <div className="flex h-[560px]">
              {/* Left: Sommaire */}
              <div className="w-1/2 border-r border-[var(--color-border)] p-8 text-[var(--text-on-light)]">
                <p className="font-display text-5xl font-bold uppercase tracking-wider text-[var(--color-espresso)]">
                  {lang === "fr" ? "Sommaire" : lang === "en" ? "Contents" : "المحتويات"}
                </p>
                <div className="mt-8 flex flex-col gap-4">
                  {categories.map((cat, i) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => goToCategory(cat)}
                      className="flex items-center gap-3 text-left text-sm transition hover:text-[var(--color-gold)]"
                    >
                      <span className="text-[var(--color-gold)]">★</span>
                      <span className="flex-1 font-medium">{categoryLabels[cat][lang]}</span>
                      <span className="text-xs text-[var(--text-muted)]">P.{i + 3}</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Right: Featured dishes preview */}
              <div className="flex w-1/2 flex-col gap-4 p-6">
                {items.filter((item) => item.isSignature).slice(0, 3).map((item) => {
                  const name = lang === "fr" ? item.nameFR : lang === "en" ? item.nameEN : item.nameAR;
                  return (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm">
                        <Image
                          src={item.photo ?? fallbackImage}
                          alt={name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-on-light)]">{name}</p>
                        <p className="mt-1 text-xs text-[var(--text-muted)]">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  );
                })}
                <div className="mt-auto text-right">
                  <span className="text-xs text-[var(--text-muted)]">P.01</span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu item pages */}
          {items.map((item, index) => {
            const name = lang === "fr" ? item.nameFR : lang === "en" ? item.nameEN : item.nameAR;
            const description = lang === "fr" ? item.descriptionFR : lang === "en" ? item.descriptionEN : item.descriptionAR;
            return (
              <div
                key={item.id}
                className="flipbook-page bg-[var(--color-ivory)]"
                data-density="hard"
              >
                <div className="flex h-[560px] flex-col">
                  {/* Top half: image */}
                  <div className="relative h-1/2 overflow-hidden bg-[var(--color-smoke)]">
                    <Image
                      src={item.photo ?? fallbackImage}
                      alt={name}
                      fill
                      sizes="400px"
                      className="object-cover"
                      style={{ filter: "sepia(0.1) brightness(0.95)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-5">
                      <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-ivory)]/80">
                        {categoryLabels[item.category][lang]}
                      </p>
                    </div>
                  </div>
                  {/* Bottom half: text */}
                  <div className="relative flex h-1/2 flex-col justify-between bg-[var(--color-ivory)] p-8 text-[var(--text-on-light)]">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">
                        {item.isSignature ? "Signature" : "ROASTERY"}
                      </p>
                      <h3 className="font-display mt-4 text-3xl leading-none">{name}</h3>
                      <p className="mt-4 text-sm leading-7 text-[var(--color-charcoal)]">{description}</p>
                    </div>
                    <div className="flex items-end justify-between border-t border-[var(--color-border)] pt-4">
                      <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                        P.{index + 3}
                      </span>
                      <strong className="font-display text-2xl font-normal text-[var(--color-terracotta)]">
                        {formatPrice(item.price)}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation arrows */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="grid h-11 w-11 place-items-center rounded-sm border border-[var(--color-border)] text-[var(--color-gold)] transition disabled:opacity-40"
            aria-label="Previous menu page"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-on-dark)]/60">
            {currentPage + 1} / {items.length + 2}
          </span>
          <button
            type="button"
            onClick={goNext}
            className="grid h-11 w-11 place-items-center rounded-sm border border-[var(--color-border)] text-[var(--color-gold)] transition disabled:opacity-40"
            aria-label="Next menu page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Mobile: single card with swipe */}
      <div className="mt-8 md:hidden">
        <div className="overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-smoke)]">
          <div className="relative h-56">
            <Image
              src={items[currentPage - 2]?.photo ?? fallbackImage}
              alt={lang === "fr" ? items[currentPage - 2]?.nameFR : lang === "en" ? items[currentPage - 2]?.nameEN : items[currentPage - 2]?.nameAR}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ filter: "sepia(0.1) brightness(0.95)" }}
            />
          </div>
          <div className="p-5">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-gold)]">
              {categoryLabels[items[currentPage - 2]?.category]?.[lang]}
            </p>
            <h3 className="font-display mt-2 text-2xl text-[var(--text-on-dark)]">
              {lang === "fr" ? items[currentPage - 2]?.nameFR : lang === "en" ? items[currentPage - 2]?.nameEN : items[currentPage - 2]?.nameAR}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--text-on-dark)]/75">
              {lang === "fr" ? items[currentPage - 2]?.descriptionFR : lang === "en" ? items[currentPage - 2]?.descriptionEN : items[currentPage - 2]?.descriptionAR}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-[var(--color-gold)]">{formatPrice(items[currentPage - 2]?.price)}</span>
              <span className="text-xs text-[var(--text-muted)]">{currentPage - 1} / {items.length}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              if (currentPage > 2) {
                setCurrentPage((i) => i - 1);
              }
            }}
            className="grid h-11 w-11 place-items-center rounded-sm border border-[var(--color-border)] text-[var(--color-gold)] transition disabled:opacity-40"
            disabled={currentPage <= 2}
            aria-label="Previous menu page"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => {
              if (currentPage < items.length + 1) {
                setCurrentPage((i) => i + 1);
              }
            }}
            className="grid h-11 w-11 place-items-center rounded-sm border border-[var(--color-border)] text-[var(--color-gold)] transition disabled:opacity-40"
            disabled={currentPage >= items.length + 1}
            aria-label="Next menu page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
