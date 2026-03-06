import React from 'react';
import PageShell from '@/app/components/PageShell';
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

export default function Page() {
  return (
    <PageShell>
      <HeroSection />
      <InfiniteTicker />
      <PricingSection />
      <StatsSection />
      <FeaturedProductsCarousel />
      <WhyUsSection />
      <TestimonialMarquee />
      <CoverageMapSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </PageShell>
  );
}