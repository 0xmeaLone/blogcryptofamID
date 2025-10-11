import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
  // Pastikan path konten mencakup semua komponen dan halaman
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx}',
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
        },
        // --- PENAMBAHAN WARNA FUTURISTIK ---
        'teal-400': '#34d399', // Warna Aksen Crypto (Hijau Neon)
        'pink-500': '#ec4899', // Warna Aksen Crypto (Pink Neon)
      }
    },
  },
  plugins: [
    // Plugins di-require di sini
    require('@tailwindcss/line-clamp'), 
    require('@tailwindcss/typography'), // Penting untuk styling Markdown
  ],
};

export default config;
