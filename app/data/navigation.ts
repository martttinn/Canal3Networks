export const navLinks = ["Fibra", "Móvil", "Empresas", "Ayuda"] as const;

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
