"use client";

import React, { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import Reveal from '@/app/components/Reveal';
import { reviews } from '@/app/data/reviews';

const TestimonialMarquee = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      const diff = targetProgress.current - currentProgress.current;
      if (Math.abs(diff) > 0.1) {
        currentProgress.current += diff * 0.05;
        if (indicatorRef.current) {
          const visibleWidth = Math.max(10, currentProgress.current);
          indicatorRef.current.style.width = `${visibleWidth}%`;
          indicatorRef.current.style.backgroundPosition = `${currentProgress.current}% 0`;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const scrollableDistance = scrollWidth - clientWidth;

      if (scrollableDistance > 0) {
        targetProgress.current = (scrollLeft / scrollableDistance) * 100;
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#080510] border-t border-white/5 relative overflow-hidden">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div className="container mx-auto px-6 relative z-10 mb-16 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 brand-font text-white tracking-tight">
            Clientes <span className="text-[#85EDAF]">Felices</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">La satisfacción de nuestros usuarios es nuestra mejor publicidad.</p>
        </Reveal>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient Masks (hide on mobile for full swipe edge) */}
        <div className="absolute top-0 left-0 h-full w-12 md:w-24 bg-gradient-to-r from-[#080510] to-transparent z-20 pointer-events-none hidden md:block"></div>
        <div className="absolute top-0 right-0 h-full w-12 md:w-24 bg-gradient-to-l from-[#080510] to-transparent z-20 pointer-events-none hidden md:block"></div>

        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex md:animate-scroll hover:pause-animation w-full md:w-max gap-4 md:gap-6 px-4 md:px-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        >
          {[...reviews, ...reviews, ...reviews].map((review, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-[300px] md:w-[380px] bg-[#121217] p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-[#85EDAF]/40 transition-all duration-300 group shadow-lg"
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

      {/* Scroll Indicator (Mobile Only) */}
      <div className="container mx-auto px-6 mt-8 flex justify-center md:hidden">
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            ref={indicatorRef}
            className="h-full bg-gradient-to-r from-[#6F70DE] via-[#85EDAF] to-[#78D4EF] rounded-full"
            style={{
              width: '10%',
              backgroundSize: '200% 100%',
              backgroundPosition: '0% 0',
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialMarquee;
