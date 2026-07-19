// app/api/webhook/pakasir/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import { google } from 'googleapis';

export const dynamic = 'force-dynamic';

// 🚀 BYPASS CLIENT: Murni untuk update data esensial program website
const client = createClient({
  projectId: '61d8vnuq',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'sk44JM4AlD6urcLa9Ak9vvnRpLGlsRai9aftW1wPA4w9zxwhrCpKREk2ArKU25K4kENIPxVXenu4kZhm2cOSaxGP69kz8az2qM2BZDIVzqyAGLjIvVTGKMu39CExUrKwbw2wCb2bfxKPgZ4lqEt2nwLZT4HEc4XT1qfrZ0i6KYupIlT6IOlP',
});

// ===================================================================
// 📊 OTOMATISASI PENULISAN DATABASE KE GOOGLE SHEETS (ANTI-BONCOS)
// ===================================================================
async function appendToGoogleSheets(data: {
  orderId: string;
  name: string;
  phone: string;
  amount: number;
  program: string;
  date: string;
}) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    let cleanPhone = data.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '62' + cleanPhone.slice(1);
    }

    // 🔗 LINK WA LANGSUNG: Otomatis aktif di cell Google Sheets admin
    const whatsappFormula = cleanPhone 
      ? `=HYPERLINK("https://wa.me/${cleanPhone}"; "${data.phone}")` 
      : '-';

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            data.date,
            data.orderId,
            data.name,
            whatsappFormula,
            data.amount,
            data.program
          ]
        ],
      },
    });
    console.log('📊 MUTASI GOOGLE SHEETS SUKSES: Data donatur aman tersimpan.');
  } catch (err) {
    console.error('🔥 GOOGLE SHEETS ERROR:', err);
  }
}

