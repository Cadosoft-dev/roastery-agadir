"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeContextValue = {
  chefsMode: boolean;
  toggleChefsMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [chefsMode, setChefsMode] = useState(false);

  useEffect(() => {
    setChefsMode(window.localStorage.getItem("roastery_chef_mode") === "true");
  }, []);

  useEffect(() => {
    document.body.classList.toggle("chefs-table-mode", chefsMode);
    window.localStorage.setItem("roastery_chef_mode", chefsMode ? "true" : "false");
  }, [chefsMode]);

  useEffect(() => {
    if (!chefsMode || window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (event: MouseEvent) => {
      const dot = document.createElement("span");
      dot.className = "candle-trail";
      dot.style.left = `${event.clientX}px`;
      dot.style.top = `${event.clientY}px`;
      document.body.appendChild(dot);
      window.setTimeout(() => dot.remove(), 650);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [chefsMode]);

  const value = useMemo(
    () => ({ chefsMode, toggleChefsMode: () => setChefsMode((mode) => !mode) }),
    [chefsMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used inside ThemeProvider");
  }
  return context;
}
