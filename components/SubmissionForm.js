// components/SubmissionForm.js
import React, { useState } from 'react';
import { Loader2, Send, CheckCircle, XCircle, FileText, User, Mail, ArrowLeft, Edit } from 'lucide-react';
import { useRouter } from 'next/router';

export default function SubmissionForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({ title: '', content: '', authorName: '', authorEmail: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus(null);
        
        if (!formData.title || !formData.content || !formData.authorName || !formData.authorEmail) {
            setSubmissionStatus({ success: false, message: 'Semua kolom wajib diisi!' });
            setIsSubmitting(false);
            return;
        }

        try {
            // Panggil API Route (Serverless Function) yang akan membuat PR
            const response = await fetch('/api/submit-pr', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmissionStatus({
                    success: true,
                    message: result.message,
                    url: result.pullRequestUrl
                });
                setFormData({ title: '', content: '', authorName: '', authorEmail: '' });
                // Redirect pengguna kembali ke halaman utama setelah sukses
                setTimeout(() => router.push('/'), 5000); 
            } else {
                 setSubmissionStatus({ success: false, message: `Gagal membuat Pull Request: ${result.message}` });
            }

        } catch (error) {
            setSubmissionStatus({ success: false, message: 'Kesalahan jaringan atau server: ' + error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStatusIcon = () => {
        if (!submissionStatus) return null;
        if (submissionStatus.success) return <CheckCircle className="w-6 h-6 text-green-500 mr-2" />;
        return <XCircle className="w-6 h-6 text-red-500 mr-2" />;
    };

    return (
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl max-w-3xl mx-auto border-t-4 border-indigo-500">
            <button 
                onClick={() => router.push('/')}
                className="text-gray-600 hover:text-indigo-800 font-medium mb-8 flex items-center transition duration-200 text-sm"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Batal dan Kembali ke Beranda
            </button>

            <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                <Send className="w-7 h-7 mr-3 text-indigo-600" /> Tulis Kontribusi Baru
            </h2>
            <p className="text-md text-gray-500 mb-8 pb-4 border-b">
                Artikel akan diubah menjadi Pull Request di GitHub, menunggu tinjauan Admin.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Nama */}
            <div className="relative">
                <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-1">Nama Anda</label>
                <User className="absolute left-3 top-[34px] w-5 h-5 text-gray-400" />
                <input type="text" name="authorName" value={formData.authorName} onChange={handleInputChange} placeholder="Nama Lengkap Anda" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-lg shadow-sm" required />
            </div>

            {/* Input Email */}
            <div className="relative">
                <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Mail className="absolute left-3 top-[34px] w-5 h-5 text-gray-400" />
                <input type="email" name="authorEmail" value={formData.authorEmail} onChange={handleInputChange} placeholder="Email Anda (Tidak dipublikasikan)" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-lg shadow-sm" required />
            </div>

            {/* Input Judul */}
            <div className="relative">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Judul Artikel</label>
                <FileText className="absolute left-3 top-[34px] w-5 h-5 text-gray-400" />
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Judul Artikel yang Menarik" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-lg shadow-sm" required />
            </div>

            {/* Input Konten */}
            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Isi Artikel (Gunakan Markdown)</label>
                <textarea name="content" value={formData.content} onChange={handleInputChange} placeholder="Tuliskan isi artikel Anda di sini..." rows="15" className="w-full p-4 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-base shadow-sm" required />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-4 rounded-xl font-extrabold transition duration-300 flex justify-center items-center text-xl shadow-lg transform hover:scale-[1.01] ${
                isSubmitting
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/50'
                }`}
            >
                {isSubmitting ? (
                <>
                    <Loader2 className="w-6 h-6 animate-spin mr-3" />
                    Memproses Submission...
                </>
                ) : (
                <>
                    <Send className="w-6 h-6 mr-3" />
                    Kirim Artikel & Buat PR
                </>
                )}
            </button>
            </form>

            {/* Status Submission */}
            {submissionStatus && (
            <div className={`mt-8 p-5 rounded-xl flex items-start shadow-inner ${submissionStatus.success ? 'bg-green-50 text-green-800 border-green-400' : 'bg-red-50 text-red-800 border-red-400'} border-2`}>
                {getStatusIcon()}
                <div className='flex-1'>
                <p className="font-semibold text-lg">{submissionStatus.success ? "Submission Berhasil!" : "Gagal!"}</p>
                <p className="text-base">{submissionStatus.message}</p>
                {submissionStatus.url && (
                    <a href={submissionStatus.url} target="_blank" rel="noopener noreferrer" className="text-sm underline hover:text-indigo-600 mt-2 block font-medium">
                    Lihat Pull Request (Simulasi)
                    </a>
                )}
                </div>
            </div>
            )}
        </div>
    );
};
