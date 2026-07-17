// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LayoutClientWrapper from "@/components/LayoutClientWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🚀 MASTER SEO METADATA TAK TERTANDINGI (Google, Bing, & Social Media Ready)
// Dioptimalkan penuh untuk LAZIS Khoiro Ummah - lazisku.com
export const metadata: Metadata = {
  title: {
    default: "LAZIS Khoiro Ummah | Platform Sedekah, Infaq & Zakat Online Amanah",
    template: "%s | LAZIS Khoiro Ummah"
  },
  description: "Salurkan sedekah, infaq, zakat, dan wakaf Anda secara instan and amanah melalui LAZIS Khoiro Ummah (lazisku.com). Mengalirkan keberkahan dan kepedulian untuk pemberdayaan ummat, yatim, dhuafa, dan program sosial kemanusiaan.",
  keywords: [
    "lazis khoiro ummah",
    "lazisku",
    "lazisku com",
    "sedekah online",
    "infaq online",
    "bayar zakat online",
    "wakaf quran",
    "sedekah subuh",
    "donasi yatim dhuafa",
    "lembaga amil zakat amanah",
    "donasi qris instant",
    "lazis banyumas",
    "khoiro ummah bina umat"
  ],
  authors: [{ name: "LAZIS Khoiro Ummah", url: "https://lazisku.com" }],
  creator: "LAZIS Khoiro Ummah",
  publisher: "LAZIS Khoiro Ummah",
  metadataBase: new URL("https://lazisku.com"),
  alternates: {
    canonical: "/",
  },
  
  // ===================================================================
  // 📱 OPEN GRAPH / FACEBOOK / WHATSAPP / TELEGRAM PREVIEW
  // ===================================================================
  openGraph: {
    title: "LAZIS Khoiro Ummah | Platform Sedekah, Infaq & Zakat Online Amanah",
    description: "Tunaikan kepedulian Anda dengan mudah. Salurkan sedekah subuh, infaq produktif, dan zakat mal/fitrah secara transparan dan otomatis via QRIS & Virtual Account bersama lazisku.com.",
    url: "https://lazisku.com",
    siteName: "LAZIS Khoiro Ummah",
    locale: "id_ID",
    type: "website",
    images: [
      {
        // 🚀 FIXED: Diubah menggunakan URL Absolut & ditambah properti type
        url: "https://lazisku.com/images/banner-utama.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "LAZIS Khoiro Ummah - Mengalirkan Keberkahan Melalui Sedekah dan Infaq",
      },
    ],
  },

  // ===================================================================
  // 🐦 TWITTER / X CARD PREVIEW
  // ===================================================================
  twitter: {
    card: "summary_large_image",
    title: "LAZIS Khoiro Ummah | Sedekah & Infaq Online Mudah",
    description: "Platform resmi galang donasi, sedekah, infaq, dan zakat amanah bersama LAZIS Khoiro Ummah.",
    // 🚀 FIXED: Diubah menggunakan URL Absolut
    images: ["https://lazisku.com/images/banner-utama.png"],
  },

  // ===================================================================
  // 🤖 ROBOTS INDEXING KETAT (Memaksa Crawling Google Maksimal)
  // ===================================================================
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ===================================================================
  // 🔐 VERIFIKASI MESIN PENCARI
  // ===================================================================
  verification: {
    google: "google-site-verification-token-anda",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-gray-50 flex flex-col text-gray-800" suppressHydrationWarning>
        
        {/* 🚀 LAYOUT CLIENT WRAPPER */}
        <LayoutClientWrapper>
          {children}
        </LayoutClientWrapper>

      </body>
    </html>
  );
}