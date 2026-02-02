'use client';

export default function ServicesSection() {
  const services = [
    {
      title: "Landing Page Jualan",
      description: "Halaman khusus untuk produk atau campaign kamu. Dioptimasi untuk konversi maksimal dan performa cepat.",
      features: ["Fast Loading", "Mobile Optimized", "High Conversion"]
    },
    {
      title: "Website Brand",
      description: "Website lengkap untuk bisnis kamu dengan katalog produk, galeri, dan sistem kontak terintegrasi.",
      features: ["Multi Page", "CMS Integration", "SEO Ready"]
    },
    {
      title: "Portfolio Website",
      description: "Showcase karya dan project kamu dengan style yang professional dan mudah di-maintain.",
      features: ["Gallery System", "Blog Ready", "Contact Forms"]
    },
    {
      title: "Website Komunitas",
      description: "Platform untuk komunitas atau organisasi dengan sistem member, event management, dan forum diskusi.",
      features: ["Member System", "Event Calendar", "Discussion Forum"]
    },
    {
      title: "Website Skripsi/TA",
      description: "Bantuan pembuatan website untuk kebutuhan skripsi atau tugas akhir dengan dokumentasi lengkap dan presentasi.",
      features: ["Full Documentation", "Source Code", "Presentation Support"]
    },
    {
      title: "E-Commerce",
      description: "Toko online lengkap dengan payment gateway, inventory management, dan dashboard admin.",
      features: ["Payment Integration", "Order Management", "Analytics Dashboard"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
            Layanan yang Kami Tawarkan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pilih layanan yang sesuai dengan kebutuhan bisnis kamu. Semua dikerjakan dengan standard kualitas tinggi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group p-8 bg-white border-2 border-gray-200 rounded-2xl hover:border-black transition-all duration-300 hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold text-black mb-4 group-hover:underline">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
