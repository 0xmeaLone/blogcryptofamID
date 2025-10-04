import React from 'react';
import Link from 'next/link';

const ArticleList = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-xl shadow-lg mt-10">
        <h2 className="text-xl font-semibold text-gray-700">Belum ada artikel yang dipublikasikan.</h2>
        <p className="text-gray-500 mt-2">Segera tulis artikel pertama Anda!</p>
      </div>
    );
  }

  const ArticleCard = ({ article }) => {
    const truncatedContent = article.content.length > 150 
        ? article.content.substring(0, 150) + '...' 
        : article.content;

    return (
      <div className="article-card">
        <h2 className="card-title">
          {article.title}
        </h2>
        <p className="card-meta">
          Oleh {article.author} | {article.date}
        </p>
        
        <p className="card-content">
          {truncatedContent}
        </p>

        <Link href={`/articles/${article.slug}`} passHref>
          <a className="card-link">
            Baca Selengkapnya →
          </a>
        </Link>
      </div>
    );
  };
  
  return (
    <div className="article-list-container">
      {/* --- CSS MURNI DIOPTIMALKAN UNTUK MOBILE --- */}
      <style jsx global>{`
        /* --- Variabel Warna --- */
        :root {
            --indigo-700: #4338ca;
            --gray-800: #1f2937;
        }
        
        /* Grid Responsif */
        .article-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr); 
          gap: 2.5rem; /* DITINGKATKAN! Gap 10 (dari 1.5rem) agar kartu tidak menumpuk */
          padding-bottom: 2rem; /* Jarak bawah list */
        }
        /* Tablet dan ke atas (min-width: 768px) */
        @media (min-width: 768px) {
          .article-grid {
            grid-template-columns: repeat(2, 1fr); 
            gap: 2rem; 
          }
        }
        /* Desktop (min-width: 1024px) */
        @media (min-width: 1024px) {
          .article-grid {
            grid-template-columns: repeat(3, 1fr); 
          }
        }

        /* --- Styling Kartu --- */
        .article-card {
          background-color: #ffffff;
          padding: 1.5rem; /* Padding dikembalikan ke 1.5rem agar konten lega */
          border-radius: 1rem; 
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); 
          border: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: all 0.3s ease-in-out;
        }

        /* Efek Hover */
        .article-card:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transform: translateY(-2px); 
        }
        
        .list-header {
            font-size: 1.875rem; 
            font-weight: 800;
            color: #1f2937;
            margin-bottom: 2.5rem; /* Ditingkatkan agar judul lebih lega */
        }
        @media (min-width: 640px) {
            .list-header {
                font-size: 2.25rem; 
            }
        }

        .card-title {
          font-size: 1.5rem; 
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
          line-height: 1.25;
        }

        .card-meta {
          font-size: 0.875rem;
          font-weight: 600;
          color: #4f46e5;
          margin-bottom: 0.75rem;
        }

        .card-content {
          color: #4b5563; 
          margin-bottom: 1rem;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3; 
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.5;
        }

        .card-link {
          display: inline-flex;
          align-items: center;
          color: var(--indigo-700);
          font-weight: 700;
          transition: color 0.15s ease-in-out;
          margin-top: 1rem;
          text-decoration: none;
        }

        .card-link:hover {
          color: var(--gray-800);
        }
      `}</style>
        
      <h2 className="list-header">
          Kontribusi Terbaru
      </h2>
      
      <div className="article-grid">
          {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
          ))}
      </div>
    </div>
  );
};

export default ArticleList;

