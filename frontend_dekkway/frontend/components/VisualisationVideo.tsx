'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Play } from 'lucide-react';

interface VisualisationVideoProps {
  videoUrl: string;
  title: string;
  location: string;
  price: number;
  currency?: string;
}

export default function VisualisationVideo({
  videoUrl,
  title,
  location,
  price,
  currency = 'FCFAA',
}: VisualisationVideoProps) {
  const router = useRouter();

  const handleReserve = () => {
    alert('Réservation effectuée !');
    // ou router.push('/formulaire-reservation');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Visite Guidée</h1>

      <div className="bg-white rounded-xl overflow-hidden shadow-md">
        <div className="relative">
          <video
            src={videoUrl}
            controls
            className="w-full h-[250px] object-cover"
          />
        </div>

        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600 mt-1">
            📍 {location}
          </p>
          <p className="text-blue-700 font-bold mt-2 text-lg">
            {price.toLocaleString()} {currency} <span className="text-sm font-medium text-gray-600">/ Mois</span>
          </p>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleReserve}
              className="bg-[#004080] hover:bg-[#0059b3] text-white px-6 py-2 rounded-full shadow transition"
            >
              Réserver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
