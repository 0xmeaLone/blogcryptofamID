import Head from 'next/head';
import Link from 'next/link';
import { Edit, Globe } from 'lucide-react';
import ArticleList from '../components/ArticleList';
import { articles } from '../data/articles-data'; 

export default function Home({ articleData }) {
  return (
    // Tambahkan styling pada div utama: background dan font-family
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <Head>
        <title>Blog Komunitas Publik | Beranda</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      {/* Header Stylish dan Sticky */}
      <header className="bg-indigo-700 shadow-2xl p-4 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-white flex items-center tracking-wide">
            <Globe className="w-7 h-7 mr-2 text-indigo-300" /> Blog Komunitas
          </h1>
          <Link href="/submit" legacyBehavior>
            <a className="flex items-center bg-white text-indigo-700 font-bold py-2.5 px-4 rounded-xl shadow-lg hover:bg-indigo-100 transition duration-300 text-sm sm:text-base transform hover:scale-[1.05] border-2 border-indigo-300">
              <Edit className="w-5 h-5 mr-2" /> Tulis Artikel
            </a>
          </Link>
        </div>
      </header>

      {/* Main Content dengan Padding yang Rapi */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-10">
        {/* Pastikan ArticleList menerima props articles */}
        <ArticleList articles={articleData} />
      </main>

      {/* Footer Minimalis */}
      <footer className="bg-gray-800 text-white p-6 mt-16 shadow-inner">
          <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
            <p className="font-semibold mb-1 text-gray-200">Dikelola Melalui GitHub PR</p>
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
