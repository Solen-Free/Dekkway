"use client";

import { useSearchParams } from "next/navigation";

// Types de logement
const types = [
  { label: "Tout", value: null },
  { label: "Maison", value: "maison" },
  { label: "Appartement", value: "appartement" },
  { label: "Studio", value: "studio" },
  { label: "Villa", value: "villa" },
  { label: "Co-location", value: "colocation" },
  { label: "Localisation", value: "localisation" },
];

// Options de durée
const durees = [
  { label: "Longue durée", value: "longuedurée" },
  { label: "Courte durée", value: "courtedurée" },
];

interface ButtonsBarProps {
  onSelectTypeAction: (type: string | null) => void;
  onSelectDureeAction?: (duree: string | null) => void;
}

export default function ButtonsBar({ onSelectTypeAction, onSelectDureeAction }: ButtonsBarProps) {
  const searchParams = useSearchParams();
  const currentType = searchParams.get('type');
  const currentDuree = searchParams.get('duree');

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="my-6">
        {/* Tous les boutons sur une seule ligne */}
        <div className="flex flex-nowrap overflow-x-auto scrollbar-hide items-center justify-center gap-4">
          {/* Types de logement */}
          {types.map((type) => {
            const isActive = type.value ? currentType === type.value : !currentType;
            
            return (
              <button
                key={type.value || "Tout"}
                onClick={() => {
                  if (type.value === null) {
                    onSelectTypeAction(null);
                  } else {
                    onSelectTypeAction(type.value.toLowerCase());
                  }
                }}
                className={`
                  shrink-0
                  px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 
                  rounded-full text-xs sm:text-sm md:text-base 
                  text-white transition-transform duration-200 
                  hover:scale-105 active:scale-95
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
            const isActive = currentDuree === duree.value;
            
            return (
              <button
                key={duree.value}
                onClick={() => {
                  if (onSelectDureeAction) {
                    onSelectDureeAction(isActive ? null : duree.value);
                  }
                }}
                className={`
                  shrink-0
                  px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 
                  rounded-full text-xs sm:text-sm md:text-base 
                  text-white transition-transform duration-200 
                  hover:scale-105 active:scale-95
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