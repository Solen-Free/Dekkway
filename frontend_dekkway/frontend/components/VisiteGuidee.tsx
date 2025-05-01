"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Lock, ArrowLeft, CreditCard, Shield } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const VisiteGuidee = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        // Récupérer l'ID du logement depuis localStorage
        const propertyId = localStorage.getItem('currentPropertyId');
        console.log("ID du logement récupéré:", propertyId);
        
        if (!propertyId) {
          setError("Aucun ID de logement trouvé");
          setLoading(false);
          return;
        }
        
        // Vérifier si les détails du logement sont déjà stockés dans localStorage
        const storedPropertyData = localStorage.getItem('propertyDetails');
        
        if (storedPropertyData) {
          try {
            const parsedData = JSON.parse(storedPropertyData);
            console.log("Données du logement depuis localStorage:", parsedData);
            
            if (parsedData.videoUrl) {
              setVideoUrl(parsedData.videoUrl);
              setLoading(false);
              return;
            }
          } catch (e) {
            console.error("Erreur lors du parsing des données stockées:", e);
          }
        }
        
        // Si les données ne sont pas dans localStorage ou si la vidéo n'est pas disponible,
        // faire une requête au backend
        const response = await axios.get(`http://127.0.0.1:8000/details-logements/${propertyId}/`);
        console.log("Données du logement depuis l'API:", response.data);
        
        // Récupérer la vidéo depuis les médias
        const video = response.data.medias?.find(media => media.type === "video")?.fichier;
        console.log("URL de la vidéo:", video);
        
        if (video) {
          setVideoUrl(video);
          
          // Stocker les détails du logement dans localStorage
          const propertyDetails = {
            id: propertyId,
            videoUrl: video,
            title: `${response.data.type || "Logement"} - ${response.data.region || ""}`,
            location: `${response.data.quartier || ""}, ${response.data.region || ""}`,
            price: typeof response.data.prix === 'string' ? parseInt(response.data.prix.replace(/[^0-9]/g, '')) : (response.data.prix || 0)
          };
          
          localStorage.setItem('propertyDetails', JSON.stringify(propertyDetails));
        } else {
          setError("Aucune vidéo disponible pour ce logement");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails:", error);
        setError("Erreur lors de la récupération des détails du logement");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPropertyDetails();
  }, []);
  
  const handlePayment = (paymentMethod: string) => {
    const propertyId = localStorage.getItem('currentPropertyId');
    
    if (propertyId) {
      if (paymentMethod === 'visa') {
        router.push(`/paiement-visa?id=${propertyId}`);
      } else {
        // Pour les autres méthodes de paiement, vous pouvez ajouter des routes spécifiques
        router.push(`/paiement-${paymentMethod}?id=${propertyId}`);
      }
    } else {
      console.log("Aucun ID de logement disponible pour la redirection");
      router.push('/paiement-visa');
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <div className="bg-red-50 border border-red-300 rounded-2xl p-6 w-full max-w-lg shadow-lg">
          <h2 className="text-center text-lg font-semibold mb-4 text-red-600">
            {error}
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Veuillez retourner à la page précédente et réessayer.
          </p>
          <button 
            onClick={() => router.back()}
            className="w-full py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Visite Guidée</h1>
        <div className="h-1 w-20 bg-blue-600 rounded-full mb-2"></div>
        <p className="text-gray-600">Découvrez votre futur logement en détail</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-3xl shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Vidéo floutée avec design moderne */}
          <div className="w-full md:w-3/5 rounded-xl overflow-hidden shadow-md">
            <div className="relative w-full h-64 bg-gray-100">
              {videoUrl ? (
                <>
                  <video
                    src={videoUrl}
                    className="w-full h-full object-cover blur-sm"
                    muted
                    autoPlay
                    loop
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-full p-4 shadow-lg transform transition-transform hover:scale-105">
                      <Lock size={36} className="text-blue-600" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-500">Aucune vidéo disponible</p>
                </div>
              )}
            </div>
          </div>

          {/* Informations de paiement avec design moderne */}
          <div className="w-full md:w-2/5 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Accès Premium</h2>
            <p className="text-gray-600 text-sm">
              Débloquez l'accès complet à la visite virtuelle de ce logement et explorez chaque pièce en détail.
            </p>
            
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Shield size={16} className="text-green-600" />
              <span>Paiement sécurisé</span>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Prix de la visite</p>
              <p className="text-2xl font-bold text-blue-700">1000 XOF</p>
            </div>
          </div>
        </div>

        {/* Moyens de paiement avec design moderne */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800">Choisissez votre moyen de paiement</h3>
            <CreditCard size={20} className="text-blue-600" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div 
              className="bg-white border border-gray-200 hover:border-blue-400 rounded-xl p-3 flex items-center justify-center cursor-pointer transition-all hover:shadow-md"
              onClick={() => handlePayment('wave')}
            >
              <img
                src="/images/wave-logo.png"
                alt="Wave"
                className="h-10"
              />
            </div>
            
            <div 
              className="bg-white border border-gray-200 hover:border-blue-400 rounded-xl p-3 flex items-center justify-center cursor-pointer transition-all hover:shadow-md"
              onClick={() => handlePayment('orange')}
            >
              <img
                src="/images/orange-money-logo.png"
                alt="Orange Money"
                className="h-10"
              />
            </div>
            
            <div 
              className="bg-white border border-gray-200 hover:border-blue-400 rounded-xl p-3 flex items-center justify-center cursor-pointer transition-all hover:shadow-md"
              onClick={() => handlePayment('visa')}
            >
              <img
                src="/images/visa-logo.png"
                alt="Visa"
                className="h-10"
              />
            </div>
            
            <div 
              className="bg-white border border-gray-200 hover:border-blue-400 rounded-xl p-3 flex items-center justify-center cursor-pointer transition-all hover:shadow-md"
              onClick={() => handlePayment('mastercard')}
            >
              <img
                src="/images/mastercard-logo.png"
                alt="Mastercard"
                className="h-10"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 font-medium bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={16} />
            Retour
          </button>
        </div>
      </div>
      
      <p className="mt-6 text-sm text-gray-500 text-center max-w-xl">
        En effectuant ce paiement, vous acceptez nos conditions d'utilisation et notre politique de confidentialité. 
        La visite virtuelle sera disponible pendant 24 heures après l'achat.
      </p>
    </div>
  );
};

export default VisiteGuidee;