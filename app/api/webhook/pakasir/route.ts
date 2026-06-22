// app/api/webhook/pakasir/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

// ===================================================================
// SANITY CLIENT WRITE (Menggunakan Token Hardcode Editor Anda)
// ===================================================================
const client = createClient({
  projectId: 'jmgc1ejr', 
  dataset: 'production',
  useCdn: false, 
  apiVersion: '2024-01-01',
  token: 'sk7NqErRROXCLrscMNjmzvwt2hhpiI61vdbMqw0oN6zBkvrtEhOJG4GS71LcC4ldpRhqiTVCEkzYfAznTnap1Pv5LZQZt9Uo7Ixqw0AAOq7ReDbPO9tciZyXkTlMA2VoAA1NiU6ITL5PqGkGCtvQuLCiRENowtxfPBbDAnusAU1pu2tUvnt7', 
});

// ===================================================================
// WEBHOOK PAKASIR AUTOMATION (BERDASARKAN DATA ARSITEKTUR FRONTEND)
// ===================================================================
export async function POST(request: Request) {
  try {
    const payload = await request.json();

    console.log("======================================");
    console.log("🚀 WEBHOOK PAKASIR: MEMPROSES VERIFIKASI DANA MASUK");
    console.log(JSON.stringify(payload, null, 2));
    console.log("======================================");

    const { amount, order_id, status } = payload;

    // 1. Validasi Status Pembayaran Sukses dari Pakasir
    const successStatus = ["completed", "success", "paid", "200", 200];
    if (!successStatus.includes(status)) {
      return NextResponse.json({
        success: true,
        message: "Status transaksi belum berhasil, mutasi diabaikan."
      });
    }

    const cleanOrderId = order_id ? String(order_id).trim() : '';
    if (!cleanOrderId) {
      return NextResponse.json({ success: false, message: "Order ID tidak ditemukan." }, { status: 400 });
    }

    // ===================================================================
    // 2. AMBIL DATA NAMA ASLI LANGSUNG DARI INPUT FORM FRONTEND (SANITY)
    // ===================================================================
    // Menghindari kehilangan nama akibat filter gateway Pakasir dengan menarik langsung
    // dari skema 'donationTransaction' pending yang dibuat saat user klik bayar di frontend.
    const transactionQuery = `*[_type == "donationTransaction" && orderId == $orderId][0]`;
    const pendingTransaction = await client.fetch(transactionQuery, { orderId: cleanOrderId });

    let donorNameFromForm = "Hamba Allah";
    let programSlug = "sedekah-subuh"; // Default fallback aman

    if (pendingTransaction) {
      if (pendingTransaction.donorName && String(pendingTransaction.donorName).trim() !== "") {
        donorNameFromForm = String(pendingTransaction.donorName).trim();
      }
      if (pendingTransaction.slug) {
        programSlug = String(pendingTransaction.slug).toLowerCase().trim();
      }
      
      // Update status data transaksi penampung sementara di Sanity agar tidak terproses ganda
      await client.patch(pendingTransaction._id).set({ status: 'success' }).commit();
    } else {
      console.log(`⚠️ Data transaksi pending untuk ID ${cleanOrderId} tidak ditemukan. Menggunakan fallback kata kunci.`);
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
      return NextResponse.json({ success: false, message: `Program dengan slug '${programSlug}' tidak ditemukan.` }, { status: 404 });
    }

    const donationAmount = Number(amount) || Number(pendingTransaction?.amount) || 0;
    const currentDate = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    // ===================================================================
    // 4. PENGECEKAN DUPLIKASI DATA & MENAMPILKAN NAMA DONATUR DI DASHBOARD
    // ===================================================================
    const existingDonors = finalProgram.donors || [];
    const duplicateIndex = existingDonors.findIndex((d: any) => d.orderId === cleanOrderId);
    let result;

    if (duplicateIndex === -1) {
      console.log(`💰 DANA MASUK & VALID: Memunculkan nama ${donorNameFromForm} senilai Rp ${donationAmount} di program ${finalProgram.title}`);
      
      result = await client
        .patch(finalProgram._id)
        .setIfMissing({ collectedRaw: 0, donors: [] })
        .inc({ collectedRaw: donationAmount }) 
        .append('donors', [
          {
            _key: `donor-${cleanOrderId}-${Math.random().toString(36).substring(2, 5)}`,
            orderId: cleanOrderId,
            name: donorNameFromForm, // Nama asli dari form pengisian frontend sukses disuntikkan
            amount: donationAmount,
            date: currentDate
          }
        ])
        .commit();
    } else {
      console.log(`♻️ Transaksi ${cleanOrderId} sudah pernah tercatat sukses sebelumnya.`);
      result = finalProgram;
    }

    return NextResponse.json({
      success: true,
      message: `Sukses otomatis! Dana terverifikasi dan nama ${donorNameFromForm} berhasil ditampilkan.`
    });

  } catch (error: any) {
    console.error("🔥 WEBHOOK AUTOMATION ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}