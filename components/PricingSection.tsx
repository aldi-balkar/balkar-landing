'use client';

export default function PricingSection() {
  const pricingPlans = [
    {
      name: "Starter",
      price: "2.5jt",
      period: "one-time",
      description: "Cocok untuk yang baru mulai",
      features: [
        "1 Halaman Landing Page",
        "Responsive Design",
        "Basic SEO Setup",
        "Contact Form",
        "1x Revisi Design",
        "Support 30 hari"
      ],
      popular: false,
      color: "from-gray-50 to-gray-100"
    },
    {
      name: "Growth",
      price: "4.5jt",
      period: "one-time",
      description: "Paling populer untuk bisnis berkembang",
      features: [
        "Sampai 5 Halaman",
        "Responsive Design",
        "Advanced SEO",
        "Contact Form + WhatsApp",
        "Facebook Pixel & Analytics",
        "3x Revisi Design",
        "Support 60 hari",
        "Basic Blog Integration"
      ],
      popular: true,
      color: "from-purple-50 to-pink-50"
    },
    {
      name: "Brand Pro",
      price: "7.5jt",
      period: "one-time",
      description: "Untuk brand yang serius berkembang",
      features: [
        "Sampai 10 Halaman",
        "Full Responsive Design",
        "Premium SEO Optimization",
        "Advanced Contact System",
        "Full Analytics & Tracking",
        "Unlimited Revisi",
        "Support 90 hari",
        "Blog + Portfolio System",
        "Custom Animations",
        "Performance Optimization"
      ],
      popular: false,
      color: "from-indigo-50 to-purple-100"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Pilih Paket Sesuai Kebutuhanmu
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Harga transparan, tanpa biaya tersembunyi. Semua paket sudah termasuk hosting 1 tahun gratis.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-gradient-to-br ${plan.color} rounded-2xl p-8 border-2 ${
                plan.popular ? 'border-purple-500 shadow-2xl scale-105' : 'border-gray-200 shadow-lg'
              } transition-all duration-300 hover:shadow-2xl`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    🔥 Paling Populer
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {plan.description}
                </p>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 mb-1">
                    / {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-gray-700">
                    <span className="text-purple-600 mr-3 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105' 
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                Mulai Proyek
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 mt-12 text-sm">
          💡 Butuh custom package? <a href="#contact" className="text-purple-600 font-semibold hover:underline">Hubungi kami</a> untuk diskusi lebih lanjut
        </p>
      </div>
    </section>
  );
}
