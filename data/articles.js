import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

// DUMMY DATA START - Menggunakan data yang Disesuaikan dengan Tema CryptoFamId
const articles = [
  {
    slug: 'panduan-pull-request',
    title: 'Panduan Praktis Kontribusi Proyek Open Source Web3 Melalui PR', // Disesuaikan
    author: 'Gemini Dev',
    date: '2025-10-04',
    content: `
Halo kontributor Web3! Ini adalah panduan lengkap tentang cara proses *submission* kode atau artikel Anda bekerja di lingkungan yang terdesentralisasi (atau setidaknya transparan).
Ketika Anda menekan tombol "Kirim Artikel", sebuah Pull Request (PR) akan dibuat di repositori GitHub ini, mencerminkan semangat kolaborasi Open Source.

<h4>Mekanisme Kontribusi Transparan</h4>
<p>1.  <strong>Tulis Konten/Kode:</strong> Konten ditulis dalam format Markdown, atau kode smart contract Anda.</p>
<p>2.  <strong>Kirim PR:</strong> PR memungkinkan komunitas dan admin meninjau perubahan Anda. Ini adalah langkah validasi terpenting.</p>
<p>3.  <strong>Verifikasi Kontrak:</strong> Setelah diverifikasi oleh validator dan disetujui, PR Anda akan di-<em>merge</em> ke branch utama.</p>
<p>4.  <strong>Deploy Otomatis:</strong> Vercel secara otomatis mendeteksi perubahan dan menayangkan artikel baru Anda, memastikan transparansi *update*.</p>

<p>Ini adalah alur kerja yang aman dan efisien untuk kolaborasi di ranah Web3.</p>
    `,
  },
  {
    slug: 'static-site-generator-terbaik',
    title: 'Mengapa Next.js SSG Ideal untuk Dokumentasi dApp & Blog Crypto?', // Disesuaikan
    author: 'Vercel Expert',
    date: '2025-09-28',
    content: `
<p>Static Site Generator (SSG) seperti Next.js menawarkan kecepatan, keamanan, dan skalabilitas yang krusial untuk proyek desentralisasi (dApp) dan dokumentasi protokol.</p>
<p>Karena halaman dibuat sebelum *deployment* (pra-rendering), dApp atau konten Anda memiliki latensi yang sangat rendah, mirip dengan node yang cepat.</p>

<h4>Keunggulan SSG di Dunia Web3</h4>
<ul>
  <li><strong>Kecepatan Maksimal:</strong> Waktu *load* yang hampir instan, sangat penting untuk pengalaman pengguna dApp.</li>
  <li><strong>Keamanan Data:</strong> Karena tidak ada *database* yang rentan di *server*, risiko serangan SQL Injection atau sejenisnya nihil.</li>
  <li><strong>Host Fleksibel:</strong> Konten dapat di-host dengan sangat murah dan efisien di berbagai platform, termasuk solusi penyimpanan terdesentralisasi seperti IPFS (walaupun kita menggunakan Vercel).</li>
</ul>

<p>Inilah alasan kami memilih Next.js sebagai fondasi untuk menyampaikan informasi *crypto* secara cepat dan aman.</p>
    `,
  },
  {
    slug: 'tips-menulis-markdown',
    title: 'Tips Cepat Menulis Konten Edukasi Web3 yang Jelas dengan Markdown', // Disesuaikan
    author: 'Penulis Hebat',
    date: '2025-09-20',
    content: `
<p>Markdown adalah bahasa markup yang ringan dan mudah dibaca, sempurna untuk menjelaskan konsep rumit seperti *Zero-Knowledge Proofs* atau *Layer 2 Solutions*.</p>

<p>Berikut beberapa tips untuk penulis *crypto*:</p>
<ul>
  <li>Gunakan <code>#</code> untuk Judul Besar. Pastikan judul mencerminkan topik teknis secara akurat.</li>
  <li>Gunakan <code>**tebal**</code> untuk menyoroti istilah penting (contoh: **Gas Fee**, **APY**, **NFT**).</li>
  <li>Gunakan list untuk memecah langkah-langkah dalam *tutorial* (misalnya: cara *bridging* aset).</li>
  <li>Untuk cuplikan Smart Contract atau kode transaksi, gunakan blok kode (tiga *backtick*) untuk keterbacaan maksimal.</li>
</ul>

<p>Dengan Markdown, Anda dapat fokus pada isi edukasi yang bernilai tinggi, bukan pada format yang rumit!</p>
    `,
  },
];
// DUMMY DATA END


