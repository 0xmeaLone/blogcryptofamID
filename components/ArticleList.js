// components/ArticleList.js
import Link from 'next/link';

export default function ArticleList({ articles }) {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold text-gray-900 border-b-4 border-indigo-500 pb-3 mb-6">Jelajahi Kontribusi Komunitas</h2>
      {articles.map((article) => (
        <div 
          key={article.slug} 
          className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100 transform hover:-translate-y-1 relative"
        >
          <span className="absolute top-0 right-0 mt-4 mr-6 text-sm font-semibold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
            {article.date}
          </span>
          
          <h3 className="text-3xl font-bold text-gray-800 mb-2 mt-2">{article.title}</h3>
          
          <p className="text-base text-gray-500 mb-4 italic">
            Oleh <span className="font-semibold text-indigo-600">{article.authorName}</span>
          </p>
          
          <p className="mt-3 text-gray-700 line-clamp-3 leading-relaxed border-t pt-4">
            {article.content}
          </p>
          
          {/* Menggunakan Link Next.js untuk navigasi */}
          <Link href={`/articles/${article.slug}`} legacyBehavior>
            <a className="mt-6 inline-flex items-center text-lg font-bold text-indigo-600 hover:text-indigo-800 transition duration-200">
              Baca Selengkapnya →
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}
