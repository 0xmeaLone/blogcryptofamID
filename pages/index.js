import React, { useState } from 'react'; // PENTING: Import useState
import Head from 'next/head';
import Link from 'next/link';
import ArticleList from '../components/ArticleList';

// NOTE: Sesuaikan path impor ini jika berbeda
import articles from '../data/articles'; 

// Data Kategori Sederhana (Bisa digenerate secara dinamis dari articlesData)
const categories = ['Teknologi', 'Gaya Hidup', 'Koding', 'Desain', 'Bisnis', 'Semua Kategori'];


// Kita memuat data di server/build time (Static Site Generation)
export async function getStaticProps() {
  return {
    props: {
      articles, 
    },
    // Optional: Revalidate setiap 60 detik (ISR)
    // revalidate: 60, 
  };
}

const Home = ({ articles }) => {
  // State untuk mengelola status drop-down
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fungsi untuk membalikkan (toggle) status drop-down
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  return (
    <>
      {/* --- SEO & Metadata --- */}
      <Head>
        <title>Blog Komunitas Publik | Platform Berbagi Artikel</title>
        <meta name="description" content="Platform berbagi artikel komunitas berbasis Git. Temukan dan sumbangkan tulisan dari berbagai topik." />
        <meta name="keywords" content="blog komunitas, nextjs, git, artikel, publik, kolaboratif" />
        <meta property="og:title" content="Blog Komunitas Publik" />
        <meta property="og:description" content="Platform berbagi artikel komunitas berbasis Git." />
        <meta property="og:type" content="website" />
      </Head>

      <div className="main-layout">
        <header className="header-container" role="banner">
          <div className="header-content">
            
            <p className="header-title"> 
              <span className="header-icon">✍️</span> Blog Komunitas
            </p>
            
            {/* Wrapper untuk aksi: Dropdown dan Tombol Tulis */}
            <div className="header-actions">
              
              {/* --- DROPDOWN KATEGORI --- */}
              <div className="dropdown-container">
                <button 
                  onClick={toggleDropdown}
                  className="dropdown-button"
                  aria-expanded={isDropdownOpen} 
                  aria-controls="categories-menu" 
                >
                  Kategori
                  <span className={`dropdown-arrow ${isDropdownOpen ? 'rotate' : ''}`}>▼</span>
                </button>
                
                {isDropdownOpen && (
                  <nav 
                    className="dropdown-menu" 
                    id="categories-menu"
                    role="menu" 
                  >
                    {categories.map((category) => (
                      <Link 
                        key={category} 
                        href={category === 'Semua Kategori' ? '/' : `/category/${category.toLowerCase().replace(/\s/g, '-')}`} 
                        passHref 
                        legacyBehavior
                      >
                        <a 
                          className="dropdown-item" 
                          onClick={toggleDropdown} 
                          role="menuitem" 
                        >
                          {category}
                        </a>
                      </Link>
                    ))}
                  </nav>
                )}
              </div>
              
              {/* Tombol Tulis Artikel */}
              <Link href="/submit" passHref legacyBehavior>
                <a className="header-button" role="button">
                  <span className="button-icon">📝</span> Tulis Artikel
                </a>
              </Link>
            </div> {/* End header-actions */}

          </div>
        </header>

        <main className="main-content" id="main-skip-target">
            <h2 className="content-heading">Artikel Terbaru</h2>
            <ArticleList articles={articles} />
        </main>

        <footer className="footer-container" role="contentinfo">
          <p className="footer-text">
            Dikembangkan dengan Next.js dan Vercel. © {new Date().getFullYear()} Blog Publik Kolaboratif.
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
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
          padding: 1rem 0; 
          border-bottom: 4px solid #3730a3;
        }
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1.5rem; 
        }
        
        .header-actions {
          display: flex;
          gap: 1rem; /* Spasi antar elemen */
          align-items: center;
        }

        .header-title {
          font-size: 1.5rem; 
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
        .header-button {
          background-color: #6366f1; /* Indigo-500 */
          color: white;
          padding: 0.6rem 1.2rem; 
          border-radius: 9999px; 
          font-weight: 600;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          white-space: nowrap; 
          font-size: 0.9rem;
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
        
        /* --- DROP-DOWN KATEGORI --- */
        .dropdown-container {
          position: relative; 
          z-index: 10; 
        }

        .dropdown-button {
          background-color: transparent;
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 0.75rem;
          font-weight: 600;
          border: 2px solid #6366f1; 
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          line-height: 1;
        }

        .dropdown-button:hover, .dropdown-button:focus {
          background-color: #4f46e5;
          border-color: #818cf8;
        }

        .dropdown-arrow {
          margin-left: 0.5rem;
          transition: transform 0.2s;
        }
        
        .dropdown-arrow.rotate {
            transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%; 
          right: 0;
          margin-top: 0.5rem; 
          background-color: white;
          border-radius: 0.75rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* Shadow lebih kuat */
          min-width: 180px;
          padding: 0.5rem 0;
          border: 1px solid #e5e7eb;
        }

        .dropdown-item {
          display: block;
          padding: 0.75rem 1rem;
          color: #1f2937; 
          text-decoration: none;
          transition: background-color 0.1s;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .dropdown-item:hover {
          background-color: #eef2ff; /* Indigo-50 */
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

        /* MEDIA QUERIES untuk Desktop */
        @media (min-width: 768px) {
          .header-title {
            font-size: 2rem; 
          }
          .header-icon {
            font-size: 2rem;
          }
          .main-content {
            padding: 3rem 2rem; 
          }
          .header-content {
            padding: 0 2rem;
          }
          .header-actions {
            gap: 1.5rem; 
          }
          .header-button {
            font-size: 1rem;
          }
          .content-heading {
            font-size: 2.25rem;
          }
        }
      `}</style>
    </>
  );
};

export default Home;
                          
