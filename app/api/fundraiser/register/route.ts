// app/api/fundraiser/register/route.ts
import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client'; // Sesuaikan path client Sanity Anda jika berbeda

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    
    if (!body) {
      return NextResponse.json({ success: false, message: 'Data pendaftaran kosong' }, { status: 400 });
    }

    const { name, phone } = body;

    if (!name || !phone) {
      return NextResponse.json({ success: false, message: 'Nama dan nomor WhatsApp wajib diisi.' }, { status: 400 });
    }

    // Normalisasi nomor telepon
    let formattedPhone = phone.replace(/[^0-9]/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '62' + formattedPhone.slice(1);
    }

    // 🚀 Simpan data langsung ke Sanity dengan status otomatis 'approved' (Disetujui Aktif)
    const newFundraiser = await client.create({
      _type: 'fundraiser',
      name: name,
      phone: formattedPhone,
      status: 'Disetujui (Aktif)', // Langsung aktif otomatis tanpa menunggu admin
    });

    // 🚀 Ambil token Fonnte (Mendukung kedua nama variabel agar aman)
    const fonnteToken = process.env.FONNTE_TOKEN || process.env.TOKEN_FONNTE;

    if (fonnteToken) {
      const messageText = 
        `*Pendaftaran Fundraiser yaibadurrohman.or.id Berhasil!* 🎉\n\n` +
        `Assalamu'alaikum *${name}*,\n\n` +
        `Alhamdulillah, pendaftaran Anda sebagai fundraiser telah resmi *AKTIF*.\n\n` +
        `Yuk, ambil tautan afiliasi unik Anda dan pantau perolehan donasi secara transparan melalui halaman resmi berikut:\n` +
        `👉 https://www.yaibadurrohman.or.id/fundraiser/stats\n\n` +
        `Cukup masukkan nomor WhatsApp Anda (*${formattedPhone}*) pada halaman tersebut untuk memunculkan link dan melihat riwayat donatur.\n\n` +
        `Jazakumullah Khairan Katsiran atas kontribusi terbaik Anda! 🙏`;

      // Kirim WhatsApp via Fonnte secara langsung
      await fetch('https://api.fonnte.com/send', {
        method: 'POST',
        headers: { 'Authorization': fonnteToken },
        body: new URLSearchParams({
          target: formattedPhone,
          message: messageText,
        }),
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Pendaftaran berhasil dan akun langsung aktif!',
      data: newFundraiser 
    }, { status: 200 });

  } catch (error: any) {
    console.error('🔥 Register Fundraiser Error:', error);
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan pada server.', error: error.message }, { status: 500 });
  }
}