import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
// NOTE: Mengganti path impor ini dengan file dummy karena dependensi tidak tersedia
// import ArticleList from '../components/ArticleList'; 
// import articles from '../data/articles'; 

// DUMMY COMPONENTS & DATA START
const ArticleList = ({ articles }) => (
    <div className="article-list-grid">
        {articles.map((article) => (
            <article key={article.id} className="article-card">
                <h3 className="card-title">{article.title}</h3>
                <p className="card-meta">
                    <span className="text-gray-500">Oleh: {article.author}</span> | 
                    <span className="font-semibold text-indigo-600 ml-1">{article.category}</span>
                </p>
                <p className="card-summary">{article.summary}</p>
                <Link href={`/article/${article.id}`} passHref>
                    <a className="read-more-link">Baca Selengkapnya →</a>
                </Link>
            </article>
        ))}
    </div>
);

const articles = [
    { id: 1, title: 'Analisis Pasar Bitcoin Q4 2024', author: 'Satoshi Jr', category: 'Kripto', summary: 'Prediksi dan tren pergerakan harga Bitcoin menjelang akhir tahun.' },
    { id: 2, title: 'Panduan Membangun Wallet Web3', author: 'DevChain', category: 'Koding', summary: 'Langkah-langkah praktis mengimplementasikan fitur wallet non-custodial.' },
    { id: 3, title: 'Etika Desain UI/UX dalam DApps', author: 'VividPixel', category: 'Desain', summary: 'Menerapkan prinsip desain yang fokus pada kepercayaan dan transparansi.' },
    { id: 4, title: 'Strategi DeFi Yield Farming Terbaru', author: 'FarmMaster', category: 'Bisnis', summary: 'Memaksimalkan keuntungan dari protokol DeFi dengan risiko terukur.' },
];
const categories = ['Kripto', 'Koding', 'Desain', 'Bisnis', 'Gaya Hidup', 'Semua Kategori'];
// DUMMY COMPONENTS & DATA END


// Kita memuat data di server/build time (Static Site Generation)
export async function getStaticProps() {
  // Anggap ini adalah data yang dimuat dari file 'articles'
  return {
    props: {
      articles, 
    },
  };
}

