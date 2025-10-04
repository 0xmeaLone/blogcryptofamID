// pages/articles/[slug].js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';
import { articles } from '../../data/articles-data'; 

// Fungsi sederhana untuk mengubah Markdown menjadi paragraf HTML (simulasi)
const renderContent = (content) => {
    if (!content) return null;
    return content.split('\n\n').map((paragraph, index) => {
        if (paragraph.startsWith('###')) {
            return <h4 key={index} className="text-xl font-semibold mt-6 mb-2 text-gray-700">{paragraph.substring(4)}</h4>;
        }
        return <p key={index} className="mb-4 leading-relaxed text-gray-700">{paragraph}</p>;
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
                <h1 className="text-2xl font-extrabold text-white">🌐 Blog Komunitas</h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 pt-10">
                <div className="bg-white p-8 rounded-xl shadow-2xl">
                    <button 
                        onClick={() => router.push('/')}
                        className="text-indigo-600 hover:text-indigo-800 font-medium mb-6 flex items-center transition duration-200"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Kembali ke Daftar Artikel
                    </button>

                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{article.title}</h1>
                    <div className="text-sm text-gray-500 border-b pb-4 mb-8 flex justify-between">
                        <span>Oleh <span className="font-semibold text-gray-700">{article.authorName}</span></span>
                        <span>Dipublikasikan pada {article.date}</span>
                    </div>

                    <div className="article-body">
                        {renderContent(article.fullContent)}
                    </div>
                    
                    <div className="mt-10 pt-6 border-t border-gray-200 text-sm text-gray-500">
                        <p>Terima kasih telah membaca. Kontribusi ini melalui Pull Request di GitHub.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

// SSG: Generate paths for pre-rendering
export async function getStaticPaths() {
    const paths = articles.map(article => ({
        params: { slug: article.slug },
    }));
    return { paths, fallback: false }; 
}

// SSG: Fetch data for each article at build time
export async function getStaticProps({ params }) {
    const article = articles.find(a => a.slug === params.slug);
    return {
        props: {
            article,
        },
    };
}
