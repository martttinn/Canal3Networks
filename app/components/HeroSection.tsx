"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Router } from 'lucide-react';
import Reveal from '@/app/components/Reveal';
import HeroBackground from '@/app/components/HeroBackground';
import { heroOffers } from '@/app/data/hero-offers';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % heroOffers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden"
      style={{ '--x': `${mousePosition.x}px`, '--y': `${mousePosition.y}px` } as React.CSSProperties}
    >
      <div className="absolute inset-0 z-0 bg-[#080510]">
        <HeroBackground />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30 mix-blend-screen pointer-events-none"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-green-and-blue-liquid-flow-12053-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#080510] to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#080510] to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[#080510]/10 z-10"></div>
        <div className="absolute inset-0 grid-bg opacity-20 z-10 pointer-events-none mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

        <div className="lg:col-span-6 flex flex-col gap-6">
          <Reveal delay={200}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none brand-font text-white drop-shadow-xl">
              Velocidad y conectividad <br/>
              <span className="animate-text-gradient">al mejor precio.</span>
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="text-lg md:text-xl text-gray-200 max-w-lg leading-relaxed drop-shadow-md">
              Disfruta ya de la <strong className="text-white font-bold">máxima velocidad y cobertura</strong> al mejor precio. Con <strong className="text-white font-bold">asistencia técnica y atención al cliente</strong> personalizadas.
            </p>
          </Reveal>

          <Reveal delay={600}>
            <div className="max-w-md">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6F70DE] to-[#85EDAF] rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative flex items-center bg-[#0d0915]/90 backdrop-blur-md rounded-xl p-1.5 border border-white/10">
                  <div className="pl-4 pr-2 text-gray-400">
                    <Router size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Tu Código Postal"
                    className="bg-transparent w-full p-2 outline-none text-white placeholder-gray-400 text-lg font-medium"
                  />
                  <button className="bg-white text-black hover:bg-[#85EDAF] hover:text-black transition-all px-6 py-3 rounded-lg font-bold text-sm tracking-wide flex items-center gap-2 whitespace-nowrap shadow-lg">
                    Ver Cobertura
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 relative min-h-[500px] flex items-center justify-center">
          <div className="relative w-full max-w-lg transform transition-all duration-500">
            <div className="relative w-full bg-[#0d0915]/30 backdrop-blur-md rounded-[2.5rem] border border-white/20 p-10 flex flex-col items-center text-center shadow-2xl overflow-hidden min-h-[480px] justify-between z-10">
              <div className={`relative px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 border ${heroOffers[currentOfferIndex].color} border-current bg-white/5 backdrop-blur-sm`}>
                Oferta Destacada
              </div>

              <div key={currentOfferIndex} className="animate-fade-in flex flex-col items-center w-full flex-1 justify-center">
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
              </div>

              <div className="w-full mt-6 relative z-20">
                <button className={`w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-wide transition-all shadow-lg text-white ${heroOffers[currentOfferIndex].accent} hover:opacity-90 active:scale-95 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]`}>
                  Ver Detalles
                </button>

                <div className="flex justify-center gap-2 mt-6">
                  {heroOffers.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentOfferIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
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
    </section>
  );
};

export default HeroSection;
