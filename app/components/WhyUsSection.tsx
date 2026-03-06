"use client";

import React from 'react';
import { Zap, ArrowLeftRight, Headset, Wrench, Hammer } from 'lucide-react';
import Reveal from '@/app/components/Reveal';

const WhyUsSection = () => {
  return (
    <section className="py-32 relative">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-[#6F70DE] rounded-full mix-blend-screen filter blur-[180px] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#85EDAF] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.04] pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 brand-font text-white tracking-tight">
              ¿Qué nos diferencia? <br/>
              <span className="text-[#78D4EF]">Descúbrelo</span>
            </h2>
          </div>
        </Reveal>

        {/* ASYMMETRIC GRID: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[280px]">

          {/* CARD 1: FIBAIR (Massive - 2x2) */}
          <Reveal className="md:col-span-2 md:row-span-2" delay={100}>
            <div className="h-full bg-[#0d0915] rounded-[2.5rem] border border-white/5 p-6 md:p-10 min-h-[320px] md:min-h-0 relative overflow-hidden group hover:border-[#6F70DE]/40 transition-all duration-500 flex flex-col justify-between shadow-2xl">
              {/* Subtle Radial Gradient BG */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#6F70DE]/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

              {/* Large Decorative Icon Background */}
              <Zap size={300} className="absolute -bottom-20 -right-20 text-[#6F70DE]/5 group-hover:scale-110 group-hover:text-[#6F70DE]/10 transition-all duration-700 rotate-12" />

              <div className="relative z-10">
                <div className="w-20 h-20 rounded-3xl bg-white/5 backdrop-blur-md flex items-center justify-center text-[#6F70DE] mb-8 shadow-lg border border-white/10 group-hover:bg-[#6F70DE]/20 group-hover:border-[#6F70DE]/30 transition-all">
                  <Zap size={40} />
                </div>
                <h3 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tighter">Fibair</h3>
                <p className="text-gray-300 text-xl leading-relaxed max-w-md font-light">
                  Nuestra joya de la corona. Infraestructura propia de fibra óptica híbrida (aérea y terrestre).
                </p>
              </div>
            </div>
          </Reveal>

          {/* CARD 2: VELOCIDAD SIMÉTRICA (1x1 - Top Right) */}
          <Reveal className="md:col-span-1 md:row-span-1" delay={200}>
            <div className="h-full bg-[#0d0915] rounded-[2.5rem] border border-white/5 p-6 md:p-10 min-h-[250px] md:min-h-0 relative overflow-hidden group hover:border-[#85EDAF]/40 transition-all duration-500 flex flex-col justify-between shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-bl from-[#85EDAF]/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="w-16 h-16 rounded-3xl bg-white/5 backdrop-blur-md flex items-center justify-center text-[#85EDAF] mb-8 border border-white/10 group-hover:bg-[#85EDAF]/20 group-hover:border-[#85EDAF]/30 transition-all shadow-lg">
                  <ArrowLeftRight size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Simetría Total</h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                    Misma velocidad de subida y bajada. Tus backups vuelan.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* CARD 3: ATENCIÓN PERSONALIZADA (1x1 - Middle Right) */}
          <Reveal className="md:col-span-1 md:row-span-1" delay={300}>
            <div className="h-full bg-[#0d0915] rounded-[2.5rem] border border-white/5 p-6 md:p-10 min-h-[250px] md:min-h-0 relative overflow-hidden group hover:border-[#78D4EF]/40 transition-all duration-500 flex flex-col justify-between shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#78D4EF]/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="w-16 h-16 rounded-3xl bg-white/5 backdrop-blur-md flex items-center justify-center text-[#78D4EF] mb-8 border border-white/10 group-hover:bg-[#78D4EF]/20 group-hover:border-[#78D4EF]/30 transition-all shadow-lg">
                  <Headset size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">100% Humano</h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                    Call center en Murcia. Sin robots ni menús infinitos.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* CARD 4: SERVICIO TÉCNICO (1x1 - Bottom Left) */}
          <Reveal className="md:col-span-1 md:row-span-1" delay={400}>
            <div className="h-full bg-[#0d0915] rounded-[2.5rem] border border-white/5 p-6 md:p-10 min-h-[250px] md:min-h-0 relative overflow-hidden group hover:border-white/30 transition-all duration-500 flex flex-col justify-between shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="w-16 h-16 rounded-3xl bg-white/5 backdrop-blur-md flex items-center justify-center text-white mb-8 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all shadow-lg">
                  <Wrench size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Técnicos Propios</h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                    Resolución prioritaria. No externalizamos tu tranquilidad.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* CARD 5: INSTALACIÓN INCLUIDA (Wide - Bottom Right - 2x1) */}
          <Reveal className="md:col-span-2 md:row-span-1" delay={500}>
            <div className="h-full bg-[#0d0915] rounded-[2.5rem] border border-white/5 p-6 md:p-10 relative overflow-hidden group hover:border-[#85EDAF]/30 transition-all duration-500 flex flex-col justify-center shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-[#85EDAF]/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 w-full h-full">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 w-full text-center md:text-left">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-[#85EDAF] flex items-center justify-center text-[#080510] shrink-0 shadow-lg shadow-[#85EDAF]/20 group-hover:scale-105 transition-transform duration-500 mx-auto md:mx-0">
                    <Hammer size={40} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-3 flex-wrap">
                      <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">Instalación</h3>
                      <span className="bg-[#85EDAF]/20 text-[#85EDAF] text-sm font-black px-4 py-1.5 rounded-lg uppercase tracking-wider border border-[#85EDAF]/30 shadow-sm">Gratis</span>
                    </div>
                    <p className="text-gray-300 text-base md:text-lg max-w-xl leading-relaxed font-light mx-auto md:mx-0">
                      Incluye cableado estructurado, configuración experta del router y puesta en marcha completa de tu red.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
