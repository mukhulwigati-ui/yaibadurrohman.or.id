// app/bantuan/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pusat Bantuan | yaibadurrohman.or.id',
  description: 'Butuh bantuan terkait layanan digital, metode akses, atau informasi platform? Tim Admin yaibadurrohman.or.id siap membantu kebutuhan Anda.',
  alternates: {
    canonical: '/bantuan',
  },
};

export default function BantuanPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-4 px-3 pb-24">
      {/* 🚀 MODEL MOBILE FIRST: Disesuaikan dengan lebar card mobile yang ringkas, rapi, dan konsisten */}
      <div className="w-full max-w-sm mx-auto bg-white border border-slate-200 shadow-sm p-4 space-y-4">
        
        {/* HEADER BANTUAN */}
        <div className="border-b border-sky-600 pb-2.5 space-y-1">
          <span className="text-[9px] font-bold text-sky-600 uppercase tracking-widest block">
            PUSAT LAYANAN PENGGUNA
          </span>
          <h1 className="text-xl font-extrabold text-[#333333] tracking-tight">
            Bagaimana Kami Bisa Membantu?
          </h1>
          <p className="text-[11px] text-slate-500 font-medium">
            Temukan panduan cepat atau hubungi tim operasional kami untuk kendala seputar platform dan layanan digital.
          </p>
        </div>

        {/* GRID OPSYI BANTUAN */}
        <div className="grid grid-cols-1 gap-3">
          
          {/* Card 1: Konfirmasi / Kendala Akses */}
          <div className="border border-slate-200 p-3 space-y-1.5 rounded-lg hover:border-sky-500 transition-colors">
            <h3 className="font-bold text-slate-900 text-xs">Kendala Akun & Akses</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Mengalami kendala saat masuk akun atau verifikasi data? Tim kami siap membantu memeriksa status akun Anda.
            </p>
          </div>

          {/* Card 2: Layanan & Informasi */}
          <div className="border border-slate-200 p-3 space-y-1.5 rounded-lg hover:border-sky-500 transition-colors">
            <h3 className="font-bold text-slate-900 text-xs">Informasi Platform</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Panduan mengenai cara menggunakan berbagai fitur dan layanan digital yang tersedia di yaibadurrohman.or.id.
            </p>
          </div>

          {/* Card 3: Status & Update */}
          <div className="border border-slate-200 p-3 space-y-1.5 rounded-lg hover:border-sky-500 transition-colors">
            <h3 className="font-bold text-slate-900 text-xs">Status Aktivitas</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Ingin memantau histori atau laporan berkala? Kami menyediakan informasi transparan di setiap menu terkait.
            </p>
          </div>

          {/* Card 4: Pertanyaan Umum */}
          <div className="border border-slate-200 p-3 space-y-1.5 rounded-lg hover:border-sky-500 transition-colors">
            <h3 className="font-bold text-slate-900 text-xs">FAQ Umum</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Jawaban atas pertanyaan-pertanyaan yang paling sering diajukan oleh pengguna kepada tim yaibadurrohman.or.id.
            </p>
          </div>
        </div>

        {/* SECTION KONTAK LANGSUNG */}
        <div className="bg-[#0d5c91] text-white p-4 rounded-xl space-y-3.5 mt-4">
          <div className="space-y-0.5">
            <h2 className="text-sm font-bold uppercase tracking-wide">Hubungi Tim Layanan</h2>
            <p className="text-[10px] text-sky-200">Admin siap melayani pada hari kerja (Senin - Jumat, 08.00 - 16.00 WIB)</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <Link 
              href="https://wa.me/6281225147373" 
              target="_blank"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 font-bold text-[10px] uppercase tracking-wider py-2.5 rounded-lg transition shadow-sm"
            >
              Chat via WhatsApp (Respon Cepat) 💬
            </Link>
            <div className="text-center text-[10px] text-sky-200">
              Atau kirim email ke: info@yaibadurrohman.or.id
            </div>
          </div>
        </div>

        {/* TOMBOL KEMBALI */}
        <div className="pt-2">
          <Link 
            href="/"
            className="w-full block text-center border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-[10px] uppercase tracking-wider py-2 rounded-md transition"
          >
            Kembali ke Beranda 🚀
          </Link>
        </div>

      </div>
    </div>
  );
}