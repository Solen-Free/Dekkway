import { NextResponse } from 'next/server';

interface Logement {
  id: string;
  title: string;
  price: string;
  description: string;
  location: [number, number];
  image: string;
  video: string;
  equipments: string[];
  rooms: number;
  salons: number;
  kitchens: number;
  toilets: number;
  garage: boolean;
  agent: string;
  agentLogo: string; // URL du logo de l'agent
  address?: string;
}

const localLogements: Record<string, Logement> = {
    "1": {
      id: "1",
      title: "Maison à louer",
      price: "300000",
      description: "Description complète...",
      location: [14.764504, -17.366029],
      image: "/images/maison.jpg",
      video: "/videos/visite.mp4",
      equipments: ["Climatiseur", "Wifi"],
      rooms: 3,
      salons: 1,
      kitchens: 1,
      toilets: 2,
      garage: true,
      agent: "Alpha House",
      agentLogo: "/images/agent-logo.png", // URL du logo de l'agent
      address: "Rue 12, Lot 45, Quartier Grand-Standing, Thiès, Sénégal"
  },
  "2": {
    id: "2",
    title: "Maison à louer",
    price: "300000",
    description: "Description complète...",
    location: [14.46455, -16.56510],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House",
    agentLogo: "/images/agent-logo.png", // URL du logo de l'agent
    address: "Grand-Standing, Thiès"
  },
  "3": {
    id: "3",
    title: "Maison à louer",
    price: "300000",
    description: "Description complète...",
    location: [14.806719, -16.926462],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House",
    agentLogo: "/images/agent-logo.png", // URL du logo de l'agent
    address: "Nginth, Thiès"
  },
  "4": {
    id: "4",
    title: "Maison à louer",
    price: "300000",
    description: "Découvrez cet élégant appartement de 3 chambres situé dans un immeuble sécurisé et bien entretenu. Doté d'une décoration moderne et d'équipements de qualité, ce logement offre tout le confort nécessaire pour une vie agréable",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House",
    agentLogo: "/images/agent-logo.png", // URL du logo de l'agent
    address: "Grand-Standing, Thiès"
  },
  "5": {
    id: "5",
    title: "Maison à louer",
    price: "300000",
    description: "Description complète...",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House",
    agentLogo: "/images/agent-logo.png", // URL du logo de l'agent
    address: "Grand-Standing, Thiès"
  },
  "6": {
    id: "6",
    title: "Maison à louer",
    price: "300000",
    description: "Description complète...",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House",
    agentLogo: "/images/agent-logo.png", // URL du logo de l'agent
    address: "Grand-Standing, Thiès"
  },
  "7": {
    id: "7",
    title: "Maison à louer",
    price: "300000",
    description: "Description complète...",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House",
    agentLogo: "/images/agent-logo.png", // URL du logo de l'agent
    address: "Grand-Standing, Thiès"
  },
  "8": {
    id: "8",
    title: "Maison à louer",
    price: "300000",
    description: "Description complète...",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House",
    agentLogo: "/images/agent-logo.png", // URL du logo de l'agent
    address: "Grand-Standing, Thiès"
  },
  "9": {
    id: "9",
    title: "Maison à louer",
    price: "300000",
    description: "Description complète...",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House",
    agentLogo: "/icones/logo.png", // URL du logo de l'agent
    address: "Grand-Standing, Thiès"
  }
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Simulation de latence
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!params?.id) {
      return NextResponse.json(
        { error: "ID manquant" },
        { status: 400 }
      );
    }

    const logement = localLogements[params.id];

    if (!logement) {
      return NextResponse.json(
        { error: "Logement non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(logement);

  } catch (error) {
    console.error('Erreur API:', error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}