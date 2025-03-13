"use client";

import { usePathname } from "next/navigation";

// Définir les types de logements disponibles
const types = [
  { label: "Tout", value: null }, // null signifie "pas de filtre"
  { label: "Maison", value: "maison" },
  { label: "Appartement", value: "appartement" },
  { label: "Studio", value: "studio" },
  { label: "Villa", value: "villa" },
  { label: "Co-location", value: "colocation" },
  { label: "Longue durée", value: "longuedurée" },
  { label: "Courte durée", value: "lourtedurée" },
  { label: "Localisation", value: "localisation" },
];

interface ButtonsBarProps {
  onSelectTypeAction: (type: string | null) => void; // Callback pour sélectionner un type
}

export default function ButtonsBar({ onSelectTypeAction }: ButtonsBarProps) {
  const pathname = usePathname();

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
      {/* 
        flex-nowrap + overflow-x-auto => 1 seule ligne avec scroll horizontal
        sur tous les écrans
      */}
      <div className="flex flex-nowrap overflow-x-auto scrollbar-hide items-center gap-4 my-6">
        {types.map((type) => {
          const isActive = pathname === `/${type.value}`; // Vérifie si le type est actif
          return (
            <button
              key={type.value || "Tout"} // Utilise "Tout" comme clé si value est null
              onClick={() => onSelectTypeAction(type.value)} // Appelle le callback avec le type sélectionné
              className={`
                shrink-0
                px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 
                rounded-full text-xs sm:text-sm md:text-base 
                text-white transition-transform duration-200 
                hover:scale-105 active:scale-95
                ${
                  isActive
                    ? "bg-[#FC9B89]" // Bouton actif : rose
                    : "bg-[#014F86] hover:bg-[#FC9B89]" // Sinon : bleu + hover rose
                }
              `}
            >
              {type.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}