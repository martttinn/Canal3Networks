"use client";

import React from 'react';
import Reveal from '@/app/components/Reveal';
import CountUp from '@/app/components/CountUp';
import { Users, MapPin, Gamepad2 } from 'lucide-react';

const stats = [
  {
    icon: Users,
    end: 2000,
    prefix: "+",
    decimals: 0,
    label: "Clientes Satisfechos",
    desc: "Las familias que confían en nuestra red a diario",
    color: "text-[#6F70DE]",
    gradientClass: "from-[#6F70DE] to-white",
    glowColor: "from-[#6F70DE]/10",
    hoverBorder: "hover:border-[#6F70DE]/40",
  },
  {
    icon: MapPin,
    end: 50,
    prefix: "+",
    decimals: 0,
    label: "Municipios Conectados",
    desc: "Infraestructura propia desplegada y operando",
    color: "text-[#85EDAF]",
    gradientClass: "from-[#85EDAF] to-white",
    glowColor: "from-[#85EDAF]/10",
    hoverBorder: "hover:border-[#85EDAF]/40",
  },
  {
    icon: Gamepad2,
    end: 15,
    prefix: "<",
    suffix: "ms",
    decimals: 0,
    label: "Latencia Media",
    desc: "Enrutamiento optimizado para gamers y streamers",
    color: "text-[#78D4EF]",
    gradientClass: "from-[#78D4EF] to-white",
    glowColor: "from-[#78D4EF]/10",
    hoverBorder: "hover:border-[#78D4EF]/40",
  },
];

const StatsSection = () => {
  return (
    <section className="py-16 md:py-24 relative">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#F59E0B] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#78D4EF] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.05] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {stats.map((stat, index) => {
             const Icon = stat.icon;
             return (
              <Reveal key={index} delay={index * 150} className="w-full h-full">
                <div className={`h-full bg-[#0d0915] rounded-[2.5rem] border border-white/5 p-8 relative overflow-hidden group ${stat.hoverBorder} transition-all duration-500 shadow-lg hover:shadow-2xl flex flex-col justify-between`}>
                  
                  {/* Subtle Radial Gradient BG */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.glowColor} via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg transition-transform duration-500`}>
                         <Icon size={28} className={`${stat.color}`} strokeWidth={1.5} />
                      </div>
                    </div>
                    
                    <div className={`text-5xl lg:text-6xl font-black mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b ${stat.gradientClass} brand-font drop-shadow-sm`}>
                      <CountUp
                        end={stat.end}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-gray-100 transition-colors">
                      {stat.label}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                      {stat.desc}
                    </p>
                  </div>

                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
