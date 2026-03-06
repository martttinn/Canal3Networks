"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { navLinks, servicesDropdown, productsDropdown } from '@/app/data/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  showNav: boolean;
}

const Navbar = ({ showNav }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

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
            item === "Servicios" ? (
              <div key={item} className="relative group py-2">
                <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="group-hover/main:text-white transition-colors duration-300 flex items-center gap-1">
                  <span>{item}</span>
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                </a>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6F70DE] to-[#85EDAF] transition-all duration-300 group-hover:w-full"></span>
                <span className="absolute inset-0 bg-white/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                
                {/* Mega Menu Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out translate-y-4 group-hover:translate-y-0">
                  <div className="bg-[#0d0915]/95 backdrop-blur-xl rounded-[1.5rem] border border-white/5 p-6 shadow-2xl shadow-black/50 w-[750px] grid grid-cols-3 gap-6">
                    {servicesDropdown.map((section, idx) => (
                      <div key={idx} className="flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-8 h-8 rounded-[0.7rem] ${section.bg} flex items-center justify-center ${section.color} border border-white/5 shadow-sm`}>
                            <section.icon size={16} className="shrink-0" />
                          </div>
                          <h4 className="text-white/80 font-bold text-sm uppercase tracking-wider leading-tight">{section.category}</h4>
                        </div>
                        <ul className="flex flex-col gap-0.5 ml-10">
                          {section.links.map((link, linkIdx) => (
                            <li key={linkIdx}>
                              <a 
                                href={link.href}
                                className="text-gray-400 hover:text-white hover:bg-white/5 px-2 py-1.5 rounded-lg transition-colors flex items-center gap-2 text-[13px] font-medium group/link"
                              >
                                <span className="w-1 h-1 rounded-full bg-white/20 group-hover/link:bg-white/60 transition-colors"></span>
                                {link.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : item === "Productos" ? (
              <div key={item} className="relative group py-2">
                <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="group-hover/main:text-white transition-colors duration-300 flex items-center gap-1">
                  <span>{item}</span>
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                </a>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6F70DE] to-[#85EDAF] transition-all duration-300 group-hover:w-full"></span>
                <span className="absolute inset-0 bg-white/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                
                {/* Mega Menu Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out translate-y-4 group-hover:translate-y-0">
                  <div className="bg-[#0d0915]/95 backdrop-blur-xl rounded-[1.5rem] border border-white/5 p-6 shadow-2xl shadow-black/50 w-[750px] grid grid-cols-3 gap-6">
                    {productsDropdown.map((section, idx) => (
                      <div key={idx} className="flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-8 h-8 rounded-[0.7rem] ${section.bg} flex items-center justify-center ${section.color} border border-white/5 shadow-sm`}>
                            <section.icon size={16} className="shrink-0" />
                          </div>
                          <h4 className="text-white/80 font-bold text-sm uppercase tracking-wider leading-tight">{section.category}</h4>
                        </div>
                        <ul className="flex flex-col gap-0.5 ml-10">
                          {section.links.map((link, linkIdx) => (
                            <li key={linkIdx}>
                              <a 
                                href={link.href}
                                className="text-gray-400 hover:text-white hover:bg-white/5 px-2 py-1.5 rounded-lg transition-colors flex items-center gap-2 text-[13px] font-medium group/link"
                              >
                                <span className="w-1 h-1 rounded-full bg-white/20 group-hover/link:bg-white/60 transition-colors"></span>
                                {link.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="relative group py-2">
                <span className="group-hover:text-white transition-colors duration-300">{item}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6F70DE] to-[#85EDAF] transition-all duration-300 group-hover:w-full"></span>
                <span className="absolute inset-0 bg-white/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
              </a>
            )
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
        className={`fixed inset-0 bg-[#080510]/95 backdrop-blur-3xl transition-all duration-300 md:hidden flex flex-col items-center justify-center z-40 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6 text-xl font-medium w-full max-w-xs px-4">
          {navLinks.map((item) => (
            item === "Servicios" ? (
              <div key={item} className="flex flex-col">
                <button 
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="text-gray-300 hover:text-white transition-colors flex items-center justify-between w-full py-2"
                >
                  <span>{item}</span>
                  <ChevronDown size={20} className={`transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180 text-[#6F70DE]' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out flex flex-col gap-6 pl-2 border-l-2 border-white/10 ml-2 ${mobileServicesOpen ? 'max-h-[800px] mt-4 mb-4' : 'max-h-0'}`}>
                  {servicesDropdown.map((section, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <section.icon size={20} className={section.color.replace('text-', 'text-').replace(/\[(.*?)\]/, '[$1]')} />
                        <h4 className="text-white font-bold text-base">{section.category}</h4>
                      </div>
                      <div className="flex flex-col gap-1 pl-8">
                        {section.links.map((link, linkIdx) => (
                          <a 
                            key={linkIdx}
                            href={link.href}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setMobileServicesOpen(false);
                            }}
                            className="text-gray-400 hover:text-white transition-colors py-2 text-sm flex items-center gap-2 group/mobilelink"
                          >
                            <span className="w-1 h-1 rounded-full bg-white/20 group-hover/mobilelink:bg-white/60 transition-colors"></span>
                            {link.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : item === "Productos" ? (
              <div key={item} className="flex flex-col">
                <button 
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                  className="text-gray-300 hover:text-white transition-colors flex items-center justify-between w-full py-2"
                >
                  <span>{item}</span>
                  <ChevronDown size={20} className={`transition-transform duration-300 ${mobileProductsOpen ? 'rotate-180 text-[#85EDAF]' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out flex flex-col gap-6 pl-2 border-l-2 border-white/10 ml-2 ${mobileProductsOpen ? 'max-h-[800px] mt-4 mb-4' : 'max-h-0'}`}>
                  {productsDropdown.map((section, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <section.icon size={20} className={section.color.replace('text-', 'text-').replace(/\[(.*?)\]/, '[$1]')} />
                        <h4 className="text-white font-bold text-base">{section.category}</h4>
                      </div>
                      <div className="flex flex-col gap-1 pl-8">
                        {section.links.map((link, linkIdx) => (
                          <a 
                            key={linkIdx}
                            href={link.href}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setMobileProductsOpen(false);
                            }}
                            className="text-gray-400 hover:text-white transition-colors py-2 text-sm flex items-center gap-2 group/mobilelink"
                          >
                            <span className="w-1 h-1 rounded-full bg-white/20 group-hover/mobilelink:bg-white/60 transition-colors"></span>
                            {link.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setMobileServicesOpen(false);
                }}
                className="text-gray-300 hover:text-white transition-colors py-2"
              >
                {item}
              </a>
            )
          ))}
          <a 
            href="#cliente"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setMobileServicesOpen(false);
            }}
            className="text-gray-300 hover:text-white transition-colors py-2 border-t border-white/10 mt-2"
          >
            Soy Cliente
          </a>
        </div>
        <button 
          className="mt-8 bg-gradient-to-r from-[#6F70DE] to-[#85EDAF] text-black w-full max-w-xs px-8 py-3.5 rounded-full text-lg font-bold shadow-lg shadow-[#6F70DE]/20 active:scale-95 transition-transform cursor-pointer"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setMobileServicesOpen(false);
          }}
        >
          Contratar Ahora
        </button>
      </div>
    </>
  );
};

export default Navbar;
