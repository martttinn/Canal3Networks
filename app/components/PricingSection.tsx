"use client";

import React, { useState } from 'react';
import { Check, ArrowRight, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '@/app/components/Reveal';
import { fiberPlans, bundlePlans, mobileOnlyPlans } from '@/app/data/plans';

const tabs = [
  { id: 'fiber', label: 'Solo Fibra' },
  { id: 'mobile', label: 'Fibra + Móvil' },
  { id: 'mobile-only', label: 'Solo Móvil' }
];

const PricingSection = () => {
  const [activeTab, setActiveTab] = useState('mobile');

  const currentPlans = activeTab === 'fiber' ? fiberPlans : activeTab === 'mobile' ? bundlePlans : mobileOnlyPlans;

  const activeIndex = tabs.findIndex(t => t.id === activeTab);

  return (
    <section className="py-24 relative">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#6F70DE] rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#78D4EF] rounded-full mix-blend-screen filter blur-[150px] opacity-5 pointer-events-none"></div>
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 brand-font text-white tracking-tight">Tarifas <span className="text-[#85EDAF]">Simples</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Elige solo fibra, móvil o combinalos. Cambia de plan cuando quieras.
            </p>

            <div className="flex w-full max-w-lg mx-auto bg-[#0d0915] p-1.5 rounded-2xl md:rounded-3xl mt-8 border border-white/10 relative overflow-x-auto no-scrollbar shadow-lg">
              {/* Animated tab indicator */}
              <div
                className="absolute top-1.5 bottom-1.5 bg-[#6F70DE] rounded-xl shadow-[0_0_15px_rgba(111,112,222,0.4)] transition-all duration-300 ease-out"
                style={{
                  width: `calc((100% - 12px) / ${tabs.length})`,
                  left: `calc(6px + ((100% - 12px) / ${tabs.length}) * ${activeIndex})`,
                }}
              />
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-10 px-3 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors min-w-[100px] flex-1 text-center whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full"
            >
            {currentPlans.map((plan) => (
              <div
                key={`${activeTab}-${plan.id}`}
                className={`relative p-8 rounded-[2.5rem] transition-all duration-500 flex flex-col overflow-hidden group shadow-lg ${
                  plan.highlight 
                    ? 'bg-[#0d0915] border border-[#85EDAF]/30 transform md:-translate-y-4 hover:border-[#85EDAF]/60 hover:shadow-2xl hover:shadow-[#85EDAF]/10' 
                    : 'bg-[#0d0915] border border-white/5 hover:border-[#6F70DE]/40 hover:shadow-2xl hover:shadow-[#6F70DE]/5 hover:-translate-y-1'
                }`}
              >
                {/* Background Gradients */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${plan.highlight ? 'bg-gradient-to-br from-[#85EDAF]/10 via-transparent to-transparent opacity-100' : 'bg-gradient-to-br from-[#6F70DE]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100'}`}></div>

                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#85EDAF] text-black text-xs font-bold py-1.5 px-6 rounded-b-xl uppercase tracking-wide shadow-lg z-20">
                    Más Popular
                  </div>
                )}

                <div className="mb-6 relative z-10">
                  <h3 className={`font-bold mb-2 tracking-wide uppercase text-sm ${plan.highlight ? 'text-[#85EDAF]' : 'text-[#6F70DE]'}`}>{plan.name}</h3>
                  <div className="text-5xl font-bold text-white brand-font mb-3 tracking-tighter">{plan.speed}</div>
                  {(activeTab === 'mobile' || activeTab === 'mobile-only') && (
                    <div className="flex items-center gap-2 text-sm text-gray-300 font-medium bg-white/5 inline-flex px-3 py-1.5 rounded-lg border border-white/10">
                      <Smartphone size={16} className={plan.highlight ? 'text-[#85EDAF]' : 'text-[#6F70DE]'} /> Datos 5G
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-8 flex-1 relative z-10">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${plan.highlight ? 'bg-[#85EDAF]/10 border-[#85EDAF]/30' : 'bg-[#6F70DE]/10 border-[#6F70DE]/30 group-hover:bg-[#6F70DE]/20'}`}>
                        <Check size={12} className={plan.highlight ? 'text-[#85EDAF]' : 'text-[#6F70DE]'} />
                      </div>
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto border-t border-white/10 pt-6 relative z-10">
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-bold text-white tracking-tight">{plan.price}</span>
                    <span className="text-xl text-white font-medium mb-1">€</span>
                    <span className="text-gray-500 text-sm mb-1.5 ml-1">/mes</span>
                  </div>
                  <button className={`w-full py-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide cursor-pointer shadow-lg ${
                    plan.highlight 
                      ? 'bg-[#85EDAF] text-black hover:bg-[#6bd694] hover:shadow-[#85EDAF]/20' 
                      : 'bg-white/10 text-white hover:bg-white hover:text-black border border-white/10 hover:border-white'
                  }`}>
                    Lo quiero
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-16 flex justify-center">
          <button className="px-8 py-4 rounded-xl border border-white/10 hover:border-[#6F70DE]/50 hover:bg-[#6F70DE]/10 transition-all duration-300 text-white font-medium flex items-center gap-3 group cursor-pointer">
            Ver todas las tarifas y servicios
            <ArrowRight size={18} className="text-[#6F70DE] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
