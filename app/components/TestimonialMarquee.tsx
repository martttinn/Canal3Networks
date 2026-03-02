"use client";

import React from 'react';
import { Star } from 'lucide-react';
import Reveal from '@/app/components/Reveal';
import { reviews } from '@/app/data/reviews';

const TestimonialMarquee = () => {
  return (
    <section className="py-24 bg-[#080510] border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 mb-12 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 brand-font text-white">
            Clientes <span className="text-[#85EDAF]">Felices</span>
          </h2>
          <p className="text-gray-400">La satisfacción de nuestros usuarios es nuestra mejor publicidad.</p>
        </Reveal>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient Masks */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-[#080510] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#080510] to-transparent z-20 pointer-events-none"></div>

        <div className="flex animate-scroll hover:pause-animation w-max gap-6 px-6">
          {[...reviews, ...reviews, ...reviews].map((review, i) => (
            <div
              key={i}
              className="w-[380px] bg-[#121217] p-8 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-[#85EDAF]/40 transition-all duration-300 group shadow-lg"
            >
              <div>
                <div className="flex text-[#85EDAF] mb-4">
                  {[...Array(review.stars)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                  &quot;{review.text}&quot;
                </p>
              </div>
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6F70DE] to-[#78D4EF] flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{review.name}</h4>
                  <span className="text-[#78D4EF] text-xs font-medium uppercase tracking-wide">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialMarquee;
