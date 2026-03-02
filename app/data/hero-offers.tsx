import React from 'react';
import { Smartphone, Zap, Users } from 'lucide-react';

export interface HeroOffer {
  id: number;
  title: string;
  subtitle: string;
  period: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  accent: string;
  glow: string;
  gradient: string;
}

export const heroOffers: HeroOffer[] = [
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
    gradient: "from-[#6F70DE] to-[#78D4EF]",
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
    gradient: "from-[#85EDAF] to-[#78D4EF]",
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
    gradient: "from-[#78D4EF] to-[#6F70DE]",
  },
];
