export interface Plan {
  id: number;
  name: string;
  speed: string;
  features: string[];
  price: string;
  tag: string;
  highlight?: boolean;
}

export const fiberPlans: Plan[] = [
  {
    id: 1,
    name: "Básico",
    speed: "300 MB",
    features: ["Ideal parejas", "Fibra Simétrica", "Instalación Gratis"],
    price: "24,90",
    tag: "ENTRY",
  },
  {
    id: 2,
    name: "Estándar",
    speed: "600 MB",
    features: ["Para familias", "WiFi 6 Potente", "Soporte Prioritario"],
    price: "29,90",
    tag: "STANDARD",
    highlight: true,
  },
  {
    id: 3,
    name: "Pro Gaming",
    speed: "1 GBPS",
    features: ["Máxima velocidad", "Baja latencia", "IP Fija opcional"],
    price: "34,90",
    tag: "PRO",
  },
];

export const bundlePlans: Plan[] = [
  {
    id: 1,
    name: "Pack Ahorro",
    speed: "300 MB",
    features: ["Móvil 50GB", "Llamadas ilimitadas", "Roaming UE"],
    price: "39,90",
    tag: "ENTRY",
  },
  {
    id: 2,
    name: "Pack Familia",
    speed: "600 MB",
    features: ["2 Líneas Móviles", "Datos Ilimitados", "Amazon Prime 1 año"],
    price: "49,90",
    tag: "STANDARD",
    highlight: true,
  },
  {
    id: 3,
    name: "Pack Total",
    speed: "1 GBPS",
    features: ["3 Líneas Móviles", "TV Premium + Fútbol", "Todo Ilimitado"],
    price: "59,90",
    tag: "PRO",
  },
];

export const mobileOnlyPlans: Plan[] = [
  {
    id: 1,
    name: "Móvil Básico",
    speed: "24 GB",
    features: ["Llamadas Ilimitadas", "Acumula Gigas", "Red 5G"],
    price: "9,90",
    tag: "ENTRY",
  },
  {
    id: 2,
    name: "Móvil Plus",
    speed: "50 GB",
    features: ["Llamadas Ilimitadas", "Acumula Gigas", "Red 5G + Roaming"],
    price: "14,90",
    tag: "STANDARD",
    highlight: true,
  },
  {
    id: 3,
    name: "Móvil Infinito",
    speed: "Ilimitado",
    features: ["Datos Infinitos", "Llamadas Ilimitadas", "Sin restricciones"],
    price: "19,90",
    tag: "PRO",
  },
];
