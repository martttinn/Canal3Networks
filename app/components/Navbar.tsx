"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { navLinks } from '@/app/data/navigation';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  showNav: boolean;
}

const Navbar = ({ showNav }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className={`fixed w-full z-50 px-6 pt-12 pb-8 md:pt-10 md:pb-12 transition-all duration-300 bg-gradient-to-b from-black from-30% via-black/80 via-60% to-transparent ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto flex justify-center items-center relative z-50">
        <div className="flex flex-col absolute left-6">
          <div className="flex items-center cursor-pointer hover:opacity-90 transition-opacity">
            <Image 
              src="/logo/canal3_logo_simple_trans.png" 
              alt="Canal3 Logo" 
              width={160} 
              height={50} 
              sizes="(max-width: 768px) 112px, 160px"
              className="h-14 md:h-20 w-auto object-contain"
              priority
            />
          </div>
        </div>

        <div className="hidden md:flex gap-10 text-base font-medium text-gray-200">
          {navLinks.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="relative group py-2">
              <span className="group-hover:text-white transition-colors duration-300">{item}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6F70DE] to-[#85EDAF] transition-all duration-300 group-hover:w-full"></span>
              <span className="absolute inset-0 bg-white/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            </a>
          ))}
        </div>

        <div className="flex gap-3 md:gap-4 items-center absolute right-6">
          <button className="hidden md:block text-base font-medium text-gray-200 hover:text-white transition-colors relative group py-2 cursor-pointer">
            <span>Soy Cliente</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6F70DE] to-[#85EDAF] transition-all duration-300 group-hover:w-full"></span>
            <span className="absolute inset-0 bg-white/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
          </button>

          <div className="relative group hidden sm:block">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6F70DE] to-[#85EDAF] rounded-full blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
            <button className="relative bg-black/80 hover:bg-black/90 px-5 md:px-6 py-2 md:py-2.5 rounded-full text-base font-bold transition-all duration-300 border border-white/10 backdrop-blur-md text-white active:scale-95 cursor-pointer">
              Contratar
            </button>
          </div>

          <button 
            className="md:hidden text-white p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#080510]/95 backdrop-blur-3xl transition-all duration-300 md:hidden flex flex-col items-center justify-center gap-8 z-40 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6 text-2xl font-medium text-center">
          {navLinks.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
          <a 
            href="#cliente"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Soy Cliente
          </a>
        </div>
        <button 
          className="mt-4 bg-gradient-to-r from-[#6F70DE] to-[#85EDAF] text-black px-8 py-3 rounded-full text-lg font-bold shadow-lg shadow-[#6F70DE]/20 active:scale-95 transition-transform cursor-pointer"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Contratar Ahora
        </button>
      </div>
    </>
  );
};

export default Navbar;
