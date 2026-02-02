# Balkar Landing Page

Landing page modern dan profesional untuk jasa freelance pembuatan website. Dibuat dengan Next.js, React, TypeScript, dan Tailwind CSS.

## 🎯 Fitur

- **Hero Section** - Headline menarik dengan CTA buttons dan ilustrasi mockup
- **Problem Section** - Menampilkan masalah yang dihadapi target market
- **Services Section** - 4 layanan utama dengan icon dan deskripsi
- **Portfolio Section** - Grid portfolio dengan hover effects
- **Pricing Section** - 3 paket harga dengan highlight "Paling Populer"
- **Tools Section** - Rekomendasi tools untuk kreator digital (affiliate style)
- **Testimonial Section** - Testimoni dari klien dummy
- **CTA Section** - Call-to-action besar dengan trust indicators
- **Footer** - Navigasi lengkap, kontak, dan social media links

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm atau yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Buka browser dan akses:
```
http://localhost:3000
```

### Build untuk Production

```bash
npm run build
npm start
```

## 📁 Struktur Project

```
balkar-landing/
├── app/
│   ├── layout.tsx          # Root layout dengan metadata SEO
│   ├── page.tsx            # Homepage yang menggabungkan semua section
│   └── globals.css         # Global styles
├── components/
│   ├── HeroSection.tsx
│   ├── ProblemSection.tsx
│   ├── ServicesSection.tsx
│   ├── PortfolioSection.tsx
│   ├── PricingSection.tsx
│   ├── ToolsSection.tsx
│   ├── TestimonialSection.tsx
│   ├── CTASection.tsx
│   └── Footer.tsx
├── public/
│   ├── favicon.svg
│   └── grid.svg
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 Design Features

- **Modern & Clean**: Design minimalis dengan whitespace yang cukup
- **Fully Responsive**: Mobile-first approach, tampil sempurna di semua device
- **Smooth Animations**: Hover effects dan transitions yang smooth
- **Color Scheme**: Gradient purple & pink dengan aksen modern
- **Typography**: Menggunakan Inter font untuk readability optimal

## 🔍 SEO Optimization

- Semantic HTML5 structure
- Proper heading hierarchy (h1, h2, h3)
- Meta tags lengkap (title, description, keywords)
- Open Graph tags untuk social media
- Alt text untuk semua elemen visual
- Fast loading dengan optimasi Next.js

## 📱 Responsiveness

Website ini fully responsive dengan breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎯 Target Audience

- UMKM kreatif
- Brand clothing
- Coffee shop
- Personal brand
- Content creator
- Affiliate marketer pemula

## 📝 Customization

Untuk customize konten:

1. **Ubah teks dan konten**: Edit langsung di masing-masing component file
2. **Ubah warna**: Edit di `tailwind.config.ts` atau langsung di className
3. **Tambah section baru**: Buat component baru di folder `components/` dan import di `app/page.tsx`
4. **Ubah metadata SEO**: Edit di `app/layout.tsx`

## 🚀 Deployment

Deploy ke Vercel (recommended):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Atau deploy ke platform lain:
- Netlify
- Railway
- Digital Ocean
- AWS

## 📞 Contact

Untuk pertanyaan atau custom development:
- Email: hello@balkar.id
- WhatsApp: +62 812-3456-7890

## 📄 License

© 2026 Balkar. All rights reserved.

---

Made with ❤️ for Indonesian Creators