// --- FUNGSI STATIC GENERATION ---

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
  
  const articleWithCleanContent = {
      ...article,
      content: article.content.trim(), 
  };


  return {
    props: {
      article: articleWithCleanContent,
    },
  };
}

// --- KOMPONEN HALAMAN ---

const ArticleDetail = ({ article }) => {
  // Jika artikel tidak ditemukan
  if (!article) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#dc2626' }}>404 - Artikel Tidak Ditemukan</h1>
        <p>Artikel yang Anda cari tidak ada di CryptoFamId.</p>
        <Link href="/" passHref>
            <a style={{ color: '#4338ca', fontWeight: '600' }}>← Kembali ke Beranda</a>
        </Link>
      </div>
    );
  }

  // Isi Komponen Artikel
  return (
    <>
      <Head>
        <title>{article.title} | CryptoFamId</title>
        <meta name="description" content={`Baca artikel: ${article.title} oleh ${article.author}.`} />
      </Head>

      <div className="main-layout">
        <header className="header-container">
          <div className="header-content">
            {/* Judul dan Ikon CryptoFamId */}
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
              <span className="meta-item">🗓️ Dipublikasikan pada {new Date(article.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
        /* --- GLOBAL STYLING (Konsisten dengan Home.js) --- */
        html { box-sizing: border-box; }
        *, *:before, *:after { box-sizing: inherit; }
        body {
          font-family: 'Inter', 'Arial', sans-serif;
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
        
        /* HEADER */
        .header-container {
          background-color: #4338ca; 
          color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border-bottom: 4px solid #3730a3; 
        }
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem; 
        }
        .header-title {
          font-size: 1.25rem; 
          font-weight: 700;
          margin: 0;
          display: flex;
          align-items: center;
          letter-spacing: -0.5px;
        }
        .header-icon {
          margin-right: 0.5rem;
          font-size: 1.5rem; 
        }
        .back-link {
          background-color: #6366f1;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-weight: 600;
          transition: all 0.2s ease;
          white-space: nowrap;
          font-size: 0.85rem; 
          border: 2px solid transparent;
        }
        .back-link:hover {
          background-color: #4f46e5;
          border-color: #818cf8;
          transform: translateY(-1px);
        }
        
        /* FOOTER */
        .footer-container {
          background-color: #e5e7eb; 
          color: #374151;
          padding: 1rem 1.5rem;
          text-align: center;
          margin-top: 3rem;
          font-size: 0.875rem;
          border-top: 1px solid #d1d5db;
        }
        .footer-text {
            margin: 0;
        }
        
        /* MAIN CONTENT */
        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          flex-grow: 1;
          width: 100%;
          padding: 1rem 1.5rem;
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
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
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

        /* Styling Konten (Markdown/HTML) */
        .article-body {
          line-height: 1.75;
          color: #374151;
        }
        .article-body h4 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #4338ca;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .article-body p {
          margin-bottom: 1rem;
        }
        .article-body ul, .article-body ol {
          margin-left: 1.5rem;
          padding-left: 0;
          margin-bottom: 1rem;
          list-style: disc; 
        }
        .article-body li {
          margin-bottom: 0.5rem;
        }
        /* Styling untuk blok kode inline */
        .article-body code {
            background-color: #e5e7eb;
            padding: 0.2rem 0.4rem;
            border-radius: 0.3rem;
            font-family: monospace;
            font-size: 0.9em;
            color: #1f2937;
        }

        /* MEDIA QUERIES */
        @media (min-width: 768px) {
          .header-content {
            padding: 1.5rem 2rem; 
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
            justify-content: flex-start;
            gap: 2rem;
            align-items: center;
          }
          .meta-item {
             margin-bottom: 0;
          }
        }
      `}</style>
    </>
  );
};

export default articles;

  
