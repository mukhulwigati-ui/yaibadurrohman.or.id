// app/kebijakan-privasi/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

// 🚀 OPTIMASI SEO MASTER KEBIJAKAN PRIVASI
export const metadata: Metadata = {
  title: 'Kebijakan Privasi | Perlindungan Data Donatur LAZIS Khoiro Ummah',
  description: 'Kebijakan privasi resmi LAZIS Khoiro Ummah (lazisku.com). Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi serta informasi transaksi Ziswaf Anda secara aman.',
  keywords: ['kebijakan privasi lazisku', 'keamanan data donatur', 'privasi lazis khoiro ummah', 'perlindungan data banyumas'],
  alternates: {
    canonical: '/kebijakan-privasi',
  },
};

export default function KebijakanPrivasiPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-16">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADLINE UTAMA */}
        <div className="border-b-2 border-emerald-600 pb-4 space-y-2">
          <span className="text-xs font-black text-emerald-600 uppercase tracking-widest block">
            PRIVACY POLICY DOCUMENT
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#333333] tracking-tight">
            Kebijakan Privasi
          </h1>
          <p className="text-xs text-gray-400 font-medium">
            Terakhir diperbarui: Juli 2026
          </p>
        </div>

        {/* ISI KONTEN PRIVASI */}
        <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-6 text-left">
          <p>
            Lembaga <strong>LAZIS Khoiro Ummah (lazisku.com)</strong> berkomitmen penuh untuk menghormati dan melindungi setiap informasi pribadi yang Anda percayakan kepada kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, mengelola, menggunakan, dan mengamankan data pribadi Anda saat menggunakan platform donasi digital kami.
          </p>
          <p>
            Kami memastikan bahwa pengumpulan data dilakukan demi meningkatkan efisiensi pelayanan ibadah Ziswaf Anda, transparansi pelaporan, serta kepatuhan penuh terhadap regulasi perlindungan data privasi yang berlaku.
          </p>

          {/* BARIS POIN-POIN KEBIJAKAN PRIVASI */}
          <div className="space-y-6 pt-4">
            
            {/* 1. Informasi yang Kami Kumpulkan */}
            <div className="space-y-2">
              <h2 className="text-base font-black text-gray-950 uppercase tracking-wide flex items-center gap-2">
                <span className="text-emerald-600">01.</span> Informasi yang Kami Kumpulkan
              </h2>
              <p className="text-xs md:text-sm text-gray-600 pl-4">
                Saat Anda berniat melakukan transaksi donasi di platform kami, kami mengumpulkan data yang Anda berikan secara sukarela berupa:
              </p>
              <ul className="list-disc list-inside pl-8 text-xs md:text-sm text-gray-600 space-y-1.5">
                <li><strong>Identitas Donatur:</strong> Nama Donatur (atau pilihan anonim sebagai Hamba Allah).</li>
                <li><strong>Informasi Kontak:</strong> Nomor WhatsApp aktif untuk kebutuhan otomatisasi pengiriman bukti transaksi pembayaran via API.</li>
                <li><strong>Data Transaksi:</strong> Nominal infak, metode pembayaran pilihan (QRIS/Virtual Account), waktu donasi, serta program kampanye yang dipilih.</li>
              </ul>
            </div>

            {/* 2. Penggunaan Informasi */}
            <div className="space-y-2">
              <h2 className="text-base font-black text-gray-950 uppercase tracking-wide flex items-center gap-2">
                <span className="text-emerald-600">02.</span> Bagaimana Kami Menggunakan Informasi Anda
              </h2>
              <ul className="list-disc list-inside pl-4 text-xs md:text-sm text-gray-600 space-y-1.5">
                <li>Memproses tautan pembayaran instan secara aman melalui gerbang integrasi pihak ketiga (Pakasir API).</li>
                <li>Mencatat histori riwayat infak Anda ke dalam sistem basis data internal kami (Sanity CMS) guna keperluan pelaporan donatur transparan.</li>
                <li>Mengirimkan pesan konfirmasi notifikasi tagihan atau kuitansi digital sukses secara langsung ke nomor WhatsApp Anda.</li>
                <li>Menganalisis statistik program donasi terpopuler guna mengoptimalkan penyaluran manfaat kemaslahatan secara lebih inklusif.</li>
              </ul>
            </div>

            {/* 3. Perlindungan & Keamanan Data */}
            <div className="space-y-2">
              <h2 className="text-base font-black text-gray-950 uppercase tracking-wide flex items-center gap-2">
                <span className="text-emerald-600">03.</span> Keamanan & Penyimpanan Data Pribadi
              </h2>
              <p className="text-xs md:text-sm text-gray-600 pl-4">
                Kami menerapkan enkripsi standar industri dan protokol keamanan digital ketat untuk melindungi data Anda dari akses tidak sah, pengubahan, pengungkapan, atau penghancuran tanpa izin. Data transaksi tersimpan aman di server awan terenkripsi dan hanya dapat diakses oleh tim admin internal yang memiliki wewenang khusus.
              </p>
            </div>

            {/* 4. Berbagi Informasi dengan Pihak Ketiga */}
            <div className="space-y-2">
              <h2 className="text-base font-black text-gray-950 uppercase tracking-wide flex items-center gap-2">
                <span className="text-emerald-600">04.</span> Pengungkapan Data Pihak Ketiga
              </h2>
              <p className="text-xs md:text-sm text-gray-600 pl-4">
                Kami <strong>tidak pernah</strong> menjual, menyewakan, membagikan, atau memperdagangkan data pribadi donatur kepada pihak ketiga mana pun untuk kepentingan komersial/periklanan. Kami hanya membagikan data spesifik dengan mitra penyedia layanan finansial tepercaya kami (seperti Link Payment Gateway Pakasir) semata-mata demi kelancaran penyelesaian enkripsi transaksi donasi Anda.
              </p>
            </div>

            {/* 5. Hak-Hak Pengguna */}
            <div className="space-y-2">
              <h2 className="text-base font-black text-gray-950 uppercase tracking-wide flex items-center gap-2">
                <span className="text-emerald-600">05.</span> Hak Kendali Donatur
              </h2>
              <p className="text-xs md:text-sm text-gray-600 pl-4">
                Anda memiliki hak penuh untuk meminta klarifikasi, pembaruan, ataupun penghapusan informasi data nomor WhatsApp Anda dari database kami kapan saja dengan menghubungi pusat manajemen pengelola layanan data kami.
              </p>
            </div>

          </div>
        </div>

        {/* SECTION FOOTER CALL TO ACTION */}
        <div className="bg-gray-50 border border-gray-100 p-6 text-center rounded-none space-y-3.5 mt-8">
          <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-xl mx-auto">
            Miliki kekhawatiran atau pertanyaan mendalam seputar pengelolaan aspek privasi data digital Anda di platform kami? Silakan bicarakan langsung dengan kami.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-1">
            <Link 
              href="/kontak"
              className="inline-block border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-black text-xs uppercase tracking-widest px-6 py-3 rounded-none transition"
            >
              Hubungi Admin ✉️
            </Link>
            <Link 
              href="/"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-none transition shadow-md shadow-emerald-100"
            >
              Kembali ke Beranda 🚀
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}