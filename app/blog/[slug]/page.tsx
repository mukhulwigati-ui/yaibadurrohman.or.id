// app/blog/[slug]/page.tsx
import { Metadata } from 'next';
import BlogDetailClient from '@/components/BlogDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

// 🚀 PROTEKSI 1: Mengunci batas revalidasi halaman detail artikel selama 60 detik di level server Next.js
export const dynamic = 'force-dynamic';
export const revalidate = 60;

// ===================================================================
// 🚀 DYNAMIC METADATA: Menembak Open Graph & Gambar Unik Artikel ke Medsos
// ===================================================================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lazisku.com';
  const fallbackImage = `${siteUrl}/images/banner-utama.png`;
  
  let imageUrl = fallbackImage;
  let articleTitle = 'Kabar Berita | LAZIS Khoiro Ummah';
  let articleExcerpt = ''; 

  try {
    // 🚀 PROTEKSI 2: Menghapus cache no-store dan menyematkan revalidate 60 detik agar berbagi cache dengan API Route
    const res = await fetch(`${siteUrl}/api/news/${slug}`, {
      next: { revalidate: 60 },
    });
    const json = await res.json();
    const article = json?.data?.article;

    if (article) {
      if (article.title) articleTitle = article.title;

      // ===================================================================
      // 🚀 MASTER LOGIC: GENERATE CUPLIKAN DINAMIS DARI ISI ARTIKEL ASLI
      // ===================================================================
      if (article.excerpt && typeof article.excerpt === 'string') {
        articleExcerpt = article.excerpt;
      } else if (article.content) {
        if (typeof article.content === 'string') {
          articleExcerpt = article.content.slice(0, 150) + '...';
        } 
        else if (Array.isArray(article.content)) {
          const plainText = article.content
            .filter((block: any) => block._type === 'block' && block.children)
            .map((block: any) => block.children.map((child: any) => child.text).join(''))
            .join(' ');
          
          articleExcerpt = plainText ? plainText.slice(0, 150) + '...' : '';
        }
      }

      if (!articleExcerpt) {
        articleExcerpt = `Baca kabar berita lengkap mengenai "${articleTitle}" secara resmi di platform LAZIS Khoiro Ummah.`;
      }

      const rawImage = article.imageUrl || article.image;

      if (rawImage && typeof rawImage === 'string') {
        if (rawImage.startsWith('http')) {
          imageUrl = rawImage;
        } else {
          imageUrl = `${siteUrl}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;
        }
      }
    }
  } catch (error) {
    console.error('🔥 Metadata patch error:', error);
    articleExcerpt = 'Salurkan sedekah dan zakat Anda secara amanah melalui LAZIS Khoiro Ummah.';
  }

  return {
    title: articleTitle,
    description: articleExcerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: articleTitle,
      description: articleExcerpt,
      url: `${siteUrl}/blog/${slug}`,
      siteName: 'LAZIS Khoiro Ummah',
      locale: 'id_ID',
      type: 'article',
      images: [
        {
          url: imageUrl, 
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: articleTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: articleTitle,
      description: articleExcerpt,
      images: [imageUrl],
    },
  };
}

// ===================================================================
// 🖥️ SERVER COMPONENT ENTRY
// ===================================================================
export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  return <BlogDetailClient slug={slug} />;
}