// pages/_app.jsx
// MENGGUNAKAN JALUR ROOT PROJECT UNTUK KEAMANAN BUILD
import '../styles/globals.css'; 

// Ini adalah komponen yang membungkus semua halaman (index, submit, [slug])
function MyApp({ Component, pageProps }) {
  // Hanya me-render komponen halaman saat ini
  return <Component {...pageProps} />;
}

// WAJIB: Export default untuk Next.js
export default MyApp;
