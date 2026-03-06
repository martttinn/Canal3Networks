"use client";

import React, { useRef, useEffect } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const CountUp = ({ end, duration = 2000, prefix = "", suffix = "", decimals = 0 }: CountUpProps) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startAnimation = () => {
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const ease = 1 - Math.pow(1 - percentage, 4);
      const currentValue = ease * end;

      if (nodeRef.current) {
        nodeRef.current.textContent = `${prefix}${currentValue.toFixed(decimals)}${suffix}`;
      }

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else if (nodeRef.current) {
        nodeRef.current.textContent = `${prefix}${end.toFixed(decimals)}${suffix}`;
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <span ref={nodeRef}>
      {prefix}{(0).toFixed(decimals)}{suffix}
    </span>
  );
};

export default CountUp;
