"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/UI/Card";
import Header from "@/components/header";

interface Logement {
  id: string;
  image: string;
  title: string;
  location: string;
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
        const response = await axios.get<Logement[]>("http://localhost:8000/favoris");

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
          <p className="text-center text-lg text-gray-600">Chargement des favoris...</p>
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
                image={logement.image}
                title={logement.title}
                location={logement.location}
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
