'use client';

import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    // 🚀 CONTAINER UTAMA DENGAN BACKGROUND IMAGE
    <section className="relative w-full min-h-[85vh] flex items-center justify-center bg-gray-900 overflow-hidden shrink-0">
      
      {/* 1. Background Image dengan Efek Parallax Sederhana & Blur Halus */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000"
        style={{ 
          backgroundImage: "url('/images/hero-bg.png')", // ⚠️ Taruh gambar Anda di /public/images/hero-bg.jpg
          filter: 'blur(1px)' // Memberikan efek blur halus agar fokus ke teks
        }}
      />

      {/* 2. Overlay Gelap Dinamis (Gradient) agar Teks Terbaca Jelas */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-gray-950/90 via-gray-900/70 to-gray-950/90" />

      {/* 3. Konten Utama Hero (Teks & Tombol) */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 py-20 text-center flex flex-col items-center">
        
        {/* 🚀 FIXED AREA LOGO: Bersih tanpa kotak putih, menyala terang benderang saat disentuh kursor */}
        <div className="flex items-center mb-10 cursor-pointer group select-none">
          {/* Kontainer tanpa bg-white & tanpa border kotak */}
          <div className="relative h-36 md:h-40 w-auto flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105">
            <img 
              src="/images/logo-lazisku.png" 
              alt="Logo lazisku" 
              className="h-full w-auto object-contain transition-all duration-500 filter drop-shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:drop-shadow-[0_0_35px_rgba(52,211,153,0.9)]"
            />
          </div>
        </div>

        {/* Judul Utama (Headline) yang Menggugah & Besar */}
        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter mb-6 uppercase">
          Wujudkan <span className="text-emerald-400">Senyum</span> Mereka Dengan <span className="relative inline-block">
            <span className="relative z-10">Sedekah</span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-emerald-500/30 rounded-full -z-10"></span>
          </span> Anda
        </h1>

        {/* Deskripsi Singkat (Sub-headline) */}
        <p className="text-base md:text-lg text-gray-300 mb-12 max-w-3xl leading-relaxed font-medium">
          Salurkan bantuan terbaik Anda melalui <span className="font-bold text-white">Yayasan Khoiro Ummah Bina Umat</span> secara transparan, amanah, dan instan menggunakan QRIS. Setiap rupiah yang Anda donasikan adalah jembatan kebaikan bagi sesama.
        </p>

        {/* Tombol Ajakan Bertindak (CTA Button) */}
        <Link
          href="/program"
          className="group relative inline-flex items-center justify-center gap-2.5 bg-emerald-600 text-white font-black px-12 py-5 rounded-none text-sm uppercase tracking-widest transition-all duration-300 hover:bg-emerald-700 shadow-xl shadow-emerald-950/30 overflow-hidden"
        >
          {/* Efek Kilatan Cahaya saat Hover */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          
          <span className="relative z-10 flex items-center gap-2.5">
            Donasi Sekarang
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1.5">🚀</span>
          </span>
        </Link>

      </div>
    </section>
  );
}