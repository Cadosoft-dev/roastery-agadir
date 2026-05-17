"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const words = t.hero.tagline.split(" ");

  return (
    <section ref={ref} id="top" className="relative grid min-h-svh place-items-center overflow-hidden bg-[var(--color-espresso)]">
      <motion.div className="absolute inset-0" style={{ y: videoY }}>
        <video
          className="h-full w-full object-cover opacity-80"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80"
        >
          <source src="https://videos.pexels.com/video-files/3195650/3195650-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(30,26,23,0.78)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[var(--color-espresso)]" />

      <div className="section-shell relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <SectionLabel>{t.hero.place}</SectionLabel>
        </motion.div>
        <h1 className="font-display mt-8 text-hero font-light text-[var(--color-ivory)]">
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className="inline-block pe-5"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 + index * 0.15 }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          className="font-display mx-auto mt-5 max-w-2xl text-2xl italic text-[var(--text-on-dark)]/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          {t.hero.subline}
        </motion.p>
        <motion.div
          className="mt-10 flex justify-center gap-4 max-sm:flex-col max-sm:items-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
        >
          <Button href="#reservations">{t.hero.cta_reserve}</Button>
          <Button href="#menu" variant="ghost">
            {t.hero.cta_menu}
          </Button>
        </motion.div>
      </div>

      <motion.a
        href="#experience"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[var(--color-gold)]"
        aria-label="Scroll down"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={22} />
      </motion.a>
    </section>
  );
}
