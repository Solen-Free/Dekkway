"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ServicePage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, borderColor: '#014F86', transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: '#FC9B89', transition: { duration: 0.2 } },
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
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
          Merci de votre réservation !
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Avez-vous besoin d'un service supplémentaire ?
        </p>

        <div className="space-y-6">
          <Link href="/demenagement" passHref>
            <motion.label
              className={`flex flex-col md:flex-row items-center justify-between p-4 border-2 ${
                selectedOption === 'demenagement' ? 'border-[#014F86]' : 'border-[#FC9B89]'
              } rounded-2xl hover:shadow-md transition-shadow cursor-pointer`}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onClick={() => handleOptionSelect('demenagement')}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="service"
                  value="demenagement"
                  checked={selectedOption === 'demenagement'}
                  onChange={() => handleOptionSelect('demenagement')}
                  className="form-radio h-5 w-5 text-[#014F86] rounded-full border-gray-300 focus:ring-[#FC9B89]"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-[#014F86]">Déménagement</h2>
                </div>
              </div>
              <div className="w-24 h-24 md:ml-4 border-2 border-[#014F86] rounded-xl overflow-hidden">
                <img
                  src="../images/demenagement.jpg"
                  alt="Déménagement"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.label>
          </Link>

          <Link href="../nettoyage" passHref>
            <motion.label
              className={`flex flex-col md:flex-row items-center justify-between p-4 border-2 ${
                selectedOption === 'nettoyage' ? 'border-[#014F86]' : 'border-[#FC9B89]'
              } rounded-2xl hover:shadow-md transition-shadow cursor-pointer`}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onClick={() => handleOptionSelect('nettoyage')}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="service"
                  value="nettoyage"
                  checked={selectedOption === 'nettoyage'}
                  onChange={() => handleOptionSelect('nettoyage')}
                  className="form-radio h-5 w-5 text-[#014F86] rounded-full border-gray-300 focus:ring-[#FC9B89]"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-[#014F86]">Nettoyage</h2>
                </div>
              </div>
              <div className="w-24 h-24 md:ml-4 border-2 border-[#014F86] rounded-xl overflow-hidden">
                <img
                  src="../images/nettoyage.jpg"
                  alt="Nettoyage"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.label>
          </Link>

          <Link href="/transport" passHref>
            <motion.label
              className={`flex flex-col md:flex-row items-center justify-between p-4 border-2 ${
                selectedOption === 'transport' ? 'border-[#014F86]' : 'border-[#FC9B89]'
              } rounded-2xl hover:shadow-md transition-shadow cursor-pointer`}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onClick={() => handleOptionSelect('transport')}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="service"
                  value="transport"
                  checked={selectedOption === 'transport'}
                  onChange={() => handleOptionSelect('transport')}
                  className="form-radio h-5 w-5 text-[#014F86] rounded-full border-gray-300 focus:ring-[#FC9B89]"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-[#014F86]">Transport</h2>
                </div>
              </div>
              <div className="w-24 h-24 md:ml-4 border-2 border-[#014F86] rounded-xl overflow-hidden">
                <img
                  src="../images/transport.jpg"
                  alt="Transport"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.label>
          </Link>

          <Link href="/" passHref>
            <motion.label
              className={`flex flex-col md:flex-row items-center justify-between p-4 border-2 ${
                selectedOption === 'non' ? 'border-[#014F86]' : 'border-[#FC9B89]'
              } rounded-2xl hover:shadow-md transition-shadow cursor-pointer`}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onClick={() => handleOptionSelect('non')}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="service"
                  value="non"
                  checked={selectedOption === 'non'}
                  onChange={() => handleOptionSelect('non')}
                  className="form-radio h-5 w-5 text-[#014F86] rounded-full border-gray-300 focus:ring-[#FC9B89]"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-[#014F86]">Non, merci</h2>
                </div>
              </div>
            </motion.label>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ServicePage;