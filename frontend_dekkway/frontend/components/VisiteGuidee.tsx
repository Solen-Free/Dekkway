"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Lock } from 'lucide-react';
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
  
  const handlePayment = () => {
    const propertyId = localStorage.getItem('currentPropertyId');
    
    if (propertyId) {
      router.push(`/paiement-visa?id=${propertyId}`);
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
    <div className="bg-white flex flex-col items-center p-4 pt-8 pb-8">
      <div className="w-full max-w-2xl text-center mb-2">
        <h1 className="text-2xl font-semibold">Visite Guidée</h1>
        <p className="text-sm text-gray-500">Toute visite virtuelle est payante</p>
      </div>

      <div className="bg-[#fef2f2] border border-blue-300 rounded-2xl p-6 w-full max-w-2xl shadow-lg">
        <h2 className="text-center text-lg font-medium mb-2">Démarrer la visite guidée</h2>
        <div className="h-[2px] w-32 mx-auto bg-red-500 mb-4 rounded" />

        <div className="flex items-center justify-between mb-6 gap-6">
          {/* Vidéo floutée avec cadenas */}
          <div className="flex-1 border border-blue-300 rounded-xl overflow-hidden">
            <div className="relative w-full h-56 bg-gray-100">
              {videoUrl ? (
                <>
                  <video
                    src={videoUrl}
                    className="w-full h-full object-cover blur-sm"
                    poster="/images/visite-thumbnail.jpg"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Lock className="text-white bg-black bg-opacity-50 rounded-full p-2" size={40} />
                  </div>
                </>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-500">Aucune vidéo disponible</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-2">Accédez à la visite virtuelle</h3>
            <p className="text-sm text-gray-600 mb-4">
              Découvrez ce logement en détail grâce à notre visite virtuelle immersive.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm">Visite disponible</span>
            </div>
            <p className="text-sm font-medium mb-2">Prix: 1000 FCFA</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => router.back()}
            className="flex-1 py-2 rounded-lg text-gray-700 font-semibold bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            Retour
          </button>
          <button 
            onClick={handlePayment}
            className="flex-1 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Payer pour accéder
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisiteGuidee;