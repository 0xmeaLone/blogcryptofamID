// pages/_app.jsx
// TENTUKAN PATH CSS DARI FOLDER PAGES: '../styles/globals.css'
import '../styles/globals.css';

// Ini adalah komponen yang membungkus semua halaman (index, submit, [slug])
function MyApp({ Component, pageProps }) {
  
  // Pastikan Anda hanya me-return satu komponen.
  // Component adalah halaman saat ini, pageProps adalah data halaman.
  return <Component {...pageProps} />;
}

// WAJIB: Export default untuk Next.js
export default MyApp;
