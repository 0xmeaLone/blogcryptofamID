// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import { Edit } from 'lucide-react';
import ArticleList from '../components/ArticleList';
import { articles } from '../data/articles-data'; 

export default function Home({ articleData }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Head>
        <title>Blog Komunitas Publik | Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      {/* Header */}
      <header className="bg-indigo-700 shadow-lg p-4 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-white">🌐 Blog Komunitas</h1>
          <Link href="/submit" legacyBehavior>
            <a className="flex items-center bg-white text-indigo-700 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-indigo-100 transition duration-200 text-sm">
              <Edit className="w-4 h-4 mr-2" /> Tulis Artikel
            </a>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-10">
        <ArticleList articles={articleData} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-12">
          <div className="max-w-7xl mx-auto text-center text-sm">
            © 2025 Blog Publik Kolaboratif. Dikelola melalui GitHub PR dan di-deploy via Vercel.
          </div>
      </footer>
    </div>
  );
}

// Next.js function to fetch static props at build time (SSG)
export async function getStaticProps() {
    // In a real SSG setup, this is where you would read Markdown files from the file system.
    return {
        props: {
            articleData: articles,
        },
    };
}
