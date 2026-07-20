// app/page.tsx
import React from 'react';
import { Metadata } from 'next';
import Hero from '@/components/Hero';
import TotalAccumulationWidget from '@/components/TotalAccumulationWidget';
import Campaign from '@/components/Campaign';
import News from '@/components/News';
import Footer from '@/components/Footer';

// ===================================================================
// 🌐 CONFIG METADATA OPEN GRAPH & TWITTER (YAYASAN ISLAM IBADURROHMAN)
// ===================================================================
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yaibadurrohman.or.id';

export const metadata: Metadata = {
  title: 'Yayasan Islam Ibadurrohman | Platform Sedekah, Infaq & Zakat Online',
  description: 'Siap menyampaikan amanah, menebar harapan sesama. Salurkan sedekah subuh, infaq, dan zakat secara transparan melalui yaibadurrohman.or.id.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Yayasan Islam Ibadurrohman | Platform Sedekah & Donasi Online',
    description: 'Siap menyampaikan amanah, menebar harapan sesama. Salurkan sedekah subuh, infaq, dan zakat secara transparan melalui yaibadurrohman.or.id.',
    url: `${siteUrl}/`,
    siteName: 'Yayasan Islam Ibadurrohman',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/images/hero-bg.png`,
        width: 1200,
        height: 630,
        alt: 'Yayasan Islam Ibadurrohman',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yayasan Islam Ibadurrohman | Platform Sedekah & Donasi Online',
    description: 'Siap menyampaikan amanah, menebar harapan sesama. Salurkan sedekah subuh, infaq, dan zakat secara transparan melalui yaibadurrohman.or.id.',
    images: [`${siteUrl}/images/hero-bg.png`],
  },
};

// 🚀 ANTI-CACHE: Memaksa Next.js selalu render data real-time terbaru
export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-start w-full overflow-x-hidden pb-16">
      
      {/* 🚀 CONTAINER UTAMA MOBILE APP */}
      <div className="w-full max-w-md mx-auto px-3 py-3 space-y-3">
        
        {/* 1. Hero / Banner Component */}
        <Hero />
        
        {/* 2. Widget Akumulasi Statistik Real-Time */}
        <TotalAccumulationWidget />

        {/* 3. Program Galang Dana */}
        <Campaign />

        {/* 4. Kabar & Berita Terbaru */}
        <News />

        {/* 5. Tautan Legal (Privacy Policy, Terms, Refund) */}
        <Footer />

      </div>

      {/* ⚠️ BottomNav SUDAH DIPANGGIL DI layout.tsx, JADI TIDAK PERLU DIPANGGIL LAGI DI SINI */}

    </main>
  );
}