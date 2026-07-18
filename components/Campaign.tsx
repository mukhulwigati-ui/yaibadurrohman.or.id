'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface CampaignProps {
  initialData?: any[];
}

export default function Campaign({ initialData = [] }: CampaignProps) {
  const [programs, setPrograms] = useState<any[]>(initialData.length > 0 ? initialData : []);
  const [loading, setLoading] = useState(initialData.length === 0);
  
  const [selectedCategory, setSelectedCategory] = useState('SEMUA');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (initialData.length > 0) {
      setPrograms(initialData);
      setLoading(false);
      return;
    }

    fetch('/api/programs?v=' + Date.now(), {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setPrograms(json.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Campaign component fetch error:', err);
        setLoading(false);
      });
  }, [initialData]);

  // 🚀 DINAMIS: Mengekstrak semua kategori yang unik secara otomatis dari data Sanity
  const avaibleCategories = React.useMemo(() => {
    const categories = new Set<string>();
    programs.forEach((p) => {
      if (p.category) {
        // Normalisasi teks menjadi UPPERCASE agar pencocokan filter tidak meleset
        categories.add(p.category.trim().toUpperCase());
      }
    });
    return ['SEMUA', ...Array.from(categories)];
  }, [programs]);

  if (loading) {
    return <div className="text-center py-16 text-gray-500 font-medium text-xs tracking-wider">MEMUAT PROGRAM KEBAIKAN...</div>;
  }

  // PROSES FILTERING DATA
  const filteredPrograms = programs.filter((program) => {
    const matchesCategory = 
      selectedCategory === 'SEMUA' || 
      program.category?.toUpperCase() === selectedCategory;
    
    const matchesSearch = program.title?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* ===================================================================
          BARIS FILTER KATEGORI DINAMIS & SEARCH BAR (DESAIN BERSIH SLIM)
          =================================================================== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full border-b border-gray-100 pb-4">
        
        {/* Navigasi Filter Kategori Dinamis (Render Otomatis Dari Sanity) */}
        <div className="flex flex-wrap items-center gap-2">
          {avaibleCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2.5 rounded-none text-[11px] font-bold uppercase tracking-wider transition-all border ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white border-emerald-600 font-black'
                  : 'bg-white text-gray-400 hover:text-emerald-600 border-gray-200'
              }`}
            >
              {category === 'SEMUA' ? 'Semua' : category}
            </button>
          ))}
        </div>

        {/* Input Box Pencarian Minimalis */}
        <div className="relative max-w-xs w-full">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">
            🔍
          </span>
          <input
            type="text"
            placeholder="Cari galang dana..."
            className="w-full bg-white border border-gray-200 text-xs font-bold text-gray-700 pl-9 pr-4 py-2.5 rounded-none placeholder-gray-400 focus:outline-none focus:border-emerald-500 shadow-xs transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

      </div>

      {/* ===================================================================
          GRID LAYOUT CARD CAMPAIGN GALANG DANA (SUDUT SIKU MODERN)
          =================================================================== */}
      {filteredPrograms.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-none border border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider">
          Tidak ditemukan program galang dana yang cocok.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <div key={program.id || program._id} className="bg-white rounded-none p-4 shadow-xs border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-all duration-300">
              <div>
                {/* Gambar Campaign Dinamis */}
                <div className="relative h-40 w-full rounded-none overflow-hidden bg-gray-50 border-b border-gray-100">
                  <img src={program.image} alt={program.title} className="object-cover w-full h-full transition duration-500" />
                  <span className="absolute top-2 left-2 bg-yellow-400 text-gray-900 text-[9px] font-black px-2 py-0.5 rounded-none uppercase tracking-wide">
                    {program.category}
                  </span>
                </div>

                {/* Judul Campaign */}
                <h2 className="font-black text-gray-800 mt-3 text-sm uppercase leading-snug line-clamp-2 min-h-[2.5rem] tracking-tight">
                  {program.title}
                </h2>
                
                {/* Status Dana Terkumpul */}
                <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-4 border-t border-gray-50 pt-3">
                  <div>
                    <p className="uppercase tracking-wider">Terkumpul</p>
                    <p className="font-black text-emerald-600 text-xs mt-0.5">{program.collected}</p>
                  </div>
                  <div className="text-right">
                    <p className="uppercase tracking-wider">Target</p>
                    <p className="font-black text-gray-700 text-xs mt-0.5">{program.target}</p>
                  </div>
                </div>
              </div>

              {/* Tombol Aksi Menuju Detail */}
              <div className="mt-4 pt-3 border-t border-gray-50">
                <Link
                  href={`/campaign/${program.slug}`}
                  className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2.5 rounded-none transition text-[10px] uppercase tracking-widest shadow-xs"
                >
                  Infak Sekarang ➔
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}