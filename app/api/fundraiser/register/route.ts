// app/api/fundraiser/route.ts
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

    // 3. Normalisasi nomor WhatsApp ke format standar internasional
    let formattedPhone = phone.replace(/[^0-9]/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '62' + formattedPhone.slice(1);
    }

    // 4. Cek apakah nomor WhatsApp sudah terdaftar sebelumnya di Sanity
    const existingFundraiser = await client.fetch(
      `*[_type == "fundraiser" && phone == $phone][0]`,
      { phone: formattedPhone }
    );

    if (existingFundraiser) {
      return NextResponse.json(
        { success: false, message: 'Nomor WhatsApp ini sudah terdaftar sebagai fundraiser.' }, 
        { status: 400 }
      );
    }

    // 5. Operasi pembuatan dokumen baru di Sanity Studio dengan status 'pending'
    const newFundraiser = await client.create({
      _type: 'fundraiser',
      name: name.trim(),
      phone: formattedPhone,
      status: 'pending', // Menunggu persetujuan admin terlebih dahulu
    });

    // 6. Integrasi Pengiriman Pesan WhatsApp via Fonnte (Notifikasi Pengajuan & Panduan Statistik)
    if (process.env.FONNTE_TOKEN) {
      const messageText = 
        `*Pendaftaran Fundraiser yaibadurrohman.or.id* 📢\n\n` +
        `Assalamu'alaikum *${name.trim()}*,\n\n` +
        `Alhamdulillah, pengajuan Anda sebagai fundraiser telah kami terima dan sedang ditinjau oleh admin.\n\n` +
        `Yuk, ambil tautan afiliasi unik Anda dan pantau perolehan donasi secara transparan melalui halaman resmi berikut:\n` +
        `👉 https://www.yaibadurrohman.or.id/fundraiser/stats\n\n` +
        `Cukup masukkan nomor WhatsApp Anda (${formattedPhone}) pada halaman tersebut untuk memunculkan link dan melihat riwayat donatur setelah akun di-approve.\n\n` +
        `Jazakumullah Khairan Katsiran atas kontribusi terbaik Anda! 🙏`;

      await fetch('https://api.fonnte.com/send', {
        method: 'POST',
        headers: { 'Authorization': process.env.FONNTE_TOKEN },
        body: new URLSearchParams({ target: formattedPhone, message: messageText }),
      }).catch(err => console.error('🔥 Fonnte Kirim Error:', err));
    }

    return NextResponse.json({ success: true, data: newFundraiser }, { status: 200 });

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