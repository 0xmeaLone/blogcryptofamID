/** @type {import('tailwindcss').Config} */
module.exports = {/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tentukan file mana yang harus dipindai oleh Tailwind
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    // Wajib: Plugin untuk membatasi baris teks (digunakan di daftar artikel)
    require('@tailwindcss/line-clamp'),
    // Tambahan: Plugin untuk styling Markdown yang lebih baik di halaman detail
    require('@tailwindcss/typography'),
  ],
}
  // Tentukan file mana yang harus dipindai oleh Tailwind untuk kelas CSS
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Menambahkan font Inter sebagai default (direkomendasikan)
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    // Plugin yang sangat berguna untuk membatasi baris teks (WAJIB ADA)
    require('@tailwindcss/line-clamp'),
  ],
}
