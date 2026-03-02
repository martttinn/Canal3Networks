"use client";

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/app/components/Navbar';
import HeroSection from '@/app/components/HeroSection';
import InfiniteTicker from '@/app/components/InfiniteTicker';
import PricingSection from '@/app/components/PricingSection';
import StatsSection from '@/app/components/StatsSection';
import FeaturedProductsCarousel from '@/app/components/FeaturedProductsCarousel';
import WhyUsSection from '@/app/components/WhyUsSection';
import TestimonialMarquee from '@/app/components/TestimonialMarquee';
import CoverageMapSection from '@/app/components/CoverageMapSection';
import FaqSection from '@/app/components/FaqSection';
import CtaSection from '@/app/components/CtaSection';
import Footer from '@/app/components/Footer';

const App = () => {
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setShowNav(false);
        } else {
          setShowNav(true);
        }
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, []);

  return (
    <div className="min-h-screen bg-[#080510] text-white font-sans selection:bg-[#6F70DE] selection:text-white overflow-x-hidden">
      <Navbar showNav={showNav} />
      <HeroSection />
      <InfiniteTicker />
      <PricingSection />
      <StatsSection />
      <WhyUsSection />
      <TestimonialMarquee />
      <FeaturedProductsCarousel />
      <CoverageMapSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default App;