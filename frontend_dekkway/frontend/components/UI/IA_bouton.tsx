"use client"; // Marque ce fichier comme côté client

import React, { useState } from "react";
import Assistance from "@/components/Assistance"; // Assure-toi que le chemin d'import est correct

const IA_bouton: React.FC = () => {
  const [isAssistanceVisible, setIsAssistanceVisible] = useState<boolean>(false);

  // Fonction pour basculer l'affichage de l'Assistance
  const toggleAssistance = () => {
    setIsAssistanceVisible(!isAssistanceVisible);
  };

  return (
    <div className="relative">
      {/* Le composant Assistance qui apparaît juste au-dessus du bouton */}
      {isAssistanceVisible && (
        <div className="fixed bottom-0 right-6 z-50 w-full max-w-md">
          <Assistance />
        </div>
      )}

      {/* Le bouton IA */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleAssistance}
          className="w-14 h-14 rounded-full bg-[#FC9B89] font-bold text-center text-white hover:bg-[#014F86] items-center transition-all duration-350 
          shadow-md hover:shadow-xl hover:scale-105 border border-black"
        >
          {/* Le texte du bouton change selon l'état */}
          <h1 className="left-4 text-2xl items-center">{isAssistanceVisible ? "X" : "IA"}</h1>
        </button>
      </div>
    </div>
  );
};

export default IA_bouton;
