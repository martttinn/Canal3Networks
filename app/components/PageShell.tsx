"use client";

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/app/components/Navbar';

const PageShell = ({ children }: { children: React.ReactNode }) => {
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, []);

  return (
    <div className="min-h-screen bg-[#080510] text-white font-sans selection:bg-[#6F70DE] selection:text-white overflow-x-hidden">
      <Navbar showNav={showNav} />
      {children}
    </div>
  );
};

export default PageShell;
