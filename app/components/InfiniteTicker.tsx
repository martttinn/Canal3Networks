"use client";

import React from 'react';
import { tickerItems } from '@/app/data/navigation';

const InfiniteTicker = () => {
  return (
    <div className="w-full bg-[#6F70DE] overflow-hidden py-3 border-y border-white/10 relative z-30">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mx-4">
            {tickerItems.map((item, idx) => (
              <span key={idx} className="text-white font-bold text-sm tracking-widest font-mono uppercase">
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteTicker;
