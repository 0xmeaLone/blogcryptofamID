// components/ArticleList.js
import Link from 'next/link';

export default function ArticleList({ articles }) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-800 border-b-2 border-indigo-200 pb-3 mb-6">Semua Artikel Komunitas</h2>
      {articles.map((article) => (
        <div key={article.slug} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 transform hover:-translate-y-1">
          <h3 className="text-2xl font-bold text-indigo-700 mb-2">{article.title}</h3>
          <p className="text-sm text-gray-500 mb-4">
            Oleh <span className="font-medium text-gray-700">{article.authorName}</span> pada {article.date}
          </p>
          <p className="mt-3 text-gray-600 line-clamp-3">{article.content}</p>
          
          {/* Menggunakan Link Next.js untuk navigasi */}
          <Link href={`/articles/${article.slug}`} legacyBehavior>
            <a className="mt-4 text-indigo-500 hover:text-indigo-700 text-base font-semibold transition duration-200 flex items-center">
              Baca Selengkapnya →
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}
