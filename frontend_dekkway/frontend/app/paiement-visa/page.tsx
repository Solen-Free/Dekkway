"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PaymentForm from '@/components/PaymentForm';

export default function PaiementVisaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [propertyDetails, setPropertyDetails] = useState<any>(null);
  
  useEffect(() => {
    // Récupérer l'ID du logement depuis les paramètres d'URL ou localStorage
    const id = searchParams.get('id') || localStorage.getItem('currentPropertyId');
    setPropertyId(id);
    
    // Récupérer les détails du logement depuis localStorage
    const storedPropertyData = localStorage.getItem('propertyDetails');
    if (storedPropertyData) {
      try {
        const parsedData = JSON.parse(storedPropertyData);
        setPropertyDetails(parsedData);
      } catch (e) {
        console.error("Erreur lors du parsing des données stockées:", e);
      }
    }
  }, [searchParams]);
   
  const handleNext = (data: any) => {
    console.log('Infos Carte:', data);
    
    // Rediriger vers VisualisationVideo en transmettant l'ID du logement
    if (propertyId) {
      router.push(`/VisualisationVideo?id=${propertyId}`);
    } else {
      console.log("Aucun ID de logement disponible pour la redirection");
      router.push('/VisualisationVideo'); // La page utilisera les données par défaut
    }
  };
  
  const handlePrevious = () => {
    // Rediriger vers VisiteGuidee en conservant l'ID du logement
    if (propertyId) {
      router.push(`/VisiteGuidee?id=${propertyId}`);
    } else {
      router.push('/VisiteGuidee');
    }
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
          amount={propertyDetails?.price || 1000}
          userDetails={{
            name: "",
            email: "",
            phone: ""
          }}
          propertyDetails={{
            id: propertyId ? parseInt(propertyId) : 0,
            name: propertyDetails?.title || "Visite Guidée",
            location: propertyDetails?.location || "",
            monthlyPrice: propertyDetails?.price || 1000
          }}
        />
      </div>
    </div>
  );
}