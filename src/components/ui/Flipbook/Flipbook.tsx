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

  const categories = Array.from(new Set(items.map((item) => item.category)));

  const goToCategory = useCallback(
    (category: MenuCategory) => {
      const index = items.findIndex((item) => item.category === category);
      if (index >= 0 && flipRef.current) {
        flipRef.current.flip(index);
        setCurrentPage(index);
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
        width: 430,
        height: 520,
        size: "fixed",
        minWidth: 300,
        maxWidth: 500,
        minHeight: 400,
        maxHeight: 600,
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
        activeCategory={items[currentPage]?.category ?? items[0]?.category}
        lang={lang}
        onSelect={goToCategory}
      />

      {/* Desktop: real page-flip book */}
      <div className="relative mx-auto mt-10 hidden md:block">
        <div
          ref={bookRef}
          className="mx-auto shadow-book"
          style={{ maxWidth: "860px" }}
        >
          {items.map((item, index) => {
            const name = lang === "fr" ? item.nameFR : lang === "en" ? item.nameEN : item.nameAR;
            const description = lang === "fr" ? item.descriptionFR : lang === "en" ? item.descriptionEN : item.descriptionAR;
            return (
              <div
                key={item.id}
                className="flipbook-page bg-[var(--color-ivory)]"
                data-density="hard"
              >
                <div className="flex h-[520px]">
                  {/* Left side: image */}
                  <div className="relative w-1/2 overflow-hidden bg-[var(--color-smoke)]">
                    <Image
                      src={item.photo ?? fallbackImage}
                      alt={name}
                      fill
                      sizes="430px"
                      className="object-cover"
                      style={{ filter: "sepia(0.1) brightness(0.95)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-ivory)]/70">
                        {categoryLabels[item.category][lang]}
                      </p>
                    </div>
                  </div>
                  {/* Right side: text */}
                  <div className="relative w-1/2 bg-[var(--color-ivory)] p-10 text-[var(--text-on-light)]">
                    <p className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">
                      {item.isSignature ? "Signature" : "ROASTERY"}
                    </p>
                    <h3 className="font-display mt-8 text-4xl leading-none">{name}</h3>
                    <p className="mt-6 text-base leading-8 text-[var(--color-charcoal)]">{description}</p>
                    <div className="absolute bottom-8 left-10 right-10 flex items-end justify-between border-t border-[var(--color-border)] pt-6">
                      <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                        {index + 1} / {items.length}
                      </span>
                      <strong className="font-display text-3xl font-normal text-[var(--color-terracotta)]">
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
            {currentPage + 1} / {items.length}
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
              src={items[currentPage]?.photo ?? fallbackImage}
              alt={lang === "fr" ? items[currentPage]?.nameFR : lang === "en" ? items[currentPage]?.nameEN : items[currentPage]?.nameAR}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ filter: "sepia(0.1) brightness(0.95)" }}
            />
          </div>
          <div className="p-5">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-gold)]">
              {categoryLabels[items[currentPage]?.category]?.[lang]}
            </p>
            <h3 className="font-display mt-2 text-2xl text-[var(--text-on-dark)]">
              {lang === "fr" ? items[currentPage]?.nameFR : lang === "en" ? items[currentPage]?.nameEN : items[currentPage]?.nameAR}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--text-on-dark)]/75">
              {lang === "fr" ? items[currentPage]?.descriptionFR : lang === "en" ? items[currentPage]?.descriptionEN : items[currentPage]?.descriptionAR}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-[var(--color-gold)]">{formatPrice(items[currentPage]?.price)}</span>
              <span className="text-xs text-[var(--text-muted)]">{currentPage + 1} / {items.length}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              if (currentPage > 0) {
                setCurrentPage((i) => i - 1);
              }
            }}
            className="grid h-11 w-11 place-items-center rounded-sm border border-[var(--color-border)] text-[var(--color-gold)] transition disabled:opacity-40"
            disabled={currentPage === 0}
            aria-label="Previous menu page"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => {
              if (currentPage < items.length - 1) {
                setCurrentPage((i) => i + 1);
              }
            }}
            className="grid h-11 w-11 place-items-center rounded-sm border border-[var(--color-border)] text-[var(--color-gold)] transition disabled:opacity-40"
            disabled={currentPage === items.length - 1}
            aria-label="Next menu page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
