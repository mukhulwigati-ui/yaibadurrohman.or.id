'use client';

import React, { useState, useMemo } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Menggunakan useMemo agar client hanya dibuat sekali
  const supabase = useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ), []);
  
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    
    if (error) {
      alert(error.message);
    } else {
      router.push('/');
      router.refresh(); // Memastikan state autentikasi terupdate
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { 
        redirectTo: `${window.location.origin}/auth/callback` 
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-6">Masuk</h1>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-600 mb-1.5 block">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600 mb-1.5 block">Kata Sandi</label>
            <input
              type="password"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0d5c91] hover:bg-sky-800 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-400">Atau masuk dengan</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 py-3 rounded-xl font-semibold text-slate-700 transition"
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          Google
        </button>
      </div>
    </div>
  );
}