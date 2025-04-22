// "use client";

// import React from 'react';
// import { motion } from 'framer-motion';
// import { 
//   FaBroom, FaShower, FaLeaf, FaCheck, FaArrowRight, 
//   FaMapMarkerAlt, FaClock, FaPhone, FaWhatsapp, FaRecycle, FaTruck
// } from 'react-icons/fa';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';

// const NettoyagePage = () => {
//   const router = useRouter();

//   // Options de service enrichies
//   const cleaningServices = [
//     {
//       id: 'standard',
//       title: 'Nettoyage Standard',
//       description: 'Solution complète pour entretien régulier',
//       icon: <FaBroom className="text-3xl text-[#014F86]" />,
//       price: '25 000 - 35 000 FCFA',
//       image: '/images/standard.jpg',
//       features: [
//         'Dépoussiérage complet',
//         'Nettoyage des sols',
//         'Désinfection des surfaces',
//         'Nettoyage des vitres'
//       ],
//       coverage: 'Dakar, Thiès',
//       duration: '2-3 heures',
//       team: '1 professionnels'
//     },
//     {
//       id: 'complet',
//       title: 'Nettoyage Intégral',
//       description: 'Service premium pour résultat impeccable',
//       icon: <FaShower className="text-3xl text-[#014F86]" />,
//       price: '40 000 - 60 000 FCFA',
//       image: '/images/integrale.jpg',
//       features: [
//         'Tout inclus dans Standard',
//         'Nettoyage des sanitaires',
//         'Désinfection complète',
//         'Nettoyage des placards'
//       ],
//       coverage: 'Dakar, Thiès, Mbour',
//       duration: '4-5 heures',
//       team: '4 professionnels'
//     },
//     {
//       id: 'premium',
//       title: 'Nettoyage Écologique',
//       description: 'Solution verte haut de gamme',
//       icon: <FaLeaf className="text-3xl text-[#014F86]" />,
//       price: '70 000 - 100 000 FCFA',
//       image: '/images/premium.jpg',
//       features: [
//         'Produits 100% bio',
//         'Traitement anti-allergènes',
//         'Nettoyage des murs',
//         'Purification d\'air'
//       ],
//       coverage: 'Tout le Sénégal',
//       duration: '5-6 heures',
//       team: 'Équipe spécialisée'
//     },
//     {
//       id: 'post-demenagement',
//       title: 'Nettoyage Post-Déménagement',
//       description: 'Remise à neuf des logements libérés',
//       icon: <FaTruck className="text-3xl text-[#014F86]" />,
//       price: '45 000 - 65 000 FCFA',
//       image: '/images/post.jpg',
//       features: [
//         'Nettoyage profond des pièces',
//         'Élimination des résidus',
//         'Désinfection complète',
//         'Nettoyage des vitres/murs',
//         'Traitement des odeurs',
//         'Gestion des déchets'
//       ],
//       coverage: 'Tout le Sénégal',
//       duration: '4-6 heures',
//       team: 'Équipe spécialisée'
//     }
//   ];

//   // Animations améliorées
//   const containerAnimation = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15
//       }
//     }
//   };

//   const cardAnimation = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" }
//     },
//     hover: {
//       y: -8,
//       boxShadow: "0 12px 20px rgba(1, 79, 134, 0.15)",
//       transition: { duration: 0.3 }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Hero Section améliorée */}
//         <motion.div 
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h1 className="text-4xl md:text-5xl font-extrabold text-[#014F86] mb-4">
//             <span className="block">Solutions de</span>
//             <span className="text-[#FC9B89]">Nettoyage Professionnel</span>
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Un environnement sain et impeccable grâce à nos experts certifiés
//           </p>
//         </motion.div>

//         {/* Grille de services repensée */}
//         <motion.div
//           className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
//           variants={containerAnimation}
//           initial="hidden"
//           animate="visible"
//         >
//           {cleaningServices.map((service) => (
//             <motion.div
//               key={service.id}
//               className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
//               variants={cardAnimation}
//               whileHover="hover"
//             >
//               <div className="p-6">
//                 <div className="flex items-start gap-5">
//                   <div className="bg-[#014F86] bg-opacity-10 p-4 rounded-xl">
//                     {service.icon}
//                   </div>
//                   <div className="flex-1">
//                     <h2 className="text-2xl font-bold text-[#014F86]">{service.title}</h2>
//                     <p className="text-gray-600 mt-1">{service.description}</p>
//                     <div className="mt-3 flex items-center gap-4 flex-wrap">
//                       <span className="bg-blue-100 text-[#014F86] px-3 py-1 rounded-full text-sm font-medium">
//                         {service.price}
//                       </span>
//                       <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
//                         <FaMapMarkerAlt className="mr-1" /> {service.coverage}
//                       </span>
//                       {service.id === 'post-demenagement' && (
//                         <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
//                           Recommandé pour les locations
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Nouvelles informations ajoutées */}
//                 <div className="mt-6 grid grid-cols-2 gap-4">
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <h4 className="font-semibold text-gray-700 mb-2">Durée</h4>
//                     <p className="text-sm text-gray-600 flex items-center">
//                       <FaClock className="mr-1" /> {service.duration}
//                     </p>
//                   </div>
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <h4 className="font-semibold text-gray-700 mb-2">Équipe</h4>
//                     <p className="text-sm text-gray-600">{service.team}</p>
//                   </div>
//                 </div>

