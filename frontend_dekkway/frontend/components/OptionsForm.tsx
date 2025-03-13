import React, { useState } from 'react';
import { ReservationDetails } from '@/types/reservation';


interface OptionsFormProps {
  onNext: (data: Partial<ReservationDetails>) => void;
}

const OptionsForm: React.FC<OptionsFormProps> = ({ onNext }) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod) {
      onNext({ paymentMethod });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
    
      <h3 className="text-lg font-medium">Frais de logement: 300000 FCFA / Mois</h3>
      <h3 className="text-lg font-medium">Frais de réservation: 50000 FCFA</h3>
      <h3 className="text-lg font-medium">Total: 350000 FCFA</h3>
      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="radio"
            name="paymentMethod"
            value="Visa"
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="h-4 w-4 text-blue-600 border-gray-300"
          />
          <span className="ml-2 text-sm text-gray-700">Visa</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="paymentMethod"
            value="Mastercard"
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="h-4 w-4 text-blue-600 border-gray-300"
          />
          <span className="ml-2 text-sm text-gray-700">Mastercard</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="paymentMethod"
            value="Orange Money"
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="h-4 w-4 text-blue-600 border-gray-300"
          />
          <span className="ml-2 text-sm text-gray-700">Orange Money</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="paymentMethod"
            value="Wave"
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="h-4 w-4 text-blue-600 border-gray-300"
          />
          <span className="ml-2 text-sm text-gray-700">Wave</span>
        </label>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        Suivant
      </button>
    </form>
  );
};

export default OptionsForm;