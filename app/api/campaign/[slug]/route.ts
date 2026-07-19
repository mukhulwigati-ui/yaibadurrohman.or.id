// app/api/campaign/[slug]/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

export const dynamic = 'force-dynamic';

// 🚀 FIXED: Gunakan client dengan token bypass & useCdn false agar data ditarik real-time tanpa delay cache CDN
const client = createClient({
  projectId: '61d8vnuq',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'sk44JM4AlD6urcLa9Ak9vvnRpLGlsRai9aftW1wPA4w9zxwhrCpKREk2ArKU25K4kENIPxVXenu4kZhm2cOSaxGP69kz8az2qM2BZDIVzqyAGLjIvVTGKMu39CExUrKwbw2wCb2bfxKPgZ4lqEt2nwLZT4HEc4XT1qfrZ0i6KYupIlT6IOlP',
});

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    // 🚀 FIXED QUERY: Tetap dibuat fleksibel mencari program atau campaign agar kebal kesalahan penamaan schema
    const query = `*[(_type == "program" || _type == "campaign") && slug.current == $slug][0] {
      title,
      description,
      "imageUrl": mainImage.asset->url
    }`;

    const data = await client.fetch(query, { slug });

    if (!data) {
      return NextResponse.json({ success: false, message: 'Campaign tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}