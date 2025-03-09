
"use client";
import { useParams } from "next/navigation";
import { MapPin, Video, BedDouble, ShowerHead, Utensils, Car, Wifi, Snowflake, Microwave, Map } from "lucide-react";
import Buttons from "@/components/buttons";
import { useEffect, useState } from "react";
// import dynamic from 'next/dynamic';

// // Chargement dynamique pour la carte (SSR désactivé)
// const MapComponent = dynamic(() => import('@/components/Map'), {
//   ssr: false,
//   loading: () => <p>Chargement de la carte...</p>
// });

interface Logement {
  title: string;
  price: string;
  description: string;
  location: [number, number];
  image: string;
  equipments: string[];
  rooms: number;
  salons: number;
  kitchens: number;
  toilets: number;
  garage: boolean;
  agent: string;
  video: string;
}

const logements: Record<string, Logement> = {
  "1": {
    title: "Maison à louer - Grand-Standing, Thiès",
    price: "300000",
    description: "Découvrez cet élégant appartement de 3 chambres situé dans un immeuble sécurisé et bien entretenu. Doté d'une décoration moderne et d'équipements de qualité, ce logement offre tout le confort nécessaire pour une vie agréable.",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi", "Réfrigérateur", "Micro-ondes"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House"
  },
  "2": {
    title: "Maison à louer - Grand-Standing, Thiès",
    price: "300000",
    description: "Découvrez cet élégant appartement de 3 chambres situé dans un immeuble sécurisé et bien entretenu. Doté d'une décoration moderne et d'équipements de qualité, ce logement offre tout le confort nécessaire pour une vie agréable.",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi", "Réfrigérateur", "Micro-ondes"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House"
  },
  "3": {
    title: "Maison à louer - Grand-Standing, Thiès",
    price: "300000",
    description: "Découvrez cet élégant appartement de 3 chambres situé dans un immeuble sécurisé et bien entretenu. Doté d'une décoration moderne et d'équipements de qualité, ce logement offre tout le confort nécessaire pour une vie agréable.",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi", "Réfrigérateur", "Micro-ondes"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House"
  },
  "4": {
    title: "Maison à louer - Grand-Standing, Thiès",
    price: "300000",
    description: "Découvrez cet élégant appartement de 3 chambres situé dans un immeuble sécurisé et bien entretenu. Doté d'une décoration moderne et d'équipements de qualité, ce logement offre tout le confort nécessaire pour une vie agréable.",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi", "Réfrigérateur", "Micro-ondes"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House"
  },
  "5": {
    title: "Maison à louer - Grand-Standing, Thiès",
    price: "300000",
    description: "Découvrez cet élégant appartement de 3 chambres situé dans un immeuble sécurisé et bien entretenu. Doté d'une décoration moderne et d'équipements de qualité, ce logement offre tout le confort nécessaire pour une vie agréable.",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi", "Réfrigérateur", "Micro-ondes"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House"
  },
  "6": {
    title: "Maison à louer - Grand-Standing, Thiès",
    price: "300000",
    description: "Découvrez cet élégant appartement de 3 chambres situé dans un immeuble sécurisé et bien entretenu. Doté d'une décoration moderne et d'équipements de qualité, ce logement offre tout le confort nécessaire pour une vie agréable.",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi", "Réfrigérateur", "Micro-ondes"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House"
  },
  "7": {
    title: "Maison à louer - Grand-Standing, Thiès",
    price: "300000",
    description: "Découvrez cet élégant appartement de 3 chambres situé dans un immeuble sécurisé et bien entretenu. Doté d'une décoration moderne et d'équipements de qualité, ce logement offre tout le confort nécessaire pour une vie agréable.",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi", "Réfrigérateur", "Micro-ondes"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House"
  },
  "8": {
    title: "Maison à louer - Grand-Standing, Thiès",
    price: "300000",
    description: "Découvrez cet élégant appartement de 3 chambres situé dans un immeuble sécurisé et bien entretenu. Doté d'une décoration moderne et d'équipements de qualité, ce logement offre tout le confort nécessaire pour une vie agréable.",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi", "Réfrigérateur", "Micro-ondes"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House"
  },
  "9": {
    title: "Maison à louer - Grand-Standing, Thiès",
    price: "300000",
    description: "Découvrez cet élégant appartement de 3 chambres situé dans un immeuble sécurisé et bien entretenu. Doté d'une décoration moderne et d'équipements de qualité, ce logement offre tout le confort nécessaire pour une vie agréable.",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi", "Réfrigérateur", "Micro-ondes"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House"
  },
  "10": {
    title: "Maison à louer - Grand-Standing, Thiès",
    price: "300000",
    description: "Découvrez cet élégant appartement de 3 chambres situé dans un immeuble sécurisé et bien entretenu. Doté d'une décoration moderne et d'équipements de qualité, ce logement offre tout le confort nécessaire pour une vie agréable.",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi", "Réfrigérateur", "Micro-ondes"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House"
  },
  "11": {
    title: "Maison à louer - Grand-Standing, Thiès",
    price: "300000",
    description: "Découvrez cet élégant appartement de 3 chambres situé dans un immeuble sécurisé et bien entretenu. Doté d'une décoration moderne et d'équipements de qualité, ce logement offre tout le confort nécessaire pour une vie agréable.",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi", "Réfrigérateur", "Micro-ondes"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House"
  },
  "12": {
    title: "Maison à louer - Grand-Standing, Thiès",
    price: "300000",
    description: "Découvrez cet élégant appartement de 3 chambres situé dans un immeuble sécurisé et bien entretenu. Doté d'une décoration moderne et d'équipements de qualité, ce logement offre tout le confort nécessaire pour une vie agréable.",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi", "Réfrigérateur", "Micro-ondes"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House"
  },
  "13": {
    title: "Maison à louer - Grand-Standing, Thiès",
    price: "300000",
    description: "Découvrez cet élégant appartement de 3 chambres situé dans un immeuble sécurisé et bien entretenu. Doté d'une décoration moderne et d'équipements de qualité, ce logement offre tout le confort nécessaire pour une vie agréable.",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi", "Réfrigérateur", "Micro-ondes"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House"
  },
  "14": {
    title: "Maison à louer - Grand-Standing, Thiès",
    price: "300000",
    description: "Découvrez cet élégant appartement de 3 chambres situé dans un immeuble sécurisé et bien entretenu. Doté d'une décoration moderne et d'équipements de qualité, ce logement offre tout le confort nécessaire pour une vie agréable.",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi", "Réfrigérateur", "Micro-ondes"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House"
  },
  "15": {
    title: "Maison à louer - Grand-Standing, Thiès",
    price: "300000",
    description: "Découvrez cet élégant appartement de 3 chambres situé dans un immeuble sécurisé et bien entretenu. Doté d'une décoration moderne et d'équipements de qualité, ce logement offre tout le confort nécessaire pour une vie agréable.",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi", "Réfrigérateur", "Micro-ondes"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House"
  },
  "16": {
    title: "Maison à louer - Grand-Standing, Thiès",
    price: "300000",
    description: "Découvrez cet élégant appartement de 3 chambres situé dans un immeuble sécurisé et bien entretenu. Doté d'une décoration moderne et d'équipements de qualité, ce logement offre tout le confort nécessaire pour une vie agréable.",
    location: [14.764504, -17.366029],
    image: "/images/maison.jpg",
    video: "/videos/visite.mp4",
    equipments: ["Climatiseur", "Wifi", "Réfrigérateur", "Micro-ondes"],
    rooms: 3,
    salons: 1,
    kitchens: 1,
    toilets: 2,
    garage: true,
    agent: "Alpha House"
  },
  // ... autres logements
};

