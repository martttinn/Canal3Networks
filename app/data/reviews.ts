export interface Review {
  name: string;
  role: string;
  text: string;
  stars: number;
}

export const reviews: Review[] = [
  { name: "Carlos M.", role: "Gamer", text: "La latencia es increíblemente baja. He pasado de tener lag a ser el host.", stars: 5 },
  { name: "Laura G.", role: "Teletrabajo", text: "Necesitaba estabilidad para mis videollamadas y Canal3 no ha fallado ni un día.", stars: 5 },
  { name: "Familia Ruiz", role: "Ocio", text: "4 personas viendo Netflix a la vez y el WiFi ni se inmuta. El precio es lo mejor.", stars: 5 },
  { name: "Ana P.", role: "Freelance", text: "Me cambié por el soporte local y ha sido la mejor decisión. Te atienden personas.", stars: 5 },
  { name: "David S.", role: "Streaming", text: "Subida de archivos pesados en segundos. La simetría es real.", stars: 5 },
  { name: "Marta R.", role: "Empresa", text: "Instalación en 24h tal y como prometieron. Muy profesionales.", stars: 5 },
];
