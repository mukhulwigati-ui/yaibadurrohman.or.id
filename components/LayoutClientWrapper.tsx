// components/LayoutClientWrapper.tsx
'use client'; // 🚀 Di sinilah letak 'use client' agar root layout tetap menjadi Server Component

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Cek apakah halaman yang dibuka adalah Dashboard Sanity Studio
  const isStudioPage = pathname?.startsWith('/studio');

  return (
    <>
      {/* 1. Kondisional Header: Muncul hanya jika BUKAN halaman studio */}
      {!isStudioPage && <Header />}
      
      {/* 2. Konten Utama Halaman website */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* ❌ SEKSI 3: TOMBOL WHATSAPP MELAYANG GLOBAL TELAH DIHAPUS TOTAL */}
      
      {/* 4. Kondisional Footer: Muncul hanya jika BUKAN halaman studio */}
      {!isStudioPage && <Footer />}
    </>
  );
}