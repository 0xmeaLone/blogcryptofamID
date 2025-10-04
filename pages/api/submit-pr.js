// pages/api/submit-pr.js

// This file is the Vercel Serverless Function (API Route)
// IT MUST BE SECURE AND ONLY RUNS ON THE SERVER SIDE.

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Hanya metode POST yang diizinkan.' });
    }

    const { title, content, authorName, authorEmail } = req.body;

    // 1. Validasi Input
    if (!title || !content || !authorName || !authorEmail) {
        return res.status(400).json({ success: false, message: 'Data input tidak lengkap.' });
    }

    // 2. Akses Rahasia GitHub PAT
    // Di Vercel, TOKEN INI DIJAMIN HANYA DAPAT DIAKSES DI SINI (SERVER)
    const GITHUB_PAT = process.env.GITHUB_PERSONAL_ACCESS_TOKEN; 
    const REPO_OWNER = 'YOUR_GITHUB_USERNAME'; // Ganti dengan username GitHub Anda
    const REPO_NAME = 'your-blog-repo'; // Ganti dengan nama repo blog Anda
    const BASE_BRANCH = 'main'; 

    if (!GITHUB_PAT || REPO_OWNER === 'YOUR_GITHUB_USERNAME') {
        // Ini adalah langkah keamanan dan petunjuk dalam simulasi.
        console.error('GITHUB_PERSONAL_ACCESS_TOKEN atau REPO OWNER belum dikonfigurasi.');
        
        // --- SIMULASI BERHASIL ---
        // Karena kita tidak bisa melakukan koneksi nyata ke GitHub, kita akan mengembalikan simulasi sukses.
        const pullRequestUrl = `https://github.com/${REPO_OWNER}/${REPO_NAME}/pull/simulasi-${Math.floor(Math.random() * 100)}`;
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        return res.status(200).json({ 
            success: true, 
            message: 'SIMULASI BERHASIL: Pull Request telah dibuat. Anda perlu mengkonfigurasi GITHUB_PAT di Vercel untuk koneksi nyata.', 
            pullRequestUrl 
        });
        // --- AKHIR SIMULASI ---
    }


    // 3. LOGIKA GITHUB API NYATA (Hanya sebagai referensi/komentar)
    
    /*
    
    // --- Langkah-langkah Nyata untuk Membuat PR menggunakan Octokit ---
    
    // Instal: npm install @octokit/rest
    
    const { Octokit } = require('@octokit/rest');
    const octokit = new Octokit({ auth: GITHUB_PAT });
    
    try {
        const timestamp = Date.now();
        const branchName = `article-submission-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${timestamp}`;
        const filePath = `posts/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`; 
        
        const fileContent = `---
title: "${title}"
author: "${authorName}"
email: "${authorEmail}"
date: "${new Date().toISOString().split('T')[0]}"
---

${content}`;

        // Langkah A: Ambil referensi SHA dari branch utama
        const mainBranch = await octokit.git.getRef({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            ref: `heads/${BASE_BRANCH}`,
        });

        // Langkah B: Buat branch baru dari branch utama
        await octokit.git.createRef({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            ref: `refs/heads/${branchName}`,
            sha: mainBranch.data.object.sha,
        });

        // Langkah C: Buat atau update file dengan konten artikel
        const contentBase64 = Buffer.from(fileContent).toString('base64');
        await octokit.repos.createOrUpdateFileContents({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: filePath,
            message: `Kontribusi: ${title} oleh ${authorName}`,
            content: contentBase64,
            branch: branchName,
        });

        // Langkah D: Buat Pull Request
        const pr = await octokit.pulls.create({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            title: `Kontribusi Baru: ${title} (${authorName})`,
            head: branchName,
            base: BASE_BRANCH,
            body: `Artikel baru dari kontributor publik:\n\n- **Nama:** ${authorName}\n- **Email:** ${authorEmail}\n\nMohon tinjau dan merge.`,
        });

        return res.status(200).json({ 
            success: true, 
            message: 'Artikel berhasil dikirim! Pull Request telah dibuat.', 
            pullRequestUrl: pr.data.html_url 
        });

    } catch (error) {
        console.error('GitHub API Error:', error);
        return res.status(500).json({ success: false, message: 'Gagal berinteraksi dengan GitHub API.' });
    } 
    */
}
