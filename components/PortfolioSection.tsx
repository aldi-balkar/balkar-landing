'use client';

import Image from 'next/image';

export default function PortfolioSection() {
  const projects = [
    {
      name: "Kopi Aesthetic",
      category: "Coffee Shop",
      image: "bg-gradient-to-br from-amber-900 to-amber-700",
      description: "Website untuk coffee shop dengan online menu dan reservation system"
    },
    {
      name: "Urban Clothing",
      category: "Brand Clothing",
      image: "bg-gradient-to-br from-slate-800 to-slate-600",
      description: "E-commerce modern untuk brand streetwear lokal"
    },
    {
      name: "Sarah's Portfolio",
      category: "Personal Brand",
      image: "bg-gradient-to-br from-pink-500 to-purple-600",
      description: "Portfolio website untuk content creator & influencer"
    },
    {
      name: "Handmade Craft",
      category: "UMKM",
      image: "bg-gradient-to-br from-green-600 to-teal-500",
      description: "Katalog online untuk produk handmade dan kerajinan tangan"
    },
    {
      name: "Studio Foto",
      category: "Personal Brand",
      image: "bg-gradient-to-br from-indigo-600 to-blue-500",
      description: "Portfolio showcase untuk fotografer profesional"
    },
    {
      name: "Healthy Food",
      category: "UMKM",
      image: "bg-gradient-to-br from-lime-500 to-green-600",
      description: "Landing page untuk produk makanan sehat dengan sistem pre-order"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Contoh Tampilan Website
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lihat beberapa project website yang sudah kami kerjakan untuk berbagai jenis bisnis
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Project Image/Mockup */}
              <div className={`relative h-64 ${project.image} flex items-center justify-center overflow-hidden`}>
                {/* Browser mockup */}
                <div className="w-5/6 h-5/6 bg-white rounded-lg shadow-2xl p-2 transform group-hover:scale-105 transition-transform duration-500">
                  <div className="bg-gray-100 rounded-t h-4 flex items-center px-2 gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className={`h-full ${project.image} rounded-b opacity-80`}></div>
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    Lihat Detail
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full mb-3">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
