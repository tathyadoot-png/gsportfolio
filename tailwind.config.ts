import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Essential Tricolor Palette
        orange: "var(--color-orange)",
        white: "var(--color-white)",
        green: "var(--color-green)",

        // UI Core
        primary: "var(--color-orange)", 
        secondary: "var(--color-green)", 
        
        text: "var(--color-text)",
        muted: "var(--color-text-muted)",
        bg: "var(--color-bg)",
        "bg-soft": "var(--color-bg-soft)",
        border: "var(--color-border)",
      },
      fontFamily: {
        amita: ['"Amita"', 'serif'],
        asar: ['"Asar"', 'serif'],
        gotu: ['"Gotu"', 'sans-serif'],
        playpen: ['"Playpen Sans Deva"', 'sans-serif'],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.05)",
        navbar: "0 2px 10px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;