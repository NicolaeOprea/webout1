/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F1E8',
        'olive-dark': '#6B8E23',
        'olive': '#9CAF88',
        'olive-light': '#C4D96F',
        terracotta: '#D97760',
        'terracotta-light': '#E8A89F',
        'stone': '#8B8680',
        'stone-light': '#B5B0AB',
      },
      fontFamily: {
        serif: ['SaporeSerif', 'Georgia', 'serif'],
        sans: ['SaporeSans', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
