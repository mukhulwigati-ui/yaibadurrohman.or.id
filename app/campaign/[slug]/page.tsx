import { Metadata } from 'next';
import CampaignDetailClient from '@/components/CampaignDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ ref?: string }>; // Tetap dipertahankan untuk kebutuhan Server Component Entry
}

// 🚀 PROTEKSI SERVER: Mengunci batas revalidasi halaman detail campaign selama 60 detik di level server Next.js
export const dynamic = 'force-dynamic';
export const revalidate = 60; // 🚀 MENYAMAKAN PROTEKSI DENGAN BLOG

// ===================================================================
// 🚀 DYNAMIC METADATA: Disamakan Persis dengan Model Struktur Blog (Super Stabil)
// ===================================================================
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // Hanya mengekstrak slug secara asinkronus agar sinkronisasi bot media sosial tidak terganggu
  const { slug } = await params;
  
  // Pastikan domain utama mendukung format WWW agar sinkron dengan metadata share medsos
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lazisku.com';
  if (!siteUrl.includes('www.')) {
    siteUrl = siteUrl.replace('https://', 'https://www.');
  }
  
  const fallbackImage = `${siteUrl}/images/banner-utama.png`;
  
  let campaignTitle = 'Sedekah Subuh | LAZIS Khoiro Ummah';
  let campaignDesc = 'Awali hari dengan keberkahan. Sedekah subuh adalah waktu terbaik untuk berbagi kebaikan.'; 
  let imageUrl = fallbackImage;

  try {
    // 🚀 MENYAMAKAN MODEL FETCH INTERNAL SEPERTI HALAMAN BERITA
    const res = await fetch(`${siteUrl}/api/campaign/${slug}`, {
      next: { revalidate: 60 },
    });
    
    const json = await res.json();
    const campaign = json?.data;

    if (campaign) {
      if (campaign.title) campaignTitle = campaign.title;
      
      // LOGIC PARSING DESKRIPSI
      if (campaign.description) {
        if (typeof campaign.description === 'string') {
          campaignDesc = campaign.description.slice(0, 140) + '...';
        } else if (Array.isArray(campaign.description)) {
          const plainText = campaign.description
            .filter((block: any) => block._type === 'block' && block.children)
            .map((block: any) => block.children.map((child: any) => child.text).join(''))
            .join(' ');
          if (plainText) campaignDesc = plainText.slice(0, 140) + '...';
        }
      }

      // 🚀 EKSTRAKSI GAMBAR MURNI SEPERTI ALUR BLOG
      const rawImage = campaign.imageUrl;
      if (rawImage && typeof rawImage === 'string') {
        if (rawImage.startsWith('http')) {
          imageUrl = `${rawImage}?format=jpg&w=1200&h=630&fit=crop`;
        } else {
          imageUrl = `${siteUrl}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;
        }
      }
    }
  } catch (error) {
    console.error('🔥 Fetch campaign metadata failed:', error);
  }

  // 🚀 ABSOLUTE FALLBACK: Jika gambar utama gagal ditarik dari DB, gunakan fallback blog yang sudah pasti lolos WA
  if (imageUrl === fallbackImage || !imageUrl) {
    imageUrl = 'https://cdn.sanity.io/images/61d8vnuq/production/54504f4c2810fb8bece0e88229ef5e2ad6f0ba8c-1200x630.jpg?format=jpg';
  }

  return {
    title: campaignTitle,
    description: campaignDesc,
    alternates: {
      // Bersihkan canonical dari query string (?ref=) agar identik dengan alur halaman blog
      canonical: `/campaign/${slug}`,
    },
    openGraph: {
      title: campaignTitle,
      description: campaignDesc,
      url: `${siteUrl}/campaign/${slug}`,
      siteName: 'LAZIS Khoiro Ummah',
      locale: 'id_ID',
      type: 'article', // 🚀 PAKSA MENGGUNAKAN ARTICLE SEPERTI BERITA
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: campaignTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: campaignTitle,
      description: campaignDesc,
      images: [imageUrl],
    },
  };
}

// ===================================================================
// 🖥️ SERVER COMPONENT ENTRY (Next.js 15+ App Router)
// ===================================================================
export default async function CampaignPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { ref } = await searchParams; // Tetap menangkap ref di sini secara runtime untuk dialirkan ke client side

  // 🚀 AKSI UTAMA: Mengalirkan slug dan nomor WA fundraiser (ref) ke Client Component untuk pelacakan transaksi
  return <CampaignDetailClient slug={slug} referral={ref || null} />;
}