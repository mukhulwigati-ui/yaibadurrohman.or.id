'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface CampaignProps {
  initialData?: any[];
}

export default function Campaign({ initialData = [] }: CampaignProps) {
  const [programs, setPrograms] = useState<any[]>(initialData.length > 0 ? initialData : []);
  const [loading, setLoading] = useState(initialData.length === 0);

  useEffect(() => {
    if (initialData.length > 0) {
      setPrograms(initialData);
      setLoading(false);
      return;
    }

    let isMounted = true;

    fetch('/api/programs?v=' + Date.now(), {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (isMounted && json.success) setPrograms(json.data);
        if (isMounted) setLoading(false);
      })
      .catch((err) => {
        console.error('Campaign component fetch error:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []); // 🚀 Anti-looping dependency array []

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto px-2 py-10 text-center text-xs text-gray-400 font-bold tracking-wider animate-pulse">
        MEMUAT PROGRAM KEBAIKAN...
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-none p-4 shadow-2xs border border-gray-200/90 space-y-3">
      {/* 1. HEADER SECTION */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight leading-snug">
            Penggalangan Dana Mendesak
          </h2>
          <p className="text-[11px] text-gray-500 font-normal mt-0.5">
            Pilih program yang berarti bagi Anda dan Mereka
          </p>
        </div>

        <Link
          href="/program"
          className="inline-flex items-center gap-0.5 bg-sky-100 hover:bg-sky-200 text-sky-600 text-xs font-semibold px-3 py-1.5 rounded-none shrink-0 transition-colors"
        >
          Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 2. HORIZONTAL SCROLL CARD CAROUSEL */}
      {programs.length === 0 ? (
        <div className="text-center py-8 text-gray-400 text-xs font-medium">
          Belum ada program galang dana aktif.
        </div>
      ) : (
        <div className="flex items-stretch gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
          {programs.map((program) => {
            const collectedNum = Number(program.collectedRaw || 0);
            const targetNum = Number(program.targetRaw || 1);
            const percentage = Math.min(Math.round((collectedNum / targetNum) * 100), 100);

            return (
              <Link
                key={program.id || program._id}
                href={`/campaign/${program.slug}`}
                className="w-[185px] sm:w-[200px] bg-white border border-gray-200/90 rounded-none overflow-hidden shadow-2xs shrink-0 flex flex-col justify-between group hover:border-sky-300 transition-all duration-300"
              >
                <div>
                  {/* Gambar + Badge Sisa Hari */}
                  <div className="relative h-28 w-full bg-gray-100 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Badge Sisa Hari */}
                    <span className="absolute top-0 left-0 bg-sky-900/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-none shadow-2xs">
                      {program.daysLeft ? `${program.daysLeft} hari lagi` : 'Mendesak'}
                    </span>
                  </div>

                  {/* Info Penggalang Dana */}
                  <div className="p-2.5 pb-0">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-4 h-4 rounded-full bg-sky-600 text-white flex items-center justify-center text-[8px] font-bold shrink-0">
                        SA
                      </div>
                      <span className="text-[11px] font-medium text-gray-700 truncate">
                        Super Admin
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 fill-sky-500/20 shrink-0" />
                    </div>

                    {/* Judul Campaign */}
                    <h3 className="font-bold text-gray-900 text-xs leading-snug line-clamp-2 min-h-[2rem]">
                      {program.title}
                    </h3>
                  </div>
                </div>

                {/* Progress Bar & Total Terkumpul */}
                <div className="p-2.5 pt-2 space-y-1.5">
                  <div className="w-full bg-gray-100 h-1.5 rounded-none overflow-hidden">
                    <div
                      className="bg-sky-600 h-full rounded-none transition-all duration-500"
                      style={{ width: `${percentage || 10}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-gray-500 font-medium">
                    Terkumpul :{' '}
                    <span className="font-bold text-sky-600">
                      {program.collected || `Rp${collectedNum.toLocaleString('id-ID')}`}
                    </span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}