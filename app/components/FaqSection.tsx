"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Reveal from '@/app/components/Reveal';
import { faqData } from '@/app/data/faq';

const FaqItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border border-white/10 rounded-2xl bg-[#121217] overflow-hidden transition-colors hover:border-white/20">
      <button
        type="button"
        className="flex items-center justify-between w-full p-6 text-left cursor-pointer"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-white pr-8">{question}</h3>
        <span className={`flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#6F70DE]/20 border-[#6F70DE]/40' : ''}`}>
          <ChevronDown size={16} className={isOpen ? 'text-[#6F70DE]' : 'text-gray-400'} />
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="p-6 pt-0 text-gray-400 leading-relaxed">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-[#080510] relative border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#6F70DE]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 brand-font text-white tracking-tight">
              Preguntas <span className="text-[#78D4EF]">Frecuentes</span>
            </h2>
          </div>
        </Reveal>

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqData.map((faq, index) => (
            <Reveal key={index} delay={100 + index * 100}>
              <FaqItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => toggleItem(index)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
