import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import articles from '../../data/articles'; // <-- Pastikan impor ini benar

// --- FUNGSI STATIC GENERATION ---

// 1. getStaticPaths: Memberi tahu Next.js path mana yang harus dibuat saat build
export async function getStaticPaths() {
  const paths = articles.map(article => ({
    params: { slug: article.slug },
  }));

  return { paths, fallback: false }; 
  // fallback: false berarti path yang tidak ada akan 404
}

// 2. getStaticProps: Mengambil data artikel spesifik untuk path yang diberikan
export async function getStaticProps({ params }) {
  const article = articles.find(a => a.slug === params.slug);

  if (!article) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article,
    },
  };
}

// --- KOMPONEN HALAMAN ---

const ArticleDetail = ({ article }) => {
  // Jika artikel tidak ditemukan (meskipun seharusnya tidak terjadi), tampilkan 404
  if (!article) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#dc2626' }}>404</h1>
        <p>Artikel tidak ditemukan.</p>
        <Link href="/" passHref><a style={{ color: '#4338ca' }}>Kembali ke Beranda</a></Link>
      </div>
    );
  }

  // Isi Komponen Artikel
  return (
    <>
      <Head>
        <title>{article.title} | Blog Komunitas</title>
        <meta name="description" content={`Baca artikel: ${article.title}`} />
      </Head>

      <div className="main-layout">
        <header className="header-container">
          <div className="header-content">
            <h1 className="header-title">
              <span className="header-icon">🌐</span> Blog Komunitas
            </h1>
            <Link href="/" passHref>
              <a className="back-link">
                ← Kembali ke Daftar Artikel
              </a>
            </Link>
          </div>
        </header>

        <main className="main-content article-page">
          <div className="article-wrapper">
            <h1 className="article-title">{article.title}</h1>
            <p className="article-meta">
              <span className="meta-item">🧑‍💻 Oleh {article.author}</span>
              <span className="meta-item">🗓️ Dipublikasikan pada {article.date}</span>
            </p>

            <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </main>

        <footer className="footer-container">
          <p className="footer-text">
            Dikembangkan dengan Next.js dan Vercel. © 2025 Blog Publik Kolaboratif.
          </p>
        </footer>
      </div>

      <style jsx global>{`
        /* --- COPY STYLE DARI INDEX.JS (Wajib agar header dan footer konsisten) --- */
        html { box-sizing: border-box; }
        *, *:before, *:after { box-sizing: inherit; }
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f0f4f8; 
          margin: 0;
          padding: 0;
        }
        .main-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .header-container {
          background-color: #4338ca; 
          color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          padding: 1.25rem 0;
        }
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1.5rem;
        }
        .header-title {
          font-size: 1rem; 
          font-weight: 700;
          margin: 0;
          display: flex;
          align-items: center;
        }
        .header-icon {
          margin-right: 0.5rem;
          font-size: 1rem;
        }
        .back-link {
          background-color: #6366f1;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          transition: background-color 0.2s ease;
          white-space: nowrap;
          font-size: 0.9rem;
        }
        .back-link:hover {
          background-color: #4f46e5;
        }
        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          flex-grow: 1;
          width: 100%;
          padding: 1.5rem 1.5rem;
        }
        .footer-container {
          background-color: #e5e7eb; 
          color: #4b5563; 
          padding: 1rem 1.5rem;
          text-align: center;
          margin-top: 3rem;
          font-size: 0.875rem;
        }

        /* --- ARTICLE SPECIFIC STYLES --- */
        .article-page {
          padding-top: 2rem;
          padding-bottom: 4rem;
        }
        .article-wrapper {
          background-color: white;
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }
        .article-title {
          font-size: 2rem;
          font-weight: 800;
          color: #1f2937;
          margin-top: 0;
          margin-bottom: 1rem;
          line-height: 1.25;
        }
        .article-meta {
          font-size: 0.9rem;
          color: #6b7280;
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 1rem;
        }
        .meta-item {
          margin-bottom: 0.25rem;
        }

        /* Styling Konten (Markdown) */
        .article-body {
          line-height: 1.75;
          color: #374151;
        }
        .article-body h4 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
          margin-top: 2rem;
          margin-bottom: 0.5rem;
        }
        .article-body p {
          margin-bottom: 1rem;
        }
        .article-body ul, .article-body ol {
          margin-left: 1.5rem;
          padding-left: 0;
          margin-bottom: 1rem;
        }
        .article-body li {
          margin-bottom: 0.5rem;
        }

        /* MEDIA QUERIES */
        @media (min-width: 768px) {
          .article-title {
            font-size: 2.5rem;
          }
          .article-wrapper {
            padding: 2.5rem;
          }
          .article-meta {
            flex-direction: row;
            justify-content: space-between;
          }
        }
      `}</style>
    </>
  );
};

export default ArticleDetail;
