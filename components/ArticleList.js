// File: components/ArticleList.js
import React from 'react';
import Link from 'next/link';

// Komponen ini menerima data artikel melalui props dari getStaticProps di index.js
const ArticleList = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-xl shadow-lg mt-10">
        <h2 className="text-xl font-semibold text-gray-700">Belum ada artikel yang dipublikasikan.</h2>
        <p className="text-gray-500 mt-2">Segera tulis artikel pertama Anda!</p>
      </div>
    );
  }

  // Komponen Kartu Artikel
  const ArticleCard = ({ article }) => {
    // Fungsi untuk membatasi konten agar rapi di preview
    const truncatedContent = article.content.length > 150 
        ? article.content.substring(0, 150) + '...' 
        : article.content;

    return (
      // Kartu dengan desain modern, bayangan dalam, dan efek hover yang menonjol
      <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl 
                      transition-all duration-300 transform hover:scale-[1.02] 
                      border border-gray-100 flex flex-col h-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">
          {article.title}
        </h2>
        <p className="text-sm text-indigo-600 font-semibold mb-3">
          Oleh {article.author} | {article.date}
        </p>
        
        {/* Ringkasan Konten */}
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {truncatedContent}
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
  
  return (
    <div className="py-2">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
            Kontribusi Terbaru
        </h2>
        
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
