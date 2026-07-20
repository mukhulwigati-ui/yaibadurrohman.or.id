// app/kebijakan-privasi/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

// 🚀 OPTIMASI SEO MASTER KEBIJAKAN PRIVASI
export const metadata: Metadata = {
  title: 'Kebijakan Privasi | Perlindungan Data Donatur yaibadurrohman.or.id',
  description: 'Kebijakan privasi resmi yaibadurrohman.or.id. Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi serta informasi transaksi Anda secara aman.',
  keywords: ['kebijakan privasi yaibadurrohman', 'keamanan data donatur', 'privasi yaibadurrohman.or.id', 'perlindungan data'],
  alternates: {
    canonical: '/kebijakan-privasi',
  },
};

export default function KebijakanPrivasiPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-4 px-3 pb-24">
      {/* 🚀 MODEL MOBILE FIRST: Dibuat pas dengan lebar card mobile (max-w-sm / max-w-md), menggunakan padding horizontal yang lebih ringkas */}
      <div className="w-full max-w-sm mx-auto bg-white border border-slate-200 shadow-sm p-4 space-y-4">
        
        {/* HEADLINE UTAMA */}
        <div className="border-b border-sky-600 pb-2.5 space-y-1">
          <span className="text-[9px] font-bold text-sky-600 uppercase tracking-widest block">
            PRIVACY POLICY DOCUMENT
          </span>
          <h1 className="text-xl font-extrabold text-[#333333] tracking-tight">
            Kebijakan Privasi
          </h1>
          <p className="text-[10px] text-slate-400 font-medium">
            Terakhir diperbarui: Juli 2026
          </p>
        </div>

        {/* ISI KONTEN PRIVASI */}
        <div className="text-slate-700 text-xs leading-relaxed space-y-3.5 text-left">
          <p>
            Yayasan <strong>yaibadurrohman.or.id</strong> berkomitmen penuh untuk menghormati dan melindungi setiap informasi pribadi yang Anda percayakan kepada kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, mengelola, menggunakan, dan mengamankan data pribadi Anda saat menggunakan platform digital kami.
          </p>
          <p>
            Kami memastikan bahwa pengumpulan data dilakukan demi meningkatkan efisiensi pelayanan, transparansi pelaporan, serta kepatuhan penuh terhadap regulasi perlindungan data privasi yang berlaku.
          </p>

          {/* BARIS POIN-POIN KEBIJAKAN PRIVASI */}
          <div className="space-y-3.5 pt-1">
            
            {/* 1. Informasi yang Kami Kumpulkan */}
            <div className="space-y-1">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <span className="text-sky-600">01.</span> Informasi yang Kami Kumpulkan
              </h2>
              <p className="text-[11px] text-slate-600 pl-3">
                Saat Anda berinteraksi atau bertransaksi di platform kami, kami mengumpulkan data yang Anda berikan secara sukarela berupa:
              </p>
              <ul className="list-disc list-inside pl-5 text-[11px] text-slate-600 space-y-0.5">
                <li><strong>Identitas Pengguna:</strong> Nama lengkap atau pilihan anonim.</li>
                <li><strong>Informasi Kontak:</strong> Nomor WhatsApp aktif untuk kebutuhan komunikasi dan konfirmasi sistem.</li>
                <li><strong>Data Aktivitas:</strong> Detail transaksi, waktu akses, serta preferensi program atau informasi yang dipilih.</li>
              </ul>
            </div>

            {/* 2. Penggunaan Informasi */}
            <div className="space-y-1">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <span className="text-sky-600">02.</span> Bagaimana Kami Menggunakan Informasi Anda
              </h2>
              <ul className="list-disc list-inside pl-3 text-[11px] text-slate-600 space-y-0.5">
                <li>Memproses layanan digital dan transaksi secara aman melalui sistem terintegrasi.</li>
                <li>Mencatat histori riwayat aktivitas Anda ke dalam sistem basis data internal kami guna keperluan pelaporan yang transparan.</li>
                <li>Mengirimkan pesan konfirmasi atau notifikasi penting secara langsung ke nomor WhatsApp Anda.</li>
                <li>Menganalisis statistik platform guna mengoptimalkan penyaluran manfaat dan kemaslahatan secara lebih inklusif.</li>
              </ul>
            </div>

            {/* 3. Perlindungan & Keamanan Data */}
            <div className="space-y-1">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <span className="text-sky-600">03.</span> Keamanan & Penyimpanan Data Pribadi
              </h2>
              <p className="text-[11px] text-slate-600 pl-3">
                Kami menerapkan standar keamanan digital yang ketat untuk melindungi data Anda dari akses tidak sah, pengubahan, pengungkapan, atau penghancuran tanpa izin. Data tersimpan aman di server terenkripsi dan hanya dapat diakses oleh tim admin internal yang memiliki wewenang khusus.
              </p>
            </div>

            {/* 4. Berbagi Informasi dengan Pihak Ketiga */}
            <div className="space-y-1">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <span className="text-sky-600">04.</span> Pengungkapan Data Pihak Ketiga
              </h2>
              <p className="text-[11px] text-slate-600 pl-3">
                Kami <strong>tidak pernah</strong> menjual, menyewakan, membagikan, atau memperdagangkan data pribadi pengguna kepada pihak ketiga mana pun untuk kepentingan komersial atau periklanan luar.
              </p>
            </div>

            {/* 5. Hak-Hak Pengguna */}
            <div className="space-y-1">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <span className="text-sky-600">05.</span> Hak Kendali Pengguna
              </h2>
              <p className="text-[11px] text-slate-600 pl-3">
                Anda memiliki hak penuh untuk meminta klarifikasi, pembaruan, ataupun penghapusan informasi data Anda dari database kami kapan saja dengan menghubungi pusat layanan pengelola data kami.
              </p>
            </div>

          </div>
        </div>

        {/* SECTION FOOTER CALL TO ACTION */}
        <div className="bg-slate-50 border border-slate-200 p-3 text-center rounded-lg space-y-2.5 mt-4">
          <p className="text-[10px] text-slate-600 font-medium leading-relaxed">
            Memiliki pertanyaan seputar pengelolaan aspek privasi data digital Anda di platform kami? Silakan hubungi kami.
          </p>
          <div className="flex flex-col gap-2 pt-0.5">
            <Link 
              href="/kontak"
              className="w-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-[10px] uppercase tracking-wider py-2 rounded-md transition"
            >
              Hubungi Admin ✉️
            </Link>
            <Link 
              href="/"
              className="w-full bg-[#0d5c91] hover:bg-sky-900 text-white font-bold text-[10px] uppercase tracking-wider py-2 rounded-md transition shadow-sm"
            >
              Kembali ke Beranda 🚀
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}