// app/search/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Globe } from 'lucide-react';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (queryParam.trim()) {
      setLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(queryParam)}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) setResults(json.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Search error:', err);
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [queryParam]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* ===================================================================
          RESULT CONTAINER AREA (Mobile-First Layout)
          =================================================================== */}
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8 space-y-6">
        
        {/* Penanda Statistik Kecepatan Pencarian ala Google */}
        <p className="text-xs text-gray-400 font-normal border-b border-gray-200/80 pb-3">
          {loading ? (
            <span className="flex items-center gap-1.5 text-gray-600">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0d5c91]" /> 
              Menghubungkan ke Sanity Cloud...
            </span>
          ) : (
            `Sekitar ${results.length} hasil ditemukan untuk pencarian "${queryParam}"`
          )}
        </p>

        {/* List Hasil Pencarian ala SERP Google */}
        {!loading && results.length > 0 ? (
          <div className="space-y-6">
            {results.map((item) => {
              // Menyesuaikan target routing dengan struktur proyek yaibadurrohman.or.id
              const targetUrl = item.type === 'news' ? `/news/${item.slug}` : `/campaign/${item.slug}`;
              
              // 🚀 URL Display tiruan Google ke yaibadurrohman.or.id
              const displayUrl = item.type === 'news' 
                ? `https://www.yaibadurrohman.or.id › news › ${item.slug}` 
                : `https://www.yaibadurrohman.or.id › campaign › ${item.slug}`;

              return (
                <div key={item.id} className="group flex flex-col space-y-1 text-left bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/90 shadow-sm transition hover:shadow-md">
                  
                  {/* URL Hijau/Abu-abu khas Google */}
                  <div className="flex items-center space-x-1.5 text-[11px] text-gray-500 font-normal truncate max-w-full">
                    <span className="p-1 bg-sky-50 text-[#0d5c91] border border-sky-100 rounded-lg shrink-0">
                      <Globe className="w-3 h-3" />
                    </span>
                    <span className="truncate">{displayUrl}</span>
                  </div>

                  {/* Judul Biru Google Link */}
                  <Link href={targetUrl} className="text-base sm:text-lg font-bold text-[#1a0dab] group-hover:underline leading-snug tracking-tight block pt-1">
                    {item.title}
                  </Link>

                  {/* Deskripsi Snippet Khusus yaibadurrohman.or.id */}
                  <p className="text-xs sm:text-sm text-[#4d5156] leading-relaxed font-normal pt-0.5 line-clamp-2">
                    {item.type === 'news' 
                      ? `Kabar dan laporan penyaluran berkala dari Tim yaibadurrohman.or.id mengenai update penanganan program ${item.title}. Simak akuntabilitas selengkapnya...`
                      : `Program kebaikan yaibadurrohman.or.id untuk kategori ${item.category || 'Inspirasi'}. Salurkan infak terbaik Anda secara praktis, amanah, dan instan via QRIS...`
                    }
                  </p>

                </div>
              );
            })}
          </div>
        ) : null}

        {/* Kondisi Jika Data Kosong */}
        {!loading && results.length === 0 && queryParam.trim() !== '' && (
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 space-y-4 text-left shadow-sm">
            <p className="text-sm sm:text-base text-gray-800">
              Penelusuran Anda - <strong className="font-bold">{queryParam}</strong> - tidak cocok dengan dokumen program atau kabar berita apa pun di yaibadurrohman.or.id.
            </p>
            <ul className="list-disc pl-5 text-xs sm:text-sm text-gray-600 space-y-1.5 font-normal">
              <li>Pastikan semua kata dieja dengan benar sesuai penulisan program amil.</li>
              <li>Coba kata kunci lain yang lebih umum (misal: "Beras", "Santri", "Sedekah", "Zakat").</li>
              <li>Coba kurangi jumlah kata kunci penelusuran.</li>
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}

// Wrapper Suspense demi keamanan hidrasi data build time
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400 text-xs sm:text-sm font-medium">Mempersiapkan mesin pencari...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}