import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base — warm-cool off-white
        "ep-bg":      "#F7F8FC",
        "ep-surface": "#FFFFFF",
        "ep-card":    "#F1F3F9",
        "ep-border":  "#E3E7F0",
        "ep-border2": "#C8CEDF",
        // Typography
        "ep-text":    "#0D1117",
        "ep-muted":   "#5E6678",
        "ep-faint":   "#9AA3B8",
        // Primary accent — Electric Blue
        "ep-accent":    "#2563EB",
        "ep-accent2":   "#1D4ED8",
        "ep-accent-bg": "#EFF6FF",
        // Emotion states
        "ep-calm":         "#0EA5E9",
        "ep-calm-bg":      "#F0F9FF",
        "ep-spark":        "#F97316",
        "ep-spark-bg":     "#FFF7ED",
        "ep-echo":         "#8B5CF6",
        "ep-echo-bg":      "#F5F3FF",
        "ep-static":       "#64748B",
        "ep-static-bg":    "#F8FAFC",
        "ep-overdrive":    "#EF4444",
        "ep-overdrive-bg": "#FEF2F2",
        "ep-hollow":       "#94A3B8",
        "ep-hollow-bg":    "#F8FAFC",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "card":       "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(37,99,235,0.06)",
        "card-hover": "0 4px 20px rgba(37,99,235,0.16), 0 1px 4px rgba(0,0,0,0.05)",
        "input":      "0 0 0 3px rgba(37,99,235,0.14)",
        "btn":        "0 2px 10px rgba(37,99,235,0.30)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
