import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ReservationDetails } from '@/types/reservation';
import { HomeIcon, LocationIcon, EmailIcon, PhoneIcon, UserIcon, PaymentIcon, CalendarIcon, ClockIcon } from '@/public/icons/confirmation-icons';

interface ConfirmationProps {
  reservationDetails: ReservationDetails;
}

const Confirmation: React.FC<ConfirmationProps> = ({ reservationDetails }) => {
  const router = useRouter();
  // Calcul du total
  const total = reservationDetails.property.monthlyPrice + 2000;

  // Date et heure du paiement
  const date = new Date();
  const paymentDate = date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  const paymentTime = date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Sauvegarder la réservation dans localStorage
  useEffect(() => {
    // Récupérer les réservations existantes
    const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    
    // Générer un ID de transaction vraiment unique
    const uniqueId = `TR-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
    
    // Créer un nouvel objet de réservation avec toutes les propriétés nécessaires
    const newReservation = {
      id: reservationDetails.property.id.toString(),
      name: reservationDetails.property.name,
      location: reservationDetails.property.location,
      price: reservationDetails.property.monthlyPrice,
      image: reservationDetails.property.image,
      date: paymentDate,
      time: paymentTime,
      transactionId: uniqueId,
      reservationDate: new Date().toISOString()
    };
    
    // Vérifier si cette réservation existe déjà (basé sur l'ID de propriété et la date)
    const isDuplicate = existingReservations.some(
      (reservation) => 
        reservation.id === newReservation.id && 
        reservation.date === newReservation.date &&
        reservation.time === newReservation.time
    );
    
    // Ajouter la nouvelle réservation uniquement si elle n'existe pas déjà
    if (!isDuplicate) {
      const updatedReservations = [newReservation, ...existingReservations];
      localStorage.setItem('reservations', JSON.stringify(updatedReservations));
    }
  }, []);

  return (
    <div className="w-full mx-auto p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-6 rounded-xl">
        {/* Colonne de gauche */}
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <h2 className="text-base font-semibold text-[#014F86]">Nom du logement</h2>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <HomeIcon className="w-6 h-6 text-[#FC9B89]" />
              <span className="font-normal">{reservationDetails.property.name}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-[#014F86]">Localisation</h2>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <LocationIcon className="w-6 h-6 text-[#FC9B89]" />
              <span className="font-normal">{reservationDetails.property.location}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-[#014F86]">Réservé par :</h2>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <UserIcon className="w-6 h-6 text-[#FC9B89]" />
              <span className="font-normal">{reservationDetails.name}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-[#014F86]">Méthode de paiement</h2>
            <div className="flex items-center w-full text-sm text-gray-700 mt-4">
              <div className="flex items-center justify-between w-full gap-2 flex-wrap">
                <img 
                  src={`/images/${reservationDetails.paymentMethod}-logo.png`} 
                  alt={reservationDetails.paymentMethod.toUpperCase()} 
                  className="h-8 flex-shrink-0" 
                />
                <div className="flex items-center gap-2 whitespace-normal">
                  <span className="font-normal text-[#014F86]">Montant Total :</span>
                  <span className="font-semibold text-[#014F86]">{total.toLocaleString('fr-FR')} XOF</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne de droite */}
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <h2 className="text-base font-semibold text-[#014F86] whitespace-nowrap">Informations Personnelles</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <EmailIcon className="w-6 h-6 text-[#FC9B89]" />
                <span className="font-normal">{reservationDetails.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <PhoneIcon className="w-6 h-6 text-[#FC9B89]" />
                <span className="font-normal">{reservationDetails.phone}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-[#014F86]">Date et Heure</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <CalendarIcon className="w-6 h-6 text-[#FC9B89]" />
                <span className="font-normal">{paymentDate}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <ClockIcon className="w-6 h-6 text-[#FC9B89]" />
                <span className="font-normal">{paymentTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton de retour */}
      <div className="mt-6 sm:mt-8 text-center">
        {/* Boutons de navigation */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <button
            onClick={() => router.push('/Reservations')}
            className="py-2 px-4 sm:px-6 bg-[#014F86] text-white text-sm rounded-lg font-normal hover:bg-[#FC9B89] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
          >
            Voir mes réservations
          </button>
          
          <button
            onClick={() => router.push('/servicessuplementaires')}
            className="py-2 px-4 sm:px-6 bg-[#FC9B89] text-white text-sm rounded-lg font-normal hover:bg-[#014F86] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
          >
            Découvrir nos services supplémentaires
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;