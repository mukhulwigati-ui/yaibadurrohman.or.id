// app/syarat-ketentuan/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

// 🚀 OPTIMASI SEO MASTER
export const metadata: Metadata = {
  title: 'Syarat & Ketentuan | LAZIS Khoiro Ummah',
  description: 'Syarat dan ketentuan resmi penggunaan platform layanan donasi online LAZIS Khoiro Ummah (lazisku.com). Pelajari panduan hak, kewajiban donatur, dan mekanisme penyaluran dana Ziswaf.',
  keywords: ['syarat ketentuan lazisku', 'regulasi donasi online', 'kebijakan amil zakat', 'panduan infak banyumas'],
  alternates: {
    canonical: '/syarat-ketentuan',
  },
};

export default function SyaratKetentuanPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-16">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADLINE UTAMA */}
        <div className="border-b-2 border-emerald-600 pb-4 space-y-2">
          <span className="text-xs font-black text-emerald-600 uppercase tracking-widest block">
            DOKUMEN REGULASI RESMI
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#333333] tracking-tight">
            Syarat & Ketentuan Penggunaan
          </h1>
          <p className="text-xs text-gray-400 font-medium">
            Terakhir diperbarui: Juli 2026
          </p>
        </div>

        {/* ISI KONTEN HUKUM / REGULASI */}
        <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-6 text-left">
          <p>
            Selamat datang di platform digital resmi <strong>LAZIS Khoiro Ummah (lazisku.com)</strong>. Sebelum Anda melanjutkan proses transaksi infak, zakat, maupun sedekah, mohon luangkan waktu sejenak untuk membaca dan memahami seluruh Syarat & Ketentuan yang berlaku di bawah ini.
          </p>
          <p>
            Dengan mengakses, menggunakan, atau melakukan transaksi donasi di dalam platform ini, Anda dianggap telah membaca, memahami, dan menyetujui untuk mengikatkan diri pada seluruh aturan regulasi hukum yang ditetapkan oleh pengelola lembaga.
          </p>

          {/* BARIS POIN-POIN REGULASI */}
          <div className="space-y-6 pt-4">
            
            {/* 1. Ketentuan Donatur */}
            <div className="space-y-2">
              <h2 className="text-base font-black text-gray-950 uppercase tracking-wide flex items-center gap-2">
                <span className="text-emerald-600">01.</span> Ketentuan Donatur / Muzakki
              </h2>
              <ul className="list-disc list-inside pl-4 text-xs md:text-sm text-gray-600 space-y-1.5">
                <li>Donatur wajib berusia minimal 17 tahun atau memiliki legalitas hukum dalam melakukan transaksi keuangan mandiri.</li>
                <li>Donatur menjamin bahwa dana infak atau zakat yang disalurkan bersumber dari aset yang halal, sah secara hukum, dan tidak berasal dari tindakan kriminal/pencucian uang.</li>
                <li>Pengisian data Nomor WhatsApp opsional namun sangat disarankan demi kelancaran pengiriman notifikasi status transaksi dari sistem API.</li>
              </ul>
            </div>

            {/* 2. Mekanisme Pembayaran */}
            <div className="space-y-2">
              <h2 className="text-base font-black text-gray-950 uppercase tracking-wide flex items-center gap-2">
                <span className="text-emerald-600">02.</span> Mekanisme Transaksi & Pembayaran Gateway
              </h2>
              <ul className="list-disc list-inside pl-4 text-xs md:text-sm text-gray-600 space-y-1.5">
                <li>Seluruh pemrosesan pembayaran instan (QRIS maupun Virtual Account) dijembatani secara sah via sistem integrasi API Gateway Pakasir.</li>
                <li>Nominal donasi minimal yang ditetapkan oleh platform demi efisiensi operasional sistem adalah sebesar <strong>Rp 10.000</strong> per transaksi.</li>
                <li>Setiap transaksi yang statusnya telah dinyatakan berhasil oleh sistem pembayaran bersifat mutlak, final, dan tidak dapat dibatalkan atau ditarik kembali (*non-refundable*).</li>
              </ul>
            </div>

            {/* 3. Pengelolaan & Penyaluran Dana */}
            <div className="space-y-2">
              <h2 className="text-base font-black text-gray-950 uppercase tracking-wide flex items-center gap-2">
                <span className="text-emerald-600">03.</span> Pengelolaan & Penyaluran Dana Kebaikan
              </h2>
              <p className="text-xs md:text-sm text-gray-600 pl-4">
                LAZIS Khoiro Ummah memegang hak penuh dalam mengelola amil serta menyalurkan dana yang terhimpun ke target sasaran mustahik, program kebaikan Al-Quran, maupun dhuafa secara produktif berdasarkan prinsip prioritas kemaslahatan syariah, keabsahan fiqih, serta manajemen operasional lembaga yang akuntabel.
              </p>
            </div>

            {/* 4. Keamanan Data */}
            <div className="space-y-2">
              <h2 className="text-base font-black text-gray-950 uppercase tracking-wide flex items-center gap-2">
                <span className="text-emerald-600">04.</span> Perlindungan Data Pribadi
              </h2>
              <p className="text-xs md:text-sm text-gray-600 pl-4">
                Kami berkomitmen menjaga kerahasiaan data pribadi seperti nama, nomor kontak, serta histori log donasi yang tersimpan di dalam database CMS Sanity kami. Data tersebut tidak akan pernah diperjualbelikan kepada pihak ketiga di luar kebutuhan pemrosesan invoice transaksi donasi Anda.
              </p>
            </div>

          </div>
        </div>

        {/* SECTION FOOTER CALL TO ACTION */}
        <div className="bg-gray-50 border border-gray-100 p-6 text-center rounded-none space-y-3.5 mt-8">
          <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-xl mx-auto">
            Miliki kendala teknis atau pertanyaan lebih lanjut terkait interpretasi pasal-pasal regulasi penggunaan di atas? Silakan hubungi pusat bantuan admin kami.
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