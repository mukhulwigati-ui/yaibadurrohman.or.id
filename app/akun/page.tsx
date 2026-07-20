'use client';

import React, { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function AkunPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Jika sesi hilang, arahkan kembali ke login
        router.push('/login');
      } else {
        setUser(user);
      }
    };
    checkUser();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  if (!user) return <div className="p-8 text-center">Memuat profil...</div>;

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-slate-900">Profil Saya</h1>
      
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Terdaftar</label>
        <p className="text-slate-800 font-medium mt-1">{user.email}</p>
      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-red-50 text-red-600 font-bold py-3 rounded-xl hover:bg-red-100 transition-all"
      >
        Keluar (Logout)
      </button>
    </div>
  );
}