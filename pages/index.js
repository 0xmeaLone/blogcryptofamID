import React from 'react';
import Head from 'next/head';
import ArticleList from '../components/ArticleList';
import articles from '../data/articles'; // <-- Pastikan impor ini benar
import Link from 'next/link';

// Kita memuat data di server/build time
export async function getStaticProps() {
  return {
    props: {
      articles,
    },
  };
}

const Home = ({ articles }) => {
  return (
    <>
      <Head>
        <title>Blog Komunitas Publik</title>
        <meta name="description" content="Platform berbagi artikel komunitas berbasis Git" />
      </Head>

      <div className="main-layout">
        <header className="header-container">
          <div className="header-content">
            <h1 className="header-title">
              <span className="header-icon">🌐</span> Blog Komunitas
            </h1>
            <Link href="/submit" passHref>
              <a className="header-button">
                <span className="button-icon">📝</span> Tulis Artikel
              </a>
            </Link>
          </div>
        </header>

        <main className="main-content">
          <ArticleList articles={articles} />
        </main>

        <footer className="footer-container">
          <p className="footer-text">
            Dikembangkan dengan Next.js dan Vercel. © 2025 Blog Publik Kolaboratif.
          </p>
        </footer>
      </div>

      <style jsx global>{`
        /* --- GLOBAL & TYPOGRAPHY --- */
        html { box-sizing: border-box; }
        *, *:before, *:after { box-sizing: inherit; }
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f0f4f8; 
          margin: 0;
          padding: 0;
        }

        /* --- LAYOUT --- */
        .main-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        /* --- HEADER --- */
        .header-container {
          background-color: #4338ca; /* Indigo-700 */
          color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          padding: 1.25rem 0; /* Padding vertikal */
        }
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          /* PENTING: Padding horizontal responsif */
          padding: 0 1.5rem; /* 1.5rem (24px) di mobile */
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
          font-size: 1.8rem;
        }
        .header-button {
          background-color: #6366f1; /* Indigo-500 */
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          transition: background-color 0.2s ease;
          display: flex;
          align-items: center;
          white-space: nowrap; /* Mencegah tombol terpotong di mobile */
          font-size: 0.9rem;
        }
        .header-button:hover {
          background-color: #4f46e5; /* Indigo-600 */
        }
        .button-icon {
          margin-right: 0.5rem;
        }

        /* --- MAIN CONTENT --- */
        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          flex-grow: 1;
          width: 100%;
          /* PENTING: Padding horizontal responsif */
          padding: 1rem 1.5rem; /* Padding atas-bawah & kiri-kanan */
        }

        /* --- FOOTER --- */
        .footer-container {
          background-color: #e5e7eb; /* Gray-200 */
          color: #00000; /* black-600 */
          padding: 1rem 1.5rem;
          text-align: center;
          margin-top: 3rem;
          font-size: 0.875rem;
        }

        /* MEDIA QUERIES untuk Desktop */
        @media (min-width: 768px) {
          .header-title {
            font-size: 1.875rem; /* Ukuran lebih besar di desktop */
          }
          .main-content {
            padding: 2.5rem 1.5rem;
          }
          .header-content {
            padding: 0 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default Home;
