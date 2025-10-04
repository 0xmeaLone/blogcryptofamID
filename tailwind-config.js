/** @type {import('tailwindcss').Config} */
module.exports = {
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
