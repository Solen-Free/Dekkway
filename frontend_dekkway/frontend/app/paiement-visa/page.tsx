"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import PaymentForm from '@/components/PaymentForm';

export default function PaiementVisaPage() {
  const router = useRouter();
   
  const handleNext = (data: any) => {
    console.log('Infos Carte:', data);
    
    // Exemple d'infos à récupérer dynamiquement ou passer manuellement
    const videoUrl = '/videos/visite.mp4';
    const title = 'Studio Meublé Confortable';
    const location = 'Dakar, Point E';
    const price = 120000;
  
    // Redirection avec infos dans l'URL
    router.push(`/VisualisationVideo?videoUrl=${encodeURIComponent(videoUrl)}&title=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}&price=${price}`);
  };
  

  const handlePrevious = () => {
    router.push('/VisiteGuidee'); // Redirige vers VisiteGuidee
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold text-center mb-2">Visite Guidée</h1>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Procédez au paiement par carte bancaire
      </p>

      <div className="bg-[#fef2f2] border border-blue-300 rounded-2xl p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-center text-lg font-semibold mb-6">
          Renseignez vos informations
        </h2>
        <PaymentForm 
          onNext={handleNext} 
          onPrevious={handlePrevious}
          onSuccess={(transactionId) => handleNext({ transactionId })}
          onError={(message) => console.error(message)}
          paymentMethod="visa"
          amount={1000}
          userDetails={{
            name: "",
            email: "",
            phone: ""
          }}
          propertyDetails={{
            id: 0,
            name: "Visite Guidée",
            location: "",
            monthlyPrice: 1000
          }}
        />
      </div>
    </div>
  );
}