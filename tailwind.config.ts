import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#00C896",
          foreground: "#0B1426",
          muted: "#94A3B8",
        },
        arvenza: {
          bg: "#0B1426",
          surface: "#0F2040",
          accent: "#00C896",
          muted: "#94A3B8",
          text: "#F8FAFC",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        navy: {
          DEFAULT: "#0b1426",
          deep: "#071225",
          light: "#151f35",
          mid: "#1a2744",
          dark: "#071225",
        },
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #7C3AED 0%, #2563EB 58%, #06B6D4 100%)",
        "gradient-brand-soft":
          "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(37,99,235,0.07) 55%, rgba(6,182,212,0.05) 100%)",
        "gradient-trust-strip":
          "linear-gradient(135deg, #1E1458 0%, #29116F 48%, #0B3A6E 100%)",
        "gradient-dark-band":
          "linear-gradient(165deg, #071225 0%, #0B1426 48%, #111827 100%)",
        "gradient-cta":
          "linear-gradient(135deg, #6D28D9 0%, #4338CA 32%, #2563EB 68%, #1D4ED8 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "0.875rem",
        "3xl": "1rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 3px rgba(11, 20, 38, 0.04), 0 4px 16px rgba(11, 20, 38, 0.05)",
        card: "0 2px 8px rgba(11, 20, 38, 0.05), 0 8px 32px rgba(11, 20, 38, 0.07)",
        "card-hover":
          "0 8px 24px rgba(11, 20, 38, 0.08), 0 20px 48px rgba(124, 58, 237, 0.1)",
        dashboard:
          "0 28px 70px rgba(7, 18, 37, 0.45), 0 0 0 1px rgba(255,255,255,0.05) inset",
        "dashboard-glow":
          "0 32px 80px rgba(124, 58, 237, 0.2), 0 0 0 1px rgba(255,255,255,0.06) inset",
        "btn-gradient":
          "0 4px 14px rgba(124, 58, 237, 0.35), 0 2px 6px rgba(37, 99, 235, 0.2)",
        "btn-gradient-hover":
          "0 6px 20px rgba(124, 58, 237, 0.4), 0 4px 10px rgba(37, 99, 235, 0.25)",
        product:
          "0 32px 64px rgba(7, 18, 37, 0.4), 0 12px 32px rgba(7, 18, 37, 0.25)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
