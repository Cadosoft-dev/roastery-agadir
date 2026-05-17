"use client";

import { Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { hours, siteConfig } from "@/lib/constants";

export function Location() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="bg-[var(--color-charcoal)] py-28">
      <div className="section-shell">
        <SectionLabel>{t.sections.location_label}</SectionLabel>
        <h2 className="font-display mt-6 text-h2 font-light">{t.sections.location_title}</h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="relative min-h-[460px] overflow-hidden rounded-sm border border-[var(--color-border)]">
            <iframe
              title="ROASTERY Agadir on Google Maps"
              src={siteConfig.mapsEmbed}
              width="100%"
              height="100%"
              loading="lazy"
              className="absolute inset-0 h-full w-full grayscale"
            />
            <div className="pointer-events-none absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-gold)] text-[var(--color-espresso)]">
              <MapPin size={22} />
            </div>
          </div>

          <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-smoke)] p-8">
            <Info icon={<MapPin size={20} />} label="Adresse" value={siteConfig.address} />
            <Info icon={<Clock size={20} />} label="Horaires" value={hours.join("\n")} />
            <Info icon={<Phone size={20} />} label={t.form.phone} value={siteConfig.phone} href={siteConfig.phoneHref} />
            <Info icon={<MessageCircle size={20} />} label="WhatsApp" value={siteConfig.whatsapp} href={siteConfig.whatsappHref} />
            <Info icon={<Instagram size={20} />} label="Instagram" value={siteConfig.instagram} href={siteConfig.instagramHref} />
          </div>
        </div>

        <form
          className="mt-8 grid gap-5 rounded-sm border border-[var(--color-border)] bg-[var(--color-smoke)] p-6 lg:grid-cols-3"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
            event.currentTarget.reset();
          }}
        >
          <label className="grid gap-2">
            <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]">{t.form.name}</span>
            <input required className="h-12 rounded-sm border border-[var(--color-border)] bg-[var(--color-espresso)] px-4 text-sm" />
          </label>
          <label className="grid gap-2">
            <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]">{t.form.email}</span>
            <input type="email" required className="h-12 rounded-sm border border-[var(--color-border)] bg-[var(--color-espresso)] px-4 text-sm" />
          </label>
          <div className="flex items-end">
            <Button type="submit" className="w-full">
              {t.form.send}
            </Button>
          </div>
          <label className="grid gap-2 lg:col-span-3">
            <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]">{t.form.message}</span>
            <textarea required rows={4} className="rounded-sm border border-[var(--color-border)] bg-[var(--color-espresso)] px-4 py-3 text-sm" />
          </label>
          {sent && <p className="text-sm text-[var(--color-gold)] lg:col-span-3">{t.form.contactSuccess}</p>}
        </form>
      </div>
    </section>
  );
}

function Info({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <>
      <div className="text-[var(--color-gold)]">{icon}</div>
      <div>
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">{label}</p>
        <p className="mt-1 whitespace-pre-line text-sm leading-6 text-[var(--text-on-dark)]/78">{value}</p>
      </div>
    </>
  );

  return href ? (
    <a href={href} className="mb-7 flex gap-4 last:mb-0">
      {content}
    </a>
  ) : (
    <div className="mb-7 flex gap-4 last:mb-0">{content}</div>
  );
}
