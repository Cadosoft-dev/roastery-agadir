import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#3D4345",
        gold: "#C9A96E",
        ivory: "#F5F0E8",
        espresso: "#1E1A17",
        terracotta: "#B5623A",
        olive: "#5C6345",
        smoke: "#2A2E2F"
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-naskh)", "serif"]
      },
      fontSize: {
        hero: ["clamp(4rem, 8vw, 9rem)", { lineHeight: "1" }],
        h2: ["clamp(2.5rem, 4vw, 4.5rem)", { lineHeight: "1.1" }],
        h3: ["clamp(1.4rem, 2vw, 2rem)", { lineHeight: "1.3" }],
        body: ["1.0625rem", { lineHeight: "1.85" }],
        label: ["0.6875rem", { lineHeight: "1.5", letterSpacing: "0.25em" }]
      },
      backdropBlur: {
        glass: "16px"
      },
      boxShadow: {
        book: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,169,110,0.1)",
        "card-hover": "0 20px 40px rgba(0,0,0,0.3)"
      },
      animation: {
        "ken-burns": "kenBurns 10s ease-in-out infinite alternate",
        "wa-pulse": "waPulse 2s ease-out infinite",
        grain: "grainMove 0.5s steps(1) infinite"
      },
      keyframes: {
        kenBurns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" }
        },
        waPulse: {
          "0%": { transform: "scale(0.8)", opacity: "0.8" },
          "100%": { transform: "scale(2)", opacity: "0" }
        },
        grainMove: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "100% 100%" }
        }
      }
    }
  },
  plugins: []
};

export default config;
