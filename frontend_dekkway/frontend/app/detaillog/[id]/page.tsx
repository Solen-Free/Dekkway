
// -------chat------
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import {
  MapPin,
  Video,
  BedDouble,
  ShowerHead,
  Utensils,
  Car,
  Wifi,
  Snowflake,
  Lock,
  Phone,
  Droplets
} from "lucide-react";

// Import des styles nécessaires
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

// Chargement dynamique de la carte
const MapComponent = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />,
});

// Types des données
type Media = {
  fichier: string;
  type: string;
  date_ajout: string;
};

type Agent = {
  nom: string;
  prenom: string;
  photo_profil: string;
  telephone: string;
};

type Logement = {
  type: string;
  description: string;
  region: string;
  quartier: string;
  prix: string;
  video: string;
  nombre_de_chambres: number;
  equipements: {
    [key: string]: boolean;
  };
  latitude: number;
  longitude: number;
  medias: Media[];
  agent?: Agent;
  salons?: number;
  cuisines?: number;
  salles_de_bain?: number;
  garage?: boolean;
  adresse?: string;
};

function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
        <Image
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          width={800}
          height={600}
          className="w-full h-96 object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}

const FeatureCard = ({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) => (
  <div className="bg-blue-50 p-4 rounded-lg text-center hover:bg-blue-100 transition-colors">
    <div className="text-blue-600 mx-auto mb-2">{icon}</div>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <p className="text-gray-600">{label}</p>
  </div>
);

const getEquipmentIcon = (equipment: string) => {
  const IconComponents: Record<string, React.ComponentType<any>> = {
    'Climatiseur': Snowflake,
    'Wifi': Wifi,
    'Piscine': Droplets
  };

  const Icon = IconComponents[equipment] || Utensils;
  return <Icon className="text-blue-600" size={20} />;
};

export default function DetailLog() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [logement, setLogement] = useState<Logement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleReservation = () => {
    if (logement) {
      const propertyData = {
        id: params?.id,
        nom: `${logement.type} - ${logement.region} - ${logement.quartier}`,
        ville: `${logement.region}, ${logement.quartier}`,
        prix: typeof logement.prix === 'string' 
          ? parseInt(logement.prix.split('.')[0]) 
          : logement.prix,
        image: logement.medias?.find(media => media.type === "image")?.fichier || ''
      };
      router.push(`/Reservloge?property=${encodeURIComponent(JSON.stringify(propertyData))}`);
    }
  };
  useEffect(() => {
  const fetchLogement = async () => {
    if (!params?.id) {
      setError("Identifiant du logement manquant");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/details-logements/${params.id}/`);
      setLogement(response.data as Logement);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  fetchLogement();
}, [params]);

  

  if (loading) return <div className="p-4 text-center">Chargement...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;
  if (!logement) return <div className="p-4 text-center">Logement introuvable</div>;

  // Prépare les données
  const title = `${logement.type} - ${logement.region} - ${logement.quartier}`;
  const images = logement.medias
    ? logement.medias
        .filter((media) => media.type === "image")
        .map((media) => media.fichier)
    : [];

  // Ajoutez cette ligne pour récupérer la vidéo
  const video = logement.medias?.find((media) => media.type === "video")?.fichier;

  const equipements = logement.equipements
    ? Object.entries(logement.equipements)
        .filter(([_, value]) => value)
        .map(([key]) => key)
    : [];

  return (
    <div className="max-w-7xl mx-auto p-4 font-sans">
      {/* Header avec carousel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          {images.length > 0 ? (
            <ImageCarousel images={images} />
          ) : (
            <div className="h-[600px] bg-gray-200 flex items-center justify-center rounded-lg">
              <p>Aucune image disponible</p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <MapPin size={20} />
              <span className="text-lg">
                {logement.quartier}, {logement.region}
                {logement.adresse && ` - ${logement.adresse}`}
              </span>
            </div>
            <p className="text-3xl font-bold text-blue-600 mb-4">
              {typeof logement.prix === 'string' 
                ? logement.prix.split('.')[0] 
                : logement.prix} FCFA/Mois
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {equipements.map((equip, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                >
                  {equip.charAt(0).toUpperCase() + equip.slice(1)}
                </div>
              ))}
            </div>
          </div>
          
          {/* Visite Virtuelle */}

          {video && (
            <div className="bg-white p-6 rounded-xl shadow-sm border h-60 relative mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Video className="text-blue-600" size={20} /> Visite Virtuelle
              </h3>
              <video 
                className="w-full h-[calc(100%-3.5rem)] object-cover rounded-lg"
                poster="/images/visite-thumbnail.jpg"
              >
                <source src={video} type="video/mp4" />
              </video>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Lock className="text-white bg-black bg-opacity-50 rounded-full p-2" size={40} />
              </div>
            </div>
          )}
          
          
          <div className="flex gap-4 w-full">
            <button 
              onClick={handleReservation}
              className="flex-1 py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Réserver
            </button>
            <Link href={`/VisiteGuidee?id=${params.id}`} className="flex-1">
              <button className="w-full py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors">
                Visite Guidée
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Description */}
      <section className="mb-8 bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
        <p className="text-gray-600 leading-relaxed text-justify">
          {logement.description}
        </p>
      </section>

      {/* Caractéristiques */}
      <section className="mb-8 bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Caractéristiques
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FeatureCard 
            icon={<BedDouble />} 
            value={logement.nombre_de_chambres} 
            label="Chambres" 
          />
          {logement.salles_de_bain !== undefined && (
            <FeatureCard 
              icon={<ShowerHead />} 
              value={logement.salles_de_bain} 
              label="Salles de bain" 
            />
          )}
          {logement.cuisines !== undefined && (
            <FeatureCard 
              icon={<Utensils />} 
              value={logement.cuisines} 
              label="Cuisines" 
            />
          )}
          {logement.garage !== undefined && (
            <FeatureCard 
              icon={<Car />} 
              value={logement.garage ? 1 : 0} 
              label="Garage" 
            />
          )}
        </div>
      </section>

      {/* Équipements */}
      {equipements.length > 0 && (
        <section className="mb-8 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Équipements</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {equipements.map((equip, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                {getEquipmentIcon(equip)}
                <span className="text-gray-700">
                  {equip.charAt(0).toUpperCase() + equip.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Agent Immobilier */}
      {logement.agent && (
        <section className="mb-8 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Agent Immobilier</h2>
          <div className="flex items-center gap-4">
            <img
              src={logement.agent.photo_profil || "/images/default-agent-logo.png"}
              alt="Logo de l'agent"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="text-lg font-bold text-gray-800">{logement.agent.prenom} {logement.agent.nom}</p>
              {/* <p className="text-gray-600 flex items-center gap-2">
                <Phone size={16} /> {logement.agent.telephone}
              </p> */}
              {/* <p className="text-gray-600 mt-1">Contactez-moi pour plus d&apos;informations</p> */}
            </div>
          </div>
        </section>
      )}

      {/* Localisation */}
      <section className="mb-8 bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Localisation précise
        </h2>
        <div className="h-64 rounded-lg overflow-hidden">
          <MapComponent
            coordinates={[logement.latitude, logement.longitude]}
            address={`${logement.quartier}, ${logement.region}`}
          />
        </div>
        {logement.adresse && (
          <p className="mt-2 text-gray-600">{logement.adresse}</p>
        )}
        <p className="mt-2 text-gray-500 text-sm">
          Coordonnées GPS : {logement.latitude?.toFixed(6) || 'N/A'},{" "}
          {logement.longitude?.toFixed(6) || 'N/A'}
        </p>
      </section>
    </div>
  );
}