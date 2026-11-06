/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF8F3',
        porcelain: '#FFFFFF',
        sand: '#F3EDE3',
        linen: '#EAE2D5',
        champagne: '#E9D7AE',
        blush: '#F4E1DA',
        mist: '#E6ECEA',
        gold: '#B08A3E',
        'deep-gold': '#8A6A2B',
        'rose-gold': '#C99283',
        charcoal: '#2B2621',
        taupe: '#7A6F63',
        rosewood: '#9C4A4F',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(43,38,33,0.04)',
        'warm-md': '0 8px 24px -6px rgba(120,90,40,0.12)',
        'warm-lg': '0 12px 40px -12px rgba(120,90,40,0.18)',
        'warm-xl': '0 20px 50px -15px rgba(120,90,40,0.22)',
      },
    },
  },
  plugins: [],
};
