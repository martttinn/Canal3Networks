import { Wifi, Smartphone, Layers, Tv, Headphones } from 'lucide-react';

export const navLinks = ["Servicios", "Productos", "Promociones", "Sobre Nosotros"] as const;

export const servicesDropdown = [
  {
    category: "Internet Fijo",
    icon: Wifi,
    color: "text-[#6F70DE]",
    bg: "bg-[#6F70DE]/10",
    links: [
      { name: "Fibra Óptica 300Mb", href: "#tarifas-simples" },
      { name: "Fibra Óptica 600Mb", href: "#tarifas-simples" },
      { name: "Fibra Óptica 1Gbps", href: "#tarifas-simples" },
      { name: "Conexión WIMAX", href: "#tarifas-simples" },
    ]
  },
  {
    category: "Telefonía Móvil",
    icon: Smartphone,
    color: "text-[#78D4EF]",
    bg: "bg-[#78D4EF]/10",
    links: [
      { name: "Tarifa 50GB + Ilimitadas", href: "#tarifas-simples" },
      { name: "Tarifa 100GB + Ilimitadas", href: "#tarifas-simples" },
      { name: "Tarifa Ilimitada 5G", href: "#tarifas-simples" },
      { name: "Líneas Adicionales", href: "#tarifas-simples" },
    ]
  },
  {
    category: "Packs Convergentes",
    icon: Layers,
    color: "text-[#85EDAF]",
    bg: "bg-[#85EDAF]/10",
    links: [
      { name: "Fibra 300Mb + Móvil 50GB", href: "#tarifas-simples" },
      { name: "Fibra 600Mb + Móvil 100GB", href: "#tarifas-simples" },
      { name: "Fibra 1Gbps + 2 Líneas 5G", href: "#tarifas-simples" },
      { name: "Configura tu Paquete", href: "#tarifas-simples" },
    ]
  }
];

export const productsDropdown = [
  {
    category: "Smartphones",
    icon: Smartphone,
    color: "text-[#6F70DE]",
    bg: "bg-[#6F70DE]/10",
    links: [
      { name: "iPhone 15 Pro", href: "#iphone-15" },
      { name: "Samsung Galaxy S24", href: "#galaxy-s24" },
      { name: "Xiaomi 14", href: "#xiaomi-14" },
      { name: "Ofertas Reacondicionados", href: "#reacondicionados" },
    ]
  },
  {
    category: "Smart TVs",
    icon: Tv,
    color: "text-[#85EDAF]",
    bg: "bg-[#85EDAF]/10",
    links: [
      { name: "Televisores OLED", href: "#tv-oled" },
      { name: "Televisores QLED", href: "#tv-qled" },
      { name: "Accesorios TV", href: "#tv-accesorios" },
      { name: "Barras de Sonido", href: "#soundbars" },
    ]
  },
  {
    category: "Accesorios Móviles",
    icon: Headphones,
    color: "text-[#78D4EF]",
    bg: "bg-[#78D4EF]/10",
    links: [
      { name: "Auriculares Inalámbricos", href: "#auriculares" },
      { name: "Fundas y Cargadores", href: "#fundas" },
      { name: "Smartwatches", href: "#smartwatches" },
      { name: "Promociones", href: "#promociones-accesorios" },
    ]
  }
];

export const tickerItems = [
  "FIBRA ÓPTICA PROPIA", "•",
  "INSTALACIÓN GRATUITA", "•",
  "SOPORTE TÉCNICO LOCAL", "•",
  "ALTA EN 24 HORAS", "•",
  "VELOCIDAD SIMÉTRICA REAL", "•",
  "ROUTER WIFI 6 INCLUIDO", "•",
  "SIN LETRA PEQUEÑA", "•",
];

export interface FooterLinkGroup {
  title: string;
  links: string[];
}

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Servicios",
    links: ["Fibra Óptica", "Tarifas Móvil", "Paquetes Convergentes"],
  },
  {
    title: "Ayuda",
    links: ["Test de Velocidad", "Configurar Router", "Contacto"],
  },
  {
    title: "Legal",
    links: ["Aviso Legal", "Privacidad"],
  },
];
