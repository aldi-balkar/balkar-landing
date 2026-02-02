'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('2026');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">GA</span>
              </div>
              <span className="text-xl font-bold text-black">GagituAldi</span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed max-w-md">
              Jasa pembuatan website profesional untuk UMKM, brand, dan kreator muda Indonesia. Bangun online presence yang kuat.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-black mb-4">Layanan</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#services" className="text-gray-600 hover:text-black transition-colors">
                  Landing Page
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-600 hover:text-black transition-colors">
                  Website Brand
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-600 hover:text-black transition-colors">
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-black mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:teamgagitualdi@gmail.com" className="text-gray-600 hover:text-black transition-colors">
                  teamgagitualdi@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
                  +62 812-3456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} GagituAldi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
