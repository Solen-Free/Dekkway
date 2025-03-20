"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Logement, getLogementById } from "@/Services/api";
import Loader from "@/components/UI/Loader";
import ErrorMessage from "@/components/UI/ErrorMessage";
import Link from 'next/link';

export default function LogementDetailsPage() {
  const { id } = useParams();
  const [logement, setLogement] = useState<Logement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogement = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!id || typeof id !== "string") {
          throw new Error("ID de logement invalide");
        }
        
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
          throw new Error("L'ID doit être un nombre valide");
        }

        const data = await getLogementById(numericId);
        if (!data) throw new Error("Logement introuvable");
        
        setLogement(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erreur inconnue";
        console.error("Erreur détaillée:", { err, id });
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogement();
  }, [id]);

  if (loading) return <Loader />;
  
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  if (!logement) return <ErrorMessage message="Aucun logement trouvé" />;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {logement.nom}
        </h1>
        
        {/* Image principale */}
        <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
          <img 
            src={logement.image} 
            alt={logement.nom} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
            }}
          />
        </div>

        {/* Informations de base */}
        <div className="space-y-4">
          <div className="flex items-center text-lg">
            <span className="font-semibold text-gray-600 w-32">Ville:</span>
            <span className="text-gray-800">{logement.ville}</span>
          </div>
          
          <div className="flex items-center text-lg">
            <span className="font-semibold text-gray-600 w-32">Prix:</span>
            <span className="text-[#014F86] font-bold">
              {logement.prix.toLocaleString()} FCFA/mois
            </span>
          </div>

          {/* Caractéristiques */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Caractéristiques</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <span className="text-gray-600 w-32">Chambres</span>
                <span className="text-gray-800">{logement.caracteristiques.chambres}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 w-32">Salon</span>
                <span className="text-gray-800">{logement.caracteristiques.salon}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 w-32">Cuisine</span>
                <span className="text-gray-800">
                  {logement.caracteristiques.cuisine > 0 ? 'Équipée' : 'Non équipée'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 w-32">Toilettes</span>
                <span className="text-gray-800">{logement.caracteristiques.toilettes}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 w-32">Garage</span>
                <span className="text-gray-800">
                  {logement.caracteristiques.garage > 0 ? 
                    `${logement.caracteristiques.garage} place(s)` : 'Non'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Équipements */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Équipements</h2>
            <div className="flex flex-wrap gap-2">
              {logement.equipements.map((equipement, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {equipement}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {logement.description}
            </p>
          </div>

          {/* Bouton de réservation */}
          <div className="mt-8">
            <Link
              href={{
                pathname: '/Reservloge',
                query: {
                  property: JSON.stringify({
                    id: logement.id,
                    nom: logement.nom,
                    ville: logement.ville,
                    prix: logement.prix,
                    image: logement.image
                  })
                }
              }}
              className="bg-[#014F86] text-white px-6 py-3 rounded-lg hover:bg-[#FC9B89] transition-colors block text-center"
            >
              Réserver ce logement
            </Link>
          </div>

          {/* Propriétaire */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Propriétaire</h2>
            <div className="flex items-center gap-4">
              <img 
                src={logement.proprietaire.logo} 
                alt={`Logo ${logement.proprietaire.nom}`}
                className="w-16 h-16 object-contain"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <span className="text-gray-800 font-medium">
                {logement.proprietaire.nom}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}