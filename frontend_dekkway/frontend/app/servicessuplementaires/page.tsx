"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ServicePage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { 
      scale: 1.03, 
      boxShadow: "0 10px 25px rgba(1, 79, 134, 0.1)",
      borderColor: '#014F86', 
      transition: { duration: 0.2 } 
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsAnimating(true);
    
    // Délai avant la redirection pour permettre l'animation
    setTimeout(() => {
      if (option === 'non') {
        router.push('/');
      } else {
        router.push(`/${option}`);
      }
    }, 500);
  };

  const services = [
    {
      id: 'demenagement',
      title: 'Déménagement',
      description: 'Service de déménagement professionnel pour un transfert sans stress',
      image: '/images/demenagement.jpg',
      path: '/demenagement'
    },
    {
      id: 'nettoyage',
      title: 'Nettoyage',
      description: 'Service de nettoyage complet pour votre nouveau logement',
      image: '/images/nettoyage.jpg',
      path: '/nettoyage'
    },
    {
      id: 'transport',
      title: 'Transport',
      description: 'Solutions de transport pour vos besoins quotidiens',
      image: '/images/transport.jpg',
      path: '/transport'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-12"
          variants={titleVariants}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#014F86] mb-4">
            Merci pour votre réservation !
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos services supplémentaires pour faciliter votre installation
          </p>
        </motion.div>

        <div className="space-y-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-2 ${
                selectedOption === service.id ? 'border-[#014F86]' : 'border-[#FC9B89]'
              }`}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => handleOptionSelect(service.id)}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#014F86] mb-2">{service.title}</h2>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => handleOptionSelect(service.id)}
                      className="px-4 py-2 bg-[#FC9B89] text-white rounded-lg hover:bg-[#014F86] transition-colors"
                    >
                      En savoir plus
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Option "Non, merci" */}
          <motion.div
            className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 p-6 border-2 ${
              selectedOption === 'non' ? 'border-[#014F86]' : 'border-[#FC9B89]'
            }`}
            variants={cardVariants}
            whileHover="hover"
            onClick={() => handleOptionSelect('non')}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#014F86]">Non, merci</h2>
                <p className="text-gray-600 mt-1">Je n'ai pas besoin de services supplémentaires pour le moment</p>
              </div>
              <button
                onClick={() => handleOptionSelect('non')}
                className="px-4 py-2 border border-[#014F86] text-[#014F86] rounded-lg hover:bg-gray-50 transition-colors"
              >
                Retour à l'accueil
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-gray-500 mb-4">
            Vous pouvez toujours accéder à ces services plus tard depuis votre espace personnel
          </p>
          <Link 
            href="/contact"
            className="text-[#014F86] hover:text-[#FC9B89] font-medium"
          >
            Besoin d'aide ? Contactez-nous
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ServicePage;