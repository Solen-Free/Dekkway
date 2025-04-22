// import React, { useState } from 'react';
// import { ReservationDetails } from '@/types/reservation';
// import Image from 'next/image';

// interface OptionsFormProps {
//   onNext: (data: Partial<ReservationDetails>) => void;
//   onPrevious: () => void;
//   property: {
//     id: number;
//     name: string;
//     location: string;
//     monthlyPrice: number;
//     image: string;
//   };
// }

// type PaymentMethod = ReservationDetails['paymentMethod'];

// const paymentMethods = [
//   { 
//     id: 'card' as const, 
//     name: 'Carte Bancaire',
//     variants: [
//       { type: 'visa', logo: '/images/visa-logo.png' },
//       { type: 'mastercard', logo: '/images/mastercard-logo.png' }
//     ]
//   },
//   { 
//     id: 'orange-money' as const, 
//     name: 'Orange Money', 
//     logo: '/images/orange-money-logo.png' 
//   },
//   { 
//     id: 'wave' as const, 
//     name: 'Wave', 
//     logo: '/images/wave-logo.png' 
//   }
// ] as const;

// const OptionsForm: React.FC<OptionsFormProps> = ({ onNext, onPrevious, property }) => {
//   const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();
//   const reservationFee = 5000;
//   const housingFee = property.monthlyPrice * 3;
//   const total = housingFee + reservationFee;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (paymentMethod) {
//       onNext({ 
//         paymentMethod,
//         property
//       });
//     }
//   };

//   const handlePaymentChange = (methodId: string) => {
//     const validMethods: PaymentMethod[] = ['card', 'orange-money', 'wave'];
//     if (validMethods.includes(methodId as PaymentMethod)) {
//       setPaymentMethod(methodId as PaymentMethod);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//         <h2 className="text-xl font-semibold text-gray-800">{property.name}</h2>
//         <p className="text-gray-600 mt-1">{property.location}</p>
//       </div>

//       <div className="border-2 border-[#014F86] bg-white/50 rounded-2xl p-4">
//         <div className="flex flex-col md:flex-row gap-3">
//           <div className="flex-1 space-y-3">
//             <div className="space-y-2 w-40">
//               <h3 className="text-xs font-medium text-center text-gray-500 uppercase">Caution</h3>
//               <div className="border border-gray-200 rounded-3xl p-2 text-center bg-[#014F86]">
//                 <span className="text-lg font-bold text-white">
//                   {housingFee.toLocaleString('fr-FR')} XOF
//                 </span>
//               </div>
//             </div>

//             <div className="space-y-2 w-40">
//               <h3 className="text-[0.7rem] font-medium text-center text-gray-500 uppercase leading-tight">
//                 Frais de réservation
//               </h3>
//               <div className="border border-gray-200 rounded-3xl p-2 text-center bg-[#014F86]">
//                 <span className="text-lg font-bold text-white">5 000 XOF</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex-1 flex items-center pl-2">
//             <div className="space-y-1 w-full min-w-[120px]">
//               <h3 className="text-sm font-medium text-center text-gray-500 uppercase">Total à payer</h3>
//               <div 
//                 className="rounded-3xl text-center bg-[#FC9B89] h-12 flex items-center justify-center mx-auto" 
//                 style={{ width: '70%' }}
//               >
//                 <span className="text-lg font-bold text-white block">
//                   {total.toLocaleString('fr-FR')} XOF
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="space-y-4">
//         <h3 className="text-lg font-semibold text-gray-800">Moyen de paiement</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           {paymentMethods.map((method) => (
//             <label
//               key={method.id}
//               className={`relative p-3 border-2 rounded-lg cursor-pointer transition-all ${
//                 paymentMethod === method.id 
//                   ? 'border-[#014F86] bg-blue-50' 
//                   : 'border-gray-200 hover:border-[#014F86]/50'
//               }`}
//             >
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value={method.id}
//                 checked={paymentMethod === method.id}
//                 onChange={(e) => handlePaymentChange(e.target.value)}
//                 className="absolute opacity-0 h-0 w-0"
//               />
//               <div className="flex items-center gap-3">
//               {method.id === 'card' ? (
//   <div className="flex gap-2">
//     {method.variants?.map((variant) => (
//       <div key={variant.type} className="relative h-8 w-12">
//         <Image
//           src={variant.logo}
//           alt={variant.type}
//           layout="fill"
//           objectFit="contain"
//           className={`transition-filter ${
//             paymentMethod && paymentMethod !== method.id 
//               ? 'grayscale opacity-50' 
//               : 'grayscale-0 opacity-100'
//           }`}
//         />
//       </div>
//     ))}
//   </div>
//                 ) : (
//                   <div className="relative h-8 w-12">
//                   <Image
//                     src={method.logo}
//                     alt={method.name}
//                     layout="fill"
//                     objectFit="contain"
//                     className={`transition-filter ${
//                       paymentMethod && paymentMethod !== method.id 
//                         ? 'grayscale opacity-50' 
//                         : 'grayscale-0 opacity-100'
//                     }`}
//                   />
//                 </div>
//                 )}
//                 <span className={`text-sm font-medium ${
//                   paymentMethod === method.id 
//                     ? 'text-[#014F86]' 
//                     : 'text-gray-600'
//                 }`}>
//                   {method.name}
//                 </span>
//               </div>
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className="flex justify-between gap-4 pt-4">
//         <button
//           type="button"
//           onClick={onPrevious}
//           className="w-1/4 h-10 px-4 bg-[#014F86] hover:bg-[#FC9B89] text-white rounded-3xl transition-colors"
//         >
//           Précédent
//         </button>
        
//         <button
//           type="submit"
//           disabled={!paymentMethod}
//           className={`w-1/4 h-10 px-4 text-white rounded-3xl font-medium transition-colors ${
//             paymentMethod 
//               ? 'bg-[#FC9B89] hover:bg-[#014F86]' 
//               : 'bg-gray-400 cursor-not-allowed'
//           }`}
//         >
//           Suivant
//         </button>
//       </div>
//     </form>
//   );
// };

// export default OptionsForm;




"use client";
import React, { useState } from 'react';
import { ReservationDetails } from '@/types/reservation';
import Image from 'next/image';

interface OptionsFormProps {
  onNext: (data: Partial<ReservationDetails>) => void;
  onPrevious: () => void;
  property: {
    id: number;
    name: string;
    location: string;
    monthlyPrice: number;
    image: string;
  };
}

// Définition explicite du type PaymentMethod incluant nos 4 méthodes
type PaymentMethod = ReservationDetails['paymentMethod'];

// Tableau des options de paiement dans l'ordre voulu : 
// première ligne : visa & mastercard / deuxième ligne : wave & orange money
const paymentOptions = [
  { id: 'visa' as PaymentMethod, name: 'Visa', logo: '/images/visa-logo.png' },
  { id: 'mastercard' as PaymentMethod, name: 'Mastercard', logo: '/images/mastercard-logo.png' },
  { id: 'wave' as PaymentMethod, name: 'Wave', logo: '/images/wave-logo.png' },
  { id: 'orange-money' as PaymentMethod, name: 'Orange Money', logo: '/images/orange-money-logo.png' },
];

const OptionsForm: React.FC<OptionsFormProps> = ({ onNext, onPrevious, property }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();
  const reservationFee = 2000;
const housingFee = property.monthlyPrice;
const total = housingFee + reservationFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod) {
      onNext({ 
        paymentMethod,
        property
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* En-tête avec les infos de logement */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{property.name}</h2>
        <p className="text-gray-600 mt-1">{property.location}</p>
      </div>

      {/* Affichage des montants */}
      <div className="border-2 border-[#014F86] bg-white/50 rounded-2xl p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 space-y-3">
            <div className="space-y-2 w-40">
              <h3 className="text-xs font-medium text-center text-gray-500 uppercase">Prix mensuel</h3>
              <div className="border border-gray-200 rounded-3xl p-2 text-center bg-[#014F86]">
                <span className="text-lg font-bold text-white">
                  {housingFee.toLocaleString('fr-FR')} XOF
                </span>
              </div>
            </div>
            <div className="space-y-2 w-40">
              <h3 className="text-[0.7rem] font-medium text-center text-gray-500 uppercase leading-tight">
                Frais de réservation
              </h3>
              <div className="border border-gray-200 rounded-3xl p-2 text-center bg-[#014F86]">
                <span className="text-lg font-bold text-white">2 000 XOF</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center pl-2">
            <div className="space-y-1 w-full min-w-[120px]">
              <h3 className="text-sm font-medium text-center text-gray-500 uppercase">Total à payer</h3>
              <div 
                className="rounded-3xl text-center bg-[#FC9B89] h-12 flex items-center justify-center mx-auto" 
                style={{ width: '70%' }}
              >
                <span className="text-lg font-bold text-white block">
                  {total.toLocaleString('fr-FR')} XOF
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sélection du moyen de paiement en grille 2x2 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Moyen de paiement</h3>
        <div className="grid grid-cols-2 gap-3">
          {paymentOptions.map((option) => (
            <label
              key={option.id}
              onClick={() => setPaymentMethod(option.id)}
              className={`relative p-2 border-2 rounded-lg cursor-pointer transition-all flex flex-col items-center ${
                paymentMethod === option.id
                  ? 'border-[#014F86] bg-blue-50'
                  : 'border-gray-200 hover:border-[#014F86]/50'
              }`}
            >
              <div className="relative h-10 w-12 mb-1">
                <Image
                  src={option.logo}
                  alt={option.name}
                  layout="fill"
                  objectFit="contain"
                  className={`transition-filter ${
                    paymentMethod && paymentMethod !== option.id
                      ? 'grayscale opacity-50'
                      : 'grayscale-0 opacity-100'
                  }`}
                />
              </div>
              <span className={`text-xs font-medium ${
                  paymentMethod === option.id
                    ? 'text-[#014F86]'
                    : 'text-gray-600'
                }`}>
                {option.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Boutons de navigation */}
      <div className="flex justify-between gap-4 pt-4">
        <button
          type="button"
          onClick={onPrevious}
          className="w-1/4 h-10 px-4 bg-[#014F86] hover:bg-[#FC9B89] text-white rounded-3xl transition-colors"
        >
          Précédent
        </button>
        <button
          type="submit"
          disabled={!paymentMethod}
          className={`w-1/4 h-10 px-4 text-white rounded-3xl font-medium transition-colors ${
            paymentMethod 
              ? 'bg-[#FC9B89] hover:bg-[#014F86]' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Suivant
        </button>
      </div>
    </form>
  );
};

export default OptionsForm;