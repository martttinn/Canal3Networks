"use client";

import React, { useState } from 'react';
import { Check, ArrowRight, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '@/app/components/Reveal';
import { fiberPlans, bundlePlans, mobileOnlyPlans } from '@/app/data/plans';

const PricingSection = () => {
  const [activeTab, setActiveTab] = useState('mobile');

  const currentPlans = activeTab === 'fiber' ? fiberPlans : activeTab === 'mobile' ? bundlePlans : mobileOnlyPlans;

  return (
    <section className="py-24 bg-[#080510] relative">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 brand-font">Tarifas Simples</h2>
            <p className="text-gray-400 text-lg">
              Elige solo fibra o combina con móvil. Cambia de plan cuando quieras.
            </p>

            <div className="flex w-full max-w-lg mx-auto bg-white/5 p-1.5 rounded-xl mt-8 border border-white/10 relative">
              {[
                { id: 'fiber', label: 'Solo Fibra' },
                { id: 'mobile', label: 'Fibra + Móvil' },
                { id: 'mobile-only', label: 'Solo Móvil' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-10 px-6 py-2 rounded-lg text-sm font-medium transition-colors w-1/3 text-center whitespace-nowrap ${
                    activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="active-tab-bg"
                      className="absolute inset-0 bg-[#6F70DE] rounded-lg shadow-md -z-10"
                      initial={false}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
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
              className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
            >
              {currentPlans.map((plan) => (
                <div
                  key={`${activeTab}-${plan.id}`}
                  className={`relative p-8 rounded-3xl transition-all duration-300 flex flex-col ${plan.highlight ? 'glass-card-highlight transform md:-translate-y-4' : 'glass-card hover:bg-white/5'}`}
                >
                  {plan.highlight && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#85EDAF] text-black text-xs font-bold py-1.5 px-4 rounded-full uppercase tracking-wide shadow-lg">
                      Más Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-[#6F70DE] font-medium mb-1">{plan.name}</h3>
                    <div className="text-4xl font-bold text-white brand-font mb-2">{plan.speed}</div>
                    {(activeTab === 'mobile' || activeTab === 'mobile-only') && (
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Smartphone size={16} className="text-[#85EDAF]" /> Datos 5G
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                        <div className="mt-1 w-4 h-4 rounded-full bg-[#6F70DE]/20 flex items-center justify-center">
                          <Check size={10} className="text-[#6F70DE]" />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto border-t border-white/10 pt-6">
                    <div className="flex items-end gap-1 mb-6">
                      <span className="text-3xl font-bold text-white">{plan.price}</span>
                      <span className="text-lg text-white">€</span>
                      <span className="text-gray-500 text-sm mb-1">/mes</span>
                    </div>
                    <button className={`w-full py-3.5 rounded-xl font-bold transition-all text-sm uppercase tracking-wide ${plan.highlight ? 'btn-primary' : 'bg-white text-black hover:bg-gray-200'}`}>
                      Lo quiero
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-16 flex justify-center">
          <button className="px-8 py-4 rounded-xl border border-white/10 hover:border-[#6F70DE]/50 hover:bg-[#6F70DE]/10 transition-all duration-300 text-white font-medium flex items-center gap-3 group">
            Ver todas las tarifas y servicios
            <ArrowRight size={18} className="text-[#6F70DE] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
