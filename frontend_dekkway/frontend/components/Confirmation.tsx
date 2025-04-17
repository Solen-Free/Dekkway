// import React, { useState } from 'react';
// import { ReservationDetails } from '@/types/reservation';

// interface ConfirmationProps {
//   reservationDetails: ReservationDetails;
// }

// const Confirmation: React.FC<ConfirmationProps> = ({ reservationDetails }) => {
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handlePaymentSuccess = async () => {
//     setIsProcessing(true);
//     try {
//       const response = await fetch('/api/reservation', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...reservationDetails,
//           cardNumber: '•••• •••• •••• ' + reservationDetails.cardNumber?.slice(-4), // Masquage des données sensibles
//           cvv: '•••'
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) throw new Error(data.message || 'Erreur de paiement');

//       alert('Paiement confirmé ! Un email de confirmation vous a été envoyé.');
//       // Redirection ou reset du formulaire ici si nécessaire

//     } catch (error) {
//       console.error('Erreur:', error);
//       alert(error instanceof Error ? error.message : 'Erreur inconnue');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // Formatage de la date
//   const paymentDate = new Date().toLocaleDateString('fr-FR', {
//     day: '2-digit',
//     month: 'long',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-[#014F86] mb-6 text-center">
//         Confirmation de réservation
//       </h2>

//       <div className="space-y-4 mb-8">
//         {/* Section Logement */}
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <h3 className="font-semibold text-lg mb-2">Détails du logement</h3>
//           <p className="text-gray-600">
//             <span className="font-medium">Nom :</span> {reservationDetails.property.name}
//           </p>
//           <p className="text-gray-600">
//             <span className="font-medium">Localisation :</span> {reservationDetails.property.location}
//           </p>
//           <p className="text-gray-600">
//             <span className="font-medium">Prix mensuel :</span> {reservationDetails.property.monthlyPrice.toLocaleString()} FCFA
//           </p>
//         </div>

//         {/* Section Paiement */}
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <h3 className="font-semibold text-lg mb-2">Informations de paiement</h3>
//           <p className="text-gray-600">
//             <span className="font-medium">Méthode :</span> {reservationDetails.paymentMethod}
//           </p>
//           <p className="text-gray-600">
//             <span className="font-medium">Date :</span> {paymentDate}
//           </p>
//         </div>

//         {/* Section Contact */}
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <h3 className="font-semibold text-lg mb-2">Coordonnées</h3>
//           <p className="text-gray-600">
//             <span className="font-medium">Nom :</span> {reservationDetails.name}
//           </p>
//           <p className="text-gray-600">
//             <span className="font-medium">Email :</span> {reservationDetails.email}
//           </p>
//           <p className="text-gray-600">
//             <span className="font-medium">Téléphone :</span> {reservationDetails.phone}
//           </p>
//         </div>
//       </div>

//       <button
//         onClick={handlePaymentSuccess}
//         disabled={isProcessing}
//         className="w-full py-3 px-6 bg-[#014F86] hover:bg-[#013A5E] text-white rounded-md transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isProcessing ? 'Traitement en cours...' : 'Confirmer le paiement'}
//       </button>

//       <p className="text-sm text-gray-500 mt-4 text-center">
//         En confirmant, vous acceptez nos conditions générales de vente
//       </p>
//     </div>
//   );
// };

// export default Confirmation;



// import React, { useState } from 'react';
// import { ReservationDetails } from '@/types/reservation';

// interface ConfirmationProps {
//   reservationDetails: ReservationDetails;
// }

