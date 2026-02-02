'use client';

export default function CTASection() {
  return (
    <section id="contact" className="py-32 bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
          Siap Mulai Project Kamu?
        </h2>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Konsultasi gratis untuk diskusi kebutuhan website kamu. No pressure, cuma ngobrol santai.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="https://wa.me/6285156049096?text=Halo%2C%20saya%20tertarik%20untuk%20diskusi%20tentang%20pembuatan%20website" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-200 min-w-[240px] text-center"
          >
            Hubungi via WhatsApp
          </a>
          
          <a 
            href="mailto:teamgagitualdi@gmail.com" 
            className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all duration-200 min-w-[240px] text-center"
          >
            Kirim Email
          </a>
        </div>
      </div>
    </section>
  );
}
