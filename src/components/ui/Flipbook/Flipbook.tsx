"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { BookSpine } from "./BookSpine";
import { FlipPage } from "./FlipPage";
import { MobileCards } from "./MobileCards";
import type { MenuCategory, MenuItem } from "@/types/menu";

type Props = {
  items: MenuItem[];
  lang: "fr" | "en" | "ar";
};

export function Flipbook({ items, lang }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = useMemo(() => Array.from(new Set(items.map((item) => item.category))), [items]);
  const activeItem = items[activeIndex] ?? items[0];

  const goToCategory = (category: MenuCategory) => {
    const index = items.findIndex((item) => item.category === category);
    if (index >= 0) setActiveIndex(index);
  };

  const next = () => setActiveIndex((index) => Math.min(items.length - 1, index + 1));
  const previous = () => setActiveIndex((index) => Math.max(0, index - 1));

  return (
    <div>
      <BookSpine
        categories={categories}
        activeCategory={activeItem.category}
        lang={lang}
        onSelect={goToCategory}
      />
      <div className="relative mx-auto mt-10 hidden h-[520px] max-w-[760px] md:block" style={{ perspective: "1800px" }}>
        <div className="absolute inset-y-8 left-1/2 w-px bg-[var(--color-border)]" />
        {items.slice(0, 8).map((item, index) => (
          <FlipPage key={item.id} item={item} index={index} lang={lang} active={index === activeIndex % 8} />
        ))}
      </div>
      <MobileCards items={items} lang={lang} />
      <div className="mt-8 hidden items-center justify-center gap-4 md:flex">
        <button
          type="button"
          onClick={previous}
          className="grid h-11 w-11 place-items-center rounded-sm border border-[var(--color-border)] text-[var(--color-gold)] disabled:opacity-40"
          disabled={activeIndex === 0}
          aria-label="Previous menu page"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-on-dark)]/60">
          {activeIndex + 1} / {items.length}
        </span>
        <button
          type="button"
          onClick={next}
          className="grid h-11 w-11 place-items-center rounded-sm border border-[var(--color-border)] text-[var(--color-gold)] disabled:opacity-40"
          disabled={activeIndex === items.length - 1}
          aria-label="Next menu page"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
