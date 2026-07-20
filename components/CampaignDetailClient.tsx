'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, Share2, Copy, Check, MessageCircle } from 'lucide-react';

// ===================================================================
// 1. HEADER KHUSUS DETAIL PROGRAM
// ===================================================================
function DetailHeader({ title = 'Program Donasi', onOpenShare }: { title?: string; onOpenShare: () => void }) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-[#0d5c91] text-white w-full shadow-sm">
      <div className="w-full max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center p-1.5 border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>

        <h1 className="text-sm font-bold text-white tracking-tight truncate max-w-[200px] sm:max-w-[260px]">
          {title}
        </h1>

        <button
          onClick={onOpenShare}
          className="flex items-center justify-center p-1.5 border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Bagikan"
        >
          <Share2 className="w-4 h-4 text-white" />
        </button>
      </div>
    </header>
  );
}

// ===================================================================
// 2. IN-LINE WIDGET KALKULATOR ZAKAT
// ===================================================================
function EmbeddedZakatCalculator({ onApplyAmount }: { onApplyAmount: (val: string) => void }) {
  const [activeTab, setActiveTab] = useState<'penghasilan' | 'maal' | 'emas'>('penghasilan');
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const HARGA_EMAS = 1400000;
  const NISHAB_TAHUNAN = 85 * HARGA_EMAS;
  const NISHAB_BULANAN = Math.round(NISHAB_TAHUNAN / 12);

  const formatRupiah = (val: string) => {
    const raw = val.replace(/[^0-9]/g, '');
    return raw ? Number(raw).toLocaleString('id-ID') : '';
  };
  const getNum = (val: string) => Number(val.replace(/\./g, '')) || 0;

  let totalZakat = 0;
  let isWajib = false;

  if (activeTab === 'penghasilan') {
    const total = getNum(input1) + getNum(input2);
    isWajib = total >= NISHAB_BULANAN;
    totalZakat = isWajib ? Math.round(total * 0.025) : 0;
  } else if (activeTab === 'maal') {
    const total = getNum(input1) + getNum(input2);
    isWajib = total >= NISHAB_TAHUNAN;
    totalZakat = isWajib ? Math.round(total * 0.025) : 0;
  } else if (activeTab === 'emas') {
    const berat = Number(input1) || 0;
    isWajib = berat >= 85;
    totalZakat = isWajib ? Math.round((berat * HARGA_EMAS) * 0.025) : 0;
  }

  return (
    <div className="border border-gray-200/90 rounded-none bg-white overflow-hidden my-4">
      <div className="flex border-b border-gray-200 text-[10px] font-bold bg-gray-50/80">
        <button
          onClick={() => { setActiveTab('penghasilan'); setInput1(''); setInput2(''); }}
          className={`flex-1 py-2.5 text-center border-b-2 ${activeTab === 'penghasilan' ? 'text-sky-600 border-sky-600 bg-white' : 'text-slate-400 border-transparent'}`}
        >
          PENGHASILAN
        </button>
        <button
          onClick={() => { setActiveTab('maal'); setInput1(''); setInput2(''); }}
          className={`flex-1 py-2.5 text-center border-b-2 ${activeTab === 'maal' ? 'text-sky-600 border-sky-600 bg-white' : 'text-slate-400 border-transparent'}`}
        >
          MAAL
        </button>
        <button
          onClick={() => { setActiveTab('emas'); setInput1(''); setInput2(''); }}
          className={`flex-1 py-2.5 text-center border-b-2 ${activeTab === 'emas' ? 'text-sky-600 border-sky-600 bg-white' : 'text-slate-400 border-transparent'}`}
        >
          EMAS
        </button>
      </div>
      <div className="p-3 space-y-3 text-left">
        {activeTab !== 'emas' ? (
          <>
            <div>
              <label className="text-[10px] font-normal text-slate-400 block mb-1">Pendapatan Utama / Tabungan (Rp)</label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-none px-3 py-2 text-xs font-semibold text-slate-700"
                placeholder="0"
                value={input1}
                onChange={(e) => setInput1(formatRupiah(e.target.value))}
              />
            </div>
            <div>
              <label className="text-[10px] font-normal text-slate-400 block mb-1">Bonus / Aset Lainnya (Rp)</label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-none px-3 py-2 text-xs font-semibold text-slate-700"
                placeholder="0"
                value={input2}
                onChange={(e) => setInput2(formatRupiah(e.target.value))}
              />
            </div>
          </>
        ) : (
          <div>
            <label className="text-[10px] font-normal text-slate-400 block mb-1">Total Berat Emas (Gram)</label>
            <input
              type="number"
              className="w-full border border-gray-200 rounded-none px-3 py-2 text-xs font-semibold text-slate-700"
              placeholder="Contoh: 90"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
            />
          </div>
        )}
        <div className="bg-slate-50 border border-gray-100 p-3 text-center rounded-none space-y-1.5">
          <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider block">Wajib Zakat Anda</span>
          <span className="text-lg font-bold text-sky-600 block">Rp {totalZakat.toLocaleString('id-ID')}</span>
          <button
            disabled={totalZakat <= 0}
            onClick={() => onApplyAmount(totalZakat.toLocaleString('id-ID'))}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white text-[10px] font-semibold py-2 rounded-none uppercase tracking-wider disabled:bg-gray-300 transition"
          >
            Masukkan ke Form 📥
          </button>
        </div>
      </div>
    </div>
  );
}

