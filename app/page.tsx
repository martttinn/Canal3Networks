"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Zap, 
  ArrowRight, 
 
  Check,
  Users,
  MessageCircle,
  Smartphone,
  Router,
  Star,
  Wrench,
  ArrowLeftRight,
  Hammer,
  Headset,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroBackground from './components/HeroBackground';

/* --- UTILS: REVEAL HOOK --- */
interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

const Reveal = ({ children, className = "", delay = 0, threshold = 0.1 }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current as Element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ease-out transform ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-16"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* --- 2D CANVAS COMPONENT --- */
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
    
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const createParticle = () => {
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
        isHighlight 
      };
    };

    const particleCount = 150; 
    const particles: Particle[] = [];
    for(let i = 0; i < particleCount; i++) particles.push(createParticle());

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
      animationFrameId = window.requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />;
};

/* --- TICKER COMPONENT --- */
const InfiniteTicker = () => {
  const items = [
    "FIBRA ÓPTICA PROPIA", "•",
    "INSTALACIÓN GRATUITA", "•",
    "SOPORTE TÉCNICO LOCAL", "•",
    "ALTA EN 24 HORAS", "•",
    "VELOCIDAD SIMÉTRICA REAL", "•",
    "ROUTER WIFI 6 INCLUIDO", "•",
    "SIN LETRA PEQUEÑA", "•"
  ];

  return (
    <div className="w-full bg-[#6F70DE] overflow-hidden py-3 border-y border-white/10 relative z-30">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mx-4">
            {items.map((item, idx) => (
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

/* --- STATS TRANSITION COMPONENT --- */
const StatsSection = () => {
  const stats = [
    { 
      end: 2000, 
      prefix: "+",
      decimals: 0,
      label: "Clientes Satisfechos", 
      desc: "Confían en nuestra red",
      colorClass: "text-[#6F70DE]",
      gradientClass: "from-[#6F70DE] to-white"
    },
    { 
      end: 50, 
      prefix: "+",
      decimals: 0,
      label: "Municipios Conectados", 
      desc: "Infraestructura propia",
      colorClass: "text-[#85EDAF]",
      gradientClass: "from-[#85EDAF] to-white"
    },
    { 
      end: 15,
      prefix: "<", 
      suffix: "ms",
      decimals: 0,
      label: "Latencia Media", 
      desc: "Optimizado para gaming",
      colorClass: "text-[#78D4EF]",
      gradientClass: "from-[#78D4EF] to-white"
    },
  ];

  return (
    <section className="py-20 bg-[#080510] relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute left-1/3 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
          <div className="hidden md:block absolute left-2/3 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
          {stats.map((stat, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="flex flex-col items-center text-center group">
                <div className={`text-6xl md:text-7xl font-bold mb-2 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b ${stat.gradientClass} brand-font`}>
                   <CountUp 
                     end={stat.end} 
                     prefix={stat.prefix} 
                     suffix={stat.suffix} 
                     decimals={stat.decimals}
                   />
                </div>
                <span className="text-white font-bold uppercase tracking-widest text-sm mb-2 opacity-90">
                  {stat.label}
                </span>
                <span className="text-gray-500 text-sm">
                  {stat.desc}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --- FEATURED DEVICES CAROUSEL --- */
const FeaturedProductsCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      const diff = targetProgress.current - currentProgress.current;
      if (Math.abs(diff) > 0.1) {
         currentProgress.current += diff * 0.05;
         if (indicatorRef.current) {
            const visibleWidth = Math.max(10, currentProgress.current);
            indicatorRef.current.style.width = `${visibleWidth}%`;
            indicatorRef.current.style.backgroundPosition = `${currentProgress.current}% 0`;
         }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const scrollableDistance = scrollWidth - clientWidth;
      
      if (scrollableDistance > 0) {
        targetProgress.current = (scrollLeft / scrollableDistance) * 100;
      }
    }
  };

  const devices = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      subtitle: "Titanium. A17 Pro.",
      price: "35€/mes",
      tag: "PREMIUM",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
      color: "text-[#6F70DE]",
      accentColor: "#6F70DE",
      border: "hover:border-[#6F70DE]/50",
      bgIcon: "bg-[#6F70DE]/20",
      features: ["256GB", "Titanio Natural", "Sin entrada"]
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      subtitle: "Galaxy AI is here",
      price: "29€/mes",
      tag: "NOVEDAD",
      image: "https://images.unsplash.com/photo-1610945265064-f45a70262b6f?q=80&w=800&auto=format&fit=crop",
      color: "text-[#85EDAF]",
      accentColor: "#85EDAF",
      border: "hover:border-[#85EDAF]/50",
      features: ["512GB", "Onyx Black", "Galaxy Watch de regalo"]
    },
    {
      id: 3,
      name: "Xiaomi 13T Pro",
      subtitle: "Leica Camera",
      price: "15€/mes",
      tag: "SIN INTERESES",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
      color: "text-[#78D4EF]",
      accentColor: "#78D4EF",
      border: "hover:border-[#78D4EF]/50",
      features: ["Carga 120W", "Pantalla 144Hz", "Fundas incluidas"]
    },
    {
      id: 4,
      name: "Sony WH-1000XM5",
      subtitle: "Noise Cancelling",
      price: "299€",
      tag: "ACCESORIO",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
      color: "text-white",
      accentColor: "#FFFFFF",
      border: "hover:border-white/50",
      features: ["30h Batería", "Sonido Hi-Res", "Pago único"]
    },
    {
      id: 5,
      name: "Apple Watch S9",
      subtitle: "Más inteligente.",
      price: "12€/mes",
      tag: "WEARABLE",
      image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=800&auto=format&fit=crop",
      color: "text-[#6F70DE]",
      accentColor: "#6F70DE",
      border: "hover:border-[#6F70DE]/50",
      features: ["45mm", "GPS + Cellular", "Correa deportiva"]
    }
  ];

  return (
    <section className="py-24 bg-[#080510] relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 mb-12">
         <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 brand-font text-white">
                Productos destacados
              </h2>
              <p className="text-gray-400">
                Compra y recoge tus productos en nuestra tienda fisica!
              </p>
            </div>
            <div className="flex gap-2">
               <button className="p-2 rounded-full border border-white/10 hover:bg-white/10 text-white transition-colors">
                 <ArrowLeftRight size={20} />
               </button>
            </div>
          </div>
         </Reveal>
      </div>

      {/* Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto overflow-y-hidden py-8 px-6 gap-6 snap-x snap-mandatory hide-scrollbar"
      >
        {devices.map((product, i) => (
           <div key={product.id} className="snap-center shrink-0">
             <Reveal delay={i * 100}>
               <div 
                 className={`relative w-[320px] h-[500px] bg-[#121217] rounded-[2rem] overflow-hidden border border-white/5 flex flex-col transition-all duration-300 group ${product.border} hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-2`}
                 style={{ 
                   '--accent': product.accentColor
                 } as React.CSSProperties}
               >
                  {/* Hover Glow Effect */}
                  <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none z-0" style={{ backgroundColor: product.accentColor }}></div>

                  {/* Image Section - Full Bleed */}
                  <div className="relative h-[55%] w-full overflow-hidden z-10">
                      <div className="absolute top-4 left-4 z-20">
                         <span className="text-[10px] font-black px-3 py-1 rounded-md bg-white text-black uppercase tracking-widest shadow-md">
                           {product.tag}
                         </span>
                      </div>
                      
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                      />
                      
                      {/* Gradient overlay for text readability with mask fix */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent opacity-100"></div>
                  </div>

                  {/* Content */}
                  <div className="relative h-[45%] p-6 flex flex-col justify-between bg-[#121217] z-10">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                           <div>
                              <h3 className="text-xl font-bold text-white leading-tight">{product.name}</h3>
                              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mt-1">{product.subtitle}</p>
                           </div>
                        </div>

                        {/* Specs as Pills */}
                        <div className="flex flex-wrap gap-2 mt-3">
                           {product.features.map((feat, idx) => (
                             <span key={idx} className="text-[10px] font-medium text-gray-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                               {feat}
                             </span>
                           ))}
                        </div>
                      </div>

                      {/* Price & Action */}
                      <div className="flex items-end justify-between mt-4">
                          <div>
                             <p className="text-[10px] text-gray-500 mb-0.5 font-bold uppercase tracking-wider">Precio exclusivo</p>
                             <div className="text-2xl font-bold text-white tracking-tight" style={{ color: product.accentColor }}>{product.price}</div>
                          </div>
                          <button 
                            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white"
                          >
                             <ChevronRight size={20} />
                          </button>
                      </div>
                  </div>

               </div>
             </Reveal>
           </div>
        ))}
        {/* Padding right for scroll */}
        <div className="w-6 shrink-0"></div>
      </div>

      {/* Scroll Indicator */}
      <div className="container mx-auto px-6 mt-4 flex justify-center">
         <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              ref={indicatorRef}
              className="h-full bg-gradient-to-r from-[#6F70DE] via-[#85EDAF] to-[#78D4EF] rounded-full"
              style={{ 
                width: '10%',
                backgroundSize: '200% 100%',
                backgroundPosition: '0% 0',
              }}
            ></div>
         </div>
      </div>

      {/* Catalog Button */}
      <div className="mt-12 flex justify-center">
        <button className="px-8 py-4 rounded-xl border border-white/10 hover:border-[#6F70DE]/50 hover:bg-[#6F70DE]/10 transition-all duration-300 text-white font-medium flex items-center gap-3 group">
          Ver catálogo completo
          <ArrowRight size={18} className="text-[#6F70DE] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  )
}

/* --- TESTIMONIAL MARQUEE COMPONENT --- */
const TestimonialMarquee = () => {
    const reviews = [
        { name: "Carlos M.", role: "Gamer", text: "La latencia es increíblemente baja. He pasado de tener lag a ser el host.", stars: 5 },
        { name: "Laura G.", role: "Teletrabajo", text: "Necesitaba estabilidad para mis videollamadas y Canal3 no ha fallado ni un día.", stars: 5 },
        { name: "Familia Ruiz", role: "Ocio", text: "4 personas viendo Netflix a la vez y el WiFi ni se inmuta. El precio es lo mejor.", stars: 5 },
        { name: "Ana P.", role: "Freelance", text: "Me cambié por el soporte local y ha sido la mejor decisión. Te atienden personas.", stars: 5 },
        { name: "David S.", role: "Streaming", text: "Subida de archivos pesados en segundos. La simetría es real.", stars: 5 },
        { name: "Marta R.", role: "Empresa", text: "Instalación en 24h tal y como prometieron. Muy profesionales.", stars: 5 },
    ];

    return (
        <section className="py-24 bg-[#080510] border-t border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 mb-12 text-center">
                <Reveal>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 brand-font text-white">
                        Clientes <span className="text-[#85EDAF]">Felices</span>
                    </h2>
                    <p className="text-gray-400">La satisfacción de nuestros usuarios es nuestra mejor publicidad.</p>
                </Reveal>
            </div>

            {/* Infinite Scroll Container */}
            <div className="relative w-full overflow-hidden">
                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-[#080510] to-transparent z-20 pointer-events-none"></div>
                <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#080510] to-transparent z-20 pointer-events-none"></div>

                <div className="flex animate-scroll hover:pause-animation w-max gap-6 px-6">
                    {[...reviews, ...reviews, ...reviews].map((review, i) => (
                        <div 
                            key={i} 
                            className="w-[380px] bg-[#121217] p-8 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-[#85EDAF]/40 transition-all duration-300 group shadow-lg"
                        >
                            <div>
                                <div className="flex text-[#85EDAF] mb-4">
                                    {[...Array(review.stars)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                                    &quot;{review.text}&quot;
                                </p>
                            </div>
                            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/5">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6F70DE] to-[#78D4EF] flex items-center justify-center text-white font-bold text-sm shadow-md">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">{review.name}</h4>
                                    <span className="text-[#78D4EF] text-xs font-medium uppercase tracking-wide">{review.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <style>{`
                .hover\:pause-animation:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

/* --- UTILS: COUNT UP ANIMATION --- */
interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const CountUp = ({ end, duration = 2000, prefix = "", suffix = "", decimals = 0 }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number | null = null;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (easeOutQuart) para un final suave
      const ease = 1 - Math.pow(1 - percentage, 4);
      
      setCount(ease * end);
      
      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end); // Asegurar valor final exacto
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <span ref={nodeRef}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
};

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('mobile'); // Changed default to 'mobile' (Fibra + Móvil)
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  // Offers Data
  const heroOffers = useMemo(() => [
    {
      id: 1,
      title: "Oferta Estrella",
      subtitle: "39,90€",
      period: "/mes",
      desc: "Fibra 600Mb + Móvil 50GB + Llamadas Ilimitadas.",
      icon: <Smartphone size={48} />,
      color: "text-[#6F70DE]", 
      accent: "bg-[#6F70DE]",
      glow: "shadow-[#6F70DE]/50",
      gradient: "from-[#6F70DE] to-[#78D4EF]"
    },
    {
      id: 2,
      title: "Solo Fibra PRO",
      subtitle: "1 Gbps",
      period: "Real",
      desc: "Velocidad simétrica máxima. Router WiFi 6 incluido.",
      icon: <Zap size={48} />,
      color: "text-[#85EDAF]", 
      accent: "bg-[#85EDAF]",
      glow: "shadow-[#85EDAF]/50",
      gradient: "from-[#85EDAF] to-[#78D4EF]"
    },
    {
      id: 3,
      title: "Pack Familiar",
      subtitle: "Todo",
      period: "Ilimitado",
      desc: "Fibra 1Gbps + 3 Líneas Móviles + TV Premium.",
      icon: <Users size={48} />,
      color: "text-[#78D4EF]", 
      accent: "bg-[#78D4EF]",
      glow: "shadow-[#78D4EF]/50",
      gradient: "from-[#78D4EF] to-[#6F70DE]"
    }
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % heroOffers.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [heroOffers.length]);

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fiberPlans = [
    { 
      id: 1, 
      name: "Básico",
      speed: "300 MB", 
      features: ["Ideal parejas", "Fibra Simétrica", "Instalación Gratis"], 
      price: "24,90", 
      tag: "ENTRY" 
    },
    { 
      id: 2, 
      name: "Estándar",
      speed: "600 MB", 
      features: ["Para familias", "WiFi 6 Potente", "Soporte Prioritario"], 
      price: "29,90", 
      tag: "STANDARD", 
      highlight: true 
    },
    { 
      id: 3, 
      name: "Pro Gaming",
      speed: "1 GBPS", 
      features: ["Máxima velocidad", "Baja latencia", "IP Fija opcional"], 
      price: "34,90", 
      tag: "PRO" 
    },
  ];

  const bundlePlans = [
    { 
      id: 1, 
      name: "Pack Ahorro",
      speed: "300 MB", 
      features: ["Móvil 50GB", "Llamadas ilimitadas", "Roaming UE"], 
      price: "39,90", 
      tag: "ENTRY" 
    },
    { 
      id: 2, 
      name: "Pack Familia",
      speed: "600 MB", 
      features: ["2 Líneas Móviles", "Datos Ilimitados", "Amazon Prime 1 año"], 
      price: "49,90", 
      tag: "STANDARD", 
      highlight: true 
    },
    { 
      id: 3, 
      name: "Pack Total",
      speed: "1 GBPS", 
      features: ["3 Líneas Móviles", "TV Premium + Fútbol", "Todo Ilimitado"], 
      price: "59,90", 
      tag: "PRO" 
    },
  ];

  const mobileOnlyPlans = [
    { 
      id: 1, 
      name: "Móvil Básico",
      speed: "24 GB", 
      features: ["Llamadas Ilimitadas", "Acumula Gigas", "Red 5G"], 
      price: "9,90", 
      tag: "ENTRY" 
    },
    { 
      id: 2, 
      name: "Móvil Plus",
      speed: "50 GB", 
      features: ["Llamadas Ilimitadas", "Acumula Gigas", "Red 5G + Roaming"], 
      price: "14,90", 
      tag: "STANDARD", 
      highlight: true 
    },
    { 
      id: 3, 
      name: "Móvil Infinito",
      speed: "Ilimitado", 
      features: ["Datos Infinitos", "Llamadas Ilimitadas", "Sin restricciones"], 
      price: "19,90", 
      tag: "PRO" 
    },
  ];

  // Decide which plans to show based on activeTab
  const currentPlans = activeTab === 'fiber' ? fiberPlans : activeTab === 'mobile' ? bundlePlans : mobileOnlyPlans;

  return (
    <div className="min-h-screen bg-[#080510] text-white font-sans selection:bg-[#6F70DE] selection:text-white overflow-x-hidden">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        :root {
          --cursor-size: 500px;
          --brand-purple: #6F70DE;
          --brand-green: #85EDAF;
          --brand-teal: #78D4EF;
        }

        body {
          font-family: 'Inter', sans-serif;
        }

        h1, h2, h3, .brand-font {
          font-family: 'Space Grotesk', sans-serif;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); scale: 0.95; }
          to { opacity: 1; transform: translateY(0); scale: 1; }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .fluid-gradient {
          background: linear-gradient(-45deg, #0f2e2e, #1a103c, #080510, #0f2e2e);
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
        }

        @keyframes textFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .animate-text-gradient {
          background: linear-gradient(
            to right, 
            #6F70DE, 
            #85EDAF, 
            #78D4EF, 
            #6F70DE 
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: textFlow 6s linear infinite;
        }

        .hero-gradient-animated {
          background: linear-gradient(
            -45deg, 
            #080510, 
            rgba(111, 112, 222, 0.15), 
            #080510, 
            rgba(120, 212, 239, 0.15),
            #080510,
            rgba(133, 237, 175, 0.1) 
          );
          background-size: 300% 300%;
          animation: brandFlow 20s ease infinite;
        }

        @keyframes brandFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-progress {
          animation: progress 5s linear infinite;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .grid-bg {
          background-size: 50px 50px;
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          mask-image: radial-gradient(
            var(--cursor-size) circle at var(--x) var(--y),
            black 0%,
            transparent 100%
          );
          -webkit-mask-image: radial-gradient(
            var(--cursor-size) circle at var(--x) var(--y),
            black 0%,
            transparent 100%
          );
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }

        .glass-card-highlight {
          background: linear-gradient(145deg, rgba(111, 112, 222, 0.1), rgba(0, 0, 0, 0.2));
          border: 1px solid rgba(111, 112, 222, 0.3);
          box-shadow: 0 0 40px rgba(111, 112, 222, 0.15);
        }

        .btn-primary {
          background-color: var(--brand-green);
          color: #000;
          transition: all 0.3s ease;
          box-shadow: 0 0 15px rgba(133, 237, 175, 0.2);
        }
        .btn-primary:hover {
          background-color: #5FECA0;
          box-shadow: 0 0 25px rgba(133, 237, 175, 0.4);
          transform: translateY(-2px);
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 px-6 py-6 transition-all duration-300 bg-gradient-to-b from-black/90 via-black/40 to-transparent ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tighter leading-none flex items-center gap-2 brand-font text-white drop-shadow-md cursor-pointer hover:opacity-90 transition-opacity">
              CANAL3<span className="text-[#6F70DE]">.NET</span>
            </h1>
          </div>
          
          <div className="hidden md:flex gap-10 text-sm font-medium text-gray-200">
            {['Fibra', 'Móvil', 'Empresas', 'Ayuda'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="relative group py-2">
                <span className="group-hover:text-white transition-colors duration-300">{item}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6F70DE] to-[#85EDAF] transition-all duration-300 group-hover:w-full"></span>
                <span className="absolute inset-0 bg-white/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
              </a>
            ))}
          </div>

          <div className="flex gap-4 items-center">
            <button className="hidden md:block text-sm font-medium text-gray-200 hover:text-white transition-colors relative group py-2">
              <span>Soy Cliente</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6F70DE] to-[#85EDAF] transition-all duration-300 group-hover:w-full"></span>
              <span className="absolute inset-0 bg-white/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            </button>
            
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6F70DE] to-[#85EDAF] rounded-full blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
              <button className="relative bg-black/80 hover:bg-black/90 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border border-white/10 backdrop-blur-md text-white active:scale-95">
                Contratar
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION WITH VIDEO BG --- */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden"
        style={{ '--x': `${mousePosition.x}px`, '--y': `${mousePosition.y}px` } as React.CSSProperties}
      >
        <div className="absolute inset-0 z-0 bg-[#080510]">
           <HeroBackground />
           <video 
             autoPlay 
             loop 
             muted 
             playsInline 
             className="absolute top-0 left-0 w-full h-full object-cover opacity-30 mix-blend-screen pointer-events-none"
           >

             <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-green-and-blue-liquid-flow-12053-large.mp4" type="video/mp4" />
           </video>
           <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#080510] to-transparent z-10"></div>
           <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#080510] to-transparent z-10"></div>
           <div className="absolute inset-0 bg-[#080510]/10 z-10"></div>
           <div className="absolute inset-0 grid-bg opacity-20 z-10 pointer-events-none mix-blend-overlay"></div>
        </div>

        <div className="container mx-auto px-6 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Reveal delay={200}>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none brand-font text-white drop-shadow-xl">
                Velocidad y conectividad <br/>
                <span className="animate-text-gradient">al mejor precio.</span>
              </h1>
            </Reveal>
            
            <Reveal delay={400}>
              <p className="text-lg md:text-xl text-gray-200 max-w-lg leading-relaxed drop-shadow-md">
                Disfruta ya de la <strong className="text-white font-bold">máxima velocidad y cobertura</strong> al mejor precio. Con <strong className="text-white font-bold">asistencia técnica y atención al cliente</strong> personalizadas.
              </p>
            </Reveal>

            <Reveal delay={600}>
              <div className="max-w-md">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6F70DE] to-[#85EDAF] rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                  <div className="relative flex items-center bg-[#0d0915]/90 backdrop-blur-md rounded-xl p-1.5 border border-white/10">
                    <div className="pl-4 pr-2 text-gray-400">
                      <Router size={20} />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Tu Código Postal" 
                      className="bg-transparent w-full p-2 outline-none text-white placeholder-gray-400 text-lg font-medium"
                    />
                    <button className="bg-white text-black hover:bg-[#85EDAF] hover:text-black transition-all px-6 py-3 rounded-lg font-bold text-sm tracking-wide flex items-center gap-2 whitespace-nowrap shadow-lg">
                      Ver Cobertura
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 relative h-[500px] flex items-center justify-center">
            <div className="relative w-full max-w-sm transform transition-all duration-500">
              <div className="relative bg-[#0d0915]/30 backdrop-blur-md rounded-[2.5rem] border border-white/20 p-8 flex flex-col items-center text-center shadow-2xl overflow-hidden aspect-[4/5] justify-between z-10">
                <div className={`relative px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 border ${heroOffers[currentOfferIndex].color} border-current bg-white/5 backdrop-blur-sm`}>
                  Oferta Destacada
                </div>

                <div key={currentOfferIndex} className="animate-fade-in flex flex-col items-center w-full flex-1 justify-center">
                    <div className="relative mb-6">
                       <div className={`absolute inset-0 rounded-full ${heroOffers[currentOfferIndex].accent} opacity-30 blur-xl`}></div>
                       <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center ${heroOffers[currentOfferIndex].color} bg-white/5 border border-white/10 backdrop-blur-md`}>
                          {heroOffers[currentOfferIndex].icon}
                       </div>
                    </div>

                    <h3 className={`text-lg font-medium ${heroOffers[currentOfferIndex].color} mb-1`}>
                        {heroOffers[currentOfferIndex].title}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1 mb-4 text-white">
                        <span className="text-6xl font-bold tracking-tighter brand-font">{heroOffers[currentOfferIndex].subtitle}</span>
                        <span className="text-lg text-gray-400 font-medium">{heroOffers[currentOfferIndex].period}</span>
                    </div>
                    
                    <p className="text-gray-300 text-sm leading-relaxed max-w-[240px] mx-auto">
                        {heroOffers[currentOfferIndex].desc}
                    </p>
                </div>

                <div className="w-full mt-6 relative z-20">
                   <button className={`w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-wide transition-all shadow-lg text-white ${heroOffers[currentOfferIndex].accent} hover:opacity-90 active:scale-95 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]`}>
                     Ver Detalles
                   </button>
                   
                   <div className="flex justify-center gap-2 mt-6">
                    {heroOffers.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setCurrentOfferIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          currentOfferIndex === idx 
                          ? `w-8 ${heroOffers[currentOfferIndex].accent}` 
                          : 'w-2 bg-white/10 hover:bg-white/20'
                        }`}
                      />
                    ))}
                   </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TICKER --- */}
      <InfiniteTicker />

      {/* --- PRICING SECTION --- */}
      <section className="py-24 bg-[#080510] relative">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 brand-font">Tarifas Simples</h2>
              <p className="text-gray-400 text-lg">
                Elige solo fibra o combina con móvil. Cambia de plan cuando quieras.
              </p>
              
              <div className="flex w-full max-w-lg mx-auto bg-white/5 p-1 rounded-xl mt-8 border border-white/10 relative">
                {/* Framer Motion Background for active tab */}
                <div className="absolute inset-0 p-1 flex pointer-events-none">
                    <AnimatePresence>
                    {['fiber', 'mobile', 'mobile-only'].map((tab) => {
                      if (activeTab === tab) {
                        return (
                          <motion.div
                            layoutId="active-tab-bg"
                            key="active-bg"
                            className="bg-[#6F70DE] rounded-lg shadow-lg"
                            style={{ 
                              width: '33.33%',
                              left: tab === 'fiber' ? '0%' : tab === 'mobile' ? '33.33%' : '66.66%',
                              position: 'absolute',
                              top: '4px',
                              bottom: '4px'
                             }}
                            initial={false}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        );
                      }
                      return null;
                    })}
                    </AnimatePresence>
                </div>
                
                {/* Buttons */}
                <button 
                  onClick={() => setActiveTab('fiber')}
                  className={`relative z-10 px-6 py-2 rounded-lg text-sm font-medium transition-colors w-1/3 text-center whitespace-nowrap ${activeTab === 'fiber' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  Solo Fibra
                </button>
                <button 
                  onClick={() => setActiveTab('mobile')}
                  className={`relative z-10 px-6 py-2 rounded-lg text-sm font-medium transition-colors w-1/3 text-center whitespace-nowrap ${activeTab === 'mobile' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  Fibra + Móvil
                </button>
                <button 
                  onClick={() => setActiveTab('mobile-only')}
                  className={`relative z-10 px-6 py-2 rounded-lg text-sm font-medium transition-colors w-1/3 text-center whitespace-nowrap ${activeTab === 'mobile-only' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  Solo Móvil
                </button>
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
                {currentPlans.map((plan, index) => (
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
                        <Smartphone size={16} className="text-[#85EDAF]"/> Datos 5G
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

      {/* --- STATS TRANSITION COMPONENT --- */}
      <StatsSection />

      {/* --- FEATURED DEVICES CAROUSEL --- */}
      <FeaturedProductsCarousel />


      {/* --- WHY US (BENTO GRID - ASYMMETRIC REFINED - REDESIGNED CARDS) --- */}
      <section className="py-32 bg-[#080510] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 brand-font text-white tracking-tight">
                Más que una conexión. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6F70DE] to-[#78D4EF]">Es tu red propia.</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Diseñada por ingenieros, operada por personas.
              </p>
            </div>
          </Reveal>

          {/* ASYMMETRIC GRID: 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
            
            {/* CARD 1: FIBAIR (Massive - 2x2) */}
            <Reveal className="md:col-span-2 md:row-span-2" delay={100}>
              <div className="h-full bg-[#0d0915] rounded-[2.5rem] border border-white/5 p-10 relative overflow-hidden group hover:border-[#6F70DE]/40 transition-all duration-500 flex flex-col justify-between shadow-2xl">
                {/* Subtle Radial Gradient BG */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#6F70DE]/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Large Decorative Icon Background */}
                <Zap size={300} className="absolute -bottom-20 -right-20 text-[#6F70DE]/5 group-hover:scale-110 group-hover:text-[#6F70DE]/10 transition-all duration-700 rotate-12" />
                
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-3xl bg-white/5 backdrop-blur-md flex items-center justify-center text-[#6F70DE] mb-8 shadow-lg border border-white/10 group-hover:bg-[#6F70DE]/20 group-hover:border-[#6F70DE]/30 transition-all">
                    <Zap size={40} />
                  </div>
                  <h3 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tighter">Fibair</h3>
                  <p className="text-gray-300 text-xl leading-relaxed max-w-md font-light">
                    Nuestra joya de la corona. Infraestructura propia de fibra óptica híbrida (aérea y terrestre).
                  </p>
                </div>
              </div>
            </Reveal>

            {/* CARD 2: VELOCIDAD SIMÉTRICA (1x1 - Top Right) */}
            <Reveal className="md:col-span-1 md:row-span-1" delay={200}>
              <div className="h-full bg-[#0d0915] rounded-[2.5rem] border border-white/5 p-8 relative overflow-hidden group hover:border-[#85EDAF]/40 transition-all duration-500 flex flex-col justify-center shadow-lg">
                 <div className="absolute inset-0 bg-gradient-to-bl from-[#85EDAF]/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                 <div className="relative z-10">
                   <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center text-[#85EDAF] mb-6 border border-white/10 group-hover:bg-[#85EDAF]/20 group-hover:border-[#85EDAF]/30 transition-all">
                     <ArrowLeftRight size={28} />
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Simetría Total</h3>
                   <p className="text-gray-400 text-sm leading-relaxed">
                     Misma velocidad de subida y bajada. Tus backups vuelan.
                   </p>
                 </div>
              </div>
            </Reveal>

            {/* CARD 3: ATENCIÓN PERSONALIZADA (1x1 - Middle Right) */}
            <Reveal className="md:col-span-1 md:row-span-1" delay={300}>
              <div className="h-full bg-[#0d0915] rounded-[2.5rem] border border-white/5 p-8 relative overflow-hidden group hover:border-[#78D4EF]/40 transition-all duration-500 flex flex-col justify-center shadow-lg">
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#78D4EF]/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                 <div className="relative z-10">
                   <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center text-[#78D4EF] mb-6 border border-white/10 group-hover:bg-[#78D4EF]/20 group-hover:border-[#78D4EF]/30 transition-all">
                     <Headset size={28} />
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">100% Humano</h3>
                   <p className="text-gray-400 text-sm leading-relaxed">
                     Call center en Murcia. Sin robots ni menús infinitos.
                   </p>
                 </div>
              </div>
            </Reveal>

             {/* CARD 4: SERVICIO TÉCNICO (1x1 - Bottom Left) */}
             <Reveal className="md:col-span-1 md:row-span-1" delay={400}>
              <div className="h-full bg-[#0d0915] rounded-[2.5rem] border border-white/5 p-8 relative overflow-hidden group hover:border-white/30 transition-all duration-500 flex flex-col justify-center shadow-lg">
                 <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div className="relative z-10">
                   <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center text-white mb-6 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                     <Wrench size={28} />
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Técnicos Propios</h3>
                   <p className="text-gray-400 text-sm leading-relaxed">
                     Resolución prioritaria. No externalizamos tu tranquilidad.
                   </p>
                 </div>
              </div>
            </Reveal>

            {/* CARD 5: INSTALACIÓN INCLUIDA (Wide - Bottom Right - 2x1) */}
            <Reveal className="md:col-span-2 md:row-span-1" delay={500}>
              <div className="h-full bg-[#0d0915] rounded-[2.5rem] border border-white/5 p-8 relative overflow-hidden group hover:border-[#85EDAF]/30 transition-all duration-500 flex items-center shadow-lg">
                 <div className="absolute inset-0 bg-gradient-to-r from-[#85EDAF]/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                 
                 <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8 w-full pl-4">
                   <div className="w-20 h-20 rounded-[1.5rem] bg-[#85EDAF] flex items-center justify-center text-[#080510] shrink-0 shadow-lg shadow-[#85EDAF]/20 group-hover:scale-105 transition-transform duration-500">
                     <Hammer size={32} />
                   </div>
                   <div>
                     <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-3xl font-bold text-white tracking-tight">Instalación Premium</h3>
                        <span className="bg-[#85EDAF]/20 text-[#85EDAF] text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider border border-[#85EDAF]/30">Gratis</span>
                     </div>
                     <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
                       Incluye cableado estructurado, configuración experta del router y puesta en marcha.
                     </p>
                   </div>
                 </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>


      {/* --- TESTIMONIAL MARQUEE --- */}
      <TestimonialMarquee />

      {/* --- CTA SECTION --- */}
      <section className="py-24 relative overflow-hidden h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <HorizontalFlowStreaks />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080510] via-transparent to-[#080510] z-10 pointer-events-none"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 brand-font text-white drop-shadow-xl">
              ¿Dudas? Hablemos.
            </h2>
            <p className="text-gray-300 mb-10 max-w-xl mx-auto text-lg drop-shadow-md">
              Sin contestadores automáticos. Escríbenos por WhatsApp y un agente te recomendará la mejor tarifa para tu casa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-black font-bold py-4 px-8 rounded-xl hover:bg-gray-200 transition-colors shadow-lg">
                Ver todas las ofertas
              </button>
              <button className="bg-[#25D366] text-white font-bold py-4 px-8 rounded-xl hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-900/20">
                <MessageCircle size={20} /> Chat por WhatsApp
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#05030a] pt-16 pb-8 border-t border-white/5 text-gray-400 text-sm">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xl font-bold text-white mb-4 brand-font">CANAL3</h4>
            <p className="text-xs leading-relaxed opacity-60">
              Tu operador de confianza. Llevamos internet de alta velocidad donde otros no llegan, con un servicio cercano y transparente.
            </p>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4">Servicios</h5>
            <ul className="space-y-3">
              <li className="hover:text-[#6F70DE] cursor-pointer transition-colors">Fibra Óptica</li>
              <li className="hover:text-[#6F70DE] cursor-pointer transition-colors">Tarifas Móvil</li>
              <li className="hover:text-[#6F70DE] cursor-pointer transition-colors">Paquetes Convergentes</li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4">Ayuda</h5>
            <ul className="space-y-3">
              <li className="hover:text-[#6F70DE] cursor-pointer transition-colors">Test de Velocidad</li>
              <li className="hover:text-[#6F70DE] cursor-pointer transition-colors">Configurar Router</li>
              <li className="hover:text-[#6F70DE] cursor-pointer transition-colors">Contacto</li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4">Legal</h5>
            <ul className="space-y-3">
              <li className="hover:text-[#6F70DE] cursor-pointer transition-colors">Aviso Legal</li>
              <li className="hover:text-[#6F70DE] cursor-pointer transition-colors">Privacidad</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-50">
          <span>© 2024 Canal3 Networks. Todos los derechos reservados.</span>
        </div>
      </footer>
    </div>
  );
};

export default App;