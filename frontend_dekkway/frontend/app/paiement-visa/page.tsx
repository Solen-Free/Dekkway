"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PaymentForm from '@/components/PaymentForm';

export default function PaiementVisaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [propertyDetails, setPropertyDetails] = useState<any>(null);
  const [visitPrice] = useState<number>(1000); // Prix fixe de la visite virtuelle
  
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
        
        {/* Affichage du montant de la visite virtuelle
        <div className="mb-6 p-4 bg-white rounded-xl shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Visite virtuelle :</span>
            <span className="font-semibold">{visitPrice.toLocaleString()} XOF</span>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between items-center">
            <span className="font-medium text-gray-800">Total à payer :</span>
            <span className="font-bold text-blue-700 text-lg">{visitPrice.toLocaleString()} XOF</span>
          </div>
        </div> */}
        
        <PaymentForm
          onSuccess={handleNext}
          onError={(msg) => console.error(msg)}
          onPrevious={handlePrevious}
          paymentMethod="visa"
          amount={visitPrice}
          userDetails={{
            name: propertyDetails?.userName || 'Utilisateur',
            email: propertyDetails?.userEmail || 'utilisateur@example.com',
            phone: propertyDetails?.userPhone || ''
          }}
          propertyDetails={{
            id: parseInt(propertyId || '0'),
            name: propertyDetails?.title || 'Logement',
            location: propertyDetails?.location || 'Emplacement non spécifié',
            monthlyPrice: propertyDetails?.price || 0
          }}
        />
      </div>
    </div>
  );
}