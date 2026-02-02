'use client';

export default function StatsSection() {
  const stats = [
    { label: "Brand Terpercaya", value: "100+" },
    { label: "Website Selesai", value: "200+" },
    { label: "Rating Klien", value: "4.9/5" },
    { label: "Repeat Order", value: "85%" }
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-black mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
