
"use client";

import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ReservationDetails } from '@/types/reservation';

interface PaymentFormProps {
  onSuccess: (transactionId: string) => void;
  onError: (message: string) => void;
  onPrevious: () => void;
  paymentMethod: 'visa' | 'mastercard' | 'orange-money' | 'wave';
  amount: number;
  userDetails: {
    name: string;
    email: string;
    phone: string;
  };
  propertyDetails: {
    id: number;
    name: string;
    location: string;
    monthlyPrice: number;
  };
}

interface PaymentResponse {
  success: boolean;
  transactionId: string;
  message?: string;
}

const API_URL = process.env.NEXT_PUBLIC_PAYMENT_API_URL || '/api/paiement';

const PaymentForm: React.FC<PaymentFormProps> = ({
  onSuccess,
  onError,
  onPrevious,
  paymentMethod,
  amount,
  userDetails,
  propertyDetails
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // États pour carte bancaire
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  // États pour Orange Money
  const [omCode, setOmCode] = useState<string[]>(new Array(5).fill(''));

  // États pour Wave
  const [wavePhone, setWavePhone] = useState('');

  // Validation des entrées
  const validateForm = () => {
    setError(null);

    if (paymentMethod === 'wave' && !wavePhone.trim()) {
      setError('Veuillez renseigner votre numéro Wave');
      return false;
    }

    if (paymentMethod === 'visa' || paymentMethod === 'mastercard') {
      if (!/^\d{16}$/.test(cardDetails.number.replace(/\s/g, ''))) {
        setError('Numéro de carte invalide');
        return false;
      }
      if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardDetails.expiry)) {
        setError("Date d'expiration invalide");
        return false;
      }
      if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
        setError('CVV invalide');
        return false;
      }
      if (cardDetails.name.trim().length < 2) {
        setError('Nom sur la carte invalide');
        return false;
      }
      return true;
    }

    if (paymentMethod === 'orange-money') {
      if (omCode.join('').length !== 5) {
        setError('Code Orange Money incomplet');
        return false;
      }
      return true;
    }

    if (paymentMethod === 'wave') {
      if (!/^(77|76|70|75)\d{7}$/.test(wavePhone.replace(/\D/g, ''))) {
        setError('Numéro Wave invalide');
        return false;
      }
      return true;
    }

    setError('Méthode de paiement inconnue');
    return false;
  };

  // Mise à jour du code Orange Money
  const handleOmCodeChange = (index: number, value: string) => {
    const newCode = [...omCode];
    newCode[index] = value.replace(/\D/, '');
    setOmCode(newCode);

    if (value && index < 4) {
      const nextInput = document.getElementById(`om-code-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Formatage automatique du numéro Wave
  const handleWavePhoneChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 9); // Limite à 9 chiffres
    setWavePhone(cleaned);
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      // Simulation de paiement pour le développement
      const simulatePayment = () => {
        return new Promise<PaymentResponse>((resolve) => {
          setTimeout(() => {
            resolve({
              success: true,
              transactionId: `TR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              message: 'Paiement effectué avec succès'
            });
          }, 2000); // Délai de 2 secondes pour simuler le traitement
        });
      };

      const payload: any = {
        paymentMethod,
        amount,
        details: {}
      };

      if (paymentMethod === 'visa' || paymentMethod === 'mastercard') {
        payload.details = {
          card: {
            number: cardDetails.number.replace(/\s/g, ''),
            expiry: cardDetails.expiry,
            cvv: cardDetails.cvv,
            name: cardDetails.name
          }
        };
      } else if (paymentMethod === 'orange-money') {
        payload.details = { code: omCode.join('') };
      } else if (paymentMethod === 'wave') {
        payload.details = { phone: wavePhone.replace(/\s/g, '') };
      }

      // Utiliser la simulation en développement
      const response = await simulatePayment();

      if (response.success) {
        toast.success('Paiement réussi !');
        setTimeout(() => {
          onSuccess(response.transactionId);
        }, 1500);
      } else {
        throw new Error(response.message || 'Échec du paiement');
      }
    } catch (err: any) {
      let errorMessage = 'Une erreur est survenue lors du paiement';
      
      if (err.message.includes('Fonds insuffisants')) {
        errorMessage = 'Transaction refusée : Fonds insuffisants';
      } else if (err.message.includes('réseau')) {
        errorMessage = 'Erreur réseau : Veuillez vérifier votre connexion';
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      setError(errorMessage);
      toast.error(errorMessage);
      onError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Rendu des champs dynamiques selon la méthode
  const renderPaymentFields = () => {
    if (paymentMethod === 'visa' || paymentMethod === 'mastercard') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Numéro de carte
            </label>
            <input
              type="text"
              value={cardDetails.number}
              onChange={(e) =>
                setCardDetails({
                  ...cardDetails,
                  number: e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim()
                })
              }
              className="w-full px-4 py-2 bg-white/70 border-2 border-[#014F86] rounded-3xl"
              placeholder="4242 4242 4242 4242"
              maxLength={19}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date d'expiration
              </label>
              <input
                type="text"
                value={cardDetails.expiry}
                onChange={(e) =>
                  setCardDetails({
                    ...cardDetails,
                    expiry: e.target.value
                      .replace(/\D/g, '')
                      .replace(/(\d{2})(\d{2})/, '$1/$2')
                  })
                }
                className="w-full px-4 py-2 bg-white/70 border-2 border-[#014F86] rounded-3xl"
                placeholder="MM/AA"
                maxLength={5}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails({
                    ...cardDetails,
                    cvv: e.target.value.replace(/\D/g, '').slice(0, 4)
                  })
                }
                className="w-full px-4 py-2 bg-white/70 border-2 border-[#014F86] rounded-3xl"
                placeholder="123"
                maxLength={4}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom sur la carte
            </label>
            <input
              type="text"
              value={cardDetails.name}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, name: e.target.value })
              }
              className="w-full px-4 py-2 bg-white/70 border-2 border-[#014F86] rounded-3xl"
              placeholder="John Doe"
            />
          </div>
        </div>
      );
    }

    if (paymentMethod === 'orange-money') {
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700 mb-4">
              Payez simplement vos achats avec Orange Money.<br />
              Vous devez pour cela obtenir un code de paiement :<br />
              1. Composez le #144#391#<br />
              2. Entrez votre code secret<br />
              3. Renseignez le code reçu par SMS ici
            </p>
            <div className="flex justify-center gap-3 mb-6">
              {omCode.map((digit, index) => (
                <input
                  key={index}
                  id={`om-code-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOmCodeChange(index, e.target.value)}
                  className="w-12 h-12 text-2xl text-center border-2 border-[#014F86] rounded-lg focus:ring-2 focus:ring-[#014F86]"
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (paymentMethod === 'wave') {
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700 mb-4">
              Payez simplement vos achats avec Wave :<br />
              1. Saisissez votre numéro Wave<br />
              2. Cliquez sur "Envoyer la demande"<br />
              3. Validez la transaction dans l'application
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro Wave
              </label>
              <input
                type="tel"
                value={wavePhone}
                onChange={(e) => handleWavePhoneChange(e.target.value)}
                className="w-full px-4 py-2 bg-white/70 border-2 border-[#014F86] rounded-3xl"
                placeholder="77 130 89 37"
                maxLength={11}
                required
              />
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-[#014F86]">
          Total à payer : {amount ? amount.toLocaleString('fr-FR') : '0'} XOF
        </h3>
      </div>

      {renderPaymentFields()}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex justify-between gap-4 mt-8">
        <button
          type="button"
          onClick={onPrevious}
          disabled={loading}
          className="w-1/4 h-10 px-4 bg-[#014F86] hover:bg-[#FC9B89] disabled:opacity-50 text-white rounded-3xl transition-colors font-medium shadow-sm"
        >
          Précédent
        </button>

        <button
          type="submit"
          disabled={loading}
          className={`w-1/4 h-10 px-4 text-white rounded-3xl font-medium shadow-sm transition-colors ${
            loading ? 'bg-gray-400' : 'bg-[#FC9B89] hover:bg-[#014F86]'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Traitement...
            </span>
          ) : (
            'Confirmer'
          )}
        </button>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
};

export default PaymentForm;

// Note: Make sure to handle null values when using toLocaleString()
// Example: amount ? amount.toLocaleString() : '0'