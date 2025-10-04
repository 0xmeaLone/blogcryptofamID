// File: next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hanya menambahkan properti yang diperlukan
  reactStrictMode: true,// File: next.config.js (Final Attempt to Fix CSS Loading)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Opsi eksperimental untuk memperbaiki masalah kompilasi CSS di beberapa lingkungan
  experimental: {
    // Memaksa Next.js untuk menggunakan pengumpul CSS yang lebih lama/stabil
    // Ini sering memperbaiki masalah Tailwind di Vercel ketika cache bermasalah.
    optimizeCss: true, 
  },
};

module.exports = nextConfig;

};

module.exports = nextConfig;