// const Confirmation: React.FC<ConfirmationProps> = ({ reservationDetails }) => {
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handlePaymentSuccess = async () => {
//     setIsProcessing(true);
//     try {
//       // Construction du payload selon la méthode de paiement
//       const payload: any = {
//         ...reservationDetails,
//         paymentMethod: reservationDetails.paymentMethod,
//       };

//       // Masquage des données sensibles
//       switch(reservationDetails.paymentMethod) {
//         case 'orange-money':
//           payload.orangeMoneyCode = '•••••';
//           break;
//         case 'wave':
//           payload.wavePhoneNumber = '•••• ••• •••';
//           break;
//         default:
//           payload.cardNumber = '•••• •••• •••• ' + reservationDetails.cardNumber?.slice(-4);
//           payload.cvv = '•••';
//       }

//       // Simulation d'appel API
//       const response = await fetch('/api/paiement', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (!response.ok) throw new Error(data.message || 'Erreur de paiement');

//       alert('Paiement confirmé ! Un email de confirmation vous a été envoyé.');
//       // Redirection ou reset du formulaire ici si nécessaire

//     } catch (error) {
//       console.error('Erreur:', error);
//       alert(error instanceof Error ? error.message : 'Erreur inconnue');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // Formatage de la date
//   const paymentDate = new Date().toLocaleDateString('fr-FR', {
//     day: '2-digit',
//     month: 'long',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-[#014F86] mb-6 text-center">
//         Confirmation de réservation
//       </h2>

//       <div className="space-y-4 mb-8">
//         {/* Section Logement */}
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <h3 className="font-semibold text-lg mb-2">Détails du logement</h3>
//           <p className="text-gray-600">
//             <span className="font-medium">Nom :</span> {reservationDetails.property.name}
//           </p>
//           <p className="text-gray-600">
//             <span className="font-medium">Localisation :</span> {reservationDetails.property.location}
//           </p>
//           <p className="text-gray-600">
//             <span className="font-medium">Prix mensuel :</span> {reservationDetails.property.monthlyPrice.toLocaleString()} FCFA
//           </p>
//         </div>

//         {/* Section Paiement */}
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <h3 className="font-semibold text-lg mb-2">Informations de paiement</h3>
//           <p className="text-gray-600">
//             <span className="font-medium">Méthode :</span> {reservationDetails.paymentMethod}
//           </p>
//           <p className="text-gray-600">
//             <span className="font-medium">Date :</span> {paymentDate}
//           </p>
//           <p className="text-gray-600">
//             <span className="font-medium">Détails :</span> {
//               reservationDetails.paymentMethod === 'orange-money' && 'Code Orange Money •••••'
//             }
//             {
//               reservationDetails.paymentMethod === 'wave' && `Numéro Wave: ${reservationDetails.wavePhoneNumber}`
//             }
//             {
//               ['visa', 'mastercard'].includes(reservationDetails.paymentMethod) && 
//               `Carte ${reservationDetails.cardName} (•••• •••• •••• ${reservationDetails.cardNumber?.slice(-4)})`
//             }
//           </p>
//         </div>

//         {/* Section Contact */}
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <h3 className="font-semibold text-lg mb-2">Coordonnées</h3>
//           <p className="text-gray-600">
//             <span className="font-medium">Nom :</span> {reservationDetails.name}
//           </p>
//           <p className="text-gray-600">
//             <span className="font-medium">Email :</span> {reservationDetails.email}
//           </p>
//           <p className="text-gray-600">
//             <span className="font-medium">Téléphone :</span> {reservationDetails.phone}
//           </p>
//         </div>
//       </div>

//       <button
//         onClick={handlePaymentSuccess}
//         disabled={isProcessing}
//         className="w-full py-3 px-6 bg-[#014F86] hover:bg-[#013A5E] text-white rounded-md transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isProcessing ? 'Traitement en cours...' : 'Confirmer le paiement'}
//       </button>

//       <p className="text-sm text-gray-500 mt-4 text-center">
//         En confirmant, vous acceptez nos{' '}
//         <a href="/conditions" className="text-[#FC9B89] hover:text-[#014F86] underline">
//           conditions générales de vente
//         </a>
//       </p>
//     </div>
//   );
// };

// export default Confirmation;




// app/recapitulatif/page.tsx


"use client";

import React from 'react';
import { ReservationDetails } from '@/types/reservation';

interface ConfirmationProps {
  reservationDetails: ReservationDetails;
}

const Confirmation: React.FC<ConfirmationProps> = ({ reservationDetails }) => {
  // Calcul du total
  const total = reservationDetails.property.monthlyPrice * 3 + 2000;

  // Date du paiement
  const paymentDate = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-[#014F86] mb-6 text-center">
        Récapitulatif de votre réservation
      </h2>

      {/* Message de succès */}
      {reservationDetails.transactionId && (
        <p className="text-center text-green-600 font-medium mb-6">
          Paiement réussi ! (ID : {reservationDetails.transactionId})
        </p>
      )}

      {/* Détails du logement */}
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h3 className="font-semibold text-lg mb-2">Logement</h3>
        <p className="text-gray-600">
          <span className="font-medium">Nom :</span> {reservationDetails.property.name}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Localisation :</span> {reservationDetails.property.location}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Prix mensuel :</span>{" "}
          {reservationDetails.property.monthlyPrice.toLocaleString('fr-FR')} XOF
        </p>
      </div>

      {/* Détails du paiement */}
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h3 className="font-semibold text-lg mb-2">Paiement</h3>
        <p className="text-gray-600">
          <span className="font-medium">Méthode :</span> {reservationDetails.paymentMethod}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Date :</span> {paymentDate}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Total débité :</span> {total.toLocaleString('fr-FR')} XOF
        </p>
      </div>

      {/* Coordonnées du client */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-2">Vos coordonnées</h3>
        <p className="text-gray-600">
          <span className="font-medium">Nom :</span> {reservationDetails.name}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Email :</span> {reservationDetails.email}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Téléphone :</span> {reservationDetails.phone}
        </p>
      </div>

      {/* Bouton retour à l'accueil */}
      <div className="text-center">
        <button
          onClick={() => (window.location.href = '/')}
          className="py-2 px-4 bg-[#014F86] hover:bg-[#013A5E] text-white rounded-md transition-colors font-medium"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default Confirmation;