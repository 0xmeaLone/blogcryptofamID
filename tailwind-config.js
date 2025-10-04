import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
  // Pastikan path konten mencakup semua komponen dan halaman
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx}', // Opsional, tetapi aman
  ],
  theme: {
    extend: {
      fontFamily: {
        // Menggunakan Inter sebagai font utama
        sans: ['Inter', ...fontFamily.sans],
      },
      colors: {
        indigo: {
          '600': '#4f46e5',
          '700': '#4338ca',
          '900': '#312e81',
        }
      }
    },
  },
  plugins: [
    // Plugins di-require di sini
    require('@tailwindcss/line-clamp'), 
    require('@tailwindcss/typography'),
  ],
};

export default config;