// ===================================================================
// 3. FORM DONASI COMPONENT
// ===================================================================
interface FormProps {
  donorName: string;
  setDonorName: (v: string) => void;
  donorPhone: string;
  setDonorPhone: (v: string) => void;
  paymentMethod: string;
  setPaymentMethod: (v: string) => void;
  amount: string;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDonate: () => Promise<void>;
  submitting: boolean;
}

const DonationFormFields = ({
  donorName,
  setDonorName,
  donorPhone,
  setDonorPhone,
  paymentMethod,
  setPaymentMethod,
  amount,
  handleAmountChange,
  handleDonate,
  submitting,
}: FormProps) => (
  <div className="space-y-3.5 text-left">
    <div>
      <label className="text-[11px] font-normal text-slate-500 block mb-1">Nama Donatur</label>
      <input
        type="text"
        placeholder="Hamba Allah (Boleh Kosong)"
        className="w-full border border-gray-200 rounded-none px-3 py-2 text-xs text-slate-700 focus:outline-sky-500 font-medium"
        value={donorName}
        onChange={(e) => setDonorName(e.target.value)}
      />
    </div>
    <div>
      <label className="text-[11px] font-normal text-slate-500 block mb-1">Nomor WhatsApp</label>
      <input
        type="tel"
        placeholder="Contoh: 081234567890"
        className="w-full border border-gray-200 rounded-none px-3 py-2 text-xs text-slate-700 focus:outline-sky-500 font-medium"
        value={donorPhone}
        onChange={(e) => setDonorPhone(e.target.value)}
      />
    </div>
    <div>
      <label className="text-[11px] font-normal text-slate-500 block mb-1">Metode Pembayaran</label>
      <select
        className="w-full border border-gray-200 rounded-none px-3 py-2 text-xs text-slate-700 focus:outline-sky-500 font-semibold bg-white cursor-pointer"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="qris">🟢 QRIS (E-Wallet & M-Banking Instant)</option>
        <option value="bri_va">🏦 BRI Virtual Account</option>
        <option value="bni_va">🏦 BNI Virtual Account</option>
        <option value="cimb_niaga_va">🏦 CIMB Niaga Virtual Account</option>
        <option value="permata_va">🏦 Permata Bank Virtual Account</option>
        <option value="maybank_va">🏦 Maybank Virtual Account</option>
        <option value="atm_bersama_va">🌐 ATM Bersama (Mandiri, BCA & Lainnya)</option>
      </select>
    </div>
    <div>
      <label className="text-[11px] font-normal text-slate-500 block mb-1">Nominal Infak / Zakat (Rp)</label>
      <div className="relative flex items-center">
        <span className="absolute left-3 text-xs font-semibold text-slate-400">Rp</span>
        <input
          type="text"
          placeholder="Minimal 1.000"
          className="w-full border border-gray-200 rounded-none pl-8 pr-3 py-2 text-xs font-bold text-slate-800 focus:outline-sky-500"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
    </div>
    <button
      onClick={handleDonate}
      disabled={submitting}
      className="w-full bg-[#ff2e3b] hover:bg-red-600 active:scale-[0.99] text-white font-bold py-3.5 rounded-full transition text-xs uppercase tracking-wider disabled:bg-gray-300 shadow-md"
    >
      {submitting ? 'Memproses...' : 'Tunaikan Sekarang 🚀'}
    </button>
  </div>
);

