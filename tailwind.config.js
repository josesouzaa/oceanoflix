/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            400: '#00FC97'
          },
          blue: {
            400: '#0C30AD',
            900: '#1A222D'
          }
        }
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
}