const Home = ({ articles }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mengubah nama state dari isDropdownOpen ke isMenuOpen

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <>
      {/* --- SEO & Metadata --- */}
      <Head>
        <title>CryptoFamId | Platform Berbagi Artikel Kripto & Web3</title>
        <meta name="description" content="Platform berbagi artikel komunitas tentang Kripto, Blockchain, dan Web3 berbasis Git." />
        <meta name="keywords" content="crypto, blockchain, web3, blog komunitas, nextjs, git, artikel, publik" />
        <meta property="og:title" content="CryptoFamId" />
        <meta property="og:description" content="Platform berbagi artikel komunitas berbasis Git." />
        <meta property="og:type" content="website" />
      </Head>

      <div className="main-layout">
        <header className="header-container" role="banner">
          <div className="header-content">
            
            {/* Judul Blog - Diubah ke CryptoFamId */}
            <p className="header-title"> 
              <span className="header-icon">🔗</span> CryptoFamId
            </p>
            
            {/* Wrapper untuk aksi: Tombol Menu dan Tombol Tulis */}
            <div className="header-actions">
              
              {/* --- Tombol Kategori (Menu Toggle) --- */}
              <button 
                onClick={toggleMenu}
                className="menu-toggle-button" // Class baru
                aria-expanded={isMenuOpen} 
                aria-controls="categories-menu" 
              >
                Kategori
                <span className={`menu-arrow ${isMenuOpen ? 'rotate' : ''}`}>▼</span>
              </button>
              
              {/* Tombol Tulis Artikel */}
              <Link href="/submit" passHref>
                <a className="header-button" role="button">
                  <span className="button-icon">📝</span> Tulis Artikel
                </a>
              </Link>
            </div> {/* End header-actions */}

          </div>
          
          {/* --- SLIDING CATEGORY MENU (Panel) --- */}
          <div className={`category-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
            <nav 
              className="category-menu-content" 
              id="categories-menu"
              role="menu" 
            >
              {categories.map((category) => (
                <Link 
                  key={category} 
                  href={category === 'Semua Kategori' ? '/' : `/category/${category.toLowerCase().replace(/\s/g, '-')}`} 
                  passHref 
                >
                  <a 
                    className="menu-item" // Class baru
                    onClick={toggleMenu} 
                    role="menuitem" 
                  >
                    {category}
                  </a>
                </Link>
              ))}
            </nav>
          </div>

        </header>

        <main className="main-content" id="main-skip-target">
            <h2 className="content-heading">Kontribusi Terbaru (Kripto & Web3)</h2> 
            <ArticleList articles={articles} />
        </main>

        <footer className="footer-container" role="contentinfo">
          <p className="footer-text">
            Dikembangkan dengan Next.js dan Vercel. © {new Date().getFullYear()} CryptoFamId.
          </p>
        </footer>
      </div>

      <style jsx global>{`
        /* --- GLOBAL & TYPOGRAPHY --- */
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
        
        /* --- ARTICLE LIST STYLING (For Dummy Data) --- */
        .article-list-grid {
            display: grid;
            gap: 1.5rem;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }
        .article-card {
            background-color: white;
            padding: 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06);
            transition: transform 0.2s;
            display: flex;
            flex-direction: column;
        }
        .article-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
        }
        .card-title {
            font-size: 1.25rem;
            font-weight: 700;
            margin-top: 0;
            margin-bottom: 0.5rem;
            color: #111827;
        }
        .card-meta {
            font-size: 0.875rem;
            color: #6b7280;
            margin-bottom: 1rem;
        }
        .card-summary {
            flex-grow: 1;
            color: #4b5563;
            margin-bottom: 1rem;
        }
        .read-more-link {
            display: inline-block;
            color: #4338ca;
            font-weight: 600;
            transition: color 0.2s;
        }
        .read-more-link:hover {
            color: #3730a3;
        }

        /* --- LAYOUT --- */
        .main-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        /* --- HEADER --- */
        .header-container {
          background-color: #4338ca; 
          color: white;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
          border-bottom: 4px solid #3730a3;
        }
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap; 
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem; /* Padding dipindahkan ke sini */
          row-gap: 0.75rem; 
        }
        
        .header-actions {
          display: flex;
          gap: 0.75rem; 
          align-items: center;
          flex-shrink: 0; 
        }

        .header-title {
          font-size: 1.25rem; 
          font-weight: 700;
          margin: 0;
          display: flex;
          align-items: center;
          letter-spacing: -0.5px;
          flex-grow: 1; 
        }
        .header-icon {
          margin-right: 0.5rem;
          font-size: 1.5rem;
        }
        
        /* --- Tombol Aksi --- */
        .header-button {
          background-color: #6366f1; 
          color: white;
          padding: 0.5rem 0.8rem; 
          border-radius: 9999px; 
          font-weight: 600;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          white-space: nowrap; 
          font-size: 0.85rem; 
          border: 2px solid transparent;
        }
        .header-button:hover, .header-button:focus {
          background-color: #4f46e5; 
          border-color: #818cf8;
          transform: translateY(-1px); 
        }
        .button-icon {
          margin-right: 0.5rem;
          font-size: 1rem;
        }
        
        /* --- SLIDING CATEGORY MENU (Menu Toggle Button) --- */
        .menu-toggle-button {
          background-color: transparent;
          color: white;
          padding: 0.5rem 0.8rem; 
          border-radius: 0.75rem;
          font-weight: 600;
          border: 2px solid #6366f1; 
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          font-size: 0.85rem; 
          line-height: 1;
        }

        .menu-toggle-button:hover, .menu-toggle-button:focus {
          background-color: #4f46e5;
          border-color: #818cf8;
        }

        .menu-arrow {
          margin-left: 0.5rem;
          transition: transform 0.5s;
          line-height: 0; 
        }
        
        .menu-arrow.rotate {
            /* Tanda panah ke atas saat menu terbuka */
            transform: rotate(-180deg);
        }

        /* --- SLIDING CATEGORY MENU (Panel Overlay) --- */
        .category-menu-overlay {
            overflow: hidden;
            max-height: 0; /* Awalnya tersembunyi */
            transition: max-height 0.5s ease-in-out, background-color 0.5s ease; /* Transisi halus */
            width: 100%;
            /* Latar belakang transparan sesuai permintaan */
            background-color: rgba(0, 0, 0, 0); 
            border-top: 1px solid transparent;
        }

        .category-menu-overlay.open {
            max-height: 300px; /* Tinggi maksimum yang cukup untuk semua kategori */
            background-color: rgba(255, 255, 255, 0.9); /* Latar belakang semi-transparan putih/abu saat terbuka */
            border-top: 1px solid #d1d5db;
        }

        .category-menu-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 1.5rem; 
            display: flex; 
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
            align-items: center;
        }

        .category-menu-content .menu-item {
            color: #4338ca; 
            background-color: white; 
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;
            font-weight: 600;
            font-size: 0.9rem;
            border: 1px solid #c7d2fe;
            white-space: nowrap;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .category-menu-content .menu-item:hover {
            background-color: #eef2ff;
            transform: translateY(-1px);
            box-shadow: 0 4px 6px rgba(67, 56, 202, 0.1);
            color: #3730a3;
        }


        /* --- MAIN CONTENT --- */
        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          flex-grow: 1;
          width: 100%;
          padding: 1rem 1.5rem; 
        }

        .content-heading {
            font-size: 1.75rem;
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;
            color: #111827; 
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 0.5rem;
        }

        /* --- FOOTER --- */
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

        /* ======================================= */
        /* MEDIA QUERIES UNTUK TAMPILAN DESKTOP */
        /* ======================================= */
        @media (min-width: 768px) {
          
          .header-content {
            flex-wrap: nowrap;
            row-gap: 0;
            padding: 1.5rem 2rem;
          }

          .header-title {
            font-size: 2rem; 
            flex-grow: 0;
          }
          .header-icon {
            font-size: 2rem;
          }
          .header-actions {
            gap: 1.5rem; 
          }

          .header-button, .menu-toggle-button {
            padding: 0.6rem 1.2rem; 
            font-size: 0.9rem;
          }
          
          .main-content {
            padding: 3rem 2rem; 
          }
          
          .content-heading {
            font-size: 2.25rem;
          }
          .category-menu-content {
              padding: 1.5rem 2rem; 
              justify-content: flex-start; /* Kategori rata kiri di desktop */
          }
        }
      `}</style>
    </>
  );
};

export default Home;

