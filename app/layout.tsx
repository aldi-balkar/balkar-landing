import type { Metadata } from "next";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL('https://gagitualdi.com'),
  title: {
    default: "GagituAldi - Jasa Pembuatan Website Profesional untuk UMKM & Brand",
    template: "%s | GagituAldi"
  },
  description: "Jasa pembuatan website profesional untuk UMKM, brand, dan kreator muda Indonesia. Landing page, website bisnis, portfolio, dan toko online. Dari ide sampai online dalam hitungan hari dengan harga terjangkau.",
  keywords: [
    "jasa pembuatan website",
    "jasa website murah",
    "website umkm",
    "landing page profesional",
    "website brand",
    "website toko online",
    "jasa web design Indonesia",
    "website personal brand",
    "jasa website freelance",
    "gagitualdi",
    "web developer Indonesia"
  ],
  authors: [{ name: "GagituAldi", url: "https://gagitualdi.com" }],
  creator: "GagituAldi",
  publisher: "GagituAldi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "GagituAldi - Jasa Pembuatan Website Profesional untuk UMKM & Brand",
    description: "Jasa pembuatan website profesional untuk UMKM, brand, dan kreator muda Indonesia. Landing page, website bisnis, portfolio, dan toko online dengan harga terjangkau.",
    url: "https://gagitualdi.com",
    siteName: "GagituAldi",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GagituAldi - Jasa Pembuatan Website Profesional"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GagituAldi - Jasa Pembuatan Website Profesional untuk UMKM & Brand",
    description: "Jasa pembuatan website profesional untuk UMKM, brand, dan kreator muda Indonesia. Landing page, website bisnis, portfolio, dan toko online.",
    creator: "@gagitualdi",
    images: ["/og-image.jpg"],
  },
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
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
