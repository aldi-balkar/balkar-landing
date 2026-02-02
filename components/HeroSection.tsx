'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-white pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight mb-8">
            Website yang Bikin Brand Kamu{' '}
            <span className="inline-block">Naik Level</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Dari ide sampai online dalam hitungan hari. Website profesional untuk UMKM, brand, dan kreator yang serius berkembang.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              href="#contact" 
              className="px-8 py-4 bg-black text-white rounded-full font-semibold text-lg hover:bg-gray-800 transition-all duration-200 min-w-[200px] text-center"
            >
              Mulai Gratis
            </Link>
            <Link 
              href="#services" 
              className="px-8 py-4 bg-white text-black border-2 border-black rounded-full font-semibold text-lg hover:bg-gray-50 transition-all duration-200 min-w-[200px] text-center"
            >
              Lihat Layanan
            </Link>
          </div>

          <div className="text-sm text-gray-500 mb-12">
            Dipercaya oleh 100+ brand dan kreator Indonesia
          </div>
        </div>

        <div className="relative mt-16 max-w-6xl mx-auto">
          {/* Shadow background */}
          <div className="absolute -inset-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-3xl blur-2xl opacity-30"></div>
          
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200">
            <div className="aspect-video bg-white rounded-2xl shadow-inner flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-50 to-white p-8">
                <div className="space-y-4 animate-float">
                  <div className="h-8 bg-gray-200 rounded-lg w-3/4 animate-float-delayed-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-full animate-float-delayed-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-float-delayed-3"></div>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="h-32 bg-gray-200 rounded-xl animate-float-delayed-4"></div>
                    <div className="h-32 bg-gray-200 rounded-xl animate-float-delayed-5"></div>
                  </div>
                  <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl mt-4 animate-float-delayed-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
