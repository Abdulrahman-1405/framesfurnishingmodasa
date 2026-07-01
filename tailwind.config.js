/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          light: '#7F9A4E',
          DEFAULT: '#556B2F',
          dark: '#3A4C1F',
        },
        beige: {
          light: '#FAF9F6',
          DEFAULT: '#F5F1E8',
          dark: '#E8E2D2',
        },
        walnut: {
          light: '#8B6A52',
          DEFAULT: '#6B4F3B',
          dark: '#4C3627',
        },
        stone: {
          light: '#A0A0A0',
          DEFAULT: '#808080',
          dark: '#606060',
        },
        luxury: {
          charcoal: '#121212',
          black: '#0A0A0A',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        sans: ['Inter', 'Montserrat', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
