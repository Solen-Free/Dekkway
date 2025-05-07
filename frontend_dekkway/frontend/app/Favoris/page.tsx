"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/UI/Card";
import Header from "@/components/header";
import Loader from "@/components/UI/Loader";

interface Logement {
  id: string;
  banniere: string;
  titre: string;
  quartier: string;
  prix: number;
}

export default function FavorisPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [logements, setLogements] = useState<Logement[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Indicateur de chargement
  const [error, setError] = useState<string | null>(null); // Gestion des erreurs

  // Charger les favoris depuis localStorage
  useEffect(() => {
    const loadFavorites = () => {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavorites(storedFavorites);
    };
    loadFavorites();
  }, []);

  // Récupérer les logements depuis JSON Server
  useEffect(() => {
    const fetchLogements = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<Logement[]>(`${process.env.NEXT_PUBLIC_API_URL}/rech-logements/`);

        // Filtrer pour ne garder que les logements favoris
        const favoriteLogements = response.data.filter((logement) =>
          favorites.includes(logement.id)
        );

        setLogements(favoriteLogements);
      } catch (err) {
        setError("Impossible de charger les logements. Vérifiez votre connexion.");
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchLogements();
    } else {
      setLogements([]); // Vider la liste des logements quand il n'y a plus de favoris
      setLoading(false); // Pas de favoris, donc on arrête le chargement
    }
  }, [favorites]);

  // Gérer la suppression d'un favori
  const handleRemove = (id: string) => {
    const updatedFavorites = favorites.filter((favId) => favId !== id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#014F86]">
          Vos Logements Favoris
        </h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : logements.length === 0 ? (
          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg">
              Aucun logement dans vos favoris pour le moment.
            </p>
            <p className="mt-4">❤️ Ajoutez des logements depuis la page d'accueil !</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {logements.map((logement) => (
              <Card
                key={logement.id}
                id={logement.id}
                banniere={logement.banniere}
                titre={logement.titre}
                quartier={logement.quartier}
                prix={logement.prix}
                isOnFavoritesPage={true}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// Utilisation dans d'autres pages

// Vous pouvez également utiliser ce Loader dans d'autres pages, comme la page des favoris :
