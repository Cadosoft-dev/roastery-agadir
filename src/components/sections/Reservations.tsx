"use client";

import { Check, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/lib/constants";
import type { Reservation } from "@/types/reservation";

type Errors = Partial<Record<keyof Reservation | "email", string>>;

export function Reservations() {
  const { t } = useLanguage();
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState<Reservation | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const validate = (form: FormData): Errors => {
    const e: Errors = {};
    if (!form.get("name")) e.name = t.form.error_name;
    if (!form.get("date")) e.date = t.form.error_date;
    if (!form.get("phone") || !/^[\d\s+()-]{6,}$/.test(String(form.get("phone")))) e.phone = t.form.error_phone;
    return e;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const reservation: Reservation = {
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      date: String(form.get("date") ?? ""),
      time: String(form.get("time") ?? ""),
      guests: Number(form.get("guests") ?? 1),
      note: String(form.get("note") ?? ""),
      createdAt: new Date().toISOString()
    };
    const saved = JSON.parse(window.localStorage.getItem("roastery_reservations") ?? "[]") as Reservation[];
    window.localStorage.setItem("roastery_reservations", JSON.stringify([...saved, reservation]));
    setSubmitted(reservation);
    setSuccess(true);
    event.currentTarget.reset();
  };

  return (
    <section id="reservations" className="relative bg-[var(--color-espresso)] py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-xl text-center">
          <SectionLabel>{t.sections.reservations_label}</SectionLabel>
          <h2 className="font-display mt-6 text-h2 font-light">{t.sections.reservations_title}</h2>
        </div>

        {success && submitted ? (
          <div className="mx-auto mt-10 max-w-lg rounded-sm border border-[var(--color-border)] bg-[var(--color-smoke)]/80 p-10 text-center backdrop-blur-glass">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-[var(--color-gold)] text-[var(--color-gold)]">
              <Check size={30} strokeWidth={3} />
            </div>
            <h3 className="font-display mt-6 text-3xl text-[var(--color-gold)]">Réservation confirmée</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--text-on-dark)]/75">
              Merci {submitted.name}, nous vous attendons le {submitted.date} à {submitted.time}.
              Vous recevrez une confirmation par email.
            </p>
            <p className="mt-4 text-xs text-[var(--text-muted)]">Pour tout changement, appelez-nous au {siteConfig.phone}</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-lg rounded-sm border border-[var(--color-border)] bg-[var(--color-smoke)]/80 p-8 backdrop-blur-glass">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t.form.name} name="name" required error={errors.name} />
              <Field label={t.form.phone} name="phone" type="tel" required error={errors.phone} />
              <Field label={t.form.date} name="date" type="date" required error={errors.date} />
              <Field label={t.form.time} name="time" type="time" required />
              <Field label={t.form.guests} name="guests" type="number" min="1" max="16" defaultValue="2" required />
              <label className="grid gap-2 sm:col-span-2">
                <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]">{t.form.note}</span>
                <textarea name="note" rows={3} className="rounded-sm border border-[var(--color-border)] bg-[var(--color-espresso)] px-4 py-3 text-sm text-[var(--text-on-dark)]" />
              </label>
            </div>
            <Button type="submit" className="mt-5 w-full">
              {t.form.submit}
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-[var(--text-on-dark)]/55">
          <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[var(--color-gold)] transition hover:underline">
            <MessageCircle size={16} className="text-[#25D366]" />
            {t.ui.reserve_whatsapp}
          </a>
        </p>
      </div>
    </section>
  );
}

function Field({ label, name, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string; error?: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]">{label}</span>
      <input
        name={name}
        className={`h-12 rounded-sm border bg-[var(--color-espresso)] px-4 text-sm text-[var(--text-on-dark)] ${error ? "border-red-500" : "border-[var(--color-border)]"}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </label>
  );
}
