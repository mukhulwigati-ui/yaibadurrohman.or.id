// app/api/campaign/[slug]/route.ts
import { NextResponse } from 'next/server';
import { clientPublik as client } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

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