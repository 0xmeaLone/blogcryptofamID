import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Asumsi Anda memiliki data artikel statis di folder 'data'
// Kita akan menggunakan data mock untuk saat ini
const articles = [
    {
        slug: 'panduan-praktis-kontribusi-melalui-github-pull-request',
        title: 'Panduan Praktis Kontribusi Melalui GitHub Pull Request',
        author: 'Gemini Dev',
        date: '2025-10-04',
        content: `
# Pendahuluan

Halo kontributor! Ini adalah panduan lengkap tentang cara proses submission artikel Anda bekerja. Ketika Anda menekan tombol "Kirim Artikel", sebuah Pull Request (PR) otomatis dibuat di repository GitHub kami.

## Mengapa Menggunakan Pull Request?

Menggunakan PR memastikan:
1.  **Review Konten:** Konten Anda dapat ditinjau oleh editor sebelum dipublikasikan.
2.  **Versioning:** Setiap perubahan tercatat dengan baik dalam sejarah Git.
3.  **Kualitas:** Memastikan artikel memenuhi standar komunitas.

## Langkah-langkah Kontribusi

1.  **Fork Repository:** Salin repository ini ke akun GitHub Anda.
2.  **Buat Cabang Baru (Branch):** Buat branch baru untuk artikel Anda (e.g., \`feat/judul-artikel-anda\`).
3.  **Tulis Artikel:** Tulis artikel Anda dalam format **Markdown** (misalnya, \`my-article.md\`). Pastikan format heading, list, dan kode sudah benar.
4.  **Commit dan Push:** Commit perubahan Anda dan dorong (\`push\`) branch tersebut ke repository fork Anda.
5.  **Buka Pull Request:** Buka PR baru dari branch Anda ke branch \`main\` di repository utama.

Setelah PR Anda disetujui dan digabungkan (merged), artikel Anda akan otomatis ter-deploy ke blog komunitas!
        `
    },
    {
        slug: 'mengapa-static-site-generator-ssg-terbaik-untuk-blog-publik',
        title: 'Mengapa Static Site Generator (SSG) Terbaik untuk Blog Publik?',
        author: 'Vercel Expert',
        date: '2025-09-28',
        content: `# Keunggulan SSG
Static Site Generator (SSG) seperti Next.js (dalam mode static export) menawarkan kecepatan, keamanan, dan skalabilitas yang luar biasa. Jika halaman dibuat sebelum deployment (seperti yang dilakukan Next.js), maka server hanya perlu menyajikan file HTML statis.

## Kecepatan dan Performa
Karena tidak ada proses database atau server-side rendering saat permintaan masuk, waktu pemuatan halaman mendekati instan.

## Keamanan
Menghilangkan ketergantungan pada database dan server dinamis mengurangi permukaan serangan secara drastis.

---
Konten disajikan sebagai contoh saja.
`
    }
];

// --- Fungsi Pengambilan Data Next.js ---

// 1. getStaticPaths: Menentukan path mana yang akan di-generate saat build
export async function getStaticPaths() {
    const paths = articles.map(article => ({
        params: { slug: article.slug },
    }));

    return { paths, fallback: false }; // fallback: false berarti halaman yang tidak ada akan 404
}

// 2. getStaticProps: Mengambil data untuk path spesifik
export async function getStaticProps({ params }) {
    const article = articles.find(a => a.slug === params.slug);

    if (!article) {
        return { notFound: true };
    }

    return { props: { article } };
}


// --- Komponen Tampilan Utama Artikel ---

