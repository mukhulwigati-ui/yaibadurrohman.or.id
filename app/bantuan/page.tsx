// app/bantuan/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pusat Bantuan | Layanan Donatur LAZIS Khoiro Ummah',
  description: 'Butuh bantuan terkait donasi, metode pembayaran, atau konfirmasi penyaluran? Tim Admin LAZIS Khoiro Ummah siap membantu kebutuhan ibadah Ziswaf Anda.',
  alternates: {
    canonical: '/bantuan',
  },
};

export default function BantuanPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-16">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* HEADER BANTUAN */}
        <div className="space-y-2">
          <span className="text-xs font-black text-emerald-600 uppercase tracking-widest block">
            PUSAT LAYANAN DONATUR
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#333333] tracking-tight">
            Bagaimana Kami Bisa Membantu?
          </h1>
          <p className="text-sm text-gray-500 font-medium max-w-lg">
            Temukan panduan cepat atau hubungi tim operasional kami untuk kendala seputar transaksi donasi dan program kebaikan.
          </p>
        </div>

        {/* GRID OPSYI BANTUAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card 1: Konfirmasi Donasi */}
          <div className="border border-gray-200 p-6 space-y-3 rounded-none hover:border-emerald-500 transition-colors">
            <h3 className="font-bold text-gray-900">Konfirmasi Transaksi</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Donasi QRIS biasanya terdeteksi otomatis. Jika sistem kami belum mengirimkan pesan sukses, silakan lampirkan bukti transfer Anda di sini.
            </p>
          </div>

          {/* Card 2: Metode Pembayaran */}
          <div className="border border-gray-200 p-6 space-y-3 rounded-none hover:border-emerald-500 transition-colors">
            <h3 className="font-bold text-gray-900">Metode QRIS & VA</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Panduan mengenai cara melakukan pembayaran melalui berbagai aplikasi *e-wallet* atau *m-banking* yang didukung sistem Pakasir.
            </p>
          </div>

          {/* Card 3: Status Penyaluran */}
          <div className="border border-gray-200 p-6 space-y-3 rounded-none hover:border-emerald-500 transition-colors">
            <h3 className="font-bold text-gray-900">Status Penyaluran</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Ingin tahu ke mana dana infak disalurkan? Kami menyediakan laporan berkala transparan di setiap halaman program.
            </p>
          </div>

          {/* Card 4: Pertanyaan Umum */}
          <div className="border border-gray-200 p-6 space-y-3 rounded-none hover:border-emerald-500 transition-colors">
            <h3 className="font-bold text-gray-900">FAQ Umum</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Jawaban atas pertanyaan-pertanyaan yang paling sering diajukan oleh para donatur kepada tim LAZIS Khoiro Ummah.
            </p>
          </div>
        </div>

        {/* SECTION KONTAK LANGSUNG */}
        <div className="bg-emerald-900 text-white p-8 rounded-none space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-black uppercase tracking-wide">Hubungi Tim Layanan</h2>
            <p className="text-sm text-emerald-200">Admin kami siap melayani pada hari kerja (Senin - Jumat, 08.00 - 16.00 WIB)</p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Link 
              href="https://wa.me/6281225147373" 
              target="_blank"
              className="inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 font-bold text-sm py-4 rounded-none transition"
            >
              Chat via WhatsApp (Respon Cepat)
            </Link>
            <div className="text-center text-[11px] text-emerald-400">
              Atau kirim email ke: info@lazisku.com
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}