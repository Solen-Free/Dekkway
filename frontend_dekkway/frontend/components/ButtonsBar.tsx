"use client";

import { useSearchParams } from "next/navigation";

const types = [
  { label: "Tout", value: null },
  { label: "Maison", value: "maison" },
  { label: "Appartement", value: "appartement" },
  { label: "Studio", value: "studio" },
  { label: "Villa", value: "villa" },
  { label: "Co-location", value: "colocation" },
  { label: "Longue durée", value: "longuedurée" },
  { label: "Courte durée", value: "courtedurée" }, // Faute corrigée
  { label: "Localisation", value: "localisation" },
];

interface ButtonsBarProps {
  onSelectTypeAction: (queryString: string) => void;
}

export default function ButtonsBar({ onSelectTypeAction }: ButtonsBarProps) {
  const searchParams = useSearchParams();
  const currentType = searchParams.get('type');
  const currentSearch = searchParams.get('search');

  const handleTypeClick = (typeValue: string | null) => {
    // Conserver la recherche existante si présente
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    
    if (typeValue) {
      params.set('type', typeValue);
    } else {
      params.delete('type');
    }
    
    // Réinitialiser la pagination si nécessaire
   
    
    onSelectTypeAction(params.toString());
  };


  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
       {currentSearch && (
        <div className="text-sm text-gray-600 mb-2">
          Recherche : "{decodeURIComponent(currentSearch)}"
        </div>
      )}
      <div className="flex flex-nowrap overflow-x-auto scrollbar-hide items-center gap-4 my-6">
        {types.map((type) => {
          const isActive = type.value ? currentType === type.value : !currentType;
          
          return (
            <button
              key={type.value || "Tout"}
              onClick={() => handleTypeClick(type.value)}
              className={`
                shrink-0
                px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 
                rounded-full text-xs sm:text-sm md:text-base 
                text-white transition-transform duration-200 
                hover:scale-105 active:scale-95
                ${
                  isActive
                    ? "bg-[#FC9B89] scale-105" 
                    : "bg-[#014F86] hover:bg-[#FC9B89]/80" 
                }
              `}
              aria-label={`Filtrer par ${type.label}`}
            >
              {type.label}
            </button>
          );

        })}
      </div>
    </div>
  );
}