// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

// Konfigurasi Sanity Client Write
const client = createClient({
  projectId: 'jmgc1ejr',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'sk7NqErRROXCLrscMNjmzvwt2hhpiI61vdbMqw0oN6zBkvrtEhOJG4GS71LcC4ldpRhqiTVCEkzYfAznTnap1Pv5LZQZt9Uo7Ixqw0AAOq7ReDbPO9tciZyXkTlMA2VoAA1NiU6ITL5PqGkGCtvQuLCiRENowtxfPBbDAnusAU1pu2tUvnt7',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, amount, donorName, donorPhone } = body;

    // 1. Validasi Input Dasar
    if (!slug || !amount || Number(amount) < 10000) {
      return NextResponse.json({ success: false, error: 'Data transaksi tidak valid atau kurang dari batas minimum.' }, { status: 400 });
    }

    // 2. Generate Order ID Unik (Gunakan prefix penanda agar mudah diidentifikasi)
    const prefix = slug.toUpperCase().includes('BERAS') ? 'BERAS' : slug.toUpperCase().includes('MUALAF') ? 'MUALAF' : 'SUBUH';
    const generatedOrderId = `INV-${prefix}-${Date.now()}`;

    // 3. LOGIKA UTAMA: Kunci Nama dan WhatsApp dari form frontend langsung ke Sanity sebagai Pending
    await client.create({
      _type: 'donationTransaction',
      orderId: generatedOrderId,
      donorName: donorName || 'Hamba Allah',
      donorPhone: donorPhone || '', // Nomor WhatsApp tersimpan aman
      amount: Number(amount),
      status: 'pending',
      slug: slug,
    });

    console.log(`🔒 TRANSAKSI PENDING BERHASIL DIKUNCI: ${generatedOrderId} - ${donorName}`);

    // 4. INTEGRASI PAKASIR: Buat tagihan resmi ke API Pakasir
    // Sesuaikan endpoint dan payload di bawah ini dengan dokumentasi integrasi Pakasir yang Anda gunakan
    const pakasirResponse = await fetch('https://api.pakasir.com/v1/transaction', { // <-- Ganti dengan URL API resmi Pakasir Anda
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer KEY_API_PAKASIR_ANDA_DISINI' // <-- Masukkan API Key Merchant Pakasir Anda jika ada
      },
      body: JSON.stringify({
        amount: Number(amount),
        order_id: generatedOrderId,
        project: 'yayasan-generasi-indonesia-mengaji',
        // Kirimkan metadata cadangan ke Pakasir jika mereka mendukung parameter reference
        reference: JSON.stringify({ slug, donorName, donorPhone })
      })
    });

    const pakasirJson = await pakasirResponse.json();

    // Pastikan mengembalikan property 'paymentUrl' (Link QRIS / Invoice Pakasir) ke frontend
    if (pakasirJson.success && pakasirJson.payment_url) {
      return NextResponse.json({
        success: true,
        paymentUrl: pakasirJson.payment_url
      });
    }

    // Fallback URL simulasi sandbox jika Anda sedang dalam mode testing mandiri tanpa API Key
    return NextResponse.json({
      success: true,
      paymentUrl: `https://pakasir.com/checkout/simulate?order_id=${generatedOrderId}&amount=${amount}`
    });

  } catch (error: any) {
    console.error('🔥 CHECKOUT ERROR:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}