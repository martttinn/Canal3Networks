"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { MessageCircle } from 'lucide-react';
import Reveal from '@/app/components/Reveal';
const HorizontalFlowStreaks = dynamic(() => import('@/app/components/HorizontalFlowStreaks'), { ssr: false });

const CtaSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden h-[600px] md:h-[600px] flex items-center">
      <div className="absolute inset-0 z-0">
        <HorizontalFlowStreaks />
        {/* Top edge fade masking */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#080510] via-[#080510]/80 to-transparent pointer-events-none"></div>
        {/* Bottom edge fade masking */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#080510] via-[#080510]/80 to-transparent pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 brand-font text-white drop-shadow-xl">
            ¿A que esperas?
          </h2>
          <p className="text-gray-300 mb-8 sm:mb-10 max-w-xl mx-auto text-base sm:text-lg drop-shadow-md font-medium">
            Sin contestadores automáticos. Escríbenos por WhatsApp y un técnico te recomendará la mejor tarifa para tu casa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black font-bold py-4 px-8 rounded-xl hover:bg-gray-200 transition-colors shadow-lg cursor-pointer">
              Ver todas las ofertas
            </button>
            <button className="bg-[#25D366] text-white font-bold py-4 px-8 rounded-xl hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 cursor-pointer">
              <MessageCircle size={20} /> Chat por WhatsApp
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CtaSection;
