import React, { useState, useCallback, useMemo } from 'react';
import { Menu, X, Send, Twitter, Linkedin, Github, MessageSquare, Briefcase, DollarSign, BookOpen, Clock, User, ArrowLeft } from 'lucide-react';

// --- Konfigurasi Awal & Data Simulasi ---
const categories = [
  { name: 'DeFi & Staking', icon: DollarSign, slug: 'defi', color: 'text-teal-400' },
  { name: 'NFTs & Metaverse', icon: MessageSquare, slug: 'nfts', color: 'text-pink-500' },
  { name: 'Teknologi Blockchain', icon: Briefcase, slug: 'tech', color: 'text-indigo-400' },
  { name: 'Berita & Analisis Pasar', icon: BookOpen, slug: 'news', color: 'text-yellow-400' },
];

// Data Artikel Simulasi (Mock Data)
const mockArticles = [
  {
    id: 1,
    title: "Masa Depan DeFi: Staking Likuid dan Yield Farming 2.0",
    author: "Jane Doe",
    date: "2025-10-01",
    excerpt: "Sebuah tinjauan mendalam tentang bagaimana protokol DeFi berevolusi, berfokus pada peningkatan efisiensi modal dan mitigasi risiko impermanent loss...",
    content: "# Masa Depan DeFi: Staking Likuid dan Yield Farming 2.0\n\nSelamat datang di era baru keuangan terdesentralisasi. Staking likuid memungkinkan pengguna untuk mendapatkan imbal hasil sambil tetap memegang token yang dapat diperdagangkan, membuka peluang baru dalam *yield farming*.\n\n## Revolusi LST\n\nProtokol Liquid Staking Token (LST) seperti Lido atau Rocket Pool tidak hanya meningkatkan likuiditas, tetapi juga meningkatkan keamanan jaringan. Ini adalah kunci pertumbuhan ekosistem Ethereum pasca-Merge. LST juga berfungsi sebagai jaminan di protokol pinjaman, melipatgandakan utilitas aset yang sebelumnya terkunci.\n\n## Tantangan & Regulasi\n\nTidak ada inovasi tanpa tantangan. Regulasi menjadi perhatian utama, terutama seputar sifat desentralisasi LST. Namun, komunitas terus beradaptasi, mencari solusi yang mematuhi hukum tanpa mengorbankan prinsip inti desentralisasi.\n\n*Artikel ini disubmit pada 2025-10-01.*",
    category: 'DeFi & Staking',
    slug: 'masa-depan-defi',
  },
  {
    id: 2,
    title: "NFT Generatif: Evolusi Seni Digital di Metaverse",
    author: "KriptoBudi",
    date: "2025-09-28",
    excerpt: "Menggali potensi NFT generatif, di mana algoritma menciptakan karya seni unik. Bagaimana ini mengubah peran seniman dan kolektor dalam ruang Metaverse?",
    content: "# NFT Generatif: Evolusi Seni Digital di Metaverse\n\nNFT generatif adalah perpaduan antara seni dan kode. Seniman mendefinisikan aturan, dan algoritma komputer mengeksekusi cetak biru tersebut, menghasilkan ribuan karya unik.\n\n## Peran Art Blocks\n\nPlatform seperti Art Blocks memimpin pergerakan ini, menyediakan lingkungan yang transparan dan terbukti untuk seni generatif. Nilai sebuah karya tidak hanya pada hasilnya, tetapi pada algoritmanya.\n\n## Integrasi Metaverse\n\nKarya-karya ini menjadi aset penting di Metaverse, berfungsi sebagai identitas, properti virtual, atau bahkan kunci akses ke pengalaman eksklusif. Masa depan seni digital adalah interaktif dan dapat diprogram.\n\n*Artikel ini disubmit pada 2025-09-28.*",
    category: 'NFTs & Metaverse',
    slug: 'nft-generatif-metaverse',
  },
];

const mockSubmitToGitHub = async (articleData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Submission successful. Next step is actual GitHub API call in Next.js Serverless Function.");
      resolve({ success: true });
    }, 2000);
  });
};

