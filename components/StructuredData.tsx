'use client';

import { useEffect } from 'react';

export default function StructuredData() {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "GagituAldi",
      "image": "https://gagitualdi.com/og-image.jpg",
      "description": "Jasa pembuatan website profesional untuk UMKM, brand, dan kreator muda Indonesia. Landing page, website bisnis, portfolio, dan toko online.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "ID",
        "addressLocality": "Indonesia"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-6.2088",
        "longitude": "106.8456"
      },
      "url": "https://gagitualdi.com",
      "telephone": "+6285156049096",
      "email": "teamgagitualdi@gmail.com",
      "priceRange": "$$",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "09:00",
        "closes": "21:00"
      },
      "sameAs": [
        "https://wa.me/6285156049096"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "100"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "IDR",
        "lowPrice": "500000",
        "highPrice": "15000000"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
