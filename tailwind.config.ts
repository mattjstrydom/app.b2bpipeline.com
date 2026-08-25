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
        ink: "#0f172a",
        muted: "#64748b",
        line: "#e2e8f0",
        surface: "#f8fafc",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.03em",
        display: "-0.02em",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      maxWidth: {
        content: "72rem",
      },
      spacing: {
        section: "5rem",
      },
    },
  },
  plugins: [],
};

export default config;