const renderMarkdown = (markdown) => {
  if (!markdown) return '';
  markdown = markdown.replace(/^# (.*)$/gm, '<h2 class="text-3xl font-bold mt-8 mb-4 text-teal-400">$1</h2>');
  markdown = markdown.replace(/^## (.*)$/gm, '<h3 class="text-xl font-semibold mt-6 mb-3 text-pink-500">$1</h3>');
  markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Mengganti baris baru ganda menjadi paragraf
  markdown = markdown.split('\n\n').map(p => {
    if (p.startsWith('<h') || p.startsWith('<strong>') || p.startsWith('<em>') || p.startsWith('*Artikel ini')) {
        return p; // Jangan bungkus heading/strong/em/disclaimer
    }
    return `<p class="leading-relaxed text-gray-300 mb-4">${p.trim()}</p>`;
  }).join('');
  return { __html: markdown };
};

// Komponen Item Menu
const AnimatedMenuItem = ({ name, icon: Icon, index, isMenuOpen, onClick }) => {
  const delay = isMenuOpen ? `${index * 150}ms` : '0ms';
  return (
    <a
      href="#"
      onClick={onClick}
      className={`
        flex items-center space-x-4 p-4 text-xl font-bold cursor-pointer
        transform transition-all duration-500 ease-in-out
        hover:text-pink-500 hover:scale-[1.02] 
        ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      style={{ transitionDelay: delay }}
    >
      <Icon className={`w-6 h-6 ${categories.find(c => c.name === name)?.color || 'text-teal-400'}`} />
      <span>{name}</span>
    </a>
  );
};

// Komponen Kartu Preview Artikel
const PostCard = ({ article, onReadMore }) => {
  const categoryData = categories.find(c => c.name === article.category) || categories[0];
  const Icon = categoryData.icon;

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-teal-500/20 hover:border-pink-500/50 glow-shadow hover:shadow-pink-500/20 transition duration-300 h-full flex flex-col">
      <div className={`flex items-center space-x-3 mb-4 ${categoryData.color}`}>
        <Icon className="w-5 h-5" />
        <span className="text-sm font-semibold uppercase">{article.category}</span>
      </div>
      <h3 className="text-2xl font-bold text-teal-400 mb-3 leading-snug">{article.title}</h3>
      <p className="text-gray-400 mb-4 flex-grow">{article.excerpt}</p>
      
      <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4 pt-4 border-t border-gray-700/50">
        <span className="flex items-center space-x-1">
          <User className="w-4 h-4" />
          <span>{article.author}</span>
        </span>
        <span className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{article.date}</span>
        </span>
      </div>

      <button
        onClick={() => onReadMore(article)}
        className="mt-auto px-4 py-2 text-sm font-semibold rounded-lg bg-pink-600 hover:bg-pink-700 transition duration-200 btn-glow"
      >
        Baca Selengkapnya
      </button>
    </div>
  );
};


// Komponen Daftar Postingan
const PostList = ({ articles, onReadMore, onNavigate }) => (
  <section className="py-10">
    <header className="mb-10 text-center">
      <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-pink-500 mb-3">
        Wawasan Terbaru
      </h2>
      <p className="text-gray-400 max-w-xl mx-auto">
        Jelajahi artikel-artikel revolusioner tentang DeFi, NFT, dan teknologi Blockchain dari komunitas kami.
      </p>
    </header>

    {/* Tombol Kirim Artikel */}
    <div className="flex justify-center mb-12">
        <button
            onClick={() => onNavigate('submit')}
            className="px-6 py-3 text-lg font-bold rounded-xl btn-glow
                       bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-500/30
                       transition duration-300 ease-in-out"
        >
            <Send className="w-5 h-5 inline mr-2" />
            Tulis Kontribusi Anda
        </button>
    </div>

    {/* Grid Artikel */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map(article => (
        <PostCard key={article.id} article={article} onReadMore={onReadMore} />
      ))}
    </div>

    {articles.length === 0 && (
        <p className="text-center text-gray-500 mt-12">Belum ada artikel yang dipublikasikan.</p>
    )}
  </section>
);

// Komponen Detail Artikel
const ArticleDetail = ({ article, onBack }) => (
  <section className="py-10 max-w-3xl mx-auto">
    <button onClick={onBack} className="flex items-center space-x-2 text-teal-400 hover:text-pink-500 transition mb-8 text-lg font-semibold">
      <ArrowLeft className="w-5 h-5" />
      <span>Kembali ke Daftar Artikel</span>
    </button>
    
    <article className="bg-gray-800 p-6 md:p-10 rounded-2xl border border-pink-500/20 shadow-xl">
      <div className="flex items-center space-x-3 mb-4 text-sm font-medium">
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${categories.find(c => c.name === article.category)?.color || 'text-teal-400'} bg-gray-700`}>
          {article.category}
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-pink-500 mb-6 leading-tight">
        {article.title}
      </h1>

      <div className="flex items-center text-base text-gray-500 space-x-6 pb-6 border-b border-gray-700/50 mb-8">
        <span className="flex items-center space-x-2">
          <User className="w-4 h-4 text-teal-400" />
          <span>Oleh: {article.author}</span>
        </span>
        <span className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-teal-400" />
          <span>{article.date}</span>
        </span>
      </div>
      
      {/* Konten Artikel yang di-render dari Markdown */}
      <div 
        className="prose prose-invert max-w-none text-gray-300"
        dangerouslySetInnerHTML={renderMarkdown(article.content)}
      />
    </article>
  </section>
);


// Komponen Formulir Pengiriman
const SubmissionForm = ({ onNavigate }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        walletAddress: '',
        title: '',
        article: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', 'validation_error', null

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setSubmissionStatus(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus(null);
        setIsSubmitting(true);

        if (!formData.name || !formData.email || !formData.title || !formData.article) {
            setSubmissionStatus('validation_error');
            setIsSubmitting(false);
            return;
        }

        try {
            await mockSubmitToGitHub({ 
                authorName: formData.name, 
                authorEmail: formData.email, 
                walletAddress: formData.walletAddress, 
                title: formData.title, 
                contentMarkdown: formData.article 
            });
            setSubmissionStatus('success');
            setFormData({ name: '', email: '', walletAddress: '', title: '', article: '' });
        } catch (error) {
            console.error('Submission Error:', error);
            setSubmissionStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Komponen Input Futuristik
    const FuturisticInput = ({ label, name, type = 'text', required = false, rows = 1 }) => (
        <div className="mb-6">
            <label htmlFor={name} className="block text-sm font-medium text-teal-400 mb-2">
                {label} {required && <span className="text-pink-500">*</span>}
            </label>
            {rows > 1 ? (
                <textarea
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required={required}
                    rows={rows}
                    className="w-full p-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500
                               focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition duration-200 resize-y"
                    placeholder={`Masukkan ${label.toLowerCase()} di sini...`}
                />
            ) : (
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required={required}
                    className="w-full p-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500
                               focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition duration-200"
                    placeholder={`Masukkan ${label.toLowerCase()} di sini...`}
                />
            )}
        </div>
    );

    return (
        <section className="py-10 max-w-4xl mx-auto">
            <button onClick={() => onNavigate('list')} className="flex items-center space-x-2 text-teal-400 hover:text-pink-500 transition mb-8 text-lg font-semibold">
                <ArrowLeft className="w-5 h-5" />
                <span>Kembali ke Beranda</span>
            </button>
            
            <div className="bg-gray-800 p-8 md:p-12 rounded-2xl border border-teal-400/30 glow-shadow shadow-xl">
                <h2 className="text-4xl font-extrabold mb-4 text-center text-teal-400">
                    Kirim Kontribusi Artikel Anda
                </h2>
                <p className="text-center text-gray-400 mb-8">
                    Berkontribusi dalam revolusi Web3. Tulis ide dan analisis Anda.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid md:grid-cols-2 md:gap-8">
                        <FuturisticInput label="Nama Lengkap" name="name" required />
                        <FuturisticInput label="Email Aktif" name="email" type="email" required />
                    </div>

                    <FuturisticInput 
                    label="Alamat Wallet (ERC-20/Solana/dll.)" 
                    name="walletAddress" 
                    required={false}
                    />
                    <p className="text-xs text-gray-500 -mt-4 mb-8">
                    Opsional: Wallet ini dapat digunakan untuk mengirimkan token apresiasi.
                    </p>

                    <FuturisticInput label="Judul Artikel" name="title" required />
                    <FuturisticInput label="Isi Artikel (Gunakan Markdown)" name="article" required rows={15} />

                    {submissionStatus === 'success' && (
                        <div className="p-4 bg-green-900/50 border border-green-500 rounded-lg text-green-300 text-center flex items-center justify-center space-x-2">
                            <Send className="w-5 h-5" />
                            <span>Artikel berhasil dikirim! Tim kami akan meninjau Pull Request Anda.</span>
                        </div>
                    )}
                    {submissionStatus === 'error' && (
                        <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-300 text-center">
                            Terjadi kesalahan saat pengiriman. Silakan coba lagi.
                        </div>
                    )}
                    {submissionStatus === 'validation_error' && (
                        <div className="p-4 bg-yellow-900/50 border border-yellow-500 rounded-lg text-yellow-300 text-center">
                            Mohon lengkapi semua kolom wajib diisi (*).
                        </div>
                    )}


                    <div className="pt-4 flex justify-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-auto px-8 py-3 text-lg font-bold rounded-xl btn-glow
                                    bg-pink-600 hover:bg-pink-700 text-white
                                    transition duration-300 ease-in-out
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center space-x-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Mengirim ke Gateway...</span>
                                </span>
                            ) : (
                                'Kirim Artikel & Jadi Fam'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};


// Komponen Utama
const App = () => {
  const [currentPage, setCurrentPage] = useState('list');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);
  
  const handleNavigate = (page, article = null) => {
      setCurrentPage(page);
      setSelectedArticle(article);
      if (isMenuOpen) toggleMenu();
  };
  
  const handleReadMore = (article) => {
    handleNavigate('article', article);
  };
  
  const handleBack = () => {
    handleNavigate('list');
  };

  const renderContent = useMemo(() => {
    if (currentPage === 'article' && selectedArticle) {
      return <ArticleDetail article={selectedArticle} onBack={handleBack} />;
    }
    if (currentPage === 'submit') {
        return <SubmissionForm onNavigate={handleNavigate} />;
    }
    return <PostList articles={mockArticles} onReadMore={handleReadMore} onNavigate={handleNavigate} />;
  }, [currentPage, selectedArticle]);

  // --- Konten CSS yang diperbaiki menggunakan String Biasa untuk stabilitas kompilasi ---
  const customStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
    /* CSS Kustom untuk Efek Glow dan Transisi */
    .glow-shadow {
      box-shadow: 0 0 10px rgba(52, 211, 163, 0.5), 0 0 20px rgba(52, 211, 163, 0.2);
    }
    .btn-glow {
      transition: all 0.3s ease;
    }
    .btn-glow:hover {
      box-shadow: 0 0 15px rgba(236, 72, 153, 0.7); /* Pink glow on hover */
      transform: translateY(-2px);
    }
    .menu-overlay {
      z-index: 40; /* Di bawah navbar, di atas konten */
    }
    /* Custom CSS untuk prose markdown rendering */
    .prose-invert h1 { color: #34d399; }
    .prose-invert h2 { color: #5eead4; }
    .prose-invert strong { color: #f472b6; }
    .prose-invert em { color: #a5f3fc; }
  `;

  return (
    <div className="min-h-screen bg-gray-900 text-white font-['Inter'] antialiased">
      {/* Skrip Tailwind - tetap diperlukan untuk setup file tunggal */}
      <script src="https://cdn.tailwindcss.com"></script>
      
      {/* --- Style Block Diperbaiki --- */}
      {/* Menggunakan dangerouslySetInnerHTML untuk stabilitas kompilasi di Next.js/Vercel */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* --- Header (Navigasi) --- */}
      <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-teal-500/20 shadow-lg shadow-gray-900">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <h1 
            onClick={() => handleNavigate('list')}
            className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-pink-500 tracking-wider cursor-pointer"
          >
            CryptoFamId
          </h1>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full border-2 border-teal-400 text-teal-400 transition duration-300 hover:bg-teal-400 hover:text-gray-900"
            aria-label={isMenuOpen ? "Tutup Menu" : "Buka Menu"}
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* --- Menu Epik (Overlay) --- */}
      <nav
        className={`fixed top-16 left-0 right-0 h-[calc(100vh-64px)] bg-gray-900/95 menu-overlay backdrop-blur-md overflow-hidden transition-opacity duration-500 ease-in-out ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col items-center justify-start h-full pt-12">
          <h2 className={`text-3xl font-semibold mb-8 text-pink-500 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 delay-300' : 'opacity-0'}`}>
            Kategori
          </h2>
          {categories.map((item, index) => (
            <AnimatedMenuItem
              key={item.slug}
              name={item.name}
              icon={item.icon}
              index={index}
              isMenuOpen={isMenuOpen}
              onClick={() => { toggleMenu(); }}
            />
          ))}
          <button
            onClick={() => handleNavigate('submit')}
            className={`
              mt-10 p-3 bg-pink-500 text-gray-900 font-extrabold rounded-lg btn-glow
              transform transition-all duration-500 ease-in-out text-lg shadow-lg
              ${isMenuOpen ? 'translate-y-0 opacity-100 delay-[800ms]' : 'translate-y-10 opacity-0'}
            `}
            style={{ transitionDelay: isMenuOpen ? `${categories.length * 150 + 400}ms` : '0ms' }}
          >
            Tulis Artikel
          </button>
        </div>
      </nav>

      {/* --- Konten Utama (Conditional Rendering) --- */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderContent}
      </main>

      {/* --- Footer (Futuristik) --- */}
      <footer className="mt-20 border-t border-teal-500/20 bg-gray-900 pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-xl font-extrabold text-teal-400 mb-4">
            CryptoFamId | Komunitas Web3 Indonesia
          </h3>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="p-3 bg-gray-800 rounded-full text-white hover:text-pink-500 transition duration-300 glow-shadow hover:shadow-pink-500/50" aria-label="Twitter">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="p-3 bg-gray-800 rounded-full text-white hover:text-pink-500 transition duration-300 glow-shadow hover:shadow-pink-500/50" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="p-3 bg-gray-800 rounded-full text-white hover:text-pink-500 transition duration-300 glow-shadow hover:shadow-pink-500/50" aria-label="GitHub">
              <Github className="w-6 h-6" />
            </a>
          </div>

          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CryptoFamId. Dibangun dengan Next.js & Semangat Komunitas.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;


