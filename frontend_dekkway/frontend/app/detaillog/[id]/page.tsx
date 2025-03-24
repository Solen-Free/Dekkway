"use client";
import { useParams } from "next/navigation";
import {
  MapPin, Video, BedDouble, ShowerHead, Utensils,
  Car, Wifi, Snowflake, Microwave, Map, Lock
} from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { z } from 'zod';

// Import des styles nécessaires
import 'leaflet/dist/leaflet.css?url';
import 'leaflet-geosearch/dist/geosearch.css';

// Chargement dynamique de la carte
const MapComponent = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
});

const LogementSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères"),
  price: z.string().regex(/^\d+$/, "Doit être un nombre valide"),
  description: z.string().min(20, "La description doit contenir au moins 20 caractères"),
  location: z.tuple([
    z.number().min(-90).max(90).refine(n => Number(n.toFixed(6))),
    z.number().min(-180).max(180).refine(n => Number(n.toFixed(6)))
  ]),
  image: z.string()
    .refine(val => val.startsWith('/images/'), {
      message: "L'image doit commencer par /images/"
    }),
  video: z.string()
    .refine(val => val.startsWith('/videos/'), {
      message: "La vidéo doit commencer par /videos/"
    }),
  equipments: z.array(z.string().nonempty("L'équipement ne peut pas être vide")).default([]),
  rooms: z.number().int().min(1),
  salons: z.number().int().min(0),
  kitchens: z.number().int().min(0),
  toilets: z.number().int().min(0),
  garage: z.boolean(),
  agent: z.string().min(3, "Le nom de l'agent doit contenir au moins 3 caractères"),
  agentLogo: z.string().optional(), // Validation du logo de l'agent
  address: z.string().min(10, "L'adresse doit contenir au moins 10 caractères").optional()
});

type Logement = z.infer<typeof LogementSchema>;

// Composants annexes
const LoadingSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 animate-pulse space-y-8">
    <div className="h-96 bg-gray-200 rounded-xl" />
    <div className="grid grid-cols-2 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-24 bg-gray-200 rounded-lg" />
      ))}
    </div>
  </div>
);

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="text-center py-8 text-red-600">
    <p>⚠️ {message}</p>
  </div>
);

const SectionContainer = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8 bg-white p-6 rounded-xl shadow-sm w-full md:w-3/4 mx-auto">
    <h2 className="text-xl font-bold text-gray-800 mb-6">{title}</h2>
    {children}
  </section>
);

const FeatureCard = ({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) => (
  <div className="bg-blue-50 p-4 rounded-lg text-center hover:bg-blue-100 transition-colors">
    <div className="text-blue-600 mx-auto mb-2">{icon}</div>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <p className="text-gray-600">{label}</p>
  </div>
);

const getEquipmentIcon = (equipment: string) => {
  const IconComponents = {
    'Climatiseur': Snowflake,
    'Wifi': Wifi,
    'Réfrigérateur': Microwave,
    'Micro-ondes': Microwave,
    'Garage': Car,
    'Cuisine équipée': Utensils
  };

  const Icon = IconComponents[equipment as keyof typeof IconComponents] || Utensils;
  return <Icon className="text-blue-600" size={20} />;
};

const EquipmentItem = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    {getEquipmentIcon(label)}
    <span className="text-gray-700">{label}</span>
  </div>
);

export default function DetailLog() {
  const params = useParams<{ id: string }>();
  const [logement, setLogement] = useState<Logement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogement = async () => {
      if (!params.id) return;

      try {
        const response = await fetch(`/api/logements/${params.id}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erreur ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const validation = LogementSchema.safeParse(data);

        if (!validation.success) {
          const errors = validation.error.issues
            .map(issue => `${issue.path.join('.')}: ${issue.message}`)
            .join('\n');
          throw new Error(`Données invalides:\n${errors}`);
        }

        setLogement(validation.data);

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erreur inconnue";
        console.error('Erreur:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchLogement();
  }, [params.id]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay message={error} />;
  if (!logement) return <ErrorDisplay message="Logement introuvable" />;

  return (
    <div className="max-w-7xl mx-auto px-4 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
          <img
            src={logement.image}
            alt={logement.title}
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.src = '/images/fallback.jpg')}
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">{logement.title}</h1>
            <div className="flex items-center gap-2 text-blue-600">
              <MapPin size={20} />
              <span className="text-lg">{logement.address || "Localisation non précisée"}</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">{logement.price} FCFA/Mois</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border h-60 relative">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Video className="text-blue-600" size={20} /> Visite Virtuelle
            </h3>
            <video 
              className="w-full h-[calc(100%-3.5rem)] object-cover rounded-lg"
              controls
              poster="/images/visite-thumbnail.jpg"
            >
              <source src={logement.video} type="video/mp4" />
            </video>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Lock className="text-white bg-black bg-opacity-50 rounded-full p-2" size={40} />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              className="flex-1 py-2 rounded-lg text-white font-semibold bg-blue-600"
            >
              Réserver
            </button>
            <button
              className="flex-1 py-2 rounded-lg text-white font-semibold bg-blue-600"
            >
              Visite Guidée
            </button>
          </div>
        </div>
      </div>

      <SectionContainer title="Description">
        <p className="text-gray-600 leading-relaxed text-justify">
          {logement.description}
        </p>
      </SectionContainer>

      <SectionContainer title="Caractéristiques">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FeatureCard icon={<BedDouble />} value={logement.rooms} label="Chambres" />
          <FeatureCard icon={<ShowerHead />} value={logement.toilets} label="Salles de bain" />
          <FeatureCard icon={<Utensils />} value={logement.kitchens} label="Cuisines" />
          <FeatureCard icon={<Car />} value={logement.garage ? 1 : 0} label="Garage" />
        </div>
      </SectionContainer>

      <SectionContainer title="Équipements">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {(logement.equipments ?? []).map((equipment, index) => (
            <EquipmentItem key={index} label={equipment} />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer title="Agent Immobilier">
        <div className="flex items-center gap-4">
          <img
            src={logement.agentLogo || "/images/default-agent-logo.png"}
            alt="Logo de l'agent"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-bold text-gray-800">{logement.agent}</p>
            <p className="text-gray-600">Contactez-moi pour plus d'informations</p>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer title="Localisation précise">
        <div className="h-64 rounded-lg overflow-hidden">
          <MapComponent 
            coordinates={logement.location} 
            address={logement.address}
          />
        </div>
        {logement.address && (
          <p className="mt-4 text-gray-600 text-sm">
            {logement.address}
          </p>
        )}
        <p className="text-gray-500 text-xs mt-2">
          Coordonnées GPS :{" "}
          {logement.location[0].toFixed(6)}, {logement.location[1].toFixed(6)}
        </p>
      </SectionContainer>
    </div>
  );
}