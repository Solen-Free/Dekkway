"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Logement, getLogementById } from "@/Services/api";
import Loader from "@/components/UI/Loader";
import ErrorMessage from "@/components/UI/ErrorMessage";

export default function LogementDetailsPage() {
  const { id } = useParams();
  const [logement, setLogement] = useState<Logement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogement = async () => {
      try {
        if (!id || isNaN(Number(id))) { // Validation de l'ID
          throw new Error("ID de logement invalide");
        }

        setLoading(true);
        const data = await getLogementById(Number(id));
        if (!data) throw new Error("Logement introuvable");
        
        setLogement(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erreur inconnue";
        console.error("Erreur détaillée:", { err, id }); // Log complet
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
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{logement.nom}</h1>
        
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

        <div className="space-y-4">
          <div className="flex items-center text-lg">
            <span className="font-semibold text-gray-600 w-32">Ville:</span>
            <span className="text-gray-800">{logement.ville}</span>
          </div>
          
          <div className="flex items-center text-lg">
            <span className="font-semibold text-gray-600 w-32">Prix:</span>
            <span className="text-[#014F86] font-bold">{logement.prix} FCFA</span>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">{logement.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}