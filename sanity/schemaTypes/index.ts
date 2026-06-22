// schemas/index.ts (atau file konfigurasi skema utama Sanity Studio Anda)
import program from './program';           // File skema program donasi Anda
import news from './news';                 // Skema kabar berita
import category from './category';         // Skema kategori artikel/berita
import donationTransaction from './donationTransaction'; // 🚀 BARU: Penampung data transaksi pending (Nama & WA)

export const schemaTypes = [
  program,
  category, 
  news,      
  donationTransaction // 🚀 BARU: Didaftarkan agar skema penampung transaksi aktif di dashboard & API Sanity
];