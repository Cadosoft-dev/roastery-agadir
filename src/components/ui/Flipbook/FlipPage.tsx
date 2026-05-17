import type { MenuItem } from "@/types/menu";
import { formatPrice } from "@/lib/utils";

type Props = {
  item: MenuItem;
  index: number;
  lang: "fr" | "en" | "ar";
  active: boolean;
};

export function FlipPage({ item, index, lang, active }: Props) {
  const name = lang === "fr" ? item.nameFR : lang === "en" ? item.nameEN : item.nameAR;
  const description = lang === "fr" ? item.descriptionFR : lang === "en" ? item.descriptionEN : item.descriptionAR;

  return (
    <article
      className="absolute inset-0 origin-left rounded-sm border border-[var(--color-border)] bg-[var(--color-ivory)] p-8 text-[var(--text-on-light)] shadow-book transition duration-500"
      style={{
        transform: active ? "rotateY(0deg)" : "rotateY(-180deg)",
        zIndex: active ? 30 : 10 - index
      }}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">
            {item.isSignature ? "Signature" : "ROASTERY"}
          </p>
          <h3 className="font-display mt-8 text-5xl leading-none">{name}</h3>
          <p className="mt-6 max-w-md text-base leading-8 text-[var(--color-charcoal)]">{description}</p>
        </div>
        <div className="flex items-end justify-between border-t border-[var(--color-border)] pt-6">
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Page {index + 1}</span>
          <strong className="font-display text-3xl font-normal text-[var(--color-terracotta)]">
            {formatPrice(item.price)}
          </strong>
        </div>
      </div>
    </article>
  );
}
