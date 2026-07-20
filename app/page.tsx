import React from 'react';
import { createClient } from '@sanity/client';
import Hero, { HeroBanner } from '@/components/Hero';
import TotalAccumulationWidget from '@/components/TotalAccumulationWidget';
import Campaign from '@/components/Campaign';
import News from '@/components/News';
import Footer from '@/components/Footer';

// 🚀 INITIALIZE SANITY CLIENT VIA ENVIRONMENT VARIABLES
const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '915u7hh1',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false, // Wajib false agar data banner terbaru real-time langsung terambil
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Menggunakan token dari env jika butuh read draft/private
});

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let heroBanners: HeroBanner[] = [];

  try {
    // 🚀 GROQ Query yang fleksibel menangkap schema "heroBanner" maupun "banner"
    const data = await serverClient.fetch(
      `*[_type in ["heroBanner", "banner"] && active != false] | order(order asc, _createdAt desc)[0...10] {
        "id": _id,
        "title": coalesce(title, name),
        "imageUrl": coalesce(image.asset->url, banner.asset->url),
        "linkUrl": link
      }`
    );

    if (Array.isArray(data)) {
      heroBanners = data
        .filter((item: any) => item && item.imageUrl)
        .map((item: any) => ({
          _id: item.id || Math.random().toString(),
          title: item.title,
          imageUrl: item.imageUrl,
          linkUrl: item.linkUrl || undefined,
        }));
    }
  } catch (err) {
    console.error('🔥 Gagal mengambil hero banner di server:', err);
  }

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-start w-full overflow-x-hidden pb-12">
      <div className="w-full max-w-md mx-auto px-3 py-3 space-y-3">
        {/* Pass data banners dari server component langsung ke Hero */}
        <Hero initialBanners={heroBanners} />
        <TotalAccumulationWidget />
        <Campaign />
        <News />
        <Footer />
      </div>
    </main>
  );
}