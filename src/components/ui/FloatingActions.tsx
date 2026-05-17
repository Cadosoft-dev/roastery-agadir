"use client";

import { ArrowUp, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { siteConfig } from "@/lib/constants";

export function FloatingActions() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(true);

  useEffect(() => {
    setCookiesAccepted(window.localStorage.getItem("roastery_cookies") === "accepted");
    const onScroll = () => setVisible(window.scrollY > window.innerHeight / 2);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const acceptCookies = () => {
    window.localStorage.setItem("roastery_cookies", "accepted");
    setCookiesAccepted(true);
  };

  return (
    <>
      <a
        href={siteConfig.whatsappHref}
        aria-label={t.ui.whatsapp}
        className="fixed bottom-6 right-6 z-[9998] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[var(--color-ivory)] shadow-2xl transition hover:scale-105 max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2"
      >
        <span className="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-[#25D366]" />
        <MessageCircle size={25} />
      </a>

      <button
        type="button"
        aria-label={t.ui.top}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-7 left-6 z-[9998] grid h-10 w-10 place-items-center rounded-sm border border-[var(--color-border)] bg-[var(--color-smoke)] text-[var(--color-gold)] transition ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <ArrowUp size={18} />
      </button>

      {!cookiesAccepted && (
        <div className="fixed inset-x-0 bottom-0 z-[9998] border-t border-[var(--color-border)] bg-[var(--color-espresso)] px-5 py-4 text-sm text-[var(--text-on-dark)]">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 max-sm:flex-col max-sm:items-start">
            <p>{t.ui.cookies}</p>
            <button
              type="button"
              onClick={acceptCookies}
              className="rounded-sm bg-[var(--color-gold)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-espresso)]"
            >
              {t.ui.accept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
