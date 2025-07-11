/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F9F0',
          100: '#DCF2DC',
          200: '#BBE5BB',
          300: '#8DD48D',
          400: '#5ABE5A',
          500: '#36A936',
          600: '#2A8A2A',
          700: '#236F23',
          800: '#1F5A1F',
          900: '#1A4A1A',
        },
        secondary: {
          50: '#FEF7ED',
          100: '#FDEBD0',
          200: '#FAD5A5',
          300: '#F6B870',
          400: '#F1953A',
          500: '#ED7B1A',
          600: '#DE5F0F',
          700: '#B8470F',
          800: '#923914',
          900: '#762F14',
        },
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        earth: {
          50: '#F7F3F0',
          100: '#EDE4DB',
          200: '#D9C7B7',
          300: '#C4A68F',
          400: '#B08968',
          500: '#8B6F47',
          600: '#6F5A3A',
          700: '#54452E',
          800: '#3A3023',
          900: '#211C18',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'heritage-pattern': "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%2336A936\" fill-opacity=\"0.05\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"3\"/%3E%3Ccircle cx=\"13\" cy=\"13\" r=\"3\"/%3E%3C/g%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}