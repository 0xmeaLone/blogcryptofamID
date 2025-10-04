// File: components/ArticleList.js
import React from 'react';
import Link from 'next/link';

// Menggunakan path relatif, pastikan data/articles-data.js ada
import { articles } from '../data/articles-data'; 

const ArticleCard = ({ article }) => {
  // Fungsi untuk membatasi konten agar rapi di preview
  const truncateContent = (content) => {
    return content.length > 150 ? content.substring(0, 150) + '...' : content;
  };

  return (
    // Kartu dengan desain modern
    <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl 
                    transition-all duration-300 transform hover:scale-[1.02] 
                    border border-gray-100 flex flex-col h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">
        {article.title}
      </h2>
      <p className="text-sm text-indigo-600 font-semibold mb-3">
        Oleh {article.author} pada {article.date}
      </p>
      
      {/* Ringkasan Konten - Menggunakan line-clamp dari plugin Tailwind */}
      <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
        {truncateContent(article.content)}
      </p>

      {/* Tombol Baca Selengkapnya */}
      <Link href={`/articles/${article.slug}`} legacyBehavior>
        <a className="inline-flex items-center text-indigo-700 font-bold hover:text-indigo-900 transition duration-150 mt-4">
          Baca Selengkapnya →
        </a>
      </Link>
    </div>
  );
};

const ArticleList = ({ onNavigate }) => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">
        Jelajahi Kontribusi Komunitas
      </h1>
      
      {/* Grid responsif: 1 kolom di mobile, 2 kolom di medium, 3 kolom di large */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
