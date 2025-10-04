// pages/_app.js
// PENTING: Next.js memerlukan impor CSS global HANYA di file _app.js.
import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Memastikan desain responsif di semua perangkat */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Blog Komunitas Publik</title>
      </Head>
      {/* Component adalah halaman yang sedang dimuat (Home, Submit, Article Detail) */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp; // Wajib di export
