import React from 'react';
import { ReservationDetails } from '@/types/reservation';


interface ConfirmationProps {
  reservationDetails: ReservationDetails;
}

const Confirmation: React.FC<ConfirmationProps> = ({ reservationDetails }) => {
  const handlePaymentSuccess = async () => {
    try {
      const response = await fetch('/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationDetails),
      });

      if (response.ok) {
        alert('Paiement réussi!');
      } else {
        alert('Erreur lors du paiement.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors du paiement.');
    }
  };

  return (
    <div className="text-center space-y-4">
      
      <h2 className="text-2xl font-bold">Récapitulatif de la réservation</h2>
      <p>Nom du logement: {reservationDetails.propertyName}</p>
      <p>Localisation: {reservationDetails.location}</p>
      <p>Nom: {reservationDetails.name}</p>
      <p>Email: {reservationDetails.email}</p>
      <p>Téléphone: {reservationDetails.phone}</p>
      <p>Méthode de paiement: {reservationDetails.paymentMethod}</p>
      <p>Date et heure du paiement: {new Date().toLocaleString()}</p>
      <button
        onClick={handlePaymentSuccess}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        Paiement réussi
      </button>
    </div>
  );
};

export default Confirmation;