// app/blog/[slug]/BlogDetailClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import RelatedNews from '@/components/RelatedNews';

// Custom Serializer untuk PortableText dengan ukuran teks yang nyaman dibaca
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?.url) return null;
      return (
        <div className="my-5 space-y-2 w-full text-left">
          <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-200/90 shadow-sm aspect-[16/9]">
            <img 
              src={value.asset.url} 
              alt={typeof value.alt === 'string' ? value.alt : 'Gambar Berita'} 
              className="w-full h-full object-cover"
            />
          </div>
          {value.caption && typeof value.caption === 'string' && (
            <p className="text-xs text-slate-500 font-medium text-center italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const hrefStr = typeof value?.href === 'string' ? value.href : '#';
      const rel = !hrefStr.startsWith('/') ? 'noreferrer noopener' : undefined;
      const target = !hrefStr.startsWith('/') ? '_blank' : undefined;
      return (
        <a 
          href={hrefStr} 
          rel={rel} 
          target={target} 
          className="text-[#0d5c91] font-bold hover:underline"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed">{children}</p>,
    h1: ({ children }: any) => <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-6 mb-3">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-5 mb-2.5">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-base sm:text-lg font-bold text-slate-800 mt-4 mb-2">{children}</h3>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-[#0d5c91] pl-4 italic my-4 text-slate-600 bg-sky-50/50 py-2 rounded-r-xl">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-5 mb-4 space-y-1.5">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-5 mb-4 space-y-1.5">{children}</ol>,
  },
};

interface BlogDetailClientProps {
  slug: string;
}

export default function BlogDetailClient({ slug }: BlogDetailClientProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/news/${slug}?v=` + Date.now())
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setData(json.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch blog detail error:', err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-6 pb-24">
        <div className="w-full max-w-md mx-auto px-3 space-y-4 animate-pulse">
          <div className="h-6 bg-gray-200 rounded-xl w-3/4 mx-auto" />
          <div className="aspect-[16/9] bg-gray-200 rounded-2xl w-full" />
          <div className="space-y-3 pt-2">
            <div className="h-4 bg-gray-200 rounded-lg w-full" />
            <div className="h-4 bg-gray-200 rounded-lg w-full" />
            <div className="h-4 bg-gray-200 rounded-lg w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.article) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 pb-24 text-center px-4">
        <p className="text-slate-600 text-base font-semibold">Artikel tidak ditemukan.</p>
        <Link href="/blog" className="text-[#0d5c91] text-xs font-bold mt-4 inline-block bg-sky-50 px-4 py-2.5 rounded-xl border border-sky-100">
          ← Kembali ke Berita
        </Link>
      </div>
    );
  }

  const { article, allNews } = data;

  const renderSafeString = (val: any, fallback: string = ''): string => {
    if (!val) return fallback;
    if (typeof val === 'string') return val;
    if (typeof val === 'object' && val.current) return String(val.current);
    return fallback;
  };

  const formattedDate = article?.publishedAt 
    ? new Date(article.publishedAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : article?.timeAgo || 'Berita Terbaru';

  const categoryString = renderSafeString(article?.category, 'Kabar Terbaru');
  const titleString = renderSafeString(article?.title, 'Detail Berita');

  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-28">
      {/* 🚀 KUNCI LEBAR KONSISTEN DENGAN CONTAINER LAINYA */}
      <div className="w-full max-w-md mx-auto px-3 space-y-4">
        
        {/* Card Utama Pembungkus Artikel */}
        <article className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200/90 space-y-4">
          
          {/* Breadcrumb Ringkas */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <Link href="/" className="hover:text-[#0d5c91]">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#0d5c91]">Berita</Link>
          </nav>

          {/* Judul Artikel (Ukuran proporsional, tegas dan mudah dibaca) */}
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug tracking-tight">
            {titleString}
          </h1>

          {/* Waktu / Tanggal */}
          <div className="text-xs font-semibold text-slate-500 border-b border-gray-100 pb-3">
            <span>📅 {formattedDate}</span>
          </div>

          {/* Gambar Utama Artikel */}
          <div className="space-y-2 w-full pt-1">
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-[16/9] w-full border border-gray-200/80 shadow-inner">
              <img 
                src={typeof article?.imageUrl === 'string' ? article.imageUrl : '/images/placeholder.jpg'} 
                alt={renderSafeString(article?.alt, titleString)} 
                className="w-full h-full object-cover" 
              />
            </div>
            {article?.caption && (
              <p className="text-xs text-slate-500 font-medium text-center italic">
                Foto: {renderSafeString(article.caption, '')}
              </p>
            )}
          </div>

          {/* Isi Konten Teks Artikel (Ukuran dan Spasi Dibesarkan) */}
          <div className="text-slate-800 text-sm sm:text-base leading-relaxed space-y-4 font-normal pt-2 border-b border-gray-100 pb-6">
            {article?.content ? (
              <PortableText value={article.content} components={portableTextComponents} />
            ) : (
              <p className="text-slate-400 italic">Isi berita belum diunggah.</p>
            )}
          </div>

          {/* Tombol Bagikan */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold text-slate-600">Bagikan berita ini:</span>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Tautan artikel berhasil disalin!');
                }
              }} 
              className="px-4 py-2 bg-sky-50 hover:bg-sky-100 text-[#0d5c91] text-xs font-bold rounded-xl transition border border-sky-100 shadow-2xs"
            >
              🔗 Salin Link
            </button>
          </div>

        </article>

        {/* Artikel Terkait */}
        <div className="pt-2">
          <RelatedNews 
            currentSlug={slug} 
            category={categoryString} 
            allNews={allNews || []} 
          />
        </div>

      </div>
    </div>
  );
}