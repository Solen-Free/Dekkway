"use client";

import Cardh from "@/components/UI/Cardh";

const Reservations = () => {
  return (
    <div className="flex flex-col items-center gap-6 p-10">
      {/* Titre */}
      <h1 className="text-2xl font-bold text-left w-full">Mes Réservations</h1>
      {/* Affichage des logements uniquement */}
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
    </div>
  );
};

export default Reservations;
