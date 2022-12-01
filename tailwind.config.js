/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        //main theme colors
        primary: 'var(--mainColor)',
        secondary: 'var(--secondColor)'
      }
    }
  },
  plugins: []
}