//                 <div className="mt-6">
//                   <h4 className="font-semibold text-gray-800 mb-3">Inclus dans le service :</h4>
//                   <ul className="space-y-2">
//                     {service.features.map((feature, index) => (
//                       <li key={index} className="flex items-start">
//                         <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
//                         <span className="text-gray-700">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               {/* Section image avec hover effect */}
//               <div className="border-t border-gray-200">
//                 <div className="h-80 w-full relative overflow-hidden group">
//                   <Image
//                     src={service.image}
//                     alt={service.title}
//                     fill
//                     className="object-cover transition-transform duration-500 group-hover:scale-110"
//                     sizes="(max-width: 768px) 100vw, 50vw"
//                   />
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Section Contact unifiée */}
//         <motion.div 
//           className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <div className="p-8 md:p-10">
//             <h2 className="text-3xl font-bold text-center text-[#014F86] mb-8">
//               Contactez Nos Experts
//             </h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="bg-blue-50 rounded-xl p-6 text-center hover:bg-blue-100 transition-colors">
//                 <a href="tel:+221774709817" className="block">
//                   <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-md">
//                     <FaPhone className="text-3xl text-[#014F86]" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-800 mb-2">Service Client</h3>
//                   <p className="text-lg text-gray-600 font-medium">+221 77 470 98 17</p>
//                   <p className="text-gray-500 mt-3">Disponible 7j/7 • 7h-22h</p>
//                 </a>
//               </div>

//               <div className="bg-green-50 rounded-xl p-6 text-center hover:bg-green-100 transition-colors">
//                 <a 
//                   href="https://wa.me/221774709817" 
//                   target="_blank" 
//                   rel="noopener noreferrer" 
//                   className="block"
//                 >
//                   <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-md">
//                     <FaWhatsapp className="text-3xl text-green-600" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-800 mb-2">WhatsApp</h3>
//                   <p className="text-lg text-gray-600 font-medium">Discussion Instantanée</p>
//                   <p className="text-gray-500 mt-3">Réponse garantie sous 30min</p>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Section Engagement écologique */}
//         <motion.div
//           className="bg-[#014F86] bg-opacity-10 rounded-2xl p-8 mb-16 text-center"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//         >
//           <div className="max-w-4xl mx-auto">
//             <FaRecycle className="text-4xl text-[#014F86] mx-auto mb-4" />
//             <h3 className="text-2xl font-bold text-[#014F86] mb-4">
//               Engagement Éco-Responsable
//             </h3>
//             <div className="grid md:grid-cols-3 gap-6">
//               {[
//                 'Produits biodégradables',
//                 'Équipements basse consommation',
//                 'Formation continue des équipes',
//                 'Gestion des déchets recyclables',
//                 'Optimisation des ressources en eau',
//                 'Certification environnementale'
//               ].map((item, index) => (
//                 <div key={index} className="bg-white p-4 rounded-lg flex items-center justify-center">
//                   <FaCheck className="text-green-500 mr-2" />
//                   <span>{item}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </motion.div>

//         {/* Bouton de retour */}
//         <div className="flex justify-center mb-12">
//           <motion.button
//             onClick={() => router.back()}
//             className="py-3 px-8 bg-[#FC9B89] text-white font-semibold rounded-2xl hover:bg-[#014F86] transition-colors"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             Retour à l'accueil
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NettoyagePage;


