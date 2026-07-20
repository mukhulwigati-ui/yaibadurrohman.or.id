'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';

export default function DonasiSayaPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Menggunakan useMemo agar client tidak dibuat ulang saat re-render
  const supabase = useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ), []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data } = await supabase
          .from('donations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }); // Urutkan dari yang terbaru

        if (data) setDonations(data);
      }
      setLoading(false);
    };
    fetchData();
  }, [supabase]);

  if (loading) {
    return <div className="p-4 text-center text-slate-500">Memuat riwayat...</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto min-h-screen bg-slate-50">
      <h1 className="text-xl font-bold mb-6 text-slate-900">Riwayat Donasi Saya</h1>
      
      {donations.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-600 mb-6">Belum ada donasi yang tercatat.</p>
          <Link 
            href="/" 
            className="inline-block bg-[#0d5c91] text-white px-6 py-3 rounded-xl font-semibold hover:bg-sky-800 transition"
          >
            Mulai Berdonasi
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {donations.map((d: any) => (
            <div key={d.id} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <p className="font-bold text-slate-900">{d.program_name}</p>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-slate-500">Jumlah:</span>
                <span className="font-semibold text-[#0d5c91]">Rp {d.amount.toLocaleString('id-ID')}</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {new Date(d.created_at).toLocaleDateString('id-ID')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}