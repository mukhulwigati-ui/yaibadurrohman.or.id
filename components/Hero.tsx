'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@sanity/client';

// 🚀 INITIALIZE SANITY CLIENT (useCdn: false untuk menghindari CORS error)
const client = createClient({
  projectId: '61d8vnuq',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

interface HeroBanner {
  _id: string;
  title?: string;
  imageUrl: string;
  linkUrl?: string;
}

// 🚀 FALLBACK BANNER DEFAULT (Jika data di Sanity belum diinput)
const DEFAULT_BANNERS: HeroBanner[] = [
  {
    _id: 'default-1',
    title: 'Mau Harta Bertambah dan Berkah - Jangan Berat Untuk Berzakat',
    imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515fe926fb8?q=80&w=800&auto=format&fit=crop',
    linkUrl: '/program?cat=zakat',
  },
  {
    _id: 'default-2',
    title: 'Sedekah Subuh Pembuka Pintu Rezeki',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
    linkUrl: '/program?cat=sedekah-subuh',
  },
  {
    _id: 'default-3',
    title: 'Tunaikan Infaq Produktif Untuk Ummat',
    imageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop',
    linkUrl: '/program?cat=infaq',
  },
];

export default function Hero() {
  const [banners, setBanners] = useState<HeroBanner[]>(DEFAULT_BANNERS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Menu Kategori Quick Links Static
  const categories = [
    { name: 'Zakat', icon: '🤲', href: '/program?cat=zakat' },
    { name: 'Infaq', icon: '💸', href: '/program?cat=infaq' },
    { name: 'Sedekah Subuh', icon: '🌅', href: '/program?cat=sedekah-subuh' },
    { name: 'Fidyah', icon: '🌾', href: '/program?cat=fidyah' },
    { name: 'Wakaf', icon: '🌱', href: '/program?cat=wakaf' },
    { name: 'ORTA', icon: '👨‍👩‍👧', href: '/program?cat=orta' },
    { name: 'Sedekah Jumat', icon: '🕌', href: '/program?cat=sedekah-jumat' },
    { name: 'Lainnya', icon: '☰', href: '/program' },
  ];

  // 1. Fetch Data Slider dari Sanity Schema "heroBanner"
  useEffect(() => {
    async function fetchHeroBanners() {
      try {
        // Query GROQ presisi mengarah ke document heroBanner
        const query = `*[_type == "heroBanner" && active == true] | order(order asc, _createdAt desc)[0...10] {
          "id": _id,
          title,
          "imageUrl": image.asset->url,
          "linkUrl": link
        }`;

        const data = await client.fetch(query);

        const validBanners = Array.isArray(data)
          ? data.filter((item: any) => item && item.imageUrl)
          : [];

        if (validBanners.length > 0) {
          setBanners(
            validBanners.map((item: any) => ({
              _id: item.id || Math.random().toString(),
              title: item.title,
              imageUrl: item.imageUrl,
              linkUrl: item.linkUrl || undefined,
            }))
          );
        }
      } catch (err) {
        console.warn('⚠️ Gagal mengambil banner dari Sanity, menggunakan default fallback:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchHeroBanners();
  }, []);

  // 2. Auto Slider Effect (Berganti setiap 3.5 detik)
  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [banners]);

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200/90 shadow-xs rounded-none overflow-hidden p-3 space-y-4">
      {/* 1. HERO BANNER CAROUSEL AREA */}
      <div>
        <div className="relative w-full aspect-[16/9] bg-slate-100 overflow-hidden rounded-none border border-gray-100 shadow-2xs">
          {loading ? (
            /* Skeleton Loader */
            <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
              <span className="text-xs text-gray-400 font-medium">Memuat Banner...</span>
            </div>
          ) : (
            /* Banner Murni (Presisi 1:1 donasionline.id) */
            banners.map((banner, index) => {
              const isActive = index === currentIndex;
              return (
                <div
                  key={banner._id || index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  {banner.linkUrl ? (
                    <Link href={banner.linkUrl} className="block w-full h-full relative">
                      <Image
                        src={banner.imageUrl}
                        alt={banner.title || 'Hero Banner'}
                        fill
                        className="object-cover object-center"
                        unoptimized
                      />
                    </Link>
                  ) : (
                    <Image
                      src={banner.imageUrl}
                      alt={banner.title || 'Hero Banner'}
                      fill
                      className="object-cover object-center"
                      unoptimized
                    />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Dynamic Dots Indicator (Kapsul Biru Terang untuk Slide Aktif) */}
        {!loading && banners.length > 1 && (
          <div className="flex justify-center items-center gap-1.5 mt-3">
            {banners.map((_, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 ${
                    isActive
                      ? 'w-6 h-1.5 bg-sky-500 rounded-full'
                      : 'w-1.5 h-1.5 bg-sky-200 hover:bg-sky-400 rounded-full'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* 2. MENU KATEGORI PROGRAM */}
      <div className="pt-1 pb-2">
        <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 mb-3 tracking-tight">
          Raih Keberkahan Dihari Ini!
        </h3>

        <div className="grid grid-cols-4 gap-y-3.5 gap-x-2 text-center">
          {categories.map((cat, index) => (
            <Link key={index} href={cat.href} className="group flex flex-col items-center">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-50 border border-gray-200/80 shadow-2xs flex items-center justify-center text-lg sm:text-xl transition-transform group-hover:scale-105 group-active:scale-95">
                {cat.icon}
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 mt-1.5 tracking-tight group-hover:text-sky-600">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}