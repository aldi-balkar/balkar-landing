'use client';

export default function TestimonialSection() {
  const testimonials = [
    {
      title: "Profesional & Cepat",
      description: "Website untuk bisnis UMKM ku jadi dalam 5 hari. Hasilnya sangat memuaskan dan profesional.",
      name: "Rina",
      role: "Owner Kopi Nusantara",
      avatar: "RN"
    },
    {
      title: "Harga Terjangkau",
      description: "Budget terbatas tapi tetap dapet website berkualitas. Worth it banget!",
      name: "Budi",
      role: "Founder Konveksi Lokal",
      avatar: "BD"
    },
    {
      title: "Responsif & Modern",
      description: "Website portofolio ku mobile-friendly dan tampilan nya keren banget. Client langsung impressed.",
      name: "Sarah",
      role: "Fotografer Freelance",
      avatar: "SR"
    },
    {
      title: "Support Luar Biasa",
      description: "Tim nya sangat helpful dan sabar jelasin setiap detail. Revisi juga unlimited sampai puas.",
      name: "Dika",
      role: "Content Creator",
      avatar: "DK"
    },
    {
      title: "Toko Online Powerful",
      description: "E-commerce ku sekarang bisa terima pembayaran otomatis. Penjualan naik 3x lipat!",
      name: "Linda",
      role: "Owner Fashion Store",
      avatar: "LD"
    },
    {
      title: "Landing Page Konversi Tinggi",
      description: "Landing page nya bikin conversion rate naik 60%. Design nya clean dan persuasive.",
      name: "Andi",
      role: "Digital Marketer",
      avatar: "AD"
    }
  ];

  // Duplicate for seamless loop
  const allTestimonials = [...testimonials, ...testimonials];
  const firstRow = allTestimonials;
  const secondRow = [...testimonials.slice(3), ...testimonials.slice(0, 3), ...testimonials.slice(3), ...testimonials.slice(0, 3)];

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
            Kata Mereka
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dipercaya oleh 100+ brand dan kreator Indonesia
          </p>
        </div>
      </div>

      <div className="relative space-y-6">
        {/* First Row - Scroll Left */}
        <div className="flex gap-6 animate-scroll-left">
          {firstRow.map((testimonial, index) => (
            <div 
              key={`row1-${index}`}
              className="flex-shrink-0 w-[400px] bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-black transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-black mb-4">
                {testimonial.title}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {testimonial.description}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-black">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - Scroll Right */}
        <div className="flex gap-6 animate-scroll-right">
          {secondRow.map((testimonial, index) => (
            <div 
              key={`row2-${index}`}
              className="flex-shrink-0 w-[400px] bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-black transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-black mb-4">
                {testimonial.title}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {testimonial.description}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-black">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
