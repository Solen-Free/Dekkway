import React, { useState } from 'react';
import { ReservationDetails } from '@/types/reservation';
import Link from "next/link";

interface PaymentFormProps {
  onNext: (data: Partial<ReservationDetails>) => void;
  onPrevious: () => void;
}

const PaymentVideo: React.FC<PaymentFormProps> = ({ onNext, onPrevious }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ 
      cardNumber, 
      expiryDate, 
      cvv, 
      cardName 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Numéro de carte */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Numéro de carte
          </label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full px-4 py-2 bg-white/70 border-2 border-[#014F86] rounded-3xl"
            placeholder="4242 4242 4242 4242"
            required
          />
        </div>

        {/* Date et Nom */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date d'expiration
            </label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full px-4 py-2 bg-white/70 border-2 border-[#014F86] rounded-3xl focus:ring-2 focus:ring-[#014F86] focus:border-[#014F86]"
              placeholder="MM/AA"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-full px-4 py-2 bg-white/70 border-2 border-[#014F86] rounded-3xl focus:ring-2 focus:ring-[#014F86] focus:border-[#014F86]"
              placeholder="123"
              required
            />
          </div>
        </div>

        {/* Nom sur la carte */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom sur la carte
          </label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="w-full px-4 py-2 bg-white/70 border-2 border-[#014F86] rounded-3xl focus:ring-2 focus:ring-[#014F86] focus:border-[#014F86]"
            placeholder="John Doe"
            required
          />
        </div>
      </div>

      {/* Boutons de navigation */}
      <div className="flex justify-between gap-4 mt-8">
        <Link href="../VisiteGuidee"><button
          type="button"
          onClick={onPrevious}
          className="w-1/4 h-10 px-4 bg-[#014F86] hover:bg-[#FC9B89] text-white rounded-3xl transition-colors font-medium shadow-sm"
        >
          Précédent
        </button></Link>
        
        <Link href="../VisualisationVideo"><button
          type="submit"
          className="w-1/4 h-10 px-4 bg-[#FC9B89] hover:bg-[#014F86] text-white rounded-3xl transition-colors font-medium shadow-sm"
        >
          Payer
        </button></Link>
      </div>
    </form>
  );
};

export default PaymentVideo;