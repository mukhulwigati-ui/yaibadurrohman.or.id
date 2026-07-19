'use client';

import React, { useState, useEffect } from 'react';

export interface Donation {
  id: string;
  name: string;
  amount: string;
  program: string;
  timeLabel: string;
}

interface LiveDonationNotificationProps {
  donations: Donation[];
}

export default function LiveDonationNotification({ donations }: LiveDonationNotificationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!donations || donations.length === 0) return;

    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    const displayInterval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % donations.length);
        setIsVisible(true);
      }, 600);

    }, 8000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(displayInterval);
    };
  }, [donations?.length]);

  if (!donations || donations.length === 0) return null;

  const currentDonation = donations[currentIndex];
  if (!currentDonation) return null;

  return (
    // 🚀 RESPONSIF: top-20 di HP (biar ga nutup navbar), top-28 di desktop. Kiri-kanan dikasih space di HP.
    <div className="fixed top-20 md:top-28 left-4 right-4 md:right-auto md:left-6 z-[9999] pointer-events-none md:max-w-sm w-auto md:w-full">
      <div
        className={`w-full bg-white/98 backdrop-blur-md border border-gray-200/70 p-3 md:p-4 rounded-xl shadow-xl shadow-gray-300/30 transition-all duration-500 ease-out flex items-center gap-3 ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 -translate-y-4 scale-95'
        }`}
      >
        {/* Lampu Indikator Hijau (Sedikit dikecilkan di mobile) */}
        <div className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-50 border border-emerald-100 shrink-0">
          <span className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
          <span className="relative w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        </div>

        {/* Konten Teks Data Asli (Ukuran teks menyesuaikan layar mobile/desktop) */}
        <div className="flex flex-col text-left">
          <p className="text-[11px] md:text-sm text-gray-900 leading-normal md:leading-relaxed font-medium">
            Alhamdulillah, <span className="text-gray-950 font-bold">{currentDonation.name}</span> baru saja bersedekah{' '}
            <span className="text-emerald-600 font-black">{currentDonation.amount}</span> untuk <span className="text-cyan-600 font-semibold">{currentDonation.program}</span>
          </p>
          
          <span className="text-[9px] md:text-[10px] text-gray-400 tracking-wide mt-0.5 block italic">
            🕒 {currentDonation.timeLabel}
          </span>
        </div>
      </div>
    </div>
  );
}