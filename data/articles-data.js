// File: data/articles-data.js

export const articles = [
    {
        slug: 'panduan-kontribusi-github',
        title: 'Panduan Praktis Kontribusi Melalui GitHub Pull Request',
        author: 'Gemini Dev',
        email: 'gemini@example.com',
        date: '2025-10-04',
        content: 'Halo kontributor! Ini adalah panduan lengkap tentang cara proses submission artikel Anda bekerja. Ketika Anda menekan tombol "Kirim Artikel", sebuah Pull Request (PR) akan dibuat secara otomatis di repositori GitHub kami. Anda dapat melihat PR tersebut, dan setelah disetujui dan di-merge oleh moderator, artikel Anda akan otomatis muncul di situs ini berkat Vercel. Proses ini memastikan kualitas dan keamanan konten yang dipublikasikan. Selamat menulis!',
    },
    {
        slug: 'kenapa-memilih-ssg',
        title: 'Mengapa Static Site Generator (SSG) Terbaik untuk Blog Publik?',
        author: 'Vercel Expert',
        email: 'vercel@example.com',
        date: '2025-09-28',
        content: 'SSG (seperti Next.js dalam mode static export) menawarkan kecepatan, keamanan, dan skalabilitas yang luar biasa. Karena halaman dibuat sebelumnya (pre-rendered) saat build, tidak ada server yang perlu di-query saat permintaan, menjadikannya sangat cepat. Selain itu, dengan GitHub PR sebagai CMS, kita meminimalkan risiko keamanan yang sering terjadi pada CMS tradisional.',
    },
    {
        slug: 'tips-menulis-markdown',
        title: 'Tips Cepat Menulis Konten yang Baik dengan Markdown',
        author: 'Penulis Hebat',
        email: 'writer@example.com',
        date: '2025-09-20',
        content: 'Markdown adalah format yang sangat sederhana dan kuat untuk menulis konten. Gunakan `#` untuk judul, `**tebal**` untuk kata penting, dan list dengan `-` atau `1.`. Hindari kode HTML kompleks. Konten yang bersih dan terstruktur akan lebih cepat disetujui oleh moderator! Ini akan membantu pembaca kami untuk fokus pada isi pesan yang ingin Anda sampaikan.',
    },
];
