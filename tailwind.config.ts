// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Brand Primary (Blue) ---
        primary: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          DEFAULT: "#2563eb",
        },

        // Brand alias (used in Button primary variant)
        brand: {
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },

        // --- Gold (Islamic accent) ---
        gold: {
          DEFAULT: "#d97706", // amber-600
          dark:    "#b45309", // amber-700
          light:   "#fef3c7", // amber-100
        },

        // --- Semantic status ---
        danger: "#dc2626", // red-600
        error:  "#dc2626",
        success: "#16a34a", // green-600

        // --- Text ---
        textPrimary:   "#0f172a", // slate-900
        textSecondary: "#64748b", // slate-500

        // --- UI surface tokens ---
        ink:    "#0f172a", // slate-900  — body text
        subtle: "#64748b", // slate-500  — muted text
        muted:  "#f1f5f9", // slate-100  — hover bg, disabled bg
        line:   "#e2e8f0", // slate-200  — borders
        border: "#e2e8f0",
      },

      boxShadow: {
        card:  "0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)",
        panel: "0 4px 16px -2px rgb(0 0 0 / 0.10), 0 2px 6px -2px rgb(0 0 0 / 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;