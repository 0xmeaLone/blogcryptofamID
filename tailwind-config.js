// File: tailwind.config.js

const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Menggunakan Inter sebagai font utama
        sans: ['Inter', ...fontFamily.sans],
      },
    },
  },
  plugins: [
    // Memastikan plugin di-require dengan benar
    require('@tailwindcss/line-clamp'), 
    require('@tailwindcss/typography'),
  ],
}
