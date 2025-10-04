import Head from 'next/head';
import Link from 'next/link';
import { Edit, Globe } from 'lucide-react';
import ArticleList from '../components/ArticleList';
import { articles } from '../data/articles-data'; 

export default function Home({ articleData }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Head>
        <title>Blog Komunitas Publik | Beranda</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      {/* Header */}
      <header className="main-header">
        <div className="header-container">
          <h1 className="main-title">
            <Globe className="w-7 h-7 mr-2 icon-globe" /> Blog Komunitas
          </h1>
          <Link href="/submit" legacyBehavior>
            <a className="submit-button">
              <Edit className="w-5 h-5 mr-2" /> Tulis Artikel
            </a>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content-area">
        <ArticleList articles={articleData} />
      </main>

      {/* Footer */}
      <footer className="main-footer">
          <div className="footer-container">
            <p className="footer-text-bold">Dikelola Melalui GitHub PR</p>
            <p className="footer-text-normal">Dibangun dengan Next.js dan Vercel. © 2025 Blog Publik Kolaboratif.</p>
          </div>
      </footer>
      
      {/* CSS Murni untuk Header dan Footer (Proporsional) */}
      <style jsx global>{`
        /* --- Variabel Warna --- */
        :root {
            --indigo-700: #4338ca;
            --indigo-200: #c7d2fe;
            --gray-800: #1f2937;
            --gray-50: #f9fafb;
        }

        /* --- Global Reset & Main Layout --- */
        .min-h-screen {
          min-height: 100vh;
          background-color: var(--gray-50);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        
        .main-content-area {
            max-width: 1280px; /* Max-w-7xl */
            margin-left: auto;
            margin-right: auto;
            padding: 1rem; /* Padding lebih besar di mobile */
            padding-top: 2.5rem; /* pt-10 */
        }
        @media (min-width: 640px) {
            .main-content-area {
                padding: 1.5rem; /* sm:p-6 */
                padding-top: 2.5rem;
            }
        }
        @media (min-width: 1024px) {
            .main-content-area {
                padding: 2rem; /* lg:p-8 */
                padding-top: 2.5rem;
            }
        }

        /* --- Header Styling --- */
        .main-header {
            background-color: var(--indigo-700);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); /* shadow-xl */
            position: sticky;
            top: 0;
            z-index: 20;
            padding: 1rem 0; /* padding vertikal */
        }

        .header-container {
            max-width: 1280px;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 1rem; /* Padding horizontal mobile */
        }
        @media (min-width: 640px) {
            .header-container {
                padding: 0 1.5rem;
            }
        }
        
        .main-title {
            font-size: 1.5rem; /* Lebih kecil di mobile */
            font-weight: 800;
            color: white;
            display: flex;
            align-items: center;
        }
        @media (min-width: 640px) {
             .main-title {
                font-size: 1.875rem; /* text-3xl */
            }
        }
        
        .icon-globe {
            width: 1.75rem; 
            height: 1.75rem;
            margin-right: 0.5rem;
            color: var(--indigo-200);
        }

        .submit-button {
            display: flex;
            align-items: center;
            background-color: white;
            color: var(--indigo-700);
            font-weight: 700;
            padding: 0.5rem 1rem; /* py-2 px-4 */
            border-radius: 9999px; /* rounded-full */
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); /* shadow-lg */
            transition: all 0.2s;
            border: 2px solid #a5b4fc; /* border-indigo-300 */
            text-decoration: none; /* Hilangkan garis bawah */
            font-size: 0.875rem; /* text-sm di mobile */
        }
        .submit-button:hover {
            background-color: #e0e7ff; /* hover:bg-indigo-100 */
        }
        @media (min-width: 640px) {
             .submit-button {
                font-size: 1rem; /* text-base */
            }
        }

        /* --- Footer Styling --- */
        .main-footer {
            background-color: var(--gray-800);
            color: white;
            padding: 1.5rem 0;
            margin-top: 4rem; /* mt-16 */
        }
        
        .footer-container {
            max-width: 1280px;
            margin-left: auto;
            margin-right: auto;
            text-align: center;
            padding: 0 1rem;
            font-size: 0.875rem; /* text-sm */
        }
        
        .footer-text-bold {
            font-weight: 600;
            margin-bottom: 0.25rem;
        }
        .footer-text-normal {
            margin: 0;
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps() {
    return {
        props: {
            articleData: articles,
        },
    };
          }
