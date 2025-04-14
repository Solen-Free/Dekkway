import React from "react";

interface CardServiceProps {
  image: string;
  title: string;
  date: string;
}

const CardService: React.FC<CardServiceProps> = ({ image, title, date }) => {
  return (
    <div className="flex w-full h-25 max-w-[750px] p-0 border border-[#fc9b89] rounded-[20px] shadow-md bg-white relative overflow-hidden">
      {/* Conteneur de l'image */}
     
        <img
          className="w-50 h-30"
          src={image}
          alt={title}
        />
      

      {/* Contenu aligné à droite */}
      <div className="flex flex-1 flex-col justify-center items-end pr-6">
        {/* Titre aligné à droite */}
        <h2 className="font-bold text-lg text-gray-900 text-right">{title}</h2>
        
        {/* Date alignée sous le titre */}
        <span className="text-gray-500 text-sm text-right mt-1">{date}</span>

        {/* Bouton "Voir détails" en dessous et aligné à droite */}
        <button className="mt-2 bg-[#003366] text-white px-4 py-1 rounded-full font-semibold text-sm hover:bg-blue-900 transition">
          Voir détails
        </button>
      </div>
    </div>
  );
};

export default CardService;
