"use client";
import { Heart, MapPin, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
// import Image from 'next/image';

interface CardProps {
  id: string;
  banniere: string;
  titre: string;
  quartier: string;
  prix: number;
  isOnFavoritesPage?: boolean;
  onRemove?: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ 
  id, 
  banniere, 
  titre, 
  quartier, 
  prix, 
  isOnFavoritesPage = false, 
  onRemove 
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(id));
  }, [id]);

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

  const handleRemove = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = favorites.filter((favId: string) => favId !== id);
    
    // Mettre à jour localStorage avant d'appeler onRemove
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
    // S'assurer que onRemove est appelé même si c'est le dernier élément
    if (typeof onRemove === 'function') {
      onRemove(id);
    }
  };

  return (
    <div className="group relative w-full max-w-[300px] xs:max-w-[340px] sm:max-w-[320px] md:max-w-[280px] lg:max-w-[300px] xl:max-w-[320px] 
                    mx-auto bg-white rounded-2xl shadow-md hover:shadow-xl border border-[#FC9B89]/30 hover:border-[#FC9B89] 
                    transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative w-full h-35 aspect-[4/3] overflow-hidden rounded-t-2xl">
        <div className="relative w-full h-35">
          <img
            src={`http://localhost:8000${banniere}`}
            alt={titre}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          {!isOnFavoritesPage && (
            <button
              onClick={toggleFavorite}
              className="p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition-all duration-200 
                       transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#FC9B89]"
            >
              <Heart
                className={`w-5 h-5 transition-colors duration-200 ${
                  isFavorite ? 'text-[#014F86] fill-[#FC9B89]' : 'text-gray-400'
                }`}
              />
            </button>
          )}

          {isOnFavoritesPage && (
            <button
              onClick={handleRemove}
              className="p-2 rounded-full bg-white/90 shadow-lg hover:bg-red-50 transition-all duration-200 
                       transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <X className="w-5 h-5 text-red-500" />
            </button>
          )}
        </div>

        {/* Notification */}
        {showNotification && (
          <div className="absolute top-0 left-0 right-0 p-2 bg-green-500 text-white text-sm text-center 
                         transform transition-transform duration-300 animate-fade-in">
            {notificationMessage}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2 h-30">
        {/* Title and Price */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg sm:text-sm font-semibold text-gray-900 line-clamp-1">
            {titre}
          </h3>
          <span className="text-base sm:text-md font-bold text-[#014F86] whitespace-nowrap">
            {prix} FCFA
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-gray-600 mb-4">
          <MapPin className="w-4 h-4 text-[#FC9B89]" />
          <span className="text-xs sm:text-sm truncate">{quartier}</span>
        </div>

        {/* Details Button */}
        <Link
          href={`/detaillog/${id}`}
          className="block w-35 mx-auto py-2 px-2 bg-[#014F86] hover:bg-[#FC9B89] text-white text-center text-sm font-semibold 
                   rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 
                   focus:ring-[#014F86] transform hover:scale-[1.02]"
        >
          Détails
        </Link>
      </div>
    </div>
  );
};

export default Card;