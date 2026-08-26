import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#1d4ed8",
          600: "#1d4ed8",
          700: "#1e40af",
          900: "#1e3a8a",
        },
        violet: { 500: "#6366f1" },
        ink: "#020617",
        muted: "#6b7280",
        line: "#e5e7eb",
        surface: "#f9fafb",
        dark: "#020617",
        "dark-line": "#111827",
        pos: "#16a34a",
        warn: "#f97316",
        danger: "#dc2626",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        display: "-0.02em",
      },
      borderRadius: {
        sm: "0.5rem",
        md: "0.625rem",
        lg: "1rem",
        xl: "1.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,23,42,0.06)",
        card: "0 10px 30px rgba(15,23,42,0.12)",
        elevated: "0 24px 60px rgba(15,23,42,0.18)",
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
