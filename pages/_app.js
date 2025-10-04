// pages/_app.js
import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Head untuk setting global seperti viewport */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* Component akan menjadi halaman yang sedang dikunjungi (index, submit, [slug]) */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

