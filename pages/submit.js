// pages/submit.js
import Head from 'next/head';
import SubmissionForm from '../components/SubmissionForm';

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Head>
        <title>Kontribusi Artikel | Blog Komunitas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <header className="bg-indigo-700 shadow-lg p-4 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-white">🌐 Blog Komunitas</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-10">
        <SubmissionForm />
      </main>
      
      {/* Footer dihilangkan agar fokus pada formulir */}
    </div>
  );
}
