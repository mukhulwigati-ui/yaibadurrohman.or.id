// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

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
      return NextResponse.json({ success: false, error: 'Data transaksi tidak valid atau kurang dari Rp 10.000' }, { status: 400 });
    }

    // 2. Generate Order ID Unik
    const prefix = slug.toUpperCase().includes('BERAS') ? 'BERAS' : slug.toUpperCase().includes('MUALAF') ? 'MUALAF' : 'SUBUH';
    const generatedOrderId = `INV-${prefix}-${Date.now()}`;

    // 3. Kunci data ke Sanity (Status: Pending)
    await client.create({
      _type: 'donationTransaction',
      orderId: generatedOrderId,
      donorName: donorName || 'Hamba Allah',
      donorPhone: donorPhone || '', 
      amount: Number(amount),
      status: 'pending',
      slug: slug,
    });

    console.log(`🔒 TRANSAKSI PENDING DIKUNCI: ${generatedOrderId}`);

    // 4. STRATEGI REDIRECT Halaman Thank-You Website Anda
    // Sesuaikan domain di bawah ini dengan URL live domain Anda (indonesiamengaji.net)
    const targetRedirectUrl = `https://indonesiamengaji.net/thank-you?order_id=${generatedOrderId}`;

    const proyekSlugPakasir = "yayasan-generasi-indonesia-mengaji"; 
    const cleanAmount = Math.floor(Number(amount));

    // Gabungkan parameter qris_only dan custom redirect dari panduan Pakasir
    const officialPakasirUrl = `https://app.pakasir.com/pay/${proyekSlugPakasir}/${cleanAmount}?order_id=${generatedOrderId}&qris_only=1&redirect=${encodeURIComponent(targetRedirectUrl)}`;

    // 5. Kembalikan URL ke frontend Next.js
    return NextResponse.json({
      success: true,
      paymentUrl: officialPakasirUrl
    });

  } catch (error: any) {
    console.error('🔥 CHECKOUT RUNTIME ERROR:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}