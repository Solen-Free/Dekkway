"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Lock } from 'lucide-react';
import Link from 'next/link';

export default function VisiteGuidee() {
  const searchParams = useSearchParams();
  const videoUrl = searchParams?.get('video');
  
  if (!videoUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Aucune vidéo disponible pour cette visite guidée</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl self-start mb-4">
        <h1 className="text-2xl font-semibold">Visite Guidée</h1>
        <p className="text-sm text-gray-500">Toute visite virtuelle est payante</p>
      </div>

      <div className="bg-[#fef2f2] border border-blue-300 rounded-2xl p-6 w-full max-w-2xl shadow-lg">
        <h2 className="text-center text-lg font-medium mb-2">Démarrer la visite guidée</h2>
        <div className="h-[2px] w-32 mx-auto bg-red-500 mb-4 rounded" />

        <div className="flex items-center justify-between mb-6 gap-6">
          {/* Vidéo floutée dynamique */}
          <div className="flex-1 border border-blue-300 rounded-xl overflow-hidden">
            <div className="relative w-full h-56 bg-gray-100">
              <video
                src={videoUrl}
                className="w-full h-full object-cover blur-sm"
                muted
                autoPlay
                loop
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white bg-opacity-70 rounded-full p-3">
                  <Lock size={40} color="#4B5563" />
                </div>
              </div>
            </div>
          </div>

          {/* Bloc Frais + prix */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-sm text-gray-600 mb-1">Frais</span>
            <div className="bg-[#fb7185] text-white font-bold py-2 px-4 rounded-xl text-sm shadow">
              xxxx XOF
            </div>
          </div>
        </div>

        {/* Moyens de paiement */}
        <h3 className="text-center text-base font-semibold mt-4 mb-2">Options de paiement</h3>
        <div className="flex justify-center items-center gap-6 flex-wrap">
          <img
            src="/images/wave-logo.png"
            alt="Wave"
            className="h-10 cursor-pointer hover:scale-105 transition"
          />
          <img
            src="/images/orange-money-logo.png"
            alt="Orange Money"
            className="h-10 cursor-pointer hover:scale-105 transition"
          />
          <Link href="/paiement-visa">
            <img
              src="/images/visa-logo.png"
              alt="Visa"
              className="h-10 cursor-pointer hover:scale-105 transition"
            />
          </Link>
          <img
            src="/images/mastercard-logo.png"
            alt="Mastercard"
            className="h-10 cursor-pointer hover:scale-105 transition"
          />
        </div>
      </div>
    </div>
  );
}
