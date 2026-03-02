"use client";

import React from 'react';
import { navLinks } from '@/app/data/navigation';

interface NavbarProps {
  showNav: boolean;
}

const Navbar = ({ showNav }: NavbarProps) => {
  return (
    <nav className={`fixed w-full z-50 px-6 py-6 transition-all duration-300 bg-gradient-to-b from-black/90 via-black/40 to-transparent ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tighter leading-none flex items-center gap-2 brand-font text-white drop-shadow-md cursor-pointer hover:opacity-90 transition-opacity">
            CANAL3<span className="text-[#6F70DE]">.NET</span>
          </h1>
        </div>

        <div className="hidden md:flex gap-10 text-sm font-medium text-gray-200">
          {navLinks.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="relative group py-2">
              <span className="group-hover:text-white transition-colors duration-300">{item}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6F70DE] to-[#85EDAF] transition-all duration-300 group-hover:w-full"></span>
              <span className="absolute inset-0 bg-white/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            </a>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          <button className="hidden md:block text-sm font-medium text-gray-200 hover:text-white transition-colors relative group py-2">
            <span>Soy Cliente</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6F70DE] to-[#85EDAF] transition-all duration-300 group-hover:w-full"></span>
            <span className="absolute inset-0 bg-white/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
          </button>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6F70DE] to-[#85EDAF] rounded-full blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
            <button className="relative bg-black/80 hover:bg-black/90 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border border-white/10 backdrop-blur-md text-white active:scale-95">
              Contratar
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
