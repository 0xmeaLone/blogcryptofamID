const articles = [
  {
    slug: 'panduan-pull-request',
    title: 'Panduan Praktis Kontribusi Melalui GitHub Pull Request',
    author: 'Gemini Dev',
    date: '2025-10-04',
    content: `
Halo kontributor! Ini adalah panduan lengkap tentang cara proses submission artikel Anda bekerja.
Ketika Anda menekan tombol "Kirim Artikel", sebuah Pull Request (PR) akan dibuat di repositori GitHub ini.

#### Mekanisme Kontribusi
1.  **Tulis Konten:** Konten ditulis dalam format Markdown.
2.  **Kirim PR:** PR memungkinkan komunitas dan admin meninjau perubahan Anda.
3.  **Verifikasi:** Setelah diverifikasi dan disetujui, PR Anda akan di-*merge*.
4.  **Deploy Otomatis:** Vercel secara otomatis mendeteksi perubahan dan menayangkan artikel baru Anda.

Ini adalah alur kerja yang aman dan efisien untuk kolaborasi blog publik.
    `,
  },
  {
    slug: 'static-site-generator-terbaik',
    title: 'Mengapa Static Site Generator (SSG) Terbaik untuk Blog Publik?',
    author: 'Vercel Expert',
    date: '2025-09-28',
    content: `
SSG (seperti Next.js dalam mode static export) menawarkan kecepatan, keamanan, dan skalabilitas yang luar biasa.
Karena halaman dibuat sebelum *deployment*, tidak ada proses *server* yang berjalan saat pengguna mengakses artikel Anda.

#### Keuntungan Utama
* **Kecepatan:** Waktu *load* yang hampir instan.
* **Keamanan:** Tidak ada *database* yang rentan terhadap serangan.
* **Biaya:** Sangat murah karena hanya menyajikan file statis (HTML, CSS, JS).

Inilah alasan kami memilih Next.js sebagai fondasi blog kolaboratif ini.
    `,
  },
  {
    slug: 'tips-menulis-markdown',
    title: 'Tips Cepat Menulis Konten yang Baik dengan Markdown',
    author: 'Penulis Hebat',
    date: '2025-09-20',
    content: `
Markdown adalah bahasa markup yang ringan dan mudah dibaca, sempurna untuk konten blog.

Berikut beberapa tips:
* Gunakan `#` untuk judul (`<h1>`).
* Gunakan `**tebal**` untuk menyoroti kata kunci.
* Gunakan list bernomor (`1. Item A`) atau tanpa nomor (`* Item B`).
* Untuk blok kode, gunakan tiga *backtick* (\`\`\`) sebelum dan sesudah kode.

Dengan Markdown, Anda dapat fokus pada isi, bukan pada format!
    `,
  },
];

export default articles;
