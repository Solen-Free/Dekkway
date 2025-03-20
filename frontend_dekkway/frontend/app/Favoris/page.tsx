"use client";
import { useEffect, useState } from 'react';
import Card from '@/components/UI/Card';
import Header from '@/components/header';

interface Logement {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
}

export default function FavorisPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [logements, setLogements] = useState<Logement[]>([]);

  // Charger les favoris au montage initial
  useEffect(() => {
    const loadFavorites = () => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(storedFavorites);
    };
    loadFavorites();
  }, []);

  // Simuler un appel API pour récupérer les logements
  useEffect(() => {
    const fetchLogements = () => {
      // Données mockées (remplacer par un vrai appel API)
      const allLogements: Logement[] = [
        { id: '1', image: '/images/maison.jpg', title: 'Maison à louer', location: 'Grand-Standing, Thiès', price: '500000' },
        { id: '2', image: '/images/maison1.jpg', title: 'Appart à louer', location: 'Centre-Ville, Dakar', price: '300000' },
        { id: '3', image: '/images/maison2.jpg', title: 'Villa à vendre', location: 'Plage, Mbour', price: '1500000' },
        { id: '4', image: '/images/maison3.jpg', title: 'Maison moderne', location: 'Banlieue, Rufisque', price: '800000' },
        { id: '5', image: '/images/maison.jpg', title: 'Maison à louer', location: 'Grand-Standing, Thiès', price: '500000' },
        { id: '6', image: '/images/maison1.jpg', title: 'Appart à louer', location: 'Centre-Ville, Dakar', price: '300000' },
        { id: '7', image: '/images/maison2.jpg', title: 'Villa à vendre', location: 'Plage, Mbour', price: '1500000' },
        { id: '8', image: '/images/maison3.jpg', title: 'Maison moderne', location: 'Banlieue, Rufisque', price: '800000' },
      ];

      // Filtrer pour garder seulement les favoris
      const favoriteLogements = allLogements.filter(logement => 
        favorites.includes(logement.id)
      );
      
      setLogements(favoriteLogements);
    };

    fetchLogements();
  }, [favorites]); // Re-exécuté quand les favoris changent

  // Gérer la suppression d'un favori
  const handleRemove = (id: string) => {
    // Mettre à jour le localStorage
    const updatedFavorites = favorites.filter(favId => favId !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
    // Mettre à jour l'état local
    setFavorites(updatedFavorites);
    
    // Filtrer les logements affichés
    setLogements(prev => prev.filter(logement => logement.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#014F86]">
          Vos Logements Favoris
        </h1>

        {logements.length === 0 ? (
          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg">
              Aucun logement dans vos favoris pour le moment.
            </p>
            <p className="mt-4">
              ❤️ Ajoutez des logements depuis la page d'accueil !
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {logements.map((logement) => (
              <Card
                key={logement.id}
                id={logement.id}
                image={logement.image}
                title={logement.title}
                location={logement.location}
                price={logement.price}
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