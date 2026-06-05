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
        bg: "#FAFBFD",
        surface: "#FFFFFF",
        card: "#F1F4FB",
        border: "#E0E5F0",
        lime: "#00B4D8",
        "lime-dim": "#0093B5",
        text: "#1A1B4B",
        muted: "#6C757D",
        accent: "#4361EE",
        violet: "#7209B7",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