export default function DetailLog() {
  const params = useParams<{ id: string }>();
  const [logement, setLogement] = useState<Logement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    
    setTimeout(() => {
      const logementData = logements[params.id];
      setLogement(logementData || null);
      setLoading(false);
    }, 500);
  }, [params.id]);

  if (loading) return <div className="text-center py-8">Chargement...</div>;
  if (!logement) return <div className="text-center py-8">Logement non trouvé</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 font-sans">
      {/* En-tête */}
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">{logement.title}</h1>
        <div className="flex items-center gap-2 text-blue-600">
          <MapPin size={20} />
          <span className="text-lg">Grand-Standing, Thiès</span>
        </div>
        <p className="text-3xl font-bold text-blue-600">{logement.price} FCFA/Mois</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Colonne principale */}
        <div className="lg:col-span-2">
          {/* Image principale */}
          <div className="relative h-96 mb-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={logement.image}
              alt={logement.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-4 mb-8">
            <Buttons
              text="Réserver maintenant"
              bgColor="#2563eb"
              hoverColor="#1d4ed8"
              className="flex-1 py-4 text-lg"
              icon={<Video size={20} className="mr-2" />}
            />
          </div>

          {/* Description */}
          <section className="mb-8 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed">{logement.description}</p>
          </section>

          {/* Installations */}
          <section className="mb-8 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Caractéristiques</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FeatureCard icon={<BedDouble />} value={logement.rooms} label="Chambres" />
              <FeatureCard icon={<ShowerHead />} value={logement.toilets} label="Salles de bain" />
              <FeatureCard icon={<Utensils />} value={logement.kitchens} label="Cuisines" />
              <FeatureCard icon={<Car />} value={logement.garage ? 1 : 0} label="Garage" />
            </div>
          </section>

          {/* Équipements */}
          <section className="mb-8 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Équipements</h2>
            <div className="grid grid-cols-2 gap-4">
              <EquipmentItem icon={<Snowflake />} label="Climatisation" />
              <EquipmentItem icon={<Wifi />} label="WiFi Haut débit" />
              <EquipmentItem icon={<Microwave />} label="Électroménager" />
            </div>
          </section>
        </div>

        {/* Colonne latérale */}
        <div className="space-y-6">
          {/* Visite virtuelle */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Video className="text-blue-600" /> Visite Virtuelle
            </h3>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <video 
                className="w-full h-full object-cover"
                controls
                poster="/images/visite-thumbnail.jpg"
              >
                <source src={logement.video} type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Agent */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Agent immobilier</h3>
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <MapPin className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{logement.agent}</p>
                <p className="text-sm text-gray-500">Agrément: 12345ABC</p>
              </div>
            </div>
          </div>

          {/* Carte */}
          <div className="bg-white p-6 rounded-xl shadow-sm border h-96">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Map className="text-blue-600" /> Localisation
            </h3>
            {/* <MapComponent coordinates={logement.location} /> */}
          </div>
        </div>
      </div>

    </div>

  );
}

// Composants enfants
const FeatureCard = ({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) => (
  <div className="bg-blue-50 p-4 rounded-lg text-center">
    <div className="text-blue-600 mx-auto mb-2">{icon}</div>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <p className="text-gray-600">{label}</p>
  </div>
);

const EquipmentItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
    <span className="text-blue-600">{icon}</span>
    <span className="text-gray-700">{label}</span>
  </div>
);