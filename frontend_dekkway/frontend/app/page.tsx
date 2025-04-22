"use client";
import { useState, useEffect } from "react";
import Carousel from "@/components/Carousel";
import Buttons from "@/components/buttons";
import Card from "@/components/UI/Card";
import ButtonsBar from "@/components/ButtonsBar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Logement {
  id: string;
  banniere: string;
  titre: string;
  quartier: string;
  price: string;
  type: string;
  prix: number;
  bedrooms?: number;
  equipements?: string[];
  city?: string;
}

const Loader = () => (
  <div className="flex justify-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FC9B89]"></div>
  </div>
);

export default function Home() {
  const [logements, setLogements] = useState<Logement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setShowModal(true);
  }, []);

  // Filtrage client-side existant pour les types
  const filteredLogements = selectedType 
    ? logements.filter(logement => logement.type === selectedType)
    : logements;

  // Nouvelle récupération avec filtres serveur
  useEffect(() => {
    const fetchLogements = async () => {
      try {
        const params = new URLSearchParams();
        
        // Conversion des paramètres pour le backend Django
        if (searchParams.get('prix_min')) params.append('prix_min', searchParams.get('prix_min')!);
        if (searchParams.get('prix_max')) params.append('prix_max', searchParams.get('prix_max')!);
        if (searchParams.get('nombre_de_chambres')) params.append('nombre_de_chambres', searchParams.get('nombre_de_chambres')!);
        if (searchParams.get('equipements')) params.append('equipements', searchParams.get('equipements')!);
        if (searchParams.get('region')) params.append('region', searchParams.get('region')!);
        
        // Correction pour le type et la durée
        if (searchParams.get('type')) {
          params.append('type', searchParams.get('type')!.toLowerCase());
        }
        
        if (searchParams.get('duree')) {
          // S'assurer que la valeur correspond exactement aux choix du modèle Django
          params.append('duree', searchParams.get('duree')!.toLowerCase());
        }

        // Ajout des paramètres de géolocalisation
        if (searchParams.get('lat')) params.append('lat', searchParams.get('lat')!);
        if (searchParams.get('lng')) params.append('lng', searchParams.get('lng')!);
        if (searchParams.get('rayon')) params.append('rayon', searchParams.get('rayon')!);

        // Effectuer la requête même si aucun paramètre n'est défini
        const response = await fetch(`http://127.0.0.1:8000/rech-logements/?${params.toString()}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erreur serveur");
        }

        const data: Logement[] = await response.json();
      
        // Formatage du prix sans changer le nom de la propriété
        const formattedData = data.map(logement => ({
          ...logement,
          prix: logement.prix // Conserve le nom 'prix' mais pourrait formater ici
        }));
    
        setLogements(formattedData);
      } catch (err: any) {
        setError(err.message);
        setTimeout(() => setError(null), 5000);
      } finally {
        setLoading(false);
      }
    };

    fetchLogements();
  }, [searchParams]);
  // Gestion des filtres de type et durée
  const handleSelectTypeAction = (type: string | null) => {
    const newParams = new URLSearchParams(searchParams.toString()); // Préserve les paramètres existants
    
    if (type) {
      newParams.set('type', type.toLowerCase());
    } else {
      newParams.delete('type');
    }
    
    // Réinitialise la pagination si nécessaire
    newParams.delete('page'); 
    
    router.push(`/?${newParams.toString()}`);
  };

  // Gestion du filtre de durée
  const handleSelectDureeAction = (duree: string | null) => {
    const newParams = new URLSearchParams(searchParams.toString()); // Préserve les paramètres existants
    
    if (duree) {
      newParams.set('duree', duree.toLowerCase());
    } else {
      newParams.delete('duree');
    }
    
    // Réinitialise la pagination si nécessaire
    newParams.delete('page');
    
    router.push(`/?${newParams.toString()}`);
  };

  return (
    <div className="w-full min-h-screen">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs w-full flex flex-col items-center relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              onClick={() => setShowModal(false)}
              aria-label="Fermer la modale"
            >
              ×
            </button>
            <Image
              src="/images/pop.jpg"
              alt="Pop-up"
              width={300}
              height={300}
              className="w-full h-auto rounded"
              priority
            />
          </div>
        </div>
      )}
      <div className={`w-full min-h-screen transition-all duration-300 ${showModal ? 'blur-sm pointer-events-none select-none' : ''}`}>
        {/* Section Carousel */}
        <div className="w-full">
          <Carousel />
        </div>
        <ButtonsBar 
          onSelectTypeAction={handleSelectTypeAction}
          onSelectDureeAction={handleSelectDureeAction}
        />

        {/* Titre principal */}
        <div className="flex flex-col items-center mt-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#FC9B89] font-bold text-center">
            Rechercher votre logement dès maintenant !
          </h1>
        </div>

        {/* Section pour les bailleurs */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-start px-4 sm:px-6 lg:px-8 mt-8 gap-4">
          <Buttons 
            text="Devenir Bailleur" 
            fontWeight="font-bold" 
            textSize="text-xl sm:text-2xl"  
            href="/InscriptionBailleur"
          />
          <h1 className="text-lg sm:text-xl font-bold text-black">
            <span className="animate-typewriter block">
              Vous avez la possibilité de vendre vos propriétés sur notre plateforme !
            </span>
          </h1>
        </div>

        {/* Section des logements récents */}
        <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 mt-8">
          <h1 className="font-bold text-[#014F86] text-lg sm:text-xl mb-6">
            {searchParams.toString() ? "Résultats de recherche" : "Les plus récents"}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
              <Loader />
            ) : error ? (
              <div className="col-span-full text-center text-red-500">
                {error}
              </div>
            ) : logements.length > 0 ? (
              logements.map((logement) => (
                <Card 
                  key={logement.id}
                  id={logement.id}
                  banniere={logement.banniere}
                  titre={logement.titre}
                  quartier={logement.quartier}
                  prix={logement.prix}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                Aucun logement ne correspond à vos critères
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

