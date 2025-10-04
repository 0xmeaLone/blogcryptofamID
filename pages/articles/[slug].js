import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Data Mock / Contoh Data
// Jika Anda menyimpan data di file terpisah (misalnya data/articles.js), 
// pastikan Anda mengimpornya di sini.
const articles = [
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

    // Menggunakan library sederhana untuk konversi Markdown jika ada
    // Untuk saat ini, kita biarkan saja sebagai teks biasa agar tidak error
    return { props: { article } };
}


// --- Komponen Tampilan Utama Artikel ---

const ArticleDetail = ({ article }) => {
    const router = useRouter(); 

    if (router.isFallback || !article) {
        return <div className="loading-state">Memuat atau Artikel Tidak Ditemukan...</div>;
    }
    
    // Fungsi sederhana untuk merender baris baru sebagai paragraf
    const renderContent = (content) => {
        return content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('##') || paragraph.startsWith('#')) {
                // Biarkan Heading tetap diinterpretasikan oleh CSS
                return <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />;
            }
            // Tambahkan paragraf
            return <p key={index}>{paragraph}</p>;
        });
    };

    return (
        <div className="page-container">
            <Head>
                <title>{article.title} | Blog Komunitas</title>
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
                    <div className="article-body">
                        {renderContent(article.content)}
                    </div>
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
                
                .loading-state {
                    text-align: center;
                    padding-top: 5rem;
                    font-size: 1.25rem;
                    color: var(--gray-700);
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

