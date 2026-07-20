// components/LayoutClientWrapper.tsx
'use client'; // 🚀 Client Component untuk mengontrol tampilan kondisional halaman public vs Sanity Studio

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import LiveDonationNotification, { Donation } from "@/components/LiveDonationNotification";
import { X, Download, Smartphone } from 'lucide-react';

interface LayoutClientWrapperProps {
  children: React.ReactNode;
  donations?: Donation[];
}

export default function LayoutClientWrapper({ children, donations = [] }: LayoutClientWrapperProps) {
  const pathname = usePathname();

  // 🚀 Cek apakah halaman yang dibuka adalah Dashboard Sanity Studio
  const isStudioPage = pathname?.startsWith('/studio');

  // --- STATE & LOGIKA PWA PROMPT ---
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    if (isIOSDevice) {
      const hasClosedIOS = localStorage.getItem('pwa_ios_closed');
      if (!hasClosedIOS) {
        const timer = setTimeout(() => setShowPrompt(true), 3000);
        return () => clearTimeout(timer);
      }
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const hasClosedAndroid = localStorage.getItem('pwa_android_closed');
      if (!hasClosedAndroid) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA installed successfully');
    }
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleClose = () => {
    setShowPrompt(false);
    setShowIOSGuide(false);
    if (isIOS) {
      localStorage.setItem('pwa_ios_closed', 'true');
    } else {
      localStorage.setItem('pwa_android_closed', 'true');
    }
  };

  return (
    <>
      {/* 1. Header & Live Donation Notification HANYA dirender di luar Sanity Studio */}
      {!isStudioPage && (
        <>
          <Header />
          <LiveDonationNotification donations={donations} />
        </>
      )}
      
      {/* 2. Konten Utama Halaman Website / Studio */}
      <main className="flex-grow">
        {children}
      </main>

      {/* 3. MODAL PWA PROMPT (Posisi di Tengah dengan Tombol Close) */}
      {!isStudioPage && showPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-xs bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 text-center space-y-4">
            
            {/* Tombol Close (X) */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full transition"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 bg-sky-50 text-[#0d5c91] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Smartphone className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-sm font-extrabold text-slate-900">Install Aplikasi</h2>
              <p className="text-[11px] text-slate-600 leading-relaxed px-1">
                {showIOSGuide
                  ? "Ketuk ikon Share (Bagikan) di Safari, lalu pilih 'Add to Home Screen' (Tambah ke Layar Utama)."
                  : "Pasang yaibadurrohman.or.id di perangkat Anda untuk akses layanan yang lebih cepat, praktis, dan seperti aplikasi native."}
              </p>
            </div>

            {!showIOSGuide && (
              <button
                onClick={handleInstallClick}
                className="w-full bg-[#0d5c91] hover:bg-sky-900 text-white font-bold text-[11px] uppercase tracking-wider py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Pasang Sekarang
              </button>
            )}

          </div>
        </div>
      )}
    </>
  );
}