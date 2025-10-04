// File: tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Pastikan path ini mencakup semua file React Anda (.js, .jsx, .ts, .tsx)
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx}', // Opsional, tetapi aman
  ],
  theme: {
    extend: {
      // Menambahkan font Inter
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Mendefinisikan warna kustom jika diperlukan
        indigo: {
          '600': '#4f46e5',
          '700': '#4338ca',
          '900': '#312e81',
        }
      }
    },
  },
  plugins: [
    // Wajib diinstal: npm install @tailwindcss/line-clamp
    require('@tailwindcss/line-clamp'), 
    // Wajib diinstal: npm install @tailwindcss/typography
    require('@tailwindcss/typography'),
  ],
}
