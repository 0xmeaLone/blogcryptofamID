// pages/articles/[slug].js
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, User, Calendar } from 'lucide-react';
import { articles } from '../../data/articles-data'; 

// Fungsi sederhana untuk mengubah Markdown menjadi paragraf HTML (simulasi)
const renderContent = (content) => {
    if (!content) return null;
    return content.split('\n\n').map((paragraph, index) => {
        // Menangani subheading
        if (paragraph.startsWith('###')) {
            return <h4 key={index} className="text-2xl font-semibold mt-8 mb-4 text-gray-800 border-b pb-1">{paragraph.substring(4)}</h4>;
        }
        // Menangani daftar (simulasi sederhana)
        if (paragraph.startsWith('1.') || paragraph.startsWith('*')) {
             return <ul key={index} className="list-disc list-inside space-y-2 pl-4 mb-4 text-lg text-gray-700">{
                paragraph.split('\n').map((item, i) => <li key={i}>{item.replace(/^[0-9]\. |^\* /, '')}</li>)
             }</ul>;
        }
        return <p key={index} className="mb-6 text-lg leading-relaxed text-gray-700">{paragraph}</p>;
    });
};

export default function ArticleDetail({ article }) {
    const router = useRouter();

    if (router.isFallback || !article) {
        return <div className="p-8 text-center text-gray-600">Memuat artikel atau artikel tidak ditemukan...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Head>
                <title>{article.title} | Blog Komunitas</title>
            </Head>
            
            <header className="bg-indigo-700 shadow-lg p-4 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-extrabold text-white">🌐 Blog Komunitas</h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 pt-10">
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl border-t-8 border-indigo-600">
                    <button 
                        onClick={() => router.push('/')}
                        className="text-indigo-600 hover:text-indigo-800 font-medium mb-8 flex items-center transition duration-200 text-base"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Kembali ke Daftar Artikel
                    </button>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">{article.title}</h1>
                    
                    {/* Meta Info */}
                    <div className="text-sm text-gray-500 border-b pb-4 mb-10 flex flex-wrap gap-x-6">
                        <span className="flex items-center mb-2">
                            <User className="w-4 h-4 mr-2 text-indigo-400" />
                            Oleh <span className="font-semibold text-gray-700 ml-1">{article.authorName}</span>
                        </span>
                        <span className="flex items-center mb-2">
                            <Calendar className="w-4 h-4 mr-2 text-indigo-400" />
                            Dipublikasikan pada {article.date}
                        </span>
                    </div>

                    <div className="article-body">
                        {renderContent(article.fullContent)}
                    </div>
                    
                    <div className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500 text-center">
                        <p className="italic">Artikel ini dikirimkan oleh komunitas dan diverifikasi melalui GitHub Pull Request.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export async function getStaticPaths() {
    const paths = articles.map(article => ({
        params: { slug: article.slug },
    }));
    return { paths, fallback: false }; 
}

export async function getStaticProps({ params }) {
    const article = articles.find(a => a.slug === params.slug);
    return {
        props: {
            article,
        },
    };
                      }
