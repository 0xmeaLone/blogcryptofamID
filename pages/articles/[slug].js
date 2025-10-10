import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
// NOTE: Mengganti path impor ini dengan file dummy karena dependensi tidak tersedia
import articles from '../../data/articles'; 

// DUMMY DATA START (untuk memastikan kode dapat berjalan)
const articles = [
    { 
        slug: 'analisis-pasar-bitcoin-q4-2024', 
        title: 'Analisis Pasar Bitcoin Q4 2024', 
        author: 'Satoshi Jr', 
        date: '10 September 2024', 
        content: '<h4>Tinjauan Pasar</h4><p>Pasar kripto menunjukkan volatilitas yang tinggi menjelang akhir tahun. Bitcoin, sebagai aset utama, masih menjadi barometer pergerakan pasar secara keseluruhan.</p><h4>Prediksi dan Risiko</h4><p>Beberapa analis memprediksi adanya reli akhir tahun, namun risiko regulasi global tetap menjadi perhatian utama yang harus diwaspadai.</p><p>Pastikan untuk selalu melakukan riset Anda sendiri (DYOR).</p>'
    },
];
// DUMMY DATA END


// --- FUNGSI STATIC GENERATION (Menggunakan data dummy) ---

// 1. getStaticPaths: Memberi tahu Next.js path mana yang harus di build
export async function getStaticPaths() {
  const paths = articles.map(article => ({
    params: { slug: article.slug },
  }));

  return { paths, fallback: false }; 
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
        {/* Mengganti judul menjadi CryptoFamId */}
        <title>{article.title} | CryptoFamId</title>
        <meta name="description" content={`Baca artikel: ${article.title} tentang dunia Kripto dan Web3.`} />
      </Head>

      <div className="main-layout">
        <header className="header-container">
          <div className="header-content">
            {/* Mengganti judul dan ikon */}
            <h1 className="header-title">
              <span className="header-icon">🔗</span> CryptoFamId
            </h1>
            <Link href="/" passHref>
              <a className="back-link">
                ← Kembali ke Beranda
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
            {/* Konten artikel */}
            <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </main>

        <footer className="footer-container">
          <p className="footer-text">
            Dikembangkan dengan Next.js dan Vercel. © {new Date().getFullYear()} CryptoFamId.
          </p>
        </footer>
      </div>

      <style jsx global>{`
        /* --- COPY STYLE DARI INDEX.JS (Wajib agar header dan footer konsisten) --- */
        html { box-sizing: border-box; }
        *, *:before, *:after { box-sizing: inherit; }
        body {
          font-family: 'Inter', 'Arial', sans-serif; /* Font Inter */
          background-color: #f0f4f8; 
          margin: 0;
          padding: 0;
          line-height: 1.6; 
          color: #1f2937; 
        }
        
        a {
            text-decoration: none;
            color: inherit;
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
          border-bottom: 4px solid #3730a3; /* Konsisten dengan Home.js */
        }
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem; /* Konsisten dengan Home.js (Mobile) */
        }
        .header-title {
          font-size: 1.25rem; /* Konsisten dengan Home.js (Mobile) */
          font-weight: 700;
          margin: 0;
          display: flex;
          align-items: center;
          letter-spacing: -0.5px;
        }
        .header-icon {
          margin-right: 0.5rem;
          font-size: 1.5rem; /* Konsisten dengan Home.js (Mobile) */
        }
        .back-link {
          background-color: #6366f1;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 9999px; /* Rounded penuh */
          font-weight: 600;
          text-decoration: none;
          transition: background-color 0.2s ease, transform 0.2s;
          white-space: nowrap;
          font-size: 0.85rem; /* Konsisten dengan tombol lain */
          border: 2px solid transparent;
        }
        .back-link:hover {
          background-color: #4f46e5;
          border-color: #818cf8;
          transform: translateY(-1px);
        }
        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          flex-grow: 1;
          width: 100%;
          padding: 1rem 1.5rem;
        }
        .footer-container {
          background-color: #e5e7eb; 
          color: #374151; /* Warna teks konsisten */
          padding: 1rem 1.5rem;
          text-align: center;
          margin-top: 3rem;
          font-size: 0.875rem;
          border-top: 1px solid #d1d5db; /* Konsisten */
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
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); /* Sedikit lebih menonjol */
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
          margin-bottom: 0.5rem;
        }

        /* Styling Konten (Markdown) */
        .article-body {
          line-height: 1.75;
          color: #374151;
        }
        .article-body h4 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #4338ca; /* Menggunakan warna primer untuk subjudul */
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
          .header-content {
            padding: 1.5rem 2rem; /* Konsisten dengan desktop Home.js */
          }
          .header-title {
            font-size: 2rem;
          }
          .header-icon {
            font-size: 2rem;
          }
          .article-title {
            font-size: 2.5rem;
          }
          .article-wrapper {
            padding: 2.5rem;
          }
          .article-meta {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          .meta-item:first-child {
             margin-right: 2rem;
             margin-bottom: 0;
          }
        }
      `}</style>
    </>
  );
};

export default ArticleDetail;

