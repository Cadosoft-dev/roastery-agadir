import { categoryLabels } from "@/data/menu";
import type { MenuCategory } from "@/types/menu";
import { cn } from "@/lib/utils";

type Props = {
  categories: MenuCategory[];
  activeCategory: MenuCategory;
  lang: "fr" | "en" | "ar";
  onSelect: (category: MenuCategory) => void;
};

export function BookSpine({ categories, activeCategory, lang, onSelect }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(category)}
          className={cn(
            "rounded-sm border border-[var(--color-border)] px-3 py-2 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--text-on-dark)]/70 transition hover:text-[var(--color-gold)]",
            activeCategory === category && "bg-[var(--color-gold)] text-[var(--color-espresso)]"
          )}
        >
          {categoryLabels[category][lang]}
        </button>
      ))}
    </div>
  );
}
