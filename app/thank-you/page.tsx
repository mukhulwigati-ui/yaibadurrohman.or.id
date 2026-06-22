// app/thank-you/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id') || 'INV-SUBUH-XXXXXX';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-all duration-300">
        
        <div>
          {/* Ikon Centang Animatif & Estetik */}
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm shadow-emerald-100 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          {/* Judul & Kalimat Apresiasi */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#333333] tracking-tight">
            Alhamdulillah!
          </h1>
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mt-1">
            Donasi Terverifikasi ➔
          </p>
          
          <p className="text-xs md:text-sm text-gray-500 mt-4 mb-6 leading-relaxed font-medium tracking-wide">
            Infak Anda telah berhasil kami terima oleh sistem secara otomatis. Terima kasih banyak atas kebaikan Anda, semoga menjadi aliran amal jariyah yang berlipat ganda bagi sesama. Amin.
          </p>

          {/* ===================================================================
              KOTAK STATUS DETAIL TRANSAKSI (MENYELARASKAN UI LOG PACKASIR)
              =================================================================== */}
          <div className="bg-gray-50 border border-gray-100/80 rounded-2xl p-4 mb-6 space-y-2.5 text-left">
            <div className="flex justify-between items-center text-[11px] font-semibold">
              <span className="text-gray-400 uppercase tracking-wider">No. Invoice</span>
              <span className="text-gray-700 font-bold tracking-mono">{orderId}</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-semibold border-t border-gray-200/50 pt-2.5">
              <span className="text-gray-400 uppercase tracking-wider">Status Dana</span>
              <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-black text-[10px] uppercase tracking-wider border border-emerald-200/40">
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Tombol Aksi Menuju Beranda Utama */}
        <div className="pt-4 border-t border-gray-50">
          <Link 
            href="/" 
            className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition text-xs uppercase tracking-widest shadow-sm shadow-emerald-100"
          >
            Kembali ke Beranda
          </Link>
        </div>

      </div>
    </div>
  );
}