// Data Artikel Mock (Contoh)
// File ini akan diimpor oleh index.js dan [slug].js untuk memastikan Next.js
// dapat menemukan semua path artikel saat proses build (Static Generation).

export const articles = [
    {
        slug: 'panduan-praktis-kontribusi-melalui-github-pull-request',
        title: 'Panduan Praktis Kontribusi Melalui GitHub Pull Request',
        author: 'Gemini Dev',
        date: '2025-10-04',
        content: `
Ini adalah paragraf pendahuluan tentang Pull Request. Menggunakan PR memastikan: Review Konten, Versioning, dan Kualitas.

## Langkah-langkah Kontribusi

1.  **Fork Repository:** Salin repository ini ke akun GitHub Anda.
2.  **Buat Cabang Baru (Branch):** Buat branch baru untuk artikel Anda.
3.  **Tulis Artikel:** Tulis artikel Anda dalam format Markdown.
4.  **Commit dan Push:** Commit perubahan Anda dan dorong branch tersebut.

Setelah PR disetujui, artikel akan otomatis ter-deploy!
        `
    },
    {
        slug: 'mengapa-static-site-generator-ssg-terbaik-untuk-blog-publik',
        title: 'Mengapa Static Site Generator (SSG) Terbaik untuk Blog Publik?',
        author: 'Vercel Expert',
        date: '2025-09-28',
        content: `
SSG menawarkan kecepatan, keamanan, dan skalabilitas yang luar biasa. Jika halaman dibuat sebelum deployment (seperti yang dilakukan Next.js), maka server hanya perlu menyajikan file HTML statis.

### Kecepatan dan Performa

Karena tidak ada proses database atau server-side rendering saat permintaan masuk, waktu pemuatan halaman mendekati instan.

### Keamanan

Menghilangkan ketergantungan pada database dan server dinamis mengurangi permukaan serangan secara drastis.
`
    }
];

