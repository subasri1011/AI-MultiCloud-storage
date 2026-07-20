/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Core neutrals — cool paper white background, near-navy ink
        paper: "#F7F8FA",
        surface: "#FFFFFF",
        ink: "#14171F",
        muted: "#5B6273",
        line: "#E4E7EE",
        // Brand accents
        cobalt: {
          DEFAULT: "#3457D5",
          light: "#5B78E5",
          dark: "#25409E",
          50: "#EEF1FD",
        },
        mint: {
          DEFAULT: "#00C2A8",
          light: "#4FE0CB",
          dark: "#00967F",
        },
        amber: {
          DEFAULT: "#E8862E",
          light: "#FBEBD9",
        },
        coral: {
          DEFAULT: "#E14F63",
          light: "#FCEBEE",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,23,31,0.04), 0 8px 24px -12px rgba(20,23,31,0.10)",
        panel: "0 4px 16px rgba(20,23,31,0.06)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
