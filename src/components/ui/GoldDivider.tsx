"use client";

import { motion } from "framer-motion";

type Props = {
  className?: string;
  width?: string;
};

export function GoldDivider({ className = "", width }: Props) {
  return (
    <motion.div
      className={`gold-divider ${className}`}
      style={{ width: width ?? "100%" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "linear" }}
    />
  );
}
