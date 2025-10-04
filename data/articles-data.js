
// data/articles-data.js

// This data simulates content loaded from real Markdown files 
// in a proper Next.js Static Site Generator (SSG) setup.
export const articles = [
  { 
    slug: 'pengenalan-workflow-git', 
    title: 'Membuat Blog Publik dengan Alur Kerja Git', 
    authorName: 'Admin', 
    content: 'Alur kerja ini memanfaatkan GitHub Pull Request (PR) sebagai mekanisme peninjauan konten. Ini sangat efisien, aman, dan mempermudah kontribusi dari komunitas.', 
    date: '2025-05-15', 
    fullContent: `Ini adalah artikel mendalam tentang bagaimana Static Site Generator (SSG) seperti Next.js dipadukan dengan GitHub Actions dan Vercel untuk menciptakan Continuous Integration/Continuous Deployment (CI/CD) yang mulus. 
    
Keunggulannya adalah kecepatan loading super cepat karena file yang disajikan adalah HTML statis, dan keamanan tinggi karena tidak ada database server-side yang rentan.

### Keuntungan Utama
1.  **Kecepatan:** Blog sangat cepat karena sudah di-pre-render.
2.  **Keamanan:** Mengurangi risiko serangan database.
3.  **Kolaborasi:** Memanfaatkan Pull Request untuk review konten.` 
  },
  { 
    slug: 'vercel-ci-cd', 
    title: 'Otomatisasi Deployment Cepat dengan Vercel', 
    authorName: 'John Doe', 
    content: 'Vercel secara otomatis mendeteksi perubahan di GitHub dan langsung melakukan deployment tanpa intervensi manual, memastikan konten terbaru selalu tayang.', 
    date: '2025-05-10', 
    fullContent: `Vercel mempermudah developer dengan fitur Zero-Config Deployment. Setelah Anda menghubungkan repositori GitHub Anda, setiap kali ada commit baru ke branch utama (main), Vercel secara instan akan menjalankan proses build dan menyediakan URL deployment baru. 
    
Bahkan, Vercel dapat membuat 'Preview Deployment' untuk setiap Pull Request, memungkinkan admin melihat hasil akhir artikel sebelum di-merge.` 
  },
];
