export interface Device {
  id: number;
  name: string;
  brand: string;
  price: string;
  category: string;
  isNew?: boolean;
  image: string;
  color: string;
  accentColor: string;
  border: string;
  bgIcon?: string;
  features: string[];
  oldPrice?: string;
  discount?: string;
}

export const devices: Device[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: "999€",
    category: "Smartphone",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
    color: "text-[#6F70DE]",
    accentColor: "#6F70DE",
    border: "hover:border-[#6F70DE]/50",
    bgIcon: "bg-[#6F70DE]/20",
    features: ["256GB", "Titanio Natural", "Últimas unidades"],
    oldPrice: "1219€",
    discount: "-18%",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    brand: "Samsung",
    price: "899€",
    category: "Smartphone",
    isNew: true,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
    color: "text-[#85EDAF]",
    accentColor: "#85EDAF",
    border: "hover:border-[#85EDAF]/50",
    features: ["512GB", "Onyx Black", "Galaxy Watch de regalo"],
  },
  {
    id: 3,
    name: "Xiaomi 13T Pro",
    brand: "Xiaomi",
    price: "499€",
    category: "Smartphone",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
    color: "text-[#78D4EF]",
    accentColor: "#78D4EF",
    border: "hover:border-[#78D4EF]/50",
    features: ["Carga 120W", "Pantalla 144Hz", "Fundas incluidas"],
    oldPrice: "699€",
    discount: "-28%",
  },
  {
    id: 4,
    name: "Sony WH-1000XM5",
    brand: "Sony",
    price: "299€",
    category: "Accesorio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    color: "text-white",
    accentColor: "#FFFFFF",
    border: "hover:border-white/50",
    features: ["30h Batería", "Sonido Hi-Res", "Pago único"],
  },
  {
    id: 5,
    name: "Apple Watch S9",
    brand: "Apple",
    price: "449€",
    category: "Wearable",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=800&auto=format&fit=crop",
    color: "text-[#6F70DE]",
    accentColor: "#6F70DE",
    border: "hover:border-[#6F70DE]/50",
    features: ["45mm", "GPS + Cellular", "Correa deportiva"],
  },
];
