import React from 'react';
import ZakatCalculator from '@/components/ZakatCalculator';

export const metadata = {
  title: 'Kalkulator Zakat Otomatis | LAZIS Khoiro Ummah',
  description: 'Hitung kewajiban zakat maal, zakat penghasilan, dan zakat emas Anda secara instan dan transparan sesuai syariat.',
};

export default function KalkulatorPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-16 py-16 text-center">
      <div className="max-w-3xl mx-auto space-y-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#333333] tracking-tight">
          🧮 Kalkulator Zakat Digital
        </h1>
        <p className="text-gray-500 font-medium text-sm max-w-xl mx-auto">
          Permudah hitung amanah kewajiban mensucikan harta Anda secara akurat hanya dalam hitungan detik.
        </p>
      </div>

      <ZakatCalculator />
    </div>
  );
}