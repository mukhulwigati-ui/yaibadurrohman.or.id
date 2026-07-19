// schemas/donationTransaction.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'donationTransaction',
  title: 'Donation Transaction (Pending Box)',
  type: 'document',
  fields: [
    defineField({
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
      readOnly: true, // Kunci agar invoice ID tidak bisa diubah manual
    }),
    defineField({
      name: 'donorName',
      title: 'Nama Donatur',
      type: 'string',
    }),
    defineField({
      name: 'donorPhone',
      title: 'Nomor WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'amount',
      title: 'Nominal Donasi',
      type: 'number',
      readOnly: true, // Kunci nilai donasi dasar
    }),
    defineField({
      name: 'uniqueCode',
      title: 'Kode Unik',
      type: 'number',
      readOnly: true,
    }),
    defineField({
      name: 'totalAmount',
      title: 'Total Pembayaran (+Kode Unik)',
      type: 'number',
      readOnly: true, // Kunci nilai total pembayaran agar sinkron dengan sistem gateway
    }),
    defineField({
      name: 'status',
      title: 'Status Pembayaran',
      type: 'string',
      // 🚀 FIXED: Mengunci dropdown agar status otomatis dikelola oleh Callback Webhook Pakasir
      readOnly: true, 
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Success', value: 'success' },
          { title: 'Failed', value: 'failed' }
        ]
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'slug',
      title: 'Target Program Slug',
      type: 'string',
      readOnly: true,
    })
  ]
});