// ===================================================================
// MAIN WEBHOOK CONTROLLER
// ===================================================================
export async function POST(request: Request) {
  try {
    const payload = await request.json();

    console.log("======================================");
    console.log("🚀 WEBHOOK PAKASIR: MEMPROSES VERIFIKASI DANA MASUK");
    console.log("======================================");

    const amount = payload.amount;
    const order_id = payload.order_id;
    const status = payload.status; 

    const cleanOrderId = order_id ? String(order_id).trim() : '';
    if (!cleanOrderId) {
      return NextResponse.json({ success: false, message: "Order ID tidak ditemukan." }, { status: 400 });
    }

    // 1. Validasi Status Pembayaran Lunas dari Pakasir
    const cleanStatus = status ? String(status).toLowerCase().trim() : '';
    if (cleanStatus !== 'completed' && cleanStatus !== 'success' && cleanStatus !== 'paid') {
      return NextResponse.json({
        success: true,
        message: `Status transaksi (${status}) belum selesai, mutasi diabaikan.`
      });
    }

    // ===================================================================
    // 2. AMBIL DATA PENDING BOX & CEK DUPLIKASI AWAL (REM KUOTA SANITY)
    // ===================================================================
    const transactionQuery = `*[_type == "donationTransaction" && orderId == $orderId][0]`;
    const pendingTransaction = await client.fetch(transactionQuery, { orderId: cleanOrderId });

    let donorNameFromForm = "Hamba Allah";
    let donorPhoneFromForm = "";
    let programSlug = "sedekah-subuh"; 
    let paymentMethodUsed = "QRIS";

    if (pendingTransaction) {
      if (pendingTransaction.status === 'success') {
        console.log(`♻️ Transaksi ${cleanOrderId} dihentikan awal. Status Sanity sudah success.`);
        return NextResponse.json({ success: true, message: "Transaksi sudah sukses diproses sebelumnya." });
      }

      if (pendingTransaction.donorName && String(pendingTransaction.donorName).trim() !== "") {
        donorNameFromForm = String(pendingTransaction.donorName).trim();
      }
      if (pendingTransaction.donorPhone && String(pendingTransaction.donorPhone).trim() !== "") {
        donorPhoneFromForm = String(pendingTransaction.donorPhone).trim();
      }
      if (pendingTransaction.slug) {
        programSlug = String(pendingTransaction.slug).toLowerCase().trim();
      }
      if (pendingTransaction.paymentMethod) {
        paymentMethodUsed = String(pendingTransaction.paymentMethod).toUpperCase();
      }
    } else {
      const upperOrderId = cleanOrderId.toUpperCase();
      if (upperOrderId.includes('MUALAF')) {
        programSlug = "bantu-mualaf-dan-dhuafa";
      } else if (upperOrderId.includes('BERAS') || upperOrderId.includes('SANTRI')) {
        programSlug = "sedekah-beras-untuk-santri-penghafal-al-qur-an";
      }
    }

    // 3. AMBIL DOKUMEN PROGRAM UTAMA
    const findQuery = `*[_type == "program" && slug.current == $slug][0] { _id, title, collectedRaw, donors }`;
    const finalProgram = await client.fetch(findQuery, { slug: programSlug });

    if (!finalProgram) {
      return NextResponse.json({ success: false, message: `Program tidak ditemukan.` }, { status: 404 });
    }

    const existingDonors = finalProgram.donors || [];
    const isAlreadyExist = existingDonors.some((d: any) => d.orderId === cleanOrderId);

    if (isAlreadyExist) {
      console.log(`♻️ Order ID ${cleanOrderId} sudah ada di program utama. Mutasi diabaikan.`);
      return NextResponse.json({ success: true, message: "Transaksi sudah tersinkronisasi sebelumnya." });
    }

    const donationAmount = Number(amount) || Number(pendingTransaction?.amount) || 0;
    
    const currentDate = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    console.log(`💰 DANA MASUK VALID: Memproses data ${donorNameFromForm} sebesar Rp ${donationAmount}`);
    
    // ===================================================================
    // 4. JALANKAN MUTASI SANITY (HANYA UNTUK DATA PENTING WEBSITE)
    // ===================================================================
    if (pendingTransaction) {
      await client.patch(pendingTransaction._id).set({ status: 'success' }).commit();
    }

    // Update nominal progress bar terkumpul di website utama
    await client
      .patch(finalProgram._id)
      .setIfMissing({ collectedRaw: 0, donors: [] })
      .inc({ collectedRaw: donationAmount }) 
      .append('donors', [
        {
          _key: `donor-${cleanOrderId}-${Math.random().toString(36).substring(2, 5)}`,
          orderId: cleanOrderId,
          name: donorNameFromForm,
          amount: donationAmount,
          date: currentDate
        }
      ])
      .commit();

    // ===================================================================
    // 📊 5. SIMPAN DATABASE INDUK UTAMA KE GOOGLE SHEETS
    // ===================================================================
    await appendToGoogleSheets({
      date: currentDate,
      orderId: cleanOrderId,
      name: donorNameFromForm,
      phone: donorPhoneFromForm,
      amount: donationAmount,
      program: finalProgram.title
    });

    // ===================================================================
    // 🚀 6. KIRIM NOTIFIKASI WA VIA FONNTE
    // ===================================================================
    if (donorPhoneFromForm !== '') {
      let formattedPhone = donorPhoneFromForm.replace(/[^0-9]/g, '');
      if (formattedPhone.startsWith('0')) {
        formattedPhone = '62' + formattedPhone.slice(1);
      }

      const isZakatProgram = programSlug.includes('zakat');
      const labelNominal = isZakatProgram ? 'Nominal Zakat' : 'Nominal Infak';
      const kataSapaan = isZakatProgram ? 'Muzakki' : 'Bapak/Ibu/Sdr';

      const messageText = 
        `*Terima Kasih Atas Kebaikan Anda* 🙏🌟\n\n` +
        `` + (isZakatProgram ? 'Semoga Allah menerima amal zakat Anda.' : 'Assalamualaikum wr. wb.,\n') +
        `Jazakumullah Khairan Katsiran kepada ${kataSapaan} *${donorNameFromForm}*.\n\n` +
        `Alhamdulillah, pembayaran dana amanah Anda telah kami terima dengan rincian berikut:\n` +
        `• *ID Transaksi:* ${cleanOrderId}\n` +
        `• *${labelNominal}:* Rp ${donationAmount.toLocaleString('id-ID')}\n` +
        `• *Metode:* ${paymentMethodUsed}\n` +
        `• *Program:* ${finalProgram.title}\n\n` +
        `Semoga dana yang Anda tunaikan menjadi pembersih harta, pelipat ganda pahala, serta mengalirkan keberkahan yang tiada putus untuk Anda sekeluarga. Aamiin Yaa Rabbal 'Aalamiin.\n\n` +
        `Salam hangat,\n` +
        `*LAZIS Khoiro Ummah* (lazisku.com)`;

      try {
        await fetch('https://api.fonnte.com/send', {
          method: 'POST',
          headers: { 'Authorization': process.env.FONNTE_TOKEN || '' },
          body: new URLSearchParams({ target: formattedPhone, message: messageText }),
        });
      } catch (fonnteErr) {
        console.error(`🔥 FONNTE ERROR:`, fonnteErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Sukses otomatis! Tercatat di Google Sheets dan aman dari kuota boncos.`
    });

  } catch (error: any) {
    console.error("🔥 CONTROLLER ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}