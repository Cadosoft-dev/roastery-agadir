import { categoryLabels } from "@/data/menu";
import { formatPrice } from "@/lib/utils";
import type { MenuItem } from "@/types/menu";

type Props = {
  items: MenuItem[];
  lang: "fr" | "en" | "ar";
};

export function MobileCards({ items, lang }: Props) {
  return (
    <div className="grid gap-4 md:hidden">
      {items.map((item) => {
        const name = lang === "fr" ? item.nameFR : lang === "en" ? item.nameEN : item.nameAR;
        const description = lang === "fr" ? item.descriptionFR : lang === "en" ? item.descriptionEN : item.descriptionAR;
        return (
          <article key={item.id} className="rounded-sm border border-[var(--color-border)] bg-[var(--color-smoke)] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-gold)]">
                  {categoryLabels[item.category][lang]}
                </p>
                <h3 className="font-display mt-2 text-2xl">{name}</h3>
              </div>
              <strong className="text-sm text-[var(--color-gold)]">{formatPrice(item.price)}</strong>
            </div>
            <p className="mt-3 text-sm leading-7 text-[var(--text-on-dark)]/75">{description}</p>
          </article>
        );
      })}
    </div>
  );
}
