/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7F8FA',
        ink: '#14171F',
        muted: '#5B6273',
        line: '#E4E7EE',
        cobalt: {
          DEFAULT: '#3457D5',
          light: '#5B78E5',
          dark: '#25409E',
        },
        mint: '#00C2A8',
        amber: '#E8862E',
        coral: '#E14F63',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        soft: '0 12px 32px rgba(20, 23, 31, 0.08)',
      },
    },
  },
  plugins: [],
};
