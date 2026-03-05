export interface Device {
  id: number;
  name: string;
  subtitle: string;
  price: string;
  tag: string;
  image: string;
  color: string;
  accentColor: string;
  border: string;
  bgIcon?: string;
  features: string[];
}

export const devices: Device[] = [
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
    features: ["256GB", "Titanio Natural", "Sin entrada"],
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    subtitle: "Galaxy AI is here",
    price: "29€/mes",
    tag: "NOVEDAD",
    image: "https://images.unsplash.com/photo-1610945415309-9fb4bf6c2578?q=80&w=800&auto=format&fit=crop",
    color: "text-[#85EDAF]",
    accentColor: "#85EDAF",
    border: "hover:border-[#85EDAF]/50",
    features: ["512GB", "Onyx Black", "Galaxy Watch de regalo"],
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
    features: ["Carga 120W", "Pantalla 144Hz", "Fundas incluidas"],
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
    features: ["30h Batería", "Sonido Hi-Res", "Pago único"],
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
    features: ["45mm", "GPS + Cellular", "Correa deportiva"],
  },
];
