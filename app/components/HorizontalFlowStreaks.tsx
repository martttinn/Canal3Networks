"use client";

import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
  colorBase: string;
  isHighlight: boolean;
}

const HorizontalFlowStreaks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;
    let isVisible = true;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const createParticle = (): Particle => {
      const colors = ['rgba(111, 112, 222, ', 'rgba(133, 237, 175, ', 'rgba(120, 212, 239, '];
      const selectedColorBase = colors[Math.floor(Math.random() * colors.length)];
      const direction = Math.random() > 0.5 ? 1 : -1;
      const isHighlight = Math.random() < 0.03;
      const lengthBase = canvas.width > 0 ? canvas.width : 1000;

      return {
        x: Math.random() * canvas.width - (lengthBase / 2),
        y: Math.random() * canvas.height,
        length: lengthBase * (0.4 + Math.random() * 0.8),
        speed: (isHighlight ? 15 + Math.random() * 10 : 1 + Math.random() * 3) * direction,
        opacity: isHighlight ? 0.9 : 0.1 + Math.random() * 0.4,
        width: isHighlight ? 4 : 3 + Math.random() * 5,
        colorBase: selectedColorBase,
        isHighlight,
      };
    };

    const particleCount = 150;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) particles.push(createParticle());

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        const endX = p.x + p.length;
        const y = p.y;
        const gradient = ctx.createLinearGradient(p.x, y, endX, y);
        const centerColor = p.isHighlight ? 'rgba(255, 255, 255, ' : p.colorBase;

        gradient.addColorStop(0, `${p.colorBase}0)`);
        gradient.addColorStop(0.2, `${p.colorBase}${p.opacity * 0.5})`);
        gradient.addColorStop(0.5, `${centerColor}${p.opacity})`);
        gradient.addColorStop(0.8, `${p.colorBase}${p.opacity * 0.5})`);
        gradient.addColorStop(1, `${p.colorBase}0)`);

        if (p.isHighlight) ctx.shadowBlur = 0;

        ctx.strokeStyle = gradient;
        ctx.lineWidth = p.width;
        ctx.lineCap = 'butt';
        ctx.moveTo(p.x, y);
        ctx.lineTo(endX, y);
        ctx.stroke();

        p.x += p.speed;

        if (p.speed > 0) {
          if (p.x > canvas.width) {
            p.x = -p.length;
            p.y = Math.random() * canvas.height;
            p.isHighlight = Math.random() < 0.03;
            p.speed = (p.isHighlight ? 15 + Math.random() * 10 : 1 + Math.random() * 3);
            p.opacity = p.isHighlight ? 0.9 : 0.1 + Math.random() * 0.4;
          }
        } else {
          if (p.x + p.length < 0) {
            p.x = canvas.width;
            p.y = Math.random() * canvas.height;
            p.isHighlight = Math.random() < 0.03;
            p.speed = (p.isHighlight ? 15 + Math.random() * 10 : 1 + Math.random() * 3) * -1;
            p.opacity = p.isHighlight ? 0.9 : 0.1 + Math.random() * 0.4;
          }
        }
      }
      if (!isVisible) return;
      animationFrameId = window.requestAnimationFrame(draw);
    };

    // IntersectionObserver: pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; if (isVisible) draw(); },
      { threshold: 0 }
    );
    observer.observe(canvas);

    draw();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />;
};

export default HorizontalFlowStreaks;
