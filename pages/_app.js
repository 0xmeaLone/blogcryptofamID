// pages/_app.js
// Next.js memerlukan impor CSS global HANYA di file _app.js.
import '../styles/globals.css';
// Impor Head tidak diperlukan di sini jika sudah ada di halaman index.js

function MyApp({ Component, pageProps }) {
  // Hanya me-render komponen halaman saat ini
  return <Component {...pageProps} />;
}

export default MyApp;
