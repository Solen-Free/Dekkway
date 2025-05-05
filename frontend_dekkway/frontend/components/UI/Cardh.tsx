import React from "react";
import { MapPin } from "lucide-react";
import Link from "next/link";

interface CardhProps {
  image: string;
  title: string;
  location: string;
  price: string;
  id?: string;
  transactionId?: string;
}

const Cardh: React.FC<CardhProps> = ({ image, title, location, price, id, transactionId }) => {
  // Construire l'URL pour la page de détails
  const detailsUrl = id && transactionId 
    ? `/Reservations/details/${id}?transactionId=${transactionId}` 
    : `/properties/${id}`;

  return (
    <div className="flex w-full max-w-[550px] p-3 border border-red-300 rounded-xl shadow-md bg-white">
      {/* Image */}
      <div className="relative">
        <img className="w-32 h-24 object-cover rounded-2xl border border-gray-200" src={image} alt={title} />
      </div>

      {/* Informations */}
      <div className="flex flex-col flex-1 ml-4 justify-between">
        <h2 className="font-bold text-lg text-gray-900">{title}</h2>

        {/* Localisation avec icône */}
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4 text-[#fc9b89]" />
          <span className="text-gray-500 text-xs">{location}</span>
        </div>

        {/* Prix */}
        <span className="text-[#003366] font-bold text-sm">{price}</span>
      </div>

      {/* Bouton Voir */}
      <div className="flex items-end">
        <Link href={detailsUrl}>
          <button className="bg-[#003366] text-white px-10 py-[4px] rounded-full font-semibold text-sm hover:bg-blue-900 transition">
            Voir
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cardh;
