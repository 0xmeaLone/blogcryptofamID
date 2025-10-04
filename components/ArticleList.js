import React from 'react';
import Link from 'next/link';

// Komponen ini menerima data artikel melalui props dari index.js
const ArticleList = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-xl shadow-lg mt-10">
        <h2 className="text-xl font-semibold text-gray-700">Belum ada artikel yang dipublikasikan.</h2>
        <p className="text-gray-500 mt-2">Segera tulis artikel pertama Anda!</p>
      </div>
    );
  }

  // Komponen Kartu Artikel (Menggunakan CSS Murni)
  const ArticleCard = ({ article }) => {
    // Fungsi untuk membatasi konten agar rapi di preview
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
        
        {/* Ringkasan Konten */}
        <p className="card-content">
          {truncatedContent}
        </p>

        {/* Tombol Baca Selengkapnya */}
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
      {/* Menggunakan tag style untuk CSS lokal */}
      <style jsx global>{`
        /* Reset dan Typography Dasar */
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f4f8; /* Mirip gray-50 */
          margin: 0;
          padding: 0;
        }
        
        /* Kontainer Utama */
        .article-list-container {
          padding-top: 2rem;
        }

        .list-header {
          font-size: 2rem;
          font-weight: 800;
          color: #1f2937; /* Mirip gray-900 */
          margin-bottom: 2rem;
        }

        /* Grid Responsif */
        .article-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 1.5rem; /* DITINGKATKAN LAGI menjadi 3.5rem (sekitar 56px) untuk jarak vertikal yang lega */
        }
        @media (min-width: 768px) {
          .article-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem; 
          }
        }
        @media (min-width: 1024px) {
          .article-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Styling Kartu */
        .article-card {
          background-color: #ffffff;
          padding: 1.5rem;
          border-radius: 1rem; 
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); 
          border: 1px solid #e5e7eb; 
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: all 0.3s ease-in-out;
        }

        /* Efek Hover */
        .article-card:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08); 
          transform: scale(1.02);
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
          margin-bottom: 0.5rem; /* DIKURANGI: Dari 1rem menjadi 0.5rem (8px) untuk mengurangi jarak kosong di bawah cuplikan */
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3; 
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-link {
          display: inline-flex;
          align-items: center;
          color: #4338ca; 
          font-weight: 700;
          transition: color 0.15s ease-in-out;
          margin-top: 0.5rem; /* DIKURANGI: Dari 1rem menjadi 0.5rem (8px) untuk menaikkan tombol lebih dekat ke cuplikan */
          text-decoration: none;
        }

        .card-link:hover {
          color: #3730a3; 
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

