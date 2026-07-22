// app/api/programs/route.ts
import { NextResponse } from 'next/server';
// 🚀 OPTIMASI UTAMA: Menggunakan clientPublik dari utility lib yang mengaktifkan Edge CDN gratis
import { clientPublik as client } from '@/lib/sanity';

// 🚀 PROTEKSI 1: Set revalidate berwaktu (60 detik) agar Next.js tidak menembak Sanity setiap milidetik
export const dynamic = 'force-dynamic';
export const revalidate = 60; 

export async function GET() {
  try {
    const query = `*[_type == "program"] | order(_createdAt desc) {
      "id": _id,
      "slug": slug.current,
      title,
      category,
      sectionType,
      "image": image.asset->url,
      collectedRaw,
      targetAmount,
      daysLeft,
      description,
      donors
    }`;

    // 🚀 PROTEKSI 2: Menggunakan mekanisme caching Next.js & CDN Sanity
    const sanityPrograms = await client.fetch(query);

    const formattedData = sanityPrograms.map((program: any) => {
      const rawAmount = Number(program.collectedRaw || 0);
      const targetAmount = Number(program.targetAmount || 50000000);

      return {
        id: program.id,
        slug: program.slug,
        title: program.title,
        category: program.category || 'Kemanusiaan',
        // 🚀 Mengikutkan sectionType agar komponen di frontend bisa memfilter section
        sectionType: program.sectionType || 'pilihan',
        image: program.image || 'https://via.placeholder.com/385x176?text=No+Image',
        collected: `Rp ${rawAmount.toLocaleString('id-ID')}`,
        collectedRaw: rawAmount,
        target: `Rp ${targetAmount.toLocaleString('id-ID')}`,
        targetAmount: targetAmount,
        daysLeft: program.daysLeft || null,
        description: program.description || null,
        donors: program.donors || []
      };
    });

    // 🚀 PROTEKSI 3: Gunakan Cache-Control tingkat server Next.js selama 60 detik
    return NextResponse.json(
      { success: true, data: formattedData },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
        },
      }
    );

  } catch (error: any) {
    console.error('🔥 Sanity Fetch Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}