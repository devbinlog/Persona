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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "ep-dark": "#0a0a0f",
        "ep-surface": "#13131a",
        "ep-border": "#1e1e2a",
        "ep-accent": "#7c6aff",
        "ep-accent-glow": "#7c6aff33",
        "ep-calm": "#4a9eff",
        "ep-spark": "#f0a830",
        "ep-echo": "#9b59b6",
        "ep-static": "#666680",
        "ep-overdrive": "#ff4757",
        "ep-hollow": "#2c2c3e",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
