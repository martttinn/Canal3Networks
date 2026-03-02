"use client";

import React from 'react';
import Reveal from '@/app/components/Reveal';
import CountUp from '@/app/components/CountUp';

const stats = [
  {
    end: 2000,
    prefix: "+",
    decimals: 0,
    label: "Clientes Satisfechos",
    desc: "Confían en nuestra red",
    colorClass: "text-[#6F70DE]",
    gradientClass: "from-[#6F70DE] to-white",
  },
  {
    end: 50,
    prefix: "+",
    decimals: 0,
    label: "Municipios Conectados",
    desc: "Infraestructura propia",
    colorClass: "text-[#85EDAF]",
    gradientClass: "from-[#85EDAF] to-white",
  },
  {
    end: 15,
    prefix: "<",
    suffix: "ms",
    decimals: 0,
    label: "Latencia Media",
    desc: "Optimizado para gaming",
    colorClass: "text-[#78D4EF]",
    gradientClass: "from-[#78D4EF] to-white",
  },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-[#080510] relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute left-1/3 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
          <div className="hidden md:block absolute left-2/3 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
          {stats.map((stat, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="flex flex-col items-center text-center group">
                <div className={`text-6xl md:text-7xl font-bold mb-2 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b ${stat.gradientClass} brand-font`}>
                  <CountUp
                    end={stat.end}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>
                <span className="text-white font-bold uppercase tracking-widest text-sm mb-2 opacity-90">
                  {stat.label}
                </span>
                <span className="text-gray-500 text-sm">
                  {stat.desc}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
