'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">GA</span>
            </div>
            <span className="text-xl font-bold text-black">GagituAldi</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-gray-700 hover:text-black font-medium transition-colors">
              Layanan
            </Link>
            <Link href="#tools" className="text-gray-700 hover:text-black font-medium transition-colors">
              Tools
            </Link>
            <Link href="#testimonials" className="text-gray-700 hover:text-black font-medium transition-colors">
              Testimoni
            </Link>
            <Link 
              href="#contact" 
              className="px-6 py-2.5 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-200"
            >
              Mulai Sekarang
            </Link>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 flex flex-col gap-4">
            <Link 
              href="#services" 
              className="text-gray-700 hover:text-black font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Layanan
            </Link>
            <Link 
              href="#tools" 
              className="text-gray-700 hover:text-black font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Tools
            </Link>
            <Link 
              href="#testimonials" 
              className="text-gray-700 hover:text-black font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimoni
            </Link>
            <Link 
              href="#contact" 
              className="px-6 py-2.5 bg-black text-white rounded-full font-semibold text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Mulai Sekarang
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