// ------------------------deep-----------------

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaBroom, FaShower, FaLeaf, FaCheck, FaArrowRight, 
  FaMapMarkerAlt, FaClock, FaWhatsapp, FaRecycle, FaTruck
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const NettoyagePage = () => {
  const router = useRouter();

  // Options de service enrichies
  const cleaningServices = [
    {
      id: 'standard',
      title: 'Nettoyage Standard',
      description: 'Solution complète pour entretien régulier',
      icon: <FaBroom className="text-3xl text-[#014F86]" />,
      price: '25 000 - 35 000 FCFA',
      image: '/images/standard.jpg',
      features: [
        'Dépoussiérage complet',
        'Nettoyage des sols',
        'Désinfection des surfaces',
        'Nettoyage des vitres'
      ],
      coverage: 'Dakar, Thiès',
      duration: '2-3 heures',
      team: '1 professionnels'
    },
    {
      id: 'complet',
      title: 'Nettoyage Intégral',
      description: 'Service premium pour résultat impeccable',
      icon: <FaShower className="text-3xl text-[#014F86]" />,
      price: '40 000 - 60 000 FCFA',
      image: '/images/integrale.jpg',
      features: [
        'Tout inclus dans Standard',
        'Nettoyage des sanitaires',
        'Désinfection complète',
        'Nettoyage des placards'
      ],
      coverage: 'Dakar, Thiès, Mbour',
      duration: '4-5 heures',
      team: '4 professionnels'
    },
    {
      id: 'premium',
      title: 'Nettoyage Écologique',
      description: 'Solution verte haut de gamme',
      icon: <FaLeaf className="text-3xl text-[#014F86]" />,
      price: '70 000 - 100 000 FCFA',
      image: '/images/premium.jpg',
      features: [
        'Produits 100% bio',
        'Traitement anti-allergènes',
        'Nettoyage des murs',
        'Purification d\'air'
      ],
      coverage: 'Tout le Sénégal',
      duration: '5-6 heures',
      team: 'Équipe spécialisée'
    },
    {
      id: 'post-demenagement',
      title: 'Nettoyage Post-Déménagement',
      description: 'Remise à neuf des logements libérés',
      icon: <FaTruck className="text-3xl text-[#014F86]" />,
      price: '45 000 - 65 000 FCFA',
      image: '/images/post.jpg',
      features: [
        'Nettoyage profond des pièces',
        'Élimination des résidus',
        'Désinfection complète',
        'Nettoyage des vitres/murs',
        'Traitement des odeurs',
        'Gestion des déchets'
      ],
      coverage: 'Tout le Sénégal',
      duration: '4-6 heures',
      team: 'Équipe spécialisée'
    }
  ];

  // Animations améliorées
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: {
      y: -8,
      boxShadow: "0 12px 20px rgba(1, 79, 134, 0.15)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section améliorée */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#014F86] mb-4">
            <span className="block">Solutions de</span>
            <span className="text-[#FC9B89]">Nettoyage Professionnel</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un environnement sain et impeccable grâce à nos experts certifiés
          </p>
        </motion.div>

        {/* Grille de services repensée */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
        >
          {cleaningServices.map((service) => (
            <motion.div
              key={service.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
              variants={cardAnimation}
              whileHover="hover"
            >
              <div className="p-6">
                <div className="flex items-start gap-5">
                  <div className="bg-[#014F86] bg-opacity-10 p-4 rounded-xl">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[#014F86]">{service.title}</h2>
                    <p className="text-gray-600 mt-1">{service.description}</p>
                    <div className="mt-3 flex items-center gap-4 flex-wrap">
                      <span className="bg-blue-100 text-[#014F86] px-3 py-1 rounded-full text-sm font-medium">
                        {service.price}
                      </span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <FaMapMarkerAlt className="mr-1" /> {service.coverage}
                      </span>
                      {service.id === 'post-demenagement' && (
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                          Recommandé pour les locations
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Nouvelles informations ajoutées */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Durée</h4>
                    <p className="text-sm text-gray-600 flex items-center">
                      <FaClock className="mr-1" /> {service.duration}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Équipe</h4>
                    <p className="text-sm text-gray-600">{service.team}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Inclus dans le service :</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Section image avec hover effect */}
              <div className="border-t border-gray-200">
                <div className="h-80 w-full relative overflow-hidden group">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section Contact unifiée */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-8 md:p-10">
            <h2 className="text-3xl font-bold text-center text-[#014F86] mb-8">
              Contactez Nos Experts
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-xl p-6 text-center hover:bg-blue-100 transition-colors">
                <a 
                  href="https://niafey.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block"
                >
                  <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-md">
                    <FaArrowRight className="text-3xl text-[#014F86]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Site Partenaire</h3>
                  <p className="text-lg text-gray-600 font-medium">niafey.com</p>
                  <p className="text-gray-500 mt-3">Services de Nettoyage Professionnel</p>
                </a>
              </div>

              <div className="bg-green-50 rounded-xl p-6 text-center hover:bg-green-100 transition-colors">
                <a 
                  href="https://wa.me/221781059393" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block"
                >
                  <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-md">
                    <FaWhatsapp className="text-3xl text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">WhatsApp</h3>
                  <p className="text-lg text-gray-600 font-medium">Discussion Instantanée</p>
                  <p className="text-gray-500 mt-3">Réponse garantie sous 30min</p>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Engagement écologique */}
        <motion.div
          className="bg-[#014F86] bg-opacity-10 rounded-2xl p-8 mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="max-w-4xl mx-auto">
            <FaRecycle className="text-4xl text-[#014F86] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#014F86] mb-4">
              Engagement Éco-Responsable
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                'Produits biodégradables',
                'Équipements basse consommation',
                'Formation continue des équipes',
                'Gestion des déchets recyclables',
                'Optimisation des ressources en eau',
                'Certification environnementale'
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg flex items-center justify-center">
                  <FaCheck className="text-green-500 mr-2" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bouton de retour */}
        <div className="flex justify-center mb-12">
          <motion.button
            onClick={() => router.back()}
            className="py-3 px-8 bg-[#FC9B89] text-white font-semibold rounded-2xl hover:bg-[#014F86] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Retour à l'accueil
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default NettoyagePage;