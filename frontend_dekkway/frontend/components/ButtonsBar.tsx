"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

// Types de logement
const types = [
  { label: "Tout", value: null },
  { label: "Maison", value: "maison" },
  { label: "Appartement", value: "appartement" },
  { label: "Studio", value: "studio" },
  { label: "Villa", value: "villa" },
  { label: "Co-location", value: "colocation" },
];

// Options de durée
const durees = [
  { label: "Longue durée", value: "longue durée" },
  { label: "Courte durée", value: "courte durée" },
];

interface ButtonsBarProps {
  onSelectTypeAction: (type: string | null) => void;
  onSelectDureeAction?: (duree: string | null) => void;
}

export default function ButtonsBar({ onSelectTypeAction, onSelectDureeAction }: ButtonsBarProps) {
  const searchParams = useSearchParams();
  const currentType = searchParams.get('type');
  const currentDuree = searchParams.get('duree');
  
  // États locaux pour le changement de couleur immédiat
  const [selectedDuree, setSelectedDuree] = useState<string | null>(currentDuree);
  const [selectedType, setSelectedType] = useState<string | null>(currentType);
  
  // Synchroniser les états locaux avec les paramètres d'URL
  useEffect(() => {
    setSelectedDuree(currentDuree);
    setSelectedType(currentType);
  }, [currentDuree, currentType]);

  return (
    <div className="max-w-screen-xl mx-auto px-2 sm:px-4 md:px-6">
      <div className="my-4 sm:my-5 md:my-6 relative">
        {/* Barre de défilement horizontale avec indicateurs */}
        <div className="flex flex-nowrap overflow-x-auto scrollbar-hide items-center gap-2 sm:gap-3 md:gap-4 pb-2 px-1 scroll-smooth"
          style={{
            msOverflowStyle: 'none', /* IE and Edge */
            scrollbarWidth: 'none', /* Firefox */
          }}>
          {/* Types de logement */}
          {types.map((type) => {
            // Utiliser l'état local pour un changement visuel immédiat
            const isActive = type.value ? selectedType === type.value : !selectedType;
            
            return (
              <button
                key={type.value || "Tout"}
                onClick={() => {
                  // Mettre à jour l'état local immédiatement pour le changement visuel
                  const newValue = type.value === null ? null : type.value.toLowerCase();
                  setSelectedType(newValue);
                  
                  // Appeler la fonction de callback pour mettre à jour l'URL
                  onSelectTypeAction(newValue);
                }}
                className={`
                  shrink-0
                  px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-3 
                  rounded-full text-xs sm:text-sm md:text-base 
                  text-white transition-transform duration-200 
                  hover:scale-105 active:scale-95
                  whitespace-nowrap
                  ${
                    isActive
                      ? "bg-[#FC9B89] scale-105" // Style actif
                      : "bg-[#014F86] hover:bg-[#FC9B89]/80" // Style inactif
                  }
                `}
                aria-label={`Filtrer par ${type.label}`}
              >
                {type.label}
              </button>
            );
          })}
          
          {/* Options de durée */}
          {durees.map((duree) => {
            // Utiliser l'état local pour un changement visuel immédiat
            const isActive = selectedDuree === duree.value.toLowerCase();
            
            return (
              <button
                key={duree.value}
                onClick={() => {
                  // Mettre à jour l'état local immédiatement pour le changement visuel
                  const newValue = isActive ? null : duree.value.toLowerCase();
                  setSelectedDuree(newValue);
                  
                  // Appeler la fonction de callback pour mettre à jour l'URL
                  if (onSelectDureeAction) {
                    onSelectDureeAction(isActive ? null : duree.value);
                  }
                }}
                className={`
                  shrink-0
                  px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-3 
                  rounded-full text-xs sm:text-sm md:text-base 
                  text-white transition-transform duration-200 
                  hover:scale-105 active:scale-95
                  whitespace-nowrap
                  ${
                    isActive
                      ? "bg-[#FC9B89] scale-105" // Style actif
                      : "bg-[#014F86] hover:bg-[#FC9B89]/80" // Style inactif
                  }
                `}
                aria-label={`Filtrer par ${duree.label}`}
              >
                {duree.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}