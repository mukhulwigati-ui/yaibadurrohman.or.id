'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, HeartHandshake, Newspaper, User } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Donasi Saya', href: '/donasi-saya', icon: HeartHandshake },
    { label: 'Berita', href: '/blog', icon: Newspaper, badge: '21.8k' },
    { label: 'Akun', href: '/akun', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      {/* 🚀 Lebar dikunci presisi sejajar px-3 parent */}
      <nav className="w-[calc(100%-1.5rem)] max-w-[calc(28rem-1.5rem)] bg-white border-t border-slate-300/80 shadow-md pointer-events-auto flex items-center justify-around py-2 px-1 rounded-none">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={index}
              href={item.href}
              className={`relative flex flex-col items-center justify-center w-full transition-colors ${
                isActive ? 'text-sky-500 font-medium' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {/* Icon Container */}
              <div className="relative">
                <div
                  className={`p-1.5 rounded-lg transition-all ${
                    isActive ? 'bg-sky-500 text-white' : 'text-slate-500'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 stroke-[2] ${
                      isActive ? 'stroke-white fill-none' : 'stroke-slate-500'
                    }`}
                  />
                </div>

                {/* Badge Notifikasi */}
                {item.badge && (
                  <span className="absolute -top-1 -right-3.5 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full shadow-2xs">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span className="text-[11px] mt-0.5 tracking-tight leading-none font-normal">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}