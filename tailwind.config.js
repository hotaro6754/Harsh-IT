/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0B0F14',
          light: '#F8FAFC',
        },
        card: {
          DEFAULT: '#111827',
          light: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#4F9CF9',
          light: '#3B82F6',
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'matrix-blink': 'matrix-blink 1s step-end infinite',
      },
      keyframes: {
        'matrix-blink': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
