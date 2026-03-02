"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';
import Reveal from '@/app/components/Reveal';
import HorizontalFlowStreaks from '@/app/components/HorizontalFlowStreaks';

const CtaSection = () => {
  return (
    <section className="py-24 relative overflow-hidden h-[600px] flex items-center">
      <div className="absolute inset-0 z-0">
        <HorizontalFlowStreaks />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080510] via-transparent to-[#080510] z-10 pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 brand-font text-white drop-shadow-xl">
            ¿Dudas? Hablemos.
          </h2>
          <p className="text-gray-300 mb-10 max-w-xl mx-auto text-lg drop-shadow-md">
            Sin contestadores automáticos. Escríbenos por WhatsApp y un agente te recomendará la mejor tarifa para tu casa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black font-bold py-4 px-8 rounded-xl hover:bg-gray-200 transition-colors shadow-lg">
              Ver todas las ofertas
            </button>
            <button className="bg-[#25D366] text-white font-bold py-4 px-8 rounded-xl hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-900/20">
              <MessageCircle size={20} /> Chat por WhatsApp
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CtaSection;
