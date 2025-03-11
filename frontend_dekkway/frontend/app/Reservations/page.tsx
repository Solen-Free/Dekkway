"use client";

import { useState } from "react";
import Cardh from "@/components/UI/Cardh";
import Cards from "@/components/cards";

const Reservations = () => {
  // State pour gérer l'onglet actif
  const [activeTab, setActiveTab] = useState<"logements" | "services">("logements");

  return (
    <div className="flex flex-col items-center gap-6 p-10">
      {/* Titre */}
      <h1 className="text-2xl font-bold text-left w-full">Mes Réservations</h1>


      {/* Onglets */}
      <div className="flex space-x-4 pb-2">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "logements" ? "border-b-2 border-[#fc9b89] text-[#fc9b89]" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("logements")}
        >
          Logements
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "services" ? "border-b-3 border-[#fc9b89] text-[#fc9b89]" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("services")}
        >
          Services
        </button>
      </div>

      {/* Affichage du contenu selon l'onglet sélectionné */}
      {activeTab === "logements" ? (
        <div className="flex flex-col gap-6">
          <Cardh
            image="/images/maison.jpg"
            title="Maison à Thiès"
            location="Grand Standing, Thiès"
            price="500000 FCFA"
          />
          <Cardh
            image="/images/maison.jpg"
            title="Maison à Thiès"
            location="Grand Standing, Thiès"
            price="500000 FCFA"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <Cards
            image="/images/dem.png"
            title="Service de déménagement"
             date="Date de réservation"
          />
          <Cards
            image="/images/net.png"
            title="Service de nettoyage"
             date="Date de réservation"
          />
          <Cards
           image="/images/voit.png"
           title="Service de transport"
           date="Date de réservation"
/>

        </div>
      )}
    </div>
  );
};

export default Reservations;
