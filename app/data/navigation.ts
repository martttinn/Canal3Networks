import { Wifi, Smartphone, Layers, Tablet, Headphones } from 'lucide-react';

export const navLinks = ["Servicios", "Productos", "Promociones", "Sobre Nosotros"] as const;

export const servicesDropdown = [
  {
    category: "Internet Fijo",
    icon: Wifi,
    color: "text-[#6F70DE]",
    bg: "bg-[#6F70DE]/10",
    links: [
      { name: "Fibra 300Mbs", href: "#tarifas-simples" },
      { name: "Fibra 600Mbs", href: "#tarifas-simples" },
      { name: "Fibra 1Gbps", href: "#tarifas-simples" },
      { name: "Conexion Por Antena", href: "#tarifas-simples" },
    ]
  },
  {
    category: "Telefonía Móvil",
    icon: Smartphone,
    color: "text-[#78D4EF]",
    bg: "bg-[#78D4EF]/10",
    links: [
      { name: "50GB", href: "#tarifas-simples" },
      { name: "120GB", href: "#tarifas-simples" },
      { name: "150GB compartidos", href: "#tarifas-simples" },
      { name: "250GB compartidos", href: "#tarifas-simples" },
      { name: "Datos Ilimitados", href: "#tarifas-simples" },
    ]
  },
  {
    category: "Fibra + Móvil",
    icon: Layers,
    color: "text-[#85EDAF]",
    bg: "bg-[#85EDAF]/10",
    links: [
      { name: "Fibra 300Mbs + Móvil 50GB", href: "#tarifas-simples" },
      { name: "Fibra 600Mbs + Móvil 50GB", href: "#tarifas-simples" },
      { name: "Fibra 1Gbps + Móvil 120GB", href: "#tarifas-simples" },
      { name: "Fibra 1Gbps + Móvil 150GB compartidos", href: "#tarifas-simples" },
      { name: "Fibra 1Gbps + Móvil 250GB compartidos", href: "#tarifas-simples" },
      { name: "Fibra 1Gbps + Móvil Ilimitados", href: "#tarifas-simples" },
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
      { name: "Apple", href: "#iphone-15" },
      { name: "Samsung", href: "#iphone-15" },
      { name: "Xiaomi", href: "#iphone-15" },
      { name: "Honor", href: "#iphone-15" },
      { name: "Oppo", href: "#iphone-15" },
      { name: "Ver Todos", href: "#iphone-15" },

    ]
  },
  {
    category: "Tablets",
    icon: Tablet,
    color: "text-[#85EDAF]",
    bg: "bg-[#85EDAF]/10",
    links: [
      { name: "Apple iPad", href: "#ipad-air" },
      { name: "Samsung Galaxy Tab", href: "#ipad-air" },
      { name: "Lenovo Tab", href: "#ipad-air" },
      { name: "Huawei MatePad", href: "#ipad-air" },
      { name: "Xiaomi Pad", href: "#ipad-air" },
      { name: "Ver Todos", href: "#ipad-air" },
    ]
  },
  {
    category: "Accesorios",
    icon: Headphones,
    color: "text-[#78D4EF]",
    bg: "bg-[#78D4EF]/10",
    links: [
      { name: "Fundas y Protectores", href: "#auriculares" },
      { name: "Cargadores y Cables", href: "#fundas" },
      { name: "Auriculares", href: "#smartwatches" },
      { name: "Ver Todos", href: "#promociones-accesorios" },
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
