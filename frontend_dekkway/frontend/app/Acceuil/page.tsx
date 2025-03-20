"use client";
import Buttons from "@/components/buttons";
import Carousel from "@/components/Carousel";
import ButtonsBar from "@/components/ButtonsBar"; // Importez ButtonsBar
import LogementsList from "@/components/Logementslist"; // Importez LogementsList
import { useState } from 'react';

export default function Page() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <div className="w-full min-h-screen">
      {/* Carousel section */}
      <div className="w-full">
        <Carousel />
      </div>

      {/* ButtonsBar pour filtrer les logements */}
      <ButtonsBar onSelectTypeAction={setSelectedType} />

      {/* Main heading */}
      <div className="flex flex-col items-center mt-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#FC9B89] font-bold text-center">
          Rechercher votre logement dès maintenant !
        </h1>
      </div>

      {/* Bailleur section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-start px-4 sm:px-6 lg:px-8 mt-8 gap-4">
        <Buttons 
          text="Devenir Bailleur" 
          fontWeight="font-bold" 
          textSize="text-xl sm:text-2xl"  
          href="/InscriptionBailleur"
        />
        <h1 className="text-lg sm:text-xl font-bold text-black">
          <span className="animate-typewriter block">
            Vous avez la possibilité de vendre vos propriétés sur notre plateforme !
          </span>
        </h1>
      </div>

      {/* Sections de logements */}
      <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 mt-8">
        {/* Section "Tous" */}
        <div className="w-full mb-12">
          <h1 className="font-bold text-[#014F86] text-lg sm:text-xl mb-6">
            {selectedType ? selectedType : "Tous les logements"}
          </h1>
          <LogementsList type={selectedType} /> {/* Affiche les logements filtrés */}
        </div>
      </div>

    </div>
  );
}