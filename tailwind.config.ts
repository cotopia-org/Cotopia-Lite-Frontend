import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          background: "var(--primary-background)",
          foreground: "var(--primary-foreground)",
          label: "var(--primary-label)",
          light: "var(--primary-light)",
          body: "var(--primary-body)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        grayscale: {
          DEFAULT: "var(--grayscale)",
          light: "var(--grayscale-light)",
          subtitle: "var(--grayscale-subtitle)",
          caption: "var(--grayscale-caption)",
          paragraph: "var(--grayscale-paragraph)",
          border: "var(--grayscale-border)",
        },
        warning: {
          DEFAULT: "var(--warning)",
        },
        success: {
          DEFAULT: "var(--success)",
        },
        error: {
          DEFAULT: "var(--error)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "app-bar": "0 2px 4px rgba(0, 0, 0, 0.16)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "scale-up": {
          "0%": {
            transform: "scale(1)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "scale(1.2)",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
          "100%": {
            transform: "scale(1)",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
        },
        "slide-up": {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "scale-custom": "scale-up 0.3s ease-in-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-up": "slide-up 0.2s ease-in-out",
      },
      screens: {
        xs: "495px",
        "2xs": "200px",
      },
      width: {
        "nearly-full": "90%",
        "10.5": "10.25rem",
        wide: "666px",
      },
      height: {
        "3.25": "3.125rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
