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
import Loader from "@/components/UI/Loader";
import { migrateCommonData } from '../utils/migrateToCookies';
import { getCookie, setCookie } from '../utils/cookies';

interface Logement {
  id: string;
  banniere: string;
  titre: string;
  quartier: string;
  type: string;
  prix: number;
  bedrooms?: number;
  equipements?: string[];
  city?: string;
}

// Remove the local Loader component since you're already importing it

export default function Home() {
  const [logements, setLogements] = useState<Logement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // Initialiser à false par défaut
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Migrer les données de localStorage vers les cookies
    migrateCommonData();
    
    // Vérifier si c'est la première visite de l'utilisateur
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore") || getCookie("hasVisitedBefore");
    
    if (!hasVisitedBefore) {
      // Si c'est la première visite, afficher la modale
      setShowModal(true);
      // Marquer que l'utilisateur a déjà visité le site
      setCookie("hasVisitedBefore", "true");
      localStorage.setItem("hasVisitedBefore", "true");
    }
  }, []);

  const handleCloseModal = () => {
    // Ferme la modale
    setShowModal(false);
  };

  // Filtrage client-side existant pour les types
  const filteredLogements = selectedType 
    ? logements.filter(logement => logement.type === selectedType)
    : logements;

  // Nouvelle récupération avec filtres serveur
  useEffect(() => {
    const fetchLogements = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams();
        
        // Conversion des paramètres pour le backend Django
        const paramMapping: Record<string, string> = {
          'prix_min': 'prix_min',
          'prix_max': 'prix_max',
          'nombre_de_chambres': 'nombre_de_chambres',
          'equipements': 'equipements',
          'region': 'region',
          'lat': 'lat',
          'lng': 'lng',
          'rayon': 'rayon',
          'search': 'search'
        };

        // Ajouter tous les paramètres valides
        Object.entries(paramMapping).forEach(([key, value]) => {
          const paramValue = searchParams.get(key);
          if (paramValue && paramValue.trim() !== '') {
            params.append(value, paramValue);
          }
        });

        // Traitement du paramètre de recherche
        const searchQuery = searchParams.get('search');
        if (searchQuery && searchQuery.trim() !== '') {
          params.append('search', searchQuery.trim());
        }

        // Traitement spécial pour type et durée
        const type = searchParams.get('type');
        if (type) {
          params.append('type', type.toLowerCase());
        }

        const duree = searchParams.get('duree');
        if (duree) {
          params.append('duree', duree.toLowerCase());
        }

        // Effectuer la requête vers le backend Django
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rech-logements/?${params.toString()}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Une erreur est survenue lors de la récupération des logements");
        }

        const data: Logement[] = await response.json();
      
        // Formatage et validation des données
        const formattedData = data.map(logement => ({
          ...logement,
          prix: typeof logement.prix === 'number' ? logement.prix : Number(logement.prix)
        }));
    
        setLogements(formattedData);
      } catch (err: any) {
        console.error('Erreur lors de la récupération des logements:', err);
        setError(err.message || "Une erreur est survenue lors de la récupération des logements");
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchLogements, 300); // Délai pour éviter les requêtes trop fréquentes
    return () => clearTimeout(timeoutId);
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
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30"
          onClick={handleCloseModal} // Ferme la modale quand on clique sur l'overlay
        >
          <div 
            className="bg-white rounded-lg shadow-lg p-4 max-w-xs w-full flex flex-col items-center relative"
            onClick={(e) => e.stopPropagation()} // Empêche la fermeture quand on clique sur la modale elle-même
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              onClick={handleCloseModal}
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
      <div className={`transition-all duration-300 ${showModal ? 'blur-sm pointer-events-none select-none' : ''}`}>
        {/* Header */}
        <header />
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
        <div className="flex flex-col md:flex-row items-center justify-start px-4 sm:px-6 lg:px-8 mt-8 gap-4 md:gap-6">
          <Buttons 
            text="Devenir Bailleur" 
            fontWeight="font-bold" 
            textSize="text-lg sm:text-lg md:text-2xl"  
            href="/InscriptionBailleur"
          />
          <h1 className="text-base sm:text-lg md:text-xl font-bold text-black text-center md:text-left w-full break-words text-wrap">
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
              <div className="col-span-full">
                <Loader />
              </div>
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
                  prix={Number(logement.prix)}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                Aucun logement ne correspond à vos critères
              </div>
            )}
          </div>
        </div>
        {/* Footer */}
        <footer />
      </div>
    </div>
  );
}

