// components/Campaign.tsx
'use client';

import React from 'react';
import Link from 'next/link';

interface CampaignItem {
  id: string;
  title: string;
  slug: string;
  image: string;
  collectedRaw: number;
  targetAmount: number;
  daysLeft?: number;
  donorsCount?: number;
}

interface CampaignProps {
  mendesak?: CampaignItem[];
  unggulan?: CampaignItem[];
  pilihan?: CampaignItem[];
}

export default function Campaign({ mendesak = [], unggulan = [], pilihan = [] }: CampaignProps) {
  return (
    <div className="space-y-6 w-full text-left">
      
      {/* ================= SECTION 1: PENGGALANGAN DANA MENDESAK ================= */}
      {mendesak.length > 0 && (
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-sm space-y-3.5">
          <div className="flex justify-between items-center">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">Penggalangan Dana Mendesak</h2>
            <Link href="/campaign/mendesak" className="text-xs font-bold text-[#0d5c91] hover:underline">
              Lihat Semua &gt;
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">Pilih program yang berarti bagi Anda dan Mereka</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {mendesak.map((item) => {
              const percentage = Math.min(Math.round((item.collectedRaw / (item.targetAmount || 50000000)) * 100), 100);
              return (
                <Link key={item.id} href={`/campaign/${item.slug}`} className="group border border-gray-200/90 rounded-xl overflow-hidden p-3 bg-gray-50/60 space-y-2.5 block hover:shadow-md transition">
                  <div className="aspect-[16/10] bg-gray-200 rounded-lg overflow-hidden relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    {item.daysLeft && (
                      <span className="absolute top-2 left-2 bg-[#0d5c91] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                        {item.daysLeft} hari lagi
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#0d5c91] transition-colors">{item.title}</h3>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-extrabold text-[#0d5c91]">
                      Rp {Number(item.collectedRaw).toLocaleString('id-ID')}
                    </p>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#ff2e3b] h-full rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ================= SECTION 2: PROGRAM UNGGULAN ================= */}
      {unggulan.length > 0 && (
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-sm space-y-3.5">
          <div className="flex justify-between items-center">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">Program Unggulan</h2>
            <Link href="/campaign/unggulan" className="text-xs font-bold text-[#0d5c91] hover:underline">
              Lihat Semua &gt;
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">Pilih program yang berarti bagi Anda dan Mereka</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {unggulan.map((item) => {
              const percentage = Math.min(Math.round((item.collectedRaw / (item.targetAmount || 50000000)) * 100), 100);
              return (
                <Link key={item.id} href={`/campaign/${item.slug}`} className="group border border-gray-200/90 rounded-xl overflow-hidden p-3 bg-gray-50/60 space-y-2.5 block hover:shadow-md transition">
                  <div className="aspect-[16/10] bg-gray-200 rounded-lg overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#0d5c91] transition-colors">{item.title}</h3>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-extrabold text-[#0d5c91]">
                      Terkumpul : Rp {Number(item.collectedRaw).toLocaleString('id-ID')}
                    </p>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#ff2e3b] h-full rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ================= SECTION 3: PROGRAM PILIHAN ================= */}
      {pilihan.length > 0 && (
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-sm space-y-3.5">
          <div className="flex justify-between items-center">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">Program Pilihan</h2>
            <Link href="/campaign/pilihan" className="text-xs font-bold text-[#0d5c91] hover:underline">
              Lihat Semua &gt;
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">Pilih program yang berarti bagi Anda dan Mereka</p>

          <div className="space-y-3.5 pt-1">
            {pilihan.map((item) => (
              <Link key={item.id} href={`/campaign/${item.slug}`} className="group flex gap-3.5 items-center border-b border-gray-100 pb-3.5 last:border-none block hover:opacity-90 transition">
                <div className="w-28 sm:w-32 aspect-[16/10] bg-gray-200 rounded-xl overflow-hidden shrink-0 shadow-inner">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <div className="flex-1 space-y-1.5 py-0.5">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#0d5c91] transition-colors">{item.title}</h3>
                  <div className="flex justify-between text-[11px] text-slate-500 font-medium pt-0.5">
                    <span>Terkumpul<br/><strong className="text-[#0d5c91] font-bold">Rp {Number(item.collectedRaw).toLocaleString('id-ID')}</strong></span>
                    <span className="text-right">Donatur<br/><strong className="text-slate-800 font-bold">{item.donorsCount || 0}</strong></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}