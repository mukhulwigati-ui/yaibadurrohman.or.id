// components/LayoutClientWrapper.tsx
'use client'; // 🚀 Client Component untuk mengontrol tampilan kondisional halaman public vs Sanity Studio

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import LiveDonationNotification, { Donation } from "@/components/LiveDonationNotification";

interface LayoutClientWrapperProps {
  children: React.ReactNode;
  donations?: Donation[];
}

export default function LayoutClientWrapper({ children, donations = [] }: LayoutClientWrapperProps) {
  const pathname = usePathname();

  // 🚀 Cek apakah halaman yang dibuka adalah Dashboard Sanity Studio
  const isStudioPage = pathname?.startsWith('/studio');

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
    </>
  );
}