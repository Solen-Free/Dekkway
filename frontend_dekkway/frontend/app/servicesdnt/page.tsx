"use client"; // Assurez-vous que ce composant est exécuté côté client

import React, { useState } from 'react';

const ReservationPage: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const service = event.target.value;
    if (event.target.checked) {
      setSelectedServices([...selectedServices, service]);
    } else {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    }
  };

  const handleSubmit = () => {
    if (selectedServices.length > 0) {
      // Rediriger vers la première page de service sélectionnée
      window.location.href = `/services/${selectedServices[0]}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">Merci pour votre réservation !</h1>
        <p className="text-gray-600 text-center mb-6">
          Avez-vous besoin de services supplémentaires ?
        </p>

        <div className="space-y-4">
          {/* Carte pour le service de déménagement */}
          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow">
            <input
              type="checkbox"
              value="deménagement"
              onChange={handleServiceChange}
              className="form-checkbox h-5 w-5 text-[#014F86] rounded border-gray-300 focus:ring-[#FC9B89]"
            />
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold">Déménagement facile et rapide</h2>
              <p className="text-gray-600">Transport de vos meubles en toute sécurité !</p>
            </div>
            <div className="w-24 h-24 ml-4">
              <img
                src="/images/demenagement.jpg" // Remplacez par le chemin de votre image
                alt="Déménagement"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </label>

          {/* Carte pour le service de nettoyage */}
          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow">
            <input
              type="checkbox"
              value="nettoyage"
              onChange={handleServiceChange}
              className="form-checkbox h-5 w-5 text-[#014F86] rounded border-gray-300 focus:ring-[#FC9B89]"
            />
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold">Service de nettoyage</h2>
              <p className="text-gray-600">Un logement propre avant votre installation !</p>
            </div>
            <div className="w-24 h-24 ml-4">
              <img
                src="/images/nettoyage.jpg" // Remplacez par le chemin de votre image
                alt="Nettoyage"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </label>

          {/* Carte pour le service de transport */}
          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow">
            <input
              type="checkbox"
              value="transport"
              onChange={handleServiceChange}
              className="form-checkbox h-5 w-5 text-[#014F86] rounded border-gray-300 focus:ring-[#FC9B89]"
            />
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold">Service de transport</h2>
              <p className="text-gray-600">Transport rapide et sécurisé pour vos biens !</p>
            </div>
            <div className="w-24 h-24 ml-4">
              <img
                src="/images/transport.jpg" // Remplacez par le chemin de votre image
                alt="Transport"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={selectedServices.length === 0}
          className="w-full mt-6 bg-[#014F86] text-white py-2 px-4 rounded-md hover:bg-[#013A63] focus:outline-none focus:ring-2 focus:ring-[#FC9B89] focus:ring-offset-2 disabled:opacity-50"
        >
          Confirmer et continuer
        </button>
      </div>
    </div>
  );
};

export default ReservationPage;