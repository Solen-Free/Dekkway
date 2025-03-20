"use client"; // Assurez-vous que ce composant est exécuté côté client

import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import de Framer Motion
import Link from 'next/link'; // Import de Link si vous utilisez Next.js

const ServicePage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // État pour l'option sélectionnée

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

  // Gestion du choix de l'option
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  // Gestion de la réservation
  const handleReservation = () => {
    if (selectedOption) {
      // Rediriger vers la page de réservation correspondante
      window.location.href = `/reservation/${selectedOption}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="bg-white p-8 rounded-3xl shadow-md w-full max-w-2xl border-2 border-[#014F86]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-[#014F86]">
          Service de déménagement
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Choisissez une option
        </p>

        <div className="space-y-6">
          {/* Option Tricycle */}
          <motion.label
            className={`flex flex-col md:flex-row items-center justify-between p-4 border-2 ${
              selectedOption === 'tricycle' ? 'border-[#014F86]' : 'border-[#FC9B89]'
            } rounded-2xl hover:shadow-md transition-shadow cursor-pointer`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="service"
                value="tricycle"
                checked={selectedOption === 'tricycle'}
                onChange={() => handleOptionSelect('tricycle')}
                className="form-radio h-5 w-5 text-[#014F86] rounded-full border-gray-300 focus:ring-[#FC9B89]"
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-[#014F86]">Tricycle</h2>
              </div>
            </div>
            <div className="w-24 h-24 md:ml-4 border-2 border-[#014F86] rounded-xl overflow-hidden">
              <img
                src="../images/try.png" // Remplacez par le chemin de votre image
                alt="Tricycle"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.label>

          {/* Option Voiture */}
          <motion.label
            className={`flex flex-col md:flex-row items-center justify-between p-4 border-2 ${
              selectedOption === 'voiture' ? 'border-[#014F86]' : 'border-[#FC9B89]'
            } rounded-2xl hover:shadow-md transition-shadow cursor-pointer`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="service"
                value="voiture"
                checked={selectedOption === 'voiture'}
                onChange={() => handleOptionSelect('voiture')}
                className="form-radio h-5 w-5 text-[#014F86] rounded-full border-gray-300 focus:ring-[#FC9B89]"
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-[#014F86]">Voiture</h2>
              </div>
            </div>
            <div className="w-24 h-24 md:ml-4 border-2 border-[#014F86] rounded-xl overflow-hidden">
              <img
                src="../images/voit.png" // Remplacez par le chemin de votre image
                alt="Voiture"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.label>

          {/* Option Petit Camion */}
          <motion.label
            className={`flex flex-col md:flex-row items-center justify-between p-4 border-2 ${
              selectedOption === 'petit-camion' ? 'border-[#014F86]' : 'border-[#FC9B89]'
            } rounded-2xl hover:shadow-md transition-shadow cursor-pointer`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="service"
                value="petit-camion"
                checked={selectedOption === 'petit-camion'}
                onChange={() => handleOptionSelect('petit-camion')}
                className="form-radio h-5 w-5 text-[#014F86] rounded-full border-gray-300 focus:ring-[#FC9B89]"
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-[#014F86]">Petit Camion</h2>
              </div>
            </div>
            <div className="w-24 h-24 md:ml-4 border-2 border-[#014F86] rounded-xl overflow-hidden">
              <img
                src="../images/petit.png" // Remplacez par le chemin de votre image
                alt="Petit Camion"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.label>

          {/* Option Grand Camion */}
          <motion.label
            className={`flex flex-col md:flex-row items-center justify-between p-4 border-2 ${
              selectedOption === 'grand-camion' ? 'border-[#014F86]' : 'border-[#FC9B89]'
            } rounded-2xl hover:shadow-md transition-shadow cursor-pointer`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="service"
                value="grand-camion"
                checked={selectedOption === 'grand-camion'}
                onChange={() => handleOptionSelect('grand-camion')}
                className="form-radio h-5 w-5 text-[#014F86] rounded-full border-gray-300 focus:ring-[#FC9B89]"
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-[#014F86]">Grand Camion</h2>
              </div>
            </div>
            <div className="w-24 h-24 md:ml-4 border-2 border-[#014F86] rounded-xl overflow-hidden">
              <img
                src="/images/gros.png" // Remplacez par le chemin de votre image
                alt="Grand Camion"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.label>
        </div>

        {/* Bouton de réservation */}
        <motion.button
          onClick={handleReservation}
          disabled={!selectedOption} // Désactivé si aucune option n'est sélectionnée
          className="w-full mt-6 bg-[#014F86] text-white py-2 px-4 rounded-xl hover:bg-[#FC9B89] focus:outline-none focus:ring-2 focus:ring-[#FC9B89] focus:ring-offset-2 disabled:opacity-50 transition-colors"
          variants={buttonVariants}
          whileHover="hover"
        >
          Réserver
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ServicePage;