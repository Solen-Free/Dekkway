import React, { useState } from 'react';
import { ReservationDetails } from '@/types/reservation';



interface ReservationFormProps {
  onNext: (data: Partial<ReservationDetails>) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onNext }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accepted) {
      onNext({ name, phone, email });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 bg-white/70 block w-full px-3 py-2 border-2 border-[#014F86] rounded-3xl shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Numéro de téléphone:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 bg-white/70 block w-full px-3 py-2 border-2 border-[#014F86] rounded-3xl shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">E-mail:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 bg-white/70 block w-full px-3 py-2 border-2 border-[#014F86] rounded-3xl shadow-sm"
          required
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <a href="/conditions" className="text-[#FC9B89] hover:text-[#014F86]">
          Conditions de Réservation
        </a>
        <label className="ml-2 flex items-center">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="h-4 w-4 accent-[#FC9B89] border-gray-300 rounded-3xl"
          />
          <span className="ml-2 text-sm text-gray-700">J’accepte les conditions de réservation</span>
        </label>
      </div>
      <button
        type="submit"
        className="w-1/4 ml-auto flex justify-center py-2 px-4 border border-transparent rounded-3xl shadow-sm font-medium text-white bg-[#014F86] hover:bg-[#FC9B89]"
      >
        Continuer
      </button>
    </form>
  );
};

export default ReservationForm;