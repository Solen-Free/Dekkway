"use client"; // Assurez-vous que ce composant est exécuté côté client

import React from 'react';
import { motion } from 'framer-motion'; // Import de Framer Motion
import Link from 'next/link'; // Import de Link pour la navigation

const NettoyagePage: React.FC = () => {
  // Animation pour le bouton
  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: '#FC9B89', transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4"> {/* Alignement en haut */}
      <motion.div
        className="bg-white p-6 md:p-8 rounded-3xl shadow-md w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Nouvelle image horizontale (mobile et desktop) */}
        <div className="w-full mb-6 rounded-xl overflow-hidden">
          <img
            src="/images/dem.jpg" // Image horizontale
            alt="Nettoyage"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Titre */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6 text-[#014F86]">
          Service de Nettoyage
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-center mb-6 md:mb-8 text-sm md:text-base">
          Profitez d'un nettoyage complet et professionnel pour votre logement.
        </p>

        {/* Section des détails du service */}
        <div className="space-y-6">
          {/* Image illustrative (mobile et desktop) */}
          <div className="w-full md:w-48 h-48 mx-auto mb-4 md:mb-6 rounded-xl overflow-hidden">
            <img
              src="/images/nettoyage.jpg" // Image actuelle
              alt="Nettoyage"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Détails du service */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-semibold text-[#014F86] mb-2 md:mb-4">
              Nettoyage Complet
            </h2>
            <p className="text-gray-600 text-center mb-4 text-sm md:text-base">
              Notre service de nettoyage comprend :
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
              <li>Nettoyage des sols et surfaces</li>
              <li>Dépoussiérage complet</li>
              <li>Nettoyage des sanitaires</li>
              <li>Nettoyage des vitres</li>
            </ul>
            <p className="text-lg md:text-xl font-semibold text-[#014F86]">
              Prix : 40 000 FCFA
            </p>
          </div>
        </div>

        {/* Bouton de réservation */}
        <motion.button
          whileHover="hover"
          variants={buttonVariants}
          className="w-full mt-6 bg-[#014F86] text-white py-2 px-4 rounded-xl hover:bg-[#FC9B89] focus:outline-none focus:ring-2 focus:ring-[#FC9B89] focus:ring-offset-2 transition-colors text-sm md:text-base"
        >
          <Link href="/reservation/nettoyage">
            Réserver maintenant
          </Link>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NettoyagePage;