const ArticleDetail = ({ article }) => {
    // Digunakan untuk menangani URL lokal saat development
    const router = useRouter(); 

    if (router.isFallback) {
        return <div>Memuat...</div>;
    }

    return (
        <div className="page-container">
            <Head>
                <title>{article.title} | Blog Komunitas</title>
                <meta name="description" content={article.content.substring(0, 150)} />
            </Head>
            
            <header className="article-header">
                <Link href="/" passHref>
                    <a className="back-link">← Kembali ke Daftar Artikel</a>
                </Link>
            </header>

            <main className="article-main">
                <article className="article-content-wrapper">
                    <h1 className="article-title">{article.title}</h1>
                    
                    <div className="article-meta">
                        <span className="meta-item author-icon">🧑‍💻 Oleh {article.author}</span>
                        <span className="meta-item date-icon">📅 Dipublikasikan pada {article.date}</span>
                    </div>

                    <p className="article-intro">
                        Artikel ini dikirimkan oleh komunitas dan diverifikasi melalui GitHub Pull Request.
                    </p>

                    {/* Konten Artikel Sebenarnya */}
                    <div className="article-body" dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(article.content) }} />
                </article>
            </main>
            
            {/* --- CSS MURNI UNTUK HALAMAN ARTIKEL --- */}
            <style jsx global>{`
                /* --- Variabel Warna --- */
                :root {
                    --indigo-700: #4338ca;
                    --gray-900: #1f2937;
                    --gray-700: #374151;
                }

                /* Reset CSS */
                .page-container {
                    padding: 0;
                    margin: 0 auto;
                    max-width: 100%;
                }
                
                /* Header Artikel (Mirip Header di index.js) */
                .article-header {
                    background-color: #ffffff;
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid #e5e7eb;
                    margin-bottom: 2rem;
                }
                
                .back-link {
                    color: var(--indigo-700);
                    font-weight: 600;
                    text-decoration: none;
                    font-size: 1rem;
                    display: inline-flex;
                    align-items: center;
                }
                .back-link:hover {
                    color: var(--gray-700);
                }

                /* Main Content dan Padding Responsif */
                .article-main {
                    padding: 0 1rem; /* Padding lebih kecil di mobile */
                    margin: 0 auto;
                    max-width: 100%;
                }
                @media (min-width: 768px) {
                    .article-main {
                        padding: 0 2rem;
                        max-width: 800px; /* Lebar maksimum untuk kenyamanan baca di desktop */
                    }
                }

                /* Styling Utama Artikel */
                .article-content-wrapper {
                    background-color: #ffffff;
                    padding: 1.5rem;
                    border-radius: 0.75rem; 
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
                    margin-bottom: 3rem;
                }
                @media (min-width: 768px) {
                    .article-content-wrapper {
                        padding: 2.5rem; 
                    }
                }

                .article-title {
                    font-size: 2rem;
                    font-weight: 800;
                    color: var(--gray-900);
                    margin-top: 0;
                    margin-bottom: 1rem;
                    line-height: 1.2;
                }
                @media (min-width: 768px) {
                    .article-title {
                        font-size: 2.5rem;
                    }
                }

                .article-meta {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    font-size: 0.875rem;
                    color: var(--gray-700);
                    margin-bottom: 1rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 1px dashed #e5e7eb;
                }

                .article-intro {
                    font-style: italic;
                    color: #9ca3af; /* gray-400 */
                    margin-bottom: 2rem;
                    font-size: 0.9rem;
                }

                /* Styling Konten Markdown (Sangat Penting) */
                .article-body h1, .article-body h2, .article-body h3 {
                    color: var(--gray-900);
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    line-height: 1.3;
                    border-bottom: 1px solid #f3f4f6; /* Garis pemisah tipis */
                    padding-bottom: 0.3rem;
                }
                .article-body h1 { font-size: 2.25rem; }
                .article-body h2 { font-size: 1.75rem; font-weight: 700; }
                .article-body h3 { font-size: 1.4rem; font-weight: 600; }
                
                .article-body p {
                    margin-bottom: 1.5rem;
                    line-height: 1.65;
                    color: #4b5563; /* gray-600 */
                }

                .article-body ul, .article-body ol {
                    margin-bottom: 1.5rem;
                    padding-left: 1.5rem;
                }
                .article-body li {
                    margin-bottom: 0.5rem;
                    line-height: 1.6;
                }
                
                .article-body code {
                    background-color: #f3f4f6;
                    padding: 0.2rem 0.4rem;
                    border-radius: 0.3rem;
                    font-family: monospace;
                    font-size: 0.9rem;
                }
                
                .article-body pre {
                    background-color: var(--gray-900);
                    color: #ffffff;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    overflow-x: auto;
                    margin-bottom: 1.5rem;
                }
            `}</style>
        </div>
    );
};

export default ArticleDetail;


// --- Fungsi Pembantu (Untuk Konversi Markdown) ---
// Next.js tidak merender Markdown secara default, jadi kita butuh fungsi sederhana
// untuk mengubah Markdown menjadi HTML.
function convertMarkdownToHTML(markdown) {
    // Konversi Heading
    markdown = markdown.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    markdown = markdown.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    markdown = markdown.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Konversi List (sangat dasar, bisa diperluas)
    markdown = markdown.replace(/^\* (.*$)/gim, '<li>$1</li>');
    markdown = markdown.replace(/^(<li>.*<\/li>)$/s, '<ul>$1</ul>');
    
    // Konversi Bold
    markdown = markdown.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');

    // Konversi Paragraph (ganti newline ganda dengan tag p)
    const lines = markdown.split('\n');
    let html = '';
    let inList = false;
    
    lines.forEach(line => {
        // Handle list logic to avoid wrapping <li> in <p>
        if (line.startsWith('<li>')) {
            html += line + '\n';
            inList = true;
        } else if (inList) {
            html += '</ul>\n<p>' + line + '</p>\n';
            inList = false;
        } else if (line.trim() !== '') {
            html += '<p>' + line + '</p>\n';
        }
    });

    return html;
}