// ===================================================================
// 4. MAIN DETAIL CLIENT COMPONENT (MOBILE-FIRST)
// ===================================================================
export default function CampaignDetailClient({ slug, referral }: { slug: string; referral: string | null }) {
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState(''); 
  const [submitting, setSubmitting] = useState(false);
  
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [activeTab, setActiveTab] = useState<'cerita' | 'donatur' | 'laporan'>('cerita');

  useEffect(() => {
    fetch('/api/programs', { cache: 'default' })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          const found = json.data.find((p: any) => p.slug === slug);
          setProgram(found);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch detail campaign error:', err);
        setLoading(false);
      });
  }, [slug]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    setAmount(rawValue ? Number(rawValue).toLocaleString('id-ID') : '');
  };

  const handleDonate = async () => {
    const cleanAmount = amount.replace(/\./g, '');
    if (!cleanAmount || Number(cleanAmount) < 1000) {
      alert('Masukkan nominal minimal Rp 1.000!');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: program.slug,
          amount: cleanAmount,
          donorName: donorName.trim() || 'Hamba Allah',
          donorPhone: donorPhone.trim(), 
          paymentMethod: paymentMethod,
          referral: referral,
        }),
      });

      const json = await res.json();
      if (json.success && json.paymentUrl) {
        window.location.href = json.paymentUrl;
      } else {
        alert(json.error || 'Gagal memproses tautan pembayaran.');
      }
    } catch (err) {
      alert('Terjadi kesalahan koneksi saat menghubungi server pembayaran.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-100/70">
      <DetailHeader title="Program Donasi" onOpenShare={() => setIsShareModalOpen(true)} />
      <div className="text-center py-20 text-slate-400 font-normal text-xs">Memuat detail program...</div>
    </div>
  );

  if (!program) return (
    <div className="min-h-screen bg-gray-100/70">
      <DetailHeader title="Program Donasi" onOpenShare={() => setIsShareModalOpen(true)} />
      <div className="text-center py-20 text-red-500 font-normal text-xs">Program tidak ditemukan.</div>
    </div>
  );

  const rawTarget = program.targetAmount || 50000000;
  const percentage = Math.min(Math.round((program.collectedRaw / rawTarget) * 100), 100);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-gray-100/70 pb-28">
      {/* 🚀 1. HEADER DETAIL PROGRAM */}
      <DetailHeader title="Program Donasi" onOpenShare={() => setIsShareModalOpen(true)} />

      {/* 🚀 2. KONTEN CONTAINER MOBILE (max-w-md mx-auto) */}
      <div className="w-full max-w-md mx-auto px-3 pt-4 space-y-4">
        
        {/* Card Utama Penggalangan Dana */}
        <div className="bg-white rounded-none p-4 shadow-2xs border border-gray-200/90 space-y-3.5">
          
          {/* Banner Gambar */}
          <div className="rounded-none overflow-hidden bg-gray-100 aspect-[16/10] w-full border border-gray-100">
            <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
          </div>

          {/* Judul Program */}
          <h1 className="text-sm sm:text-base font-bold text-slate-800 leading-snug tracking-tight">
            {program.title}
          </h1>

          {/* Progres Terkumpul & Target */}
          <div className="space-y-1.5 pt-1">
            <p className="text-sm font-bold text-[#0d5c91]">
              Rp {Number(program.collectedRaw || 0).toLocaleString('id-ID')}
            </p>
            <div className="flex justify-between items-center text-[11px] text-slate-400">
              <span>Terkumpul dari <strong className="text-slate-600">Rp {rawTarget.toLocaleString('id-ID')}</strong></span>
              <span>{program.daysLeft ? `${program.daysLeft} hari lagi` : 'Mendesak'}</span>
            </div>

            <div className="w-full bg-gray-100 h-2 rounded-none overflow-hidden">
              <div className="bg-[#ff2e3b] h-full rounded-none transition-all duration-500" style={{ width: `${percentage}%` }} />
            </div>
          </div>

          {/* Tab Menu Navigasi */}
          <div className="flex border-b border-gray-200 text-xs font-semibold text-slate-400 space-x-4 pt-2">
            <button
              onClick={() => setActiveTab('cerita')}
              className={`pb-2 focus:outline-none ${activeTab === 'cerita' ? 'text-sky-600 border-b-2 border-sky-600' : 'border-b-2 border-transparent'}`}
            >
              Cerita
            </button>
            <button
              onClick={() => setActiveTab('donatur')}
              className={`pb-2 focus:outline-none ${activeTab === 'donatur' ? 'text-sky-600 border-b-2 border-sky-600' : 'border-b-2 border-transparent'}`}
            >
              Donatur ({(program.donors || []).length})
            </button>
            <button
              onClick={() => setActiveTab('laporan')}
              className={`pb-2 focus:outline-none ${activeTab === 'laporan' ? 'text-sky-600 border-b-2 border-sky-600' : 'border-b-2 border-transparent'}`}
            >
              Laporan ({(program.reports || []).length})
            </button>
          </div>

          {/* Isi Konten Sesuai Tab */}
          <div className="py-2 text-left">
            {activeTab === 'cerita' && (
              <div className="space-y-4">
                {program.category?.toUpperCase() === 'ZAKAT' && (
                  <EmbeddedZakatCalculator onApplyAmount={(val) => setAmount(val)} />
                )}

                <div className="text-slate-700 text-xs sm:text-sm leading-relaxed space-y-3 font-normal">
                  {program.description ? (
                    typeof program.description === 'string' ? (
                      <p>{program.description}</p>
                    ) : (
                      <PortableText value={program.description} />
                    )
                  ) : (
                    <p className="text-slate-400 italic">Belum ada cerita detail.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'donatur' && (
              <div className="space-y-2 py-1">
                {(program.donors || []).length > 0 ? (
                  [...program.donors].reverse().map((donor: any, idx: number) => (
                    <div key={idx} className="bg-slate-50 border border-gray-100 rounded-none p-2.5 flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-7 h-7 rounded-none bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                          {(donor.name || 'H').toUpperCase().slice(0, 1)}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-700">{donor.name || 'Hamba Allah'}</p>
                          <p className="text-[10px] text-slate-400 font-normal">{donor.date || 'Baru Saja'}</p>
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-sky-600">{`+Rp ${Number(donor.amount || 0).toLocaleString('id-ID')}`}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-6 text-xs text-slate-400">Belum ada donatur.</p>
                )}
              </div>
            )}

            {activeTab === 'laporan' && (
              <div className="space-y-3 py-1">
                {(program.reports || []).length > 0 ? (
                  [...program.reports].reverse().map((report: any, idx: number) => (
                    <div key={idx} className="bg-slate-50 border border-gray-100 rounded-none p-3 space-y-2">
                      <div className="flex items-center justify-between border-b border-gray-200/60 pb-1.5">
                        <h4 className="text-xs font-semibold text-slate-700">{report.title || 'Laporan Penyaluran'}</h4>
                        <span className="text-[10px] text-slate-400">{report.date}</span>
                      </div>
                      <div className="text-xs text-slate-600 leading-relaxed">
                        {typeof report.content === 'string' ? <p>{report.content}</p> : <PortableText value={report.content} />}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-6 text-xs text-slate-400">Belum ada pembaruan laporan.</p>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* 🚀 3. STICKY BOTTOM BAR FLOATING AKSI */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none flex justify-center pb-2">
        <div className="w-[calc(100%-1.5rem)] max-w-[calc(28rem-1.5rem)] bg-white border border-gray-200/90 p-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pointer-events-auto rounded-none">
          <button 
            onClick={() => setIsMobileFormOpen(true)} 
            className="w-full bg-[#ff2e3b] hover:bg-red-600 active:scale-[0.99] text-white text-sm font-bold py-3.5 rounded-full shadow-md transition-all"
          >
            Donasi Sekarang
          </button>
        </div>
      </div>

      {/* 🚀 4. POPUP FORM DONASI MOBILE */}
      {isMobileFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-3">
          <div className="absolute inset-0" onClick={() => setIsMobileFormOpen(false)} />
          <div className="relative w-[calc(100%-1.5rem)] max-w-[calc(28rem-1.5rem)] bg-white rounded-none p-4 space-y-3.5 max-h-[85vh] overflow-y-auto z-10 shadow-2xl border border-gray-200/90">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="text-xs font-bold text-slate-800">Form Infak / Zakat</h3>
              <button 
                onClick={() => setIsMobileFormOpen(false)} 
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>
            <DonationFormFields 
              donorName={donorName} setDonorName={setDonorName}
              donorPhone={donorPhone} setDonorPhone={setDonorPhone}
              paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}
              amount={amount} handleAmountChange={handleAmountChange}
              handleDonate={handleDonate} submitting={submitting}
            />
          </div>
        </div>
      )}

      {/* 🚀 5. CUSTOM SHARE MODAL MOBILE-FIRST */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-3">
          <div className="absolute inset-0" onClick={() => setIsShareModalOpen(false)} />
          <div className="relative w-[calc(100%-1.5rem)] max-w-[calc(28rem-1.5rem)] bg-white rounded-none p-4 space-y-4 z-10 shadow-2xl border border-gray-200/90 text-left">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Bagikan Program Kebaikan</h3>
              <button 
                onClick={() => setIsShareModalOpen(false)} 
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Input URL & Button Copy */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-medium text-slate-400 block">Tautan Program</label>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={shareUrl} 
                  className="flex-1 bg-slate-50 border border-gray-200 rounded-none px-2.5 py-2 text-xs font-mono text-slate-600 truncate focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="bg-[#0d5c91] text-white px-3 py-2 text-xs font-semibold rounded-none shrink-0 flex items-center gap-1 hover:bg-sky-800 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>
            </div>

            {/* Opsi Media Sosial */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Ayo bantu program kebaikan ini: ${program?.title || ''}\n${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 bg-emerald-50 border border-emerald-100 text-emerald-700 space-y-1 hover:bg-emerald-100 transition"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-[10px] font-semibold">WhatsApp</span>
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 bg-blue-50 border border-blue-100 text-blue-700 space-y-1 hover:bg-blue-100 transition"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-[10px] font-semibold">Facebook</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(program?.title || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 bg-slate-100 border border-slate-200 text-slate-700 space-y-1 hover:bg-slate-200 transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="text-[10px] font-semibold">Twitter/X</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}