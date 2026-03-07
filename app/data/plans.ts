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
    speed: "300 Mbs",
    features: ["Ideal parejas", "Fibra Simétrica", "Instalación Gratis"],
    price: "14,99",
    tag: "ENTRY",
  },
  {
    id: 2,
    name: "Estándar",
    speed: "600 Mbs",
    features: ["Para familias", "WiFi 6 Potente", "Soporte Prioritario"],
    price: "16,99",
    tag: "STANDARD",
    highlight: true,
  },
  {
    id: 3,
    name: "Pro Gaming",
    speed: "1 Gbps",
    features: ["Máxima velocidad", "Baja latencia", "IP Fija opcional"],
    price: "18,99",
    tag: "PRO",
  },
];

export const bundlePlans: Plan[] = [
  {
    id: 1,
    name: "Pack Ahorro",
    speed: "300 Mbs",
    features: ["Móvil 50GB", "Llamadas ilimitadas", "Roaming UE"],
    price: "19,99",
    tag: "ENTRY",
  },
  {
    id: 2,
    name: "Pack Familia",
    speed: "600 Mbs",
    features: ["Móvil 50GB", "Llamadas ilimitadas", "WiFi 6 Potente"],
    price: "21,99",
    tag: "STANDARD",
    highlight: true,
  },
  {
    id: 3,
    name: "Pack Total",
    speed: "1 Gbps",
    features: ["Móvil 120GB", "Llamadas ilimitadas", "Soporte Prioritario"],
    price: "24,99",
    tag: "PRO",
  },
];

export const mobileOnlyPlans: Plan[] = [
  {
    id: 1,
    name: "Móvil Básico",
    speed: "50 GB",
    features: ["Llamadas Ilimitadas", "Acumula Gigas", "Red 5G"],
    price: "8,99",
    tag: "ENTRY",
  },
  {
    id: 2,
    name: "Móvil Plus",
    speed: "120 GB",
    features: ["Llamadas Ilimitadas", "Acumula Gigas", "Red 5G + Roaming"],
    price: "12,99",
    tag: "STANDARD",
    highlight: true,
  },
  {
    id: 3,
    name: "Móvil Infinito",
    speed: "Ilimitados",
    features: ["Datos Infinitos", "Llamadas Ilimitadas", "Sin restricciones"],
    price: "19,90",
    tag: "PRO",
  },
];
