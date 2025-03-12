"use client"; // Assurez-vous que ce composant est exécuté côté client

import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import de Framer Motion

const ReservationPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null); // Un seul service sélectionné

  const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedService(event.target.value); // Mettre à jour le service sélectionné
  };

  const handleSubmit = () => {
    if (selectedService) {
      // Rediriger vers la page du service sélectionné
      window.location.href = `/services/${selectedService}`;
    }
  };

  // Animation pour les cartes
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, borderColor: '#014F86', transition: { duration: 0.2 } },
  };

  // Animation pour le bouton
  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: '#FC9B89', transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="bg-white p-8 rounded-3xl shadow-md w-full max-w-2xl border-2 border-[#014F86]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center mb-4 text-[#014F86]">
          Merci pour votre réservation !
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Avez-vous besoin de services supplémentaires ?
        </p>

        <div className="space-y-4">
          {/* Carte pour le service de déménagement */}
          <motion.label
            className="flex items-center p-4 border-2 border-[#FC9B89] rounded-2xl cursor-pointer hover:shadow-md transition-shadow"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <input
              type="radio" // Utilisation d'un bouton radio
              name="service" // Même nom pour regrouper les boutons radio
              value="deménagement"
              onChange={handleServiceChange}
              checked={selectedService === 'deménagement'} // Vérifie si ce service est sélectionné
              className="form-radio h-5 w-5 text-[#014F86] rounded-full border-gray-300 focus:ring-[#FC9B89]"
            />
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold text-[#014F86]">Déménagement facile et rapide</h2>
              <p className="text-gray-600">Transport de vos meubles en toute sécurité !</p>
            </div>
            <div className="w-24 h-24 ml-4 border-2 border-[#014F86] rounded-xl overflow-hidden">
              <img
                src="../images/demenagement.jpg" // Remplacez par le chemin de votre image
                alt="Déménagement"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.label>

          {/* Carte pour le service de nettoyage */}
          <motion.label
            className="flex items-center p-4 border-2 border-[#FC9B89] rounded-2xl cursor-pointer hover:shadow-md transition-shadow"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <input
              type="radio" // Utilisation d'un bouton radio
              name="service" // Même nom pour regrouper les boutons radio
              value="nettoyage"
              onChange={handleServiceChange}
              checked={selectedService === 'nettoyage'} // Vérifie si ce service est sélectionné
              className="form-radio h-5 w-5 text-[#014F86] rounded-full border-gray-300 focus:ring-[#FC9B89]"
            />
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold text-[#014F86]">Service de nettoyage</h2>
              <p className="text-gray-600">Un logement propre avant votre installation !</p>
            </div>
            <div className="w-24 h-24 ml-4 border-2 border-[#014F86] rounded-xl overflow-hidden">
              <img
                src="../images/nettoyage.jpg" // Remplacez par le chemin de votre image
                alt="Nettoyage"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.label>

          {/* Carte pour le service de transport */}
          <motion.label
            className="flex items-center p-4 border-2 border-[#FC9B89] rounded-2xl cursor-pointer hover:shadow-md transition-shadow"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <input
              type="radio" // Utilisation d'un bouton radio
              name="service" // Même nom pour regrouper les boutons radio
              value="transport"
              onChange={handleServiceChange}
              checked={selectedService === 'transport'} // Vérifie si ce service est sélectionné
              className="form-radio h-5 w-5 text-[#014F86] rounded-full border-gray-300 focus:ring-[#FC9B89]"
            />
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold text-[#014F86]">Service de transport</h2>
              <p className="text-gray-600">Transport rapide et sécurisé pour vos biens !</p>
            </div>
            <div className="w-24 h-24 ml-4 border-2 border-[#014F86] rounded-xl overflow-hidden">
              <img
                src="../images/transport.jpg" // Remplacez par le chemin de votre image
                alt="Transport"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.label>
        </div>

        {/* Bouton de confirmation */}
        <motion.button
          onClick={handleSubmit}
          disabled={!selectedService} // Désactivé si aucun service n'est sélectionné
          className="w-full mt-6 bg-[#014F86] text-white py-2 px-4 rounded-xl hover:bg-[#FC9B89] focus:outline-none focus:ring-2 focus:ring-[#FC9B89] focus:ring-offset-2 disabled:opacity-50 transition-colors"
          variants={buttonVariants}
          whileHover="hover"
        >
          Confirmer et continuer
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ReservationPage;