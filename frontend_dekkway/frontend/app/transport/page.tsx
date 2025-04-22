// "use client";

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import Link from 'next/link';

// const TransportServicePage: React.FC = () => {
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//     hover: { scale: 1.05, borderColor: '#014F86', transition: { duration: 0.2 } },
//   };

//   const handleOptionSelect = (option: string) => {
//     setSelectedOption(option);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <motion.div
//         className="bg-white p-6 md:p-8 rounded-3xl shadow-md w-full max-w-2xl border-2 border-[#014F86]"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#014F86]">
//           Service de Transport
//         </h1>
//         <p className="text-gray-600 text-center mb-8 text-lg md:text-xl">
//           Choisissez votre service de transport préféré
//         </p>

//         <div className="space-y-4 md:space-y-6">
//           {/* Option Yango */}
//           <Link href="/transport/yango" passHref>
//             <motion.label
//               className={`flex flex-col md:flex-row items-center justify-between p-4 border-2 ${
//                 selectedOption === 'yango' ? 'border-[#014F86]' : 'border-[#FC9B89]'
//               } rounded-2xl hover:shadow-md transition-shadow cursor-pointer`}
//               variants={cardVariants}
//               initial="hidden"
//               animate="visible"
//               whileHover="hover"
//               onClick={() => handleOptionSelect('yango')}
//             >
//               <div className="flex items-center w-full md:w-auto">
//                 <input
//                   type="radio"
//                   name="transport"
//                   value="yango"
//                   checked={selectedOption === 'yango'}
//                   onChange={() => handleOptionSelect('yango')}
//                   className="form-radio h-5 w-5 text-[#014F86] rounded-full border-gray-300 focus:ring-[#FC9B89]"
//                 />
//                 <div className="ml-4">
//                   <h2 className="text-lg md:text-xl font-semibold text-[#014F86]">Yango</h2>
//                   <p className="text-gray-600 text-sm mt-1">Service de VTC premium</p>
//                 </div>
//               </div>
//               <div className="w-20 h-20 md:w-24 md:h-24 mt-4 md:mt-0 md:ml-4 border-2 border-[#014F86] rounded-xl overflow-hidden">
//                 <img
//                   src="../images/yango.png"
//                   alt="Yango"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </motion.label>
//           </Link>

//           {/* Option Yassir */}
//           <Link href="/transport/yassir" passHref>
//             <motion.label
//               className={`flex flex-col md:flex-row items-center justify-between p-4 border-2 ${
//                 selectedOption === 'yassir' ? 'border-[#014F86]' : 'border-[#FC9B89]'
//               } rounded-2xl hover:shadow-md transition-shadow cursor-pointer`}
//               variants={cardVariants}
//               initial="hidden"
//               animate="visible"
//               whileHover="hover"
//               onClick={() => handleOptionSelect('yassir')}
//             >
//               <div className="flex items-center w-full md:w-auto">
//                 <input
//                   type="radio"
//                   name="transport"
//                   value="yassir"
//                   checked={selectedOption === 'yassir'}
//                   onChange={() => handleOptionSelect('yassir')}
//                   className="form-radio h-5 w-5 text-[#014F86] rounded-full border-gray-300 focus:ring-[#FC9B89]"
//                 />
//                 <div className="ml-4">
//                   <h2 className="text-lg md:text-xl font-semibold text-[#014F86]">Yassir</h2>
//                   <p className="text-gray-600 text-sm mt-1">Service local de transport</p>
//                 </div>
//               </div>
//               <div className="w-20 h-20 md:w-24 md:h-24 mt-4 md:mt-0 md:ml-4 border-2 border-[#014F86] rounded-xl overflow-hidden">
//                 <img
//                   src="../images/yassir.jpg"
//                   alt="Yassir"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </motion.label>
//           </Link>
//           {/* Option Taxi Traditionnel */}
//           <Link href="/transport/taxi" passHref>
//             <motion.label
//               className={`flex flex-col md:flex-row items-center justify-between p-4 border-2 ${
//                 selectedOption === 'taxi' ? 'border-[#014F86]' : 'border-[#FC9B89]'
//               } rounded-2xl hover:shadow-md transition-shadow cursor-pointer`}
//               variants={cardVariants}
//               initial="hidden"
//               animate="visible"
//               whileHover="hover"
//               onClick={() => handleOptionSelect('taxi')}
//             >
//               <div className="flex items-center w-full md:w-auto">
//                 <input
//                   type="radio"
//                   name="transport"
//                   value="taxi"
//                   checked={selectedOption === 'taxi'}
//                   onChange={() => handleOptionSelect('taxi')}
//                   className="form-radio h-5 w-5 text-[#014F86] rounded-full border-gray-300 focus:ring-[#FC9B89]"
//                 />
//                 <div className="ml-4">
//                   <h2 className="text-lg md:text-xl font-semibold text-[#014F86]">Taxi Traditionnel</h2>
//                   <p className="text-gray-600 text-sm mt-1">Taxis locaux avec compteur</p>
//                 </div>
//               </div>
//               <div className="w-20 h-20 md:w-24 md:h-24 mt-4 md:mt-0 md:ml-4 border-2 border-[#014F86] rounded-xl overflow-hidden">
//                 <img
//                   src="../images/taxi.jpg"
//                   alt="Taxi"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </motion.label>
//           </Link>

//           {/* Bouton Retour */}
//           <div className="pt-4">
//             <Link href="/" passHref>
//               <motion.button
//                 className="w-full py-3 px-6 bg-[#FC9B89] text-white font-semibold rounded-2xl hover:bg-[#014F86] transition-colors"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 Retour
//               </motion.button>
//             </Link>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default TransportServicePage;


// -------------trae------

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const TransportServicePage = () => {
  const transportOptions = [
    {
      id: 'yango',
      name: 'Yango',
      description: 'Service de VTC premium',
      url: 'https://yango.com/fr_ci/',
      image: '/images/yango.png'
    },
    {
      id: 'yassir',
      name: 'Yassir',
      description: 'Service local de transport',
      url: 'https://yassir.com/fr',
      image: '/images/yassir.jpg'
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05 }
  };

  const handleOptionClick = (option: typeof transportOptions[0]) => {
    window.open(option.url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="bg-white p-6 md:p-8 rounded-3xl shadow-md w-full max-w-2xl border-2 border-[#014F86]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#014F86]">
          Service de Transport
        </h1>
        
        <div className="space-y-4 md:space-y-6">
          {transportOptions.map((option) => (
            <motion.div
              key={option.id}
              className="flex flex-col md:flex-row items-center justify-between p-4 border-2 border-[#FC9B89] rounded-2xl hover:shadow-md cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
              onClick={() => handleOptionClick(option)}
            >
              <div className="flex items-center w-full md:w-auto">
                <div className="ml-4">
                  <h2 className="text-lg md:text-xl font-semibold text-[#014F86]">
                    {option.name}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">{option.description}</p>
                </div>
              </div>
              <div className="w-20 h-20 md:w-24 md:h-24 mt-4 md:mt-0 md:ml-4 border-2 border-[#014F86] rounded-xl overflow-hidden">
                <img
                  src={option.image}
                  alt={option.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          ))}

          {/* Bouton Retour */}
          <div className="pt-4">
            <Link href="/" passHref>
              <motion.button
                className="w-full py-3 px-6 bg-[#FC9B89] text-white font-semibold rounded-2xl hover:bg-[#014F86] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Retour
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TransportServicePage;