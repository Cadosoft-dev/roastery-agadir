"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [showingNext, setShowingNext] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragX = useMotionValue(0);
  const rotateY = useTransform(dragX, [-400, 0], [-180, 0]);
  const opacity = useTransform(dragX, [-400, -100, 0], [0.6, 0.8, 1]);
  const activeItem = items[activeIndex];
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fallbackImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80";

  const nextItem = items[activeIndex + 1];
  const nextName = nextItem ? (lang === "fr" ? nextItem.nameFR : lang === "en" ? nextItem.nameEN : nextItem.nameAR) : "";
  const nextDesc = nextItem ? (lang === "fr" ? nextItem.descriptionFR : lang === "en" ? nextItem.descriptionEN : nextItem.descriptionAR) : "";

  const name = lang === "fr" ? activeItem.nameFR : lang === "en" ? activeItem.nameEN : activeItem.nameAR;
  const description = lang === "fr" ? activeItem.descriptionFR : lang === "en" ? activeItem.descriptionEN : activeItem.descriptionAR;

  const categories = Array.from(new Set(items.map((item) => item.category)));

  const navigate = useCallback(
    (direction: "next" | "prev") => {
      if (direction === "next" && activeIndex < items.length - 1) {
        setActiveIndex((i) => i + 1);
      } else if (direction === "prev" && activeIndex > 0) {
        setActiveIndex((i) => i - 1);
      }
    },
    [activeIndex, items.length]
  );

  const onDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
      setDragging(false);
      if (info.offset.x < -120) {
        navigate("next");
      } else if (info.offset.x > 120) {
        navigate("prev");
      }
      dragX.set(0);
    },
    [navigate, dragX]
  );

  const onDragStart = () => setDragging(true);

  const goToCategory = (category: MenuCategory) => {
    const index = items.findIndex((item) => item.category === category);
    if (index >= 0) setActiveIndex(index);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigate("next");
      if (e.key === "ArrowLeft") navigate("prev");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div>
      <BookSpine
        categories={categories}
        activeCategory={activeItem.category}
        lang={lang}
        onSelect={goToCategory}
      />

      {/* Desktop: 2-page spread centered with drag */}
      <div className="relative mx-auto mt-10 hidden md:block">
        <div
          className="relative mx-auto flex h-[520px] max-w-[860px] overflow-hidden rounded-sm shadow-book"
          style={{ perspective: "2000px" }}
        >
          {/* Left page: revealed dish image */}
          <div className="relative w-1/2 overflow-hidden bg-[var(--color-smoke)]">
            <Image
              src={nextItem?.photo ?? fallbackImage}
              alt={nextName || name}
              fill
              sizes="430px"
              className="object-cover"
              style={{ filter: "sepia(0.1) brightness(0.95)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-ivory)]/70">
                {categoryLabels[activeItem.category][lang]}
              </p>
            </div>
          </div>

          {/* Right page: draggable dish details */}
          <motion.div
            className="relative w-1/2 origin-left cursor-grab active:cursor-grabbing"
            style={{
              rotateY,
              opacity,
              x: dragX,
              zIndex: dragging ? 50 : 10,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
            drag="x"
            dragConstraints={{ left: -400, right: 0 }}
            dragElastic={0.1}
            dragMomentum={false}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            <div className="absolute inset-0 bg-[var(--color-ivory)] p-10 text-[var(--text-on-light)]">
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">
                {activeItem.isSignature ? "Signature" : "ROASTERY"}
              </p>
              <h3 className="font-display mt-8 text-5xl leading-none">{name}</h3>
              <p className="mt-6 text-base leading-8 text-[var(--color-charcoal)]">{description}</p>
              <div className="absolute bottom-8 left-10 right-10 flex items-end justify-between border-t border-[var(--color-border)] pt-6">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {activeIndex + 1} / {items.length}
                </span>
                <strong className="font-display text-3xl font-normal text-[var(--color-terracotta)]">
                  {formatPrice(activeItem.price)}
                </strong>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Spine divider */}
        <div className="pointer-events-none absolute left-1/2 top-[88px] h-[444px] w-px -translate-x-1/2 bg-[var(--color-border)]" />

        {/* Drag hint */}
        <p className="mt-4 text-center text-xs text-[var(--text-on-dark)]/40">
          ← Glissez la page pour tourner →
        </p>

        {/* Navigation arrows fallback */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => navigate("prev")}
            className="grid h-11 w-11 place-items-center rounded-sm border border-[var(--color-border)] text-[var(--color-gold)] transition disabled:opacity-40"
            disabled={activeIndex === 0}
            aria-label="Previous menu page"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => navigate("next")}
            className="grid h-11 w-11 place-items-center rounded-sm border border-[var(--color-border)] text-[var(--color-gold)] transition disabled:opacity-40"
            disabled={activeIndex === items.length - 1}
            aria-label="Next menu page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Mobile: single card with swipe */}
      <div className="mt-8 md:hidden">
        <motion.div
          className="overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-smoke)]"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.3}
          dragMomentum={false}
          onDragEnd={onDragEnd}
          style={{ x: dragX }}
        >
          <div className="relative h-56">
            <Image
              src={activeItem.photo ?? fallbackImage}
              alt={name}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ filter: "sepia(0.1) brightness(0.95)" }}
            />
          </div>
          <div className="p-5">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-gold)]">
              {categoryLabels[activeItem.category][lang]}
            </p>
            <h3 className="font-display mt-2 text-2xl text-[var(--text-on-dark)]">{name}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--text-on-dark)]/75">{description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-[var(--color-gold)]">{formatPrice(activeItem.price)}</span>
              <span className="text-xs text-[var(--text-muted)]">{activeIndex + 1} / {items.length}</span>
            </div>
          </div>
        </motion.div>

        <p className="mt-4 text-center text-xs text-[var(--text-on-dark)]/40">
          ← Glissez pour tourner →
        </p>

        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => navigate("prev")}
            className="grid h-11 w-11 place-items-center rounded-sm border border-[var(--color-border)] text-[var(--color-gold)] transition disabled:opacity-40"
            disabled={activeIndex === 0}
            aria-label="Previous menu page"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => navigate("next")}
            className="grid h-11 w-11 place-items-center rounded-sm border border-[var(--color-border)] text-[var(--color-gold)] transition disabled:opacity-40"
            disabled={activeIndex === items.length - 1}
            aria-label="Next menu page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
