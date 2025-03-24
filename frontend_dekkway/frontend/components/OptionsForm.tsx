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

const OptionsForm: React.FC<OptionsFormProps> = ({ onNext, onPrevious, property }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const reservationFee = 5000;
  const housingFee = property.monthlyPrice * 3;
  const total = housingFee + reservationFee;

  const paymentMethods = [
    { id: 'visa', name: 'Visa', logo: '/images/visa-logo.png' },
    { id: 'mastercard', name: 'Mastercard', logo: '/images/mastercard-logo.png' },
    { id: 'orange-money', name: 'Orange Money', logo: '/images/orange-money-logo.png' },
    { id: 'wave', name: 'Wave', logo: '/images/wave-logo.png' }
  ];

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
      {/* En-tête */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{property.name}</h2>
        <p className="text-gray-600 mt-1">{property.location}</p>
      </div>

      {/* Section Frais */}
      <div className="border-2 border-[#014F86] bg-white/50 rounded-2xl p-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Colonne Gauche */}
          <div className="flex-1 space-y-3">
            {/* Caution */}
            <div className="space-y-2 w-40">
              <h3 className="text-xs font-medium text-center text-gray-500 uppercase whitespace-nowrap">Caution</h3>
              <div className="border border-gray-200 rounded-3xl p-2 text-center bg-[#014F86]">
                <span className="text-lg font-bold text-white">
                  {housingFee.toLocaleString('fr-FR')} XOF
                </span>
            
              </div>
            </div>

            {/* Frais Réservation */}
            <div className="space-y-2 w-40">
              <h3 className="text-[0.7rem] font-medium text-center text-gray-500 uppercase leading-tight">Frais de réservation</h3>
              <div className="border border-gray-200 rounded-3xl p-2 text-center bg-[#014F86]">
                <span className="text-lg font-bold text-white">5 000 XOF</span>
              </div>
            </div>
          </div>

          {/* Colonne Droite */}
          <div className="flex-1 flex items-center pl-2">
            <div className="space-y-1 w-full min-w-[120px]">
              <h3 className="text-sm font-medium text-center text-gray-500 uppercase">Total à payer</h3>
              <div className="rounded-3xl text-center bg-[#FC9B89] h-12 flex items-center justify-center mx-auto" style={{width: '70%'}}>
                <span className="text-lg font-bold text-white block">
                  {total.toLocaleString('fr-FR')} XOF
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      {/* Sélection paiement */}
<div className="space-y-4">
  <h3 className="text-lg font-semibold text-gray-800">Moyen de paiement</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {paymentMethods.map((method) => (
      <label
        key={method.id}
        className={`relative p-3 border rounded-lg cursor-pointer transition-all ${
          paymentMethod === method.id 
            ? 'border-[#014F86] bg-blue-50' 
            : 'border-gray-200 opacity-75 hover:opacity-100'
        }`}
      >
        <input
          type="radio"
          name="paymentMethod"
          value={method.id}
          checked={paymentMethod === method.id}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="absolute opacity-0 h-0 w-0"
        />
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-12">
            <Image
              src={method.logo}
              alt={method.name}
              layout="fill"
              objectFit="contain"
              className={`transition duration-200 ${
                paymentMethod && paymentMethod !== method.id 
                  ? 'filter grayscale' 
                  : 'filter-none'
              }`}
            />
          </div>
          <span className={`text-sm font-medium ${
            paymentMethod === method.id 
              ? 'text-[#014F86]' 
              : 'text-gray-600'
          }`}>
            {method.name}
          </span>
        </div>
      </label>
    ))}
  </div>
</div>

      {/* Boutons navigation */}
      <div className="flex justify-between gap-4 pt-4">
        <button
          type="button"
          onClick={onPrevious}
          className="w-1/4 h-10 px-4 bg-[#014F86] hover:bg-[#FC9B89] text-white rounded-3xl font-medium£ transition-colors"
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