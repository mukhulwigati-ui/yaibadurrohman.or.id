// app/api/fundraiser/register/route.ts
import { NextResponse } from 'next/server';
// Menggunakan clientInternal untuk mutasi data tulis ke Sanity
import { clientInternal as client } from '@/lib/sanity';

export async function POST(request: Request) {
  try {
    // 1. Ambil body JSON dengan aman
    const body = await request.json().catch(() => null);
    
    if (!body) {
      return NextResponse.json(
        { success: false, message: 'Format body kiriman JSON tidak valid.' }, 
        { status: 400 }
      );
    }

    const { name, phone } = body;

    // 2. Validasi kelengkapan data formulir beserta pesan detailnya
    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, message: 'Nama Lengkap wajib diisi.' }, { status: 400 });
    }
    if (!phone || !phone.trim()) {
      return NextResponse.json({ success: false, message: 'Nomor WhatsApp wajib diisi.' }, { status: 400 });
    }

    // 3. Normalisasi nomor WhatsApp ke format internasional & lokal
    let formattedPhone = phone.replace(/[^0-9]/g, '');
    let localPhone = formattedPhone;

    if (formattedPhone.startsWith('0')) {
      formattedPhone = '62' + formattedPhone.slice(1);
    } else if (formattedPhone.startsWith('62')) {
      localPhone = '0' + formattedPhone.slice(2);
    }

    // 4. Cek apakah nomor WhatsApp sudah terdaftar sebelumnya di Sanity
    const existingFundraiser = await client.fetch(
      `*[_type == "fundraiser" && (phone == $formattedPhone || phone == $localPhone)][0]`,
      { formattedPhone, localPhone }
    );

    let fundraiserDoc = existingFundraiser;
    let responseMessage = 'Login berhasil.';

    // 5. Logika Pendaftaran / Login
    if (existingFundraiser) {
      // Jika nomor sudah terdaftar, cukup update namanya saja
      fundraiserDoc = await client
        .patch(existingFundraiser._id)
        .set({ name: name.trim() })
        .commit();
        
      responseMessage = 'Data fundraiser berhasil dimuat.';
    } else {
      // 🚀 Pendaftaran baru dibuat dengan status 'pending'
      fundraiserDoc = await client.create({
        _type: 'fundraiser',
        name: name.trim(),
        phone: formattedPhone,
        status: 'pending', // 🛑 Masih pending, jadi TIDAK ADA pengiriman WA di sini
        totalDanaDihimpun: 0,
        totalTransaksiSukses: 0,
        sisaSaldoFee: 0,
        feePaid: 0,
      });

      // 🛑 Keterangan diubah sesuai permintaan
      responseMessage = 'Pendaftaran berhasil, menunggu persetujuan admin.';
    }

    return NextResponse.json({ 
      success: true, 
      message: responseMessage, 
      data: fundraiserDoc 
    }, { status: 200 });

  } catch (error: any) {
    console.error('🔥 Gagal mendaftarkan fundraiser di backend:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: error?.message || 'Terjadi gangguan internal pada server database Sanity.' 
      }, 
      { status: 500 }
    );
  }
}