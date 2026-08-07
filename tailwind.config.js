/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        foreground: '#F3F4F6',
        card: '#121A2F',
        'card-hover': '#1A2542',
        border: 'rgba(255, 255, 255, 0.1)',
        primary: {
          DEFAULT: '#00F5A0',
          foreground: '#0B0F19',
        },
        accent: {
          cyan: '#00D2FF',
          purple: '#A855F7',
          pink: '#EC4899',
          gold: '#FFD700',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
