'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, UserPlus, Phone, User, CheckCircle2, AlertCircle, Loader2, LogIn } from 'lucide-react';

export interface HeroBanner {
  _id: string;
  title?: string;
  imageUrl: string;
  linkUrl?: string;
}

const DEFAULT_BANNERS: HeroBanner[] = [
  {
    _id: 'default-1',
    title: 'Mau Harta Bertambah dan Berkah - Jangan Berat Untuk Berzakat',
    imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515fe926fb8?q=80&w=800&auto=format&fit=crop',
    linkUrl: '/program?cat=zakat',
  },
  {
    _id: 'default-2',
    title: 'Sedekah Subuh Pembuka Pintu Rezeki',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
    linkUrl: '/program?cat=sedekah-subuh',
  },
  {
    _id: 'default-3',
    title: 'Tunaikan Infaq Produktif Untuk Ummat',
    imageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop',
    linkUrl: '/program?cat=infaq',
  },
];

interface HeroProps {
  initialBanners?: HeroBanner[];
}

export default function Hero({ initialBanners = [] }: HeroProps) {
  const router = useRouter();
  const banners = initialBanners.length > 0 ? initialBanners : DEFAULT_BANNERS;
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🚀 State untuk melacak apakah menu "Lainnya" sedang diperluas (expanded)
  const [isExpanded, setIsExpanded] = useState(false);

  // 🚀 State Modal Fundraiser & Tab Mode ('login' atau 'register')
  const [showFundraiserModal, setShowFundraiserModal] = useState(false);
  const [modalMode, setModalMode] = useState<'login' | 'register'>('login');
  
  // Input fields
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 🚀 Daftar seluruh kategori program
  const allCategories = [
    { name: 'Zakat', icon: '/images/zakat.jpg', href: '/program?cat=zakat', glowing: true },
    { name: 'Infaq', icon: '/images/infaq.jpg', href: '/program?cat=infaq', glowing: false },
    { name: 'Sedekah Subuh', icon: '/images/sedekah-subuh.jpg', href: '/program?cat=sedekah-subuh', glowing: false },
    { name: 'Bencana', icon: '/images/bencana.webp', href: '/program?cat=bencana', glowing: false },
    { name: 'Fidyah', icon: '/images/fidyah.jpg', href: '/program?cat=fidyah', glowing: true },
    { name: 'Wakaf', icon: '/images/wakaf.jpg', href: '/program?cat=wakaf', glowing: false },
    { name: 'ORTA', icon: '/images/orta.png', href: '/program?cat=orta', glowing: false },
    { name: 'Sedekah Jumat', icon: '/images/sedekah-jumat.png', href: '/program?cat=sedekah-jumat', glowing: false },
    { name: 'Kifarat', icon: '/images/kifarat.jpeg', href: '/program?cat=kifarat', glowing: false },
    { name: 'Donasi Dari Bunga Bank', icon: '/images/bunga.jpg', href: '/program?cat=bunga-bank', glowing: false },
    { name: 'Jadi Fundraiser', icon: '/images/fundraiser.png', href: '#', isFundraiserBtn: true, glowing: false },
  ];

  const displayedCategories = isExpanded 
    ? allCategories 
    : allCategories.slice(0, 7);

  // Auto Slider Effect
  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [banners.length]);

  // Handle Login Fundraiser (Cek Nomor WA)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch(`/api/fundraiser/stats?phone=${phone}`);
      const json = await res.json();

      if (json.success) {
        setSuccessMessage('Login Berhasil! Mengalihkan ke halaman statistik...');
        setTimeout(() => {
          router.push(`/fundraiser/stats?phone=${encodeURIComponent(phone)}`);
        }, 1200);
      } else {
        setErrorMessage('Nomor WhatsApp belum terdaftar. Silakan daftar terlebih dahulu.');
      }
    } catch (err) {
      setErrorMessage('Terjadi gangguan jaringan saat memproses login.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Pendaftaran Fundraiser Baru (Nama & No WA + Notifikasi WA)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/fundraiser/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      });
      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Pendaftaran Berhasil! Notifikasi konfirmasi telah dikirim ke WhatsApp Anda.');
        setTimeout(() => {
          router.push(`/fundraiser/stats?phone=${encodeURIComponent(phone)}`);
        }, 2000);
      } else {
        setErrorMessage(data.message || 'Gagal mendaftar. Silakan coba lagi.');
      }
    } catch (err) {
      setErrorMessage('Terjadi kesalahan jaringan. Silakan coba beberapa saat lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200/90 shadow-xs rounded-none overflow-hidden p-3 space-y-4">
      
      {/* CSS Animasi Memancar & Bercahaya (Glow & Pulse) */}
      <style jsx>{`
        @keyframes glowing-effect {
          0% {
            box-shadow: 0 0 0 0 rgba(13, 92, 145, 0.6);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(13, 92, 145, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(13, 92, 145, 0);
          }
        }
        .animate-glow {
          animation: glowing-effect 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }
      `}</style>

      {/* 1. HERO BANNER CAROUSEL AREA */}
      <div>
        <div className="relative w-full aspect-[16/9] bg-slate-100 overflow-hidden rounded-none border border-gray-100 shadow-2xs">
          {banners.map((banner, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={banner._id || index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {banner.linkUrl ? (
                  <Link href={banner.linkUrl} className="block w-full h-full relative">
                    <Image
                      src={banner.imageUrl}
                      alt={banner.title || 'Hero Banner'}
                      fill
                      className="object-cover object-center"
                      unoptimized
                    />
                  </Link>
                ) : (
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title || 'Hero Banner'}
                    fill
                    className="object-cover object-center"
                    unoptimized
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic Dots Indicator */}
        {banners.length > 1 && (
          <div className="flex justify-center items-center gap-1.5 mt-3">
            {banners.map((_, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 ${
                    isActive
                      ? 'w-6 h-1.5 bg-sky-500 rounded-full'
                      : 'w-1.5 h-1.5 bg-sky-200 hover:bg-sky-400 rounded-full'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* 2. MENU KATEGORI PROGRAM */}
      <div className="pt-1 pb-2">
        <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 mb-3 tracking-tight">
          Raih Keberkahan Dihari Ini!
        </h3>

        <div className="grid grid-cols-4 gap-y-3.5 gap-x-2 text-center">
          {displayedCategories.map((cat, index) => {
            if (cat.isFundraiserBtn) {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setModalMode('register');
                    setShowFundraiserModal(true);
                  }}
                  className="group flex flex-col items-center focus:outline-none"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-50 border border-gray-200/80 shadow-2xs flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 group-active:scale-95 relative">
                    <Image
                      src={cat.icon}
                      alt={cat.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 mt-1.5 tracking-tight group-hover:text-sky-600 leading-tight">
                    {cat.name}
                  </span>
                </button>
              );
            }

            return (
              <Link key={index} href={cat.href} className="group flex flex-col items-center">
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-50 border border-gray-200/80 shadow-2xs flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 group-active:scale-95 relative ${
                    cat.glowing ? 'animate-glow ring-2 ring-sky-400/80' : ''
                  }`}
                >
                  <Image
                    src={cat.icon}
                    alt={cat.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 mt-1.5 tracking-tight group-hover:text-sky-600 leading-tight">
                  {cat.name}
                </span>
              </Link>
            );
          })}

          {/* Tombol "Lainnya" */}
          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="group flex flex-col items-center focus:outline-none"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-50 border border-gray-200/80 shadow-2xs flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 group-active:scale-95 relative">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 mt-1.5 tracking-tight group-hover:text-sky-600">
                Lainnya
              </span>
            </button>
          )}

          {/* Tombol "Tutup" */}
          {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="group flex flex-col items-center focus:outline-none"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-50 border border-gray-200/80 shadow-2xs flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 group-active:scale-95 relative">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 mt-1.5 tracking-tight group-hover:text-sky-600">
                Tutup
              </span>
            </button>
          )}

        </div>
      </div>

      {/* 3. MODAL POP-UP PORTAL FUNDRAISER (Tab Login & Daftar Baru) */}
      {showFundraiserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-xs bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 text-left space-y-4">
            
            {/* Tombol Close */}
            <button
              onClick={() => {
                setShowFundraiserModal(false);
                setSuccessMessage('');
                setErrorMessage('');
              }}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full transition"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Modal & Switch Tab */}
            <div className="text-center space-y-2 pt-1">
              <div className="w-10 h-10 bg-sky-50 text-[#0d5c91] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <UserPlus className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 tracking-tight">
                Portal Fundraiser
              </h4>
              
              {/* Tab Navigasi Mode */}
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setModalMode('register');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition ${
                    modalMode === 'register' ? 'bg-white text-[#0d5c91] shadow-xs' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Daftar Baru
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setModalMode('login');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition ${
                    modalMode === 'login' ? 'bg-white text-[#0d5c91] shadow-xs' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Sudah Terdaftar (Login)
                </button>
              </div>
            </div>

            {successMessage ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-xl text-center space-y-2 animate-in fade-in">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-[11px] font-semibold leading-relaxed">{successMessage}</p>
              </div>
            ) : modalMode === 'register' ? (
              /* FORM PENDAFTARAN FUNDRAISER BARU */
              <form onSubmit={handleRegister} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 uppercase">Nama Lengkap</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <User className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0d5c91] focus:bg-white text-gray-800"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 uppercase">Nomor WhatsApp</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <Phone className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      type="tel"
                      required
                      placeholder="Contoh: 08123456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0d5c91] focus:bg-white text-gray-800"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="flex items-center gap-1.5 p-2.5 text-[10px] font-bold text-rose-600 bg-rose-50 rounded-xl border border-rose-100">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-[#0d5c91] hover:bg-sky-900 disabled:bg-gray-300 text-white font-bold text-[11px] uppercase tracking-wider py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Mendaftarkan...</span>
                    </>
                  ) : (
                    'Daftar & Kirim WA ➔'
                  )}
                </button>
              </form>
            ) : (
              /* FORM LOGIN FUNDRAISER (Cukup Nomor WA) */
              <form onSubmit={handleLogin} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 uppercase">Nomor WhatsApp Terdaftar</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <Phone className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      type="tel"
                      required
                      placeholder="Contoh: 08123456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0d5c91] focus:bg-white text-gray-800"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="flex items-center gap-1.5 p-2.5 text-[10px] font-bold text-rose-600 bg-rose-50 rounded-xl border border-rose-100">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-[#0d5c91] hover:bg-sky-900 disabled:bg-gray-300 text-white font-bold text-[11px] uppercase tracking-wider py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Memeriksa...</span>
                    </>
                  ) : (
                    'Masuk Statistik ➔'
                  )}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}