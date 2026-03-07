"use client";

import React from 'react';
import { Wifi, Wrench, Smartphone, Rocket, ChevronRight } from 'lucide-react';
import Reveal from '@/app/components/Reveal';

const steps = [
  {
    icon: Wifi,
    title: "Selecciona tu Tarifa",
    description: "Contrata online o por teléfono. Elige la velocidad y el móvil que mejor se adapten a tu estilo.",
    color: "text-[#6F70DE]",
    iconHoverBg: "group-hover:bg-[#6F70DE]/20",
    iconHoverBorder: "group-hover:border-[#6F70DE]/30",
    glowColor: "from-[#6F70DE]/5",
    hoverBorder: "hover:border-[#6F70DE]/40",
  },
  {
    icon: Wrench,
    title: "Cita de Instalación",
    description: "Un técnico especializado te contactará rápidamente para agendar el día y la hora. ¡Tú mandas!",
    color: "text-[#F59E0B]", 
    iconHoverBg: "group-hover:bg-[#F59E0B]/20",
    iconHoverBorder: "group-hover:border-[#F59E0B]/30",
    glowColor: "from-[#F59E0B]/5",
    hoverBorder: "hover:border-[#F59E0B]/40",
  },
  {
    icon: Smartphone,
    title: "Traemos tu número",
    description: "Portabilidad 100% transparente. Te enviamos la nueva SIM sin dejarte desconectado ni un segundo.",
    color: "text-[#85EDAF]", 
    iconHoverBg: "group-hover:bg-[#85EDAF]/20",
    iconHoverBorder: "group-hover:border-[#85EDAF]/30",
    glowColor: "from-[#85EDAF]/5",
    hoverBorder: "hover:border-[#85EDAF]/40",
  },
  {
    icon: Rocket,
    title: "Comienza a Volar",
    description: "Disfruta de la máxima velocidad, estabilidad real y atención al cliente cercana, sin robots.",
    color: "text-[#78D4EF]",
    iconHoverBg: "group-hover:bg-[#78D4EF]/20",
    iconHoverBorder: "group-hover:border-[#78D4EF]/30",
    glowColor: "from-[#78D4EF]/5",
    hoverBorder: "hover:border-[#78D4EF]/40",
  }
];

const OnboardingSection = () => {
  return (
    <section className="py-24 md:py-32 relative">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#6F70DE] rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#78D4EF] rounded-full mix-blend-screen filter blur-[150px] opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 brand-font text-white tracking-tight">
              Pásate a Canal3 <br className="hidden sm:block" />
              <span className="text-[#6F70DE]">en 4 sencillos pasos</span>
            </h2>
          </div>
        </Reveal>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal key={index} delay={index * 150} className="relative z-10 w-full h-full">
                  <div className={`h-full bg-[#0d0915] rounded-[2.5rem] border border-white/5 p-8 relative overflow-hidden group ${step.hoverBorder} transition-all duration-500 flex flex-col justify-between shadow-lg hover:shadow-2xl`}>
                    
                    {/* Subtle Radial Gradient BG */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.glowColor} via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>

                    {/* Top layout: Badge & Core Icon */}
                    <div className="relative z-10 flex flex-col mb-10">
                        <div className="flex items-center justify-between w-full mb-8">
                           <div className="inline-flex items-center justify-center px-4 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest transition-colors group-hover:bg-white/10 group-hover:border-white/20 group-hover:text-white">
                              Paso 0{index + 1}
                           </div>
                        </div>

                        {/* Icon Container matching WhyUs styles */}
                        <div className={`w-16 h-16 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg transition-all duration-500 ${step.iconHoverBg} ${step.iconHoverBorder} ${step.color}`}>
                           <Icon size={32} strokeWidth={1.5} />
                        </div>
                    </div>
                    
                    {/* Text Content */}
                    <div className="relative z-10 mt-auto">
                      <h3 className={`text-2xl font-bold text-white mb-3 tracking-tight`}>
                        {step.title}
                      </h3>
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>

                  </div>
                </Reveal>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
};

export default OnboardingSection;
