"use client";
import { Heart } from "lucide-react";
import { MapPin } from "lucide-react";

interface CardProps {
  image: string;
  title: string;
  location: string;
  price: string;
}


const Card: React.FC<CardProps> = ({ image, title, location, price }) => {
  return (
    <div className="shadow-lg rounded-3xl overflow-hidden w-full max-w-[280px] md:max-w-[320px] border-2 border-[#FC9B89] relative transition duration-300 hover:scale-110">
      {/* Image */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-[150px] sm:h-[170px] md:h-[180px] object-cover" />
        {/* Icône Favori */}
        <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-[#FC9B89] active:bg-[#FC9B89]">
          <Heart className="text-gray-400 hover:text-[#014F86] active:text-[#014F86] cursor-pointer" size={20} />
        </div>
        

      </div>

      {/* Infos */}
      <div className="p-2">
      <div className="flex justify-between items-baseline">
        <h3 className="text-sm font-bold text-left text-black">{title}</h3>
         <span className="text-[#014F86] font-bold text-base">{price} FCFA</span>
      </div>
        {/* Icône de localisation */}
       <div className="flex items-center gap-2 text-black text-xs pb-2">
         <MapPin size={14} className="text-[#FC9B89]" /> {/* Icône avec couleur */}
         <span>{location}</span>
       </div>

       
        
      </div>

      {/* Bouton Détails */}
      <div className="pb-2 flex justify-center">
        <button className="w-full max-w-[120px] bg-[#014F86] text-white text-center text-sm font-bold py-1 px-3 rounded-3xl hover:bg-[#FC9B89] transition">
          Détails
        </button>
      </div>
    </div>
  );
};




export default Card;
