'use client';

import React from 'react';
import Link from 'next/link';

export default function AnnulationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#014F86] mb-6">Options d'annulation</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-[#014F86] mb-4">Politique d'annulation</h2>
        <p className="text-gray-700 mb-4">
          Chez Dekkway, nous comprenons que les plans peuvent changer. C'est pourquoi nous proposons différentes options d'annulation pour nos utilisateurs.
          Veuillez noter que les conditions d'annulation peuvent varier selon le logement et sont clairement indiquées sur la page de chaque annonce avant la réservation.
        </p>
        
        <div className="mt-6 space-y-6">
          <div className="border-l-4 border-[#014F86] pl-4">
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Annulation flexible</h3>
            <p className="text-gray-700">Remboursement complet si l'annulation est effectuée 7 jours avant l'arrivée. Remboursement de 50% jusqu'à 3 jours avant l'arrivée.</p>
          </div>
          
          <div className="border-l-4 border-[#014F86] pl-4">
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Annulation modérée</h3>
            <p className="text-gray-700">Remboursement complet si l'annulation est effectuée 14 jours avant l'arrivée. Remboursement de 50% jusqu'à 7 jours avant l'arrivée.</p>
          </div>
          
          <div className="border-l-4 border-[#014F86] pl-4">
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Annulation stricte</h3>
            <p className="text-gray-700">Remboursement de 50% si l'annulation est effectuée 30 jours avant l'arrivée. Aucun remboursement pour les annulations effectuées moins de 30 jours avant l'arrivée.</p>
          </div>
          
          <div className="border-l-4 border-[#FC9B89] pl-4">
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Circonstances exceptionnelles</h3>
            <p className="text-gray-700">En cas de circonstances exceptionnelles (catastrophes naturelles, urgences médicales graves, etc.), contactez notre service client pour étudier votre situation au cas par cas.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-[#014F86] mb-4">Comment annuler une réservation</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-[#014F86] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">1</div>
            <div>
              <h3 className="text-lg font-medium text-[#014F86] mb-1">Connectez-vous à votre compte</h3>
              <p className="text-gray-700">Accédez à votre espace personnel en vous connectant à votre compte Dekkway.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-[#014F86] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">2</div>
            <div>
              <h3 className="text-lg font-medium text-[#014F86] mb-1">Accédez à vos réservations</h3>
              <p className="text-gray-700">Dans votre tableau de bord, cliquez sur "Mes réservations" pour voir la liste de vos réservations en cours.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-[#014F86] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">3</div>
            <div>
              <h3 className="text-lg font-medium text-[#014F86] mb-1">Sélectionnez la réservation à annuler</h3>
              <p className="text-gray-700">Cliquez sur la réservation que vous souhaitez annuler pour accéder aux détails.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-[#014F86] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">4</div>
            <div>
              <h3 className="text-lg font-medium text-[#014F86] mb-1">Cliquez sur "Annuler la réservation"</h3>
              <p className="text-gray-700">Suivez les instructions pour confirmer l'annulation. Vous recevrez un récapitulatif des conditions d'annulation applicables.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-[#014F86] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">5</div>
            <div>
              <h3 className="text-lg font-medium text-[#014F86] mb-1">Confirmation d'annulation</h3>
              <p className="text-gray-700">Une fois l'annulation confirmée, vous recevrez un email de confirmation avec les détails du remboursement si applicable.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-[#014F86] mb-4">Questions fréquentes sur les annulations</h2>
        
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-[#014F86] mb-2">Combien de temps faut-il pour recevoir un remboursement ?</h3>
            <p className="text-gray-700">Les remboursements sont généralement traités dans un délai de 5 à 10 jours ouvrables, selon votre mode de paiement et votre banque. Pour plus d'informations, consultez notre <Link href="/remboursement" className="text-[#FC9B89] hover:underline">page sur les remboursements</Link>.</p>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-[#014F86] mb-2">Puis-je modifier ma réservation au lieu de l'annuler ?</h3>
            <p className="text-gray-700">Oui, dans de nombreux cas, vous pouvez modifier votre réservation (dates, nombre de voyageurs) sans l'annuler complètement. Consultez les détails de votre réservation pour voir les options disponibles.</p>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-[#014F86] mb-2">Que se passe-t-il si le propriétaire annule ma réservation ?</h3>
            <p className="text-gray-700">Si un propriétaire annule votre réservation, vous serez intégralement remboursé. Notre équipe vous aidera également à trouver un logement alternatif similaire pour votre séjour.</p>
          </div>
        </div>
        
        <div className="mt-8">
          <p className="text-gray-700 mb-4">Besoin d'aide supplémentaire concernant l'annulation de votre réservation ?</p>
          <Link 
            href="/contact" 
            className="bg-[#014F86] text-white px-6 py-3 rounded-md hover:bg-[#013a63] transition-colors inline-block"
          >
            Contactez notre service client
          </Link>
        </div>
      </div>
    </div>
  );
}