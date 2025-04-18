import React, { useState } from 'react';
import { ReservationDetails } from '@/types/reservation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';



interface ReservationFormProps {
  onNext: (data: Partial<ReservationDetails>) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onNext }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accepted) {
      setShake(true);
      toast.error('Veuillez accepter les conditions de réservation');
      setTimeout(() => setShake(false), 500);
      return;
    }
    onNext({ name, phone, email });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '').slice(0, 20);
    setName(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 9);
    setPhone(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom:</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          maxLength={20}
          placeholder=""
          className="mt-1 bg-white/70 block w-full px-3 py-2 border-2 border-[#014F86] rounded-3xl shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Numéro de téléphone:</label>
        <input
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={9}
          placeholder=""
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
      <motion.button
        type="submit"
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="w-1/4 ml-auto flex justify-center py-2 px-4 border border-transparent rounded-3xl shadow-sm font-medium text-white bg-[#014F86] hover:bg-[#FC9B89]"
      >
        Continuer
      </motion.button>
    </form>
  );
};

export default ReservationForm;