"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Reveal from '@/app/components/Reveal';
import { devices } from '@/app/data/devices';

const FeaturedProductsCarousel = () => {
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
    <section className="py-24 bg-[#080510] relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 mb-8 md:mb-12">
        <Reveal>
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 brand-font text-white tracking-tight mx-auto md:mx-0">
              Productos destacados
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto md:mx-0">
              Compra y recoge tus productos en nuestra tienda fisica!
            </p>
          </div>
        </Reveal>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto overflow-y-hidden py-8 px-6 gap-6 snap-x snap-mandatory hide-scrollbar"
      >
        {devices.map((product, i) => (
          <div key={product.id} className="snap-center shrink-0">
            <Reveal delay={i * 100}>
              <div
                className={`relative w-[320px] h-[500px] bg-[#121217] rounded-[2rem] overflow-hidden border border-white/5 flex flex-col transition-all duration-300 group ${product.border} hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-2`}
                style={{
                  '--accent': product.accentColor,
                } as React.CSSProperties}
              >
                {/* Hover Glow Effect */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none z-0" style={{ backgroundColor: product.accentColor }}></div>

                {/* Image Section - Full Bleed */}
                <div className="relative h-[55%] w-full overflow-hidden z-10">
                  <div className="absolute top-4 left-4 z-20">
                    <span className="text-[10px] font-black px-3 py-1 rounded-md bg-white text-black uppercase tracking-widest shadow-md">
                      {product.tag}
                    </span>
                  </div>

                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Gradient overlay for text readability with mask fix */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent opacity-100"></div>
                </div>

                {/* Content */}
                <div className="relative h-[45%] p-6 flex flex-col justify-between bg-[#121217] z-10">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-white leading-tight">{product.name}</h3>
                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mt-1">{product.subtitle}</p>
                      </div>
                    </div>

                    {/* Specs as Pills */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {product.features.map((feat, idx) => (
                        <span key={idx} className="text-[10px] font-medium text-gray-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <p className="text-[10px] text-gray-500 mb-0.5 font-bold uppercase tracking-wider">Precio exclusivo</p>
                      <div className="text-2xl font-bold text-white tracking-tight" style={{ color: product.accentColor }}>{product.price}</div>
                    </div>
                    <button
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        ))}
        {/* Padding right for scroll */}
        <div className="w-6 shrink-0"></div>
      </div>

      {/* Scroll Indicator */}
      <div className="container mx-auto px-6 mt-4 flex justify-center">
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

      {/* Catalog Button */}
      <div className="mt-12 flex justify-center">
        <button className="px-8 py-4 rounded-xl border border-white/10 hover:border-[#6F70DE]/50 hover:bg-[#6F70DE]/10 transition-all duration-300 text-white font-medium flex items-center gap-3 group">
          Ver catálogo completo
          <ArrowRight size={18} className="text-[#6F70DE] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default FeaturedProductsCarousel;
