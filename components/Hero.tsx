'use client';

import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    // 🚀 CONTAINER UTAMA
    <section className="relative w-full flex items-center justify-center bg-slate-900 overflow-hidden shrink-0 py-10 md:py-14">
      
      {/* 1. BACKGROUND ORNAMEN CHARITY & FILANTROPI */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="charity-pattern" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M20 15 C20 10, 25 5, 30 10 C35 5, 40 10, 40 15 C40 22, 30 28, 30 28 C30 28, 20 22, 20 15 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M70 45 C65 45, 60 50, 60 55 C60 60, 75 65, 80 45 C70 45 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="90" cy="20" r="2" fill="currentColor" />
              <circle cx="15" cy="80" r="3" fill="currentColor" />
              <path d="M100 85 L102 90 L107 92 L102 94 L100 99 L98 94 L93 92 L98 90 Z" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#charity-pattern)" />
        </svg>
      </div>

      {/* Ambient Glow Lingkaran Belakang */}
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[90px] z-0" />

      {/* 2. KONTEN UTAMA: Grid Layout (Max-Width Presisi 1080px) */}
      <div className="relative z-20 max-w-[1080px] mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* === KOLOM KIRI: GAMBAR (7 KOLOM) === */}
        <div className="lg:col-span-7 w-full flex justify-start order-2 lg:order-1">
          <div className="relative w-full max-w-[480px] aspect-[16/9] rounded-xl overflow-hidden p-1 bg-gradient-to-b from-emerald-400/40 via-emerald-500/20 to-emerald-500/5 border border-emerald-400/40 shadow-xl shadow-emerald-950/80 group">
            
            {/* Frame Dalam Foto */}
            <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-900">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ 
                  backgroundImage: "url('/images/hero-bg.jpeg')",
                }}
              />
              
              {/* Soft overlay tipis di bawah foto */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
              
              {/* Badge Keterangan Foto */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-gray-900/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                <p className="text-[10px] sm:text-xs text-gray-200 font-medium tracking-wide truncate">
                  Tim Field Fundraiser Yayasan Islam Ibadurrohman
                </p>
              </div>
            </div>

            {/* Aksen Hiasan Sudut Frame */}
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-emerald-400 rounded-tr-md" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-emerald-400 rounded-bl-md" />
          </div>
        </div>

        {/* === KOLOM KANAN: TEKS (5 KOLOM) === */}
        <div className="lg:col-span-5 text-left flex flex-col items-start order-1 lg:order-2">
          
          {/* Tagline Yayasan */}
          <div className="inline-flex items-center gap-2 mb-3 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full shadow-md backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="text-[10px] font-bold tracking-widest text-emerald-300 uppercase">
              Yayasan Islam Ibadurrohman Cilacap
            </span>
          </div>

          {/* Headline Utama */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase leading-[1.2] mb-3">
            SIAP MENYAMPAIKAN AMANAH, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 normal-case font-bold inline-block mt-0.5">
              Menebar Harapan Sesama
            </span>
          </h1>

          {/* Deskripsi */}
          <p className="text-gray-300 text-xs sm:text-sm mb-5 max-w-sm leading-relaxed font-normal">
            Bersama tim fundraiser yang berdedikasi, kami pastikan donasi Anda sampai ke tangan yang tepat. Mudah, transparan, dan cepat via QRIS.
          </p>

          {/* Tombol CTA */}
          <Link
            href="/program"
            className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-lg shadow-emerald-950/50 border border-emerald-400/40 overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            
            <span className="relative z-10 flex items-center gap-2">
              Donasi via QRIS Sekarang
            </span>
            <svg 
              className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1 relative z-10" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

      </div>

    </section>
  );
}