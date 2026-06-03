/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nautilus: {
          50:  '#faf8f4',
          100: '#f7f4ee',
          200: '#e7ded0',
          300: '#d6be92',
          400: '#c9ab7a',
          500: '#B79B6C',
          600: '#a08550',
          700: '#8a6f3e',
          800: '#6f5830',
          900: '#4a3a1f',
        },
        stone: {
          50: '#faf8f4',
          600: '#6f6559',
          700: '#5a5047',
          800: '#3d3530',
          900: '#2C2C2C',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
