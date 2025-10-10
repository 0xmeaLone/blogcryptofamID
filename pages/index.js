import React, { useState, useCallback } from 'react';
import { Menu, X, Send, Twitter, Linkedin, Github, MessageSquare, Briefcase, DollarSign, BookOpen } from 'lucide-react';
// Catatan: Ini adalah file tunggal untuk representasi Next.js/React.
// Asumsikan Tailwind CSS tersedia di lingkungan Next.js Anda.

// --- Konfigurasi Awal (Simulasi Firestore untuk State Management Sederhana) ---
// Dalam aplikasi Next.js/Vercel yang sebenarnya, form ini akan
// mengirimkan data ke API Route yang kemudian berinteraksi dengan GitHub API
// untuk membuat Pull Request artikel baru.
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const apiKey = ""; 

// Fungsi utility untuk Simulasi GitHub Submission Logic
// Dalam proyek Next.js yang sesungguhnya, fungsi ini akan berada di Vercel Serverless Function (e.g., /api/submit-article)
const mockSubmitToGitHub = async (articleData) => {
  return new Promise((resolve) => {
    // Simulasi penundaan API dan logic backend
    setTimeout(() => {
      console.log("--- START SIMULASI SUBMISSION KE GITHUB ---");
      console.log("Data Artikel Siap Diproses:", articleData);
      console.log("\nLangkah-langkah di Serverless Function Next.js/Vercel:");
      console.log("1. Validasi data input.");
      console.log("2. Gunakan GitHub Personal Access Token (PAT) yang disimpan di Environment Variables Vercel.");
      console.log("3. Panggil GitHub REST API untuk: 'GET /repos/{owner}/{repo}/contents/{path}' (untuk mendapatkan SHA file saat ini/memastikan file tidak duplikat).");
      console.log("4. Panggil GitHub REST API untuk: 'PUT /repos/{owner}/{repo}/contents/articles/{article-slug}.md'.");
      console.log("   - Payload 'PUT' berisi konten artikel yang di-encode base64 dan pesan commit.");
      console.log("   - Opsi terbaik: Buat *branch* baru dan *Pull Request* (PR) untuk proses moderasi.");
      console.log("5. Setelah PR di-merge, Vercel akan otomatis me-rebuild situs Next.js Anda dan artikel akan terbit.");
      console.log("--- END SIMULASI SUBMISSION KE GITHUB ---");
      resolve({ success: true });
    }, 2000);
  });
};

// Data Kategori untuk Menu Epik
const categories = [
  { name: 'DeFi & Staking', icon: DollarSign, slug: 'defi' },
  { name: 'NFTs & Metaverse', icon: MessageSquare, slug: 'nfts' },
  { name: 'Teknologi Blockchain', icon: Briefcase, slug: 'tech' },
  { name: 'Berita & Analisis Pasar', icon: BookOpen, slug: 'news' },
];

// Komponen Item Menu dengan Animasi Staggered
const AnimatedMenuItem = ({ name, icon: Icon, index, isMenuOpen, onClick }) => {
  // Hitung delay berdasarkan index untuk efek "satu per satu" (slowly and smoothly)
  const delay = isMenuOpen ? `${index * 150}ms` : '0ms';

  return (
    <a
      href={`#${name.toLowerCase().replace(/ & /g, '').replace(/\s/g, '-')}`}
      onClick={onClick}
      className={`
        flex items-center space-x-4 p-4 text-xl font-bold cursor-pointer
        transform transition-all duration-500 ease-in-out
        hover:text-pink-500 hover:scale-[1.02] 
        ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      style={{ transitionDelay: delay }}
    >
      <Icon className="w-6 h-6 text-teal-400" />
      <span>{name}</span>
    </a>
  );
};


const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    walletAddress: '',
    title: '',
    article: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', null

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSubmissionStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus(null);
    setIsSubmitting(true);

    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.title || !formData.article) {
      alert('Mohon lengkapi semua kolom yang wajib diisi.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Panggil simulasi untuk menjelaskan alur kerja GitHub API
      await mockSubmitToGitHub(formData);
      setSubmissionStatus('success');
      setFormData({ name: '', email: '', walletAddress: '', title: '', article: '' }); // Clear form
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
          className="w-full p-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500
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
          className="w-full p-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500
                     focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition duration-200"
          placeholder={`Masukkan ${label.toLowerCase()} di sini...`}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white font-['Inter'] antialiased">
      {/* Script untuk Inter Font dan Tailwind JIT/Config (Opsional jika sudah dikonfigurasi) */}
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        {`
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
        `}
      </style>

      {/* --- Header (Navigasi) --- */}
      <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-teal-500/20 shadow-lg shadow-gray-900">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-pink-500 tracking-wider">
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
      {/* Animasi keluar satu per satu, perlahan & smooth dari atas ke bawah */}
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
              onClick={toggleMenu}
            />
          ))}
          <a
            href="#submission"
            onClick={toggleMenu}
            className={`
              mt-10 p-3 bg-pink-500 text-gray-900 font-extrabold rounded-lg btn-glow
              transform transition-all duration-500 ease-in-out text-lg
              ${isMenuOpen ? 'translate-y-0 opacity-100 delay-[800ms]' : 'translate-y-10 opacity-0'}
            `}
            style={{ transitionDelay: isMenuOpen ? `${categories.length * 150 + 400}ms` : '0ms' }}
          >
            Tulis Artikel
          </a>
        </div>
      </nav>

      {/* --- Konten Utama (Form Submission) --- */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <section id="submission" className="bg-gray-800 p-8 md:p-12 rounded-2xl border border-teal-400/30 glow-shadow shadow-xl">
          <h2 className="text-4xl font-extrabold mb-4 text-center text-teal-400">
            Kirim Artikel Anda
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Berkontribusi dalam revolusi Web3. Tulis ide dan analisis Anda. Kami menggunakan Git-CMS untuk mempublikasikan.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Bagian Informasi Pribadi */}
            <div className="grid md:grid-cols-2 md:gap-8">
              <FuturisticInput label="Nama Lengkap" name="name" required />
              <FuturisticInput label="Email Aktif" name="email" type="email" required />
            </div>

            {/* Wallet Address (Opsional/Reward) */}
            <FuturisticInput 
              label="Alamat Wallet (ERC-20/Solana/dll.)" 
              name="walletAddress" 
              required={false}
              />
            <p className="text-xs text-gray-500 -mt-4 mb-8">
              Opsional: Wallet ini dapat digunakan untuk mengirimkan token apresiasi di masa mendatang.
            </p>

            {/* Bagian Artikel */}
            <FuturisticInput label="Judul Artikel" name="title" required />
            <FuturisticInput label="Isi Artikel (Gunakan Markdown)" name="article" required rows={15} />

            {/* Status Feedback */}
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


            {/* Tombol Submit */}
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
        </section>
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

