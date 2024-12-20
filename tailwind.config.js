/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          100: '#FFE5E5',
          200: '#FFB3B3',
          600: '#6B0F1A',
        },
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        arial: ['Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
} 