"use client";

import Image from "next/image";
import Link from "next/link";
import { Flame, Menu, Volume2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useThemeMode } from "@/components/providers/ThemeProvider";
import { Button } from "@/components/ui/Button";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t } = useLanguage();
  const { chefsMode, toggleChefsMode } = useThemeMode();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#menu", label: t.nav.menu },
    { href: "#experience", label: t.nav.experience },
    { href: "#reservations", label: t.nav.reserve },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#contact", label: t.nav.contact }
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-[var(--color-border)] bg-[var(--color-glass)] py-2 backdrop-blur-glass" : "py-5"
      )}
    >
      <nav className="section-shell flex items-center justify-between gap-6">
        <Link href="#top" aria-label="ROASTERY Agadir home" className="flex items-center gap-3">
          <Image
            src="/logo/roastery-logo.jpeg"
            alt="ROASTERY Agadir logo"
            width={48}
            height={48}
            className="h-10 w-10 rounded-sm object-cover"
            priority
          />
          <span className="hidden text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)] sm:inline">
            Roastery
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-[0.74rem] font-medium uppercase tracking-[0.12em] text-[var(--text-on-dark)]/80 transition hover:text-[var(--color-gold)]"
            >
              {link.label}
              <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-[var(--color-gold)] transition group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageToggle />
          <button
            type="button"
            onClick={toggleChefsMode}
            className={cn(
              "grid h-10 w-10 place-items-center rounded-sm border border-[var(--color-border)] text-[var(--color-gold)] transition",
              chefsMode && "drop-shadow-[0_0_8px_var(--chef-gold)]"
            )}
            title={chefsMode ? t.ui.standard : t.ui.chefs}
            aria-pressed={chefsMode}
          >
            <Flame size={18} />
          </button>
          <button
            type="button"
            onClick={() => setSoundOn((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-sm border border-[var(--color-border)] text-[var(--text-on-dark)]"
            title="Ambient sound"
            aria-pressed={soundOn}
          >
            <Volume2 size={18} className={soundOn ? "text-[var(--color-gold)]" : ""} />
          </button>
          <Button href="#reservations" variant="ghost">
            {t.nav.reserve}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="grid h-11 w-11 place-items-center rounded-sm border border-[var(--color-border)] text-[var(--color-gold)] lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={21} />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[60] bg-[var(--color-espresso)] px-8 py-7 lg:hidden">
          <div className="flex items-center justify-between">
            <Image src="/logo/roastery-logo.jpeg" alt="ROASTERY Agadir logo" width={52} height={52} className="rounded-sm" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-11 w-11 place-items-center rounded-sm border border-[var(--color-border)] text-[var(--color-gold)]"
              aria-label="Close navigation"
            >
              <X size={22} />
            </button>
          </div>
          <div className="mt-16 grid gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-5xl font-light text-[var(--text-on-dark)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="absolute inset-x-8 bottom-10 flex items-center justify-between">
            <LanguageToggle compact />
            <button type="button" onClick={toggleChefsMode} className="text-[var(--color-gold)]" aria-pressed={chefsMode}>
              <Flame size={23} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
