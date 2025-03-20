"use client";
import { useState, useEffect } from "react";
import { getLogements, Logement } from "@/Services/api";
import Card from "@/components/UI/Card";

interface LogementsListProps {
  type?: string | null;
}

const LogementsList: React.FC<LogementsListProps> = ({ type }) => {
  const [allLogements, setAllLogements] = useState<Logement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Normalise le type pour la comparaison
  const normalizedType = type?.toLowerCase().trim();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getLogements();
        setAllLogements(data);

        // Debug: vérifie les types reçus
        console.log("Types de logements disponibles:", 
          [...new Set(data.map(l => l.type?.toLowerCase()))]
        );
        
      } catch (err) {
        console.error("Erreur API:", err);
        setError(err instanceof Error ? err.message : "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrage amélioré avec normalisation
  const filteredLogements = normalizedType
    ? allLogements.filter(logement => 
        logement.type?.toLowerCase().trim() === normalizedType
      )
    : allLogements;

  // Debug: vérifie le filtrage
  useEffect(() => {
    console.log("Type sélectionné:", normalizedType);
    console.log("Logements filtrés:", filteredLogements);
  }, [normalizedType, filteredLogements]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#014F86] border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Chargement des logements...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg">
        <p className="text-red-600 font-semibold">Erreur : {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-[#014F86] text-white px-6 py-2 rounded-lg hover:bg-[#FC9B89] transition"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (filteredLogements.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">
          {type 
            ? `Aucun logement trouvé pour "${type}"`
            : "Aucun logement disponible actuellement"}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Essayez de modifier vos critères de recherche
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {filteredLogements.map((logement) => (
        <Card
          key={logement.id}
          id={logement.id}
          image={logement.image}
          title={logement.nom}
          location={logement.ville}
          price={logement.prix}
        />
      ))}
    </div>
  );
};

export default LogementsList;