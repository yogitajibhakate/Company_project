/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
      },
      colors: {
        brand: '#0172A7',
        'brand-dark': '#0A589F',
        heading: '#161925',
        body: '#6B7280',
      }
    },
  },
  plugins: [],
}
