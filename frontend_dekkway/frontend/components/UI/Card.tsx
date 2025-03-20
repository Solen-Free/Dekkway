"use client";
import { Heart, MapPin, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  isOnFavoritesPage?: boolean;
  onRemove?: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ 
  id, 
  image, 
  title, 
  location, 
  price, 
  isOnFavoritesPage = false, 
  onRemove 
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Charger l'état initial des favoris
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(id));
  }, [id]);

  // Gestion du cœur (uniquement sur la page d'accueil)
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((favId: string) => favId !== id);
      setNotificationMessage('Ce logement a été retiré des favoris.');
    } else {
      updatedFavorites = [...favorites, id];
      setNotificationMessage('Ce logement a été ajouté aux favoris !');
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Gestion de la suppression (uniquement sur la page favoris)
  const handleRemove = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = favorites.filter((favId: string) => favId !== id);
    
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    onRemove?.(id);
  };

  return (
    <div className="shadow-lg rounded-3xl overflow-hidden w-full max-w-[280px] md:max-w-[320px] border-2 border-[#FC9B89] relative transition duration-300 hover:scale-110">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-[150px] sm:h-[10px] md:h-[180px] object-cover"
        />

        {/* Cœur - Visible uniquement HORS page favoris */}
        {!isOnFavoritesPage && (
          <div
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-[#FC9B89] cursor-pointer"
            onClick={toggleFavorite}
          >
            <Heart
              className={isFavorite ? 'text-[#014F86] fill-[#FC9B89]' : 'text-gray-400'}
              size={20}
            />
          </div>
        )}

        {/* Croix - Visible uniquement SUR page favoris */}
        {isOnFavoritesPage && (
          <div
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-500 cursor-pointer"
            onClick={handleRemove}
          >
            <X size={20} className="text-red-500 hover:text-white" />
          </div>
        )}

        {/* Notification */}
        {showNotification && (
          <div className="absolute top-0 left-0 w-full bg-green-500 text-white px-4 py-2 text-center rounded-t-lg animate-fade-in">
            {notificationMessage}
          </div>
        )}
      </div>

      {/* Corps de la carte */}
      <div className="p-2">
        <div className="flex justify-between items-baseline">
          <h3 className="text-sm font-bold text-left text-black">{title}</h3>
          <span className="text-[#014F86] font-bold text-base">{price} FCFA</span>
        </div>
        
        <div className="flex items-center gap-2 text-black text-xs pb-2">
          <MapPin size={14} className="text-[#FC9B89]" />
          <span>{location}</span>
        </div>
      </div>

      {/* Bouton Détails */}
      <div className="pb-2 flex justify-center">
        <Link
          href={`/detaillog/${id}`}
          className="w-full max-w-[120px] bg-[#014F86] text-white text-center text-sm font-bold py-1 px-3 rounded-3xl hover:bg-[#FC9B89] transition"
        >
          Détails
        </Link>
      </div>
    </div>
  );
};

export default Card;