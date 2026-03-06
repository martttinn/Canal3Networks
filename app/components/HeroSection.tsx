"use client";

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Router, ChevronDown } from 'lucide-react';
import Reveal from '@/app/components/Reveal';
import { heroOffers } from '@/app/data/hero-offers';

const HeroBackground = dynamic(() => import('@/app/components/HeroBackground'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#080510]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(111,112,222,0.08)_0%,_transparent_70%)]" />
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-[#6F70DE]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-[#78D4EF]/5 blur-[100px] rounded-full" />
    </div>
  ),
});

const HeroSection = () => {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % heroOffers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let rafId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (heroRef.current) {
          const rect = heroRef.current.getBoundingClientRect();
          heroRef.current.style.setProperty('--x', `${e.clientX - rect.left}px`);
          heroRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`);
        }
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => { window.removeEventListener('mousemove', handleMouseMove); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-[100svh] lg:h-auto lg:min-h-[100svh] flex flex-col justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-[#080510]">
        <HeroBackground />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#080510] to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#080510] to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[#080510]/10 z-10"></div>
        <div className="absolute inset-0 grid-bg opacity-20 z-10 pointer-events-none mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center h-full lg:h-auto pt-20 lg:pt-0">

        <div className="lg:col-span-6 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start justify-center h-full lg:h-auto">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-none brand-font text-white drop-shadow-xl">
            Velocidad y conectividad <br className="hidden sm:block" />
            <span className="animate-text-gradient">al mejor precio</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-lg leading-relaxed drop-shadow-md">
            Disfruta ya de la <strong className="text-white font-bold">máxima velocidad y cobertura</strong> al mejor precio. Con <strong className="text-white font-bold">asistencia técnica y atención al cliente</strong> personalizadas.
          </p>

          <Reveal delay={600} className="w-full flex justify-center lg:justify-start">
            <div className="w-[90vw] sm:w-[90%] max-w-md mt-8 lg:mt-0">
              <div className="relative group w-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6F70DE] to-[#85EDAF] rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative flex flex-col sm:flex-row items-center bg-[#0d0915]/90 backdrop-blur-md rounded-xl p-1.5 border border-white/10 gap-2 sm:gap-0">
                  <div className="hidden sm:block pl-4 pr-2 text-gray-400">
                    <Router size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Tu Código Postal"
                    className="bg-transparent w-full p-3 sm:p-2 outline-none text-white placeholder-gray-400 text-lg font-medium text-center sm:text-left"
                  />
                  <button className="w-full sm:w-auto bg-white text-black hover:bg-[#85EDAF] hover:text-black transition-all px-6 py-3 rounded-lg font-bold text-sm tracking-wide flex justify-center items-center gap-2 whitespace-nowrap shadow-lg cursor-pointer">
                    Ver Cobertura
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="hidden lg:flex lg:col-span-6 relative min-h-[400px] lg:min-h-[500px] items-center justify-center pb-10 lg:pb-0">
          <div className="relative w-full max-w-lg transform transition-all duration-500 px-4 sm:px-0">
            <div className="relative w-full bg-[#0d0915]/30 backdrop-blur-md rounded-[2rem] sm:rounded-[2.5rem] border border-white/20 p-6 sm:p-10 flex flex-col items-center text-center shadow-2xl overflow-hidden min-h-[420px] sm:min-h-[480px] justify-between z-10">
              <div className={`relative px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 border ${heroOffers[currentOfferIndex].color} border-current bg-white/5 backdrop-blur-sm`}>
                Oferta Destacada
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentOfferIndex}
                  initial={{ opacity: 0, y: 15, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center w-full flex-1 justify-center"
                >
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 rounded-full ${heroOffers[currentOfferIndex].accent} opacity-30 blur-xl`}></div>
                    <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center ${heroOffers[currentOfferIndex].color} bg-white/5 border border-white/10 backdrop-blur-md`}>
                      {heroOffers[currentOfferIndex].icon}
                    </div>
                  </div>

                  <h3 className={`text-lg font-medium ${heroOffers[currentOfferIndex].color} mb-1`}>
                    {heroOffers[currentOfferIndex].title}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1 mb-4 text-white">
                    <span className="text-6xl font-bold tracking-tighter brand-font">{heroOffers[currentOfferIndex].subtitle}</span>
                    <span className="text-lg text-gray-400 font-medium">{heroOffers[currentOfferIndex].period}</span>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed max-w-[240px] mx-auto">
                    {heroOffers[currentOfferIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="w-full mt-6 relative z-20">
                <button className={`w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-wide transition-all shadow-lg text-white cursor-pointer ${heroOffers[currentOfferIndex].accent} hover:opacity-90 active:scale-95 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]`}>
                  Ver Detalles
                </button>

                <div className="flex justify-center gap-2 mt-6">
                  {heroOffers.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentOfferIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        currentOfferIndex === idx
                        ? `w-8 ${heroOffers[currentOfferIndex].accent}`
                        : 'w-2 bg-white/10 hover:bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 lg:hidden flex flex-col items-center animate-bounce cursor-pointer group" onClick={() => window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })}>
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2 group-hover:text-white transition-colors">Descubre más</span>
        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:bg-white/10 transition-all shadow-[0_0_15px_rgba(111,112,222,0.3)]">
          <ChevronDown className="text-white w-5 h-5 opacity-80 group-hover:opacity-100" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
