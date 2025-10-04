// pages/index.js
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
      <header className="bg-indigo-700 shadow-xl p-4 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-white flex items-center">
            <Globe className="w-7 h-7 mr-2 text-indigo-200" /> Blog Komunitas
          </h1>
          <Link href="/submit" legacyBehavior>
            <a className="flex items-center bg-white text-indigo-700 font-bold py-2 px-4 rounded-full shadow-lg hover:bg-indigo-100 transition duration-200 text-base border-2 border-indigo-300">
              <Edit className="w-5 h-5 mr-2" /> Tulis Artikel
            </a>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-10">
        <ArticleList articles={articleData} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 mt-16">
          <div className="max-w-7xl mx-auto text-center text-sm">
            <p className="font-semibold mb-1">Dikelola Melalui GitHub PR</p>
            <p>Dibangun dengan Next.js dan Vercel. © 2025 Blog Publik Kolaboratif.</p>
          </div>
      </footer>
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
