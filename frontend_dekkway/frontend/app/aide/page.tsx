'use client';

import React from 'react';
import Link from 'next/link';

export default function AidePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#014F86] mb-6">Centre d'aide</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-[#014F86] mb-4">Comment pouvons-nous vous aider ?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-[#014F86] mb-3">Réservations</h3>
            <ul className="space-y-2 text-gray-700">
              <li><Link href="#" className="hover:text-[#FC9B89]">Comment réserver un logement</Link></li>
              <li><Link href="#" className="hover:text-[#FC9B89]">Modifier une réservation</Link></li>
              <li><Link href="#" className="hover:text-[#FC9B89]">Annuler une réservation</Link></li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-[#014F86] mb-3">Paiements</h3>
            <ul className="space-y-2 text-gray-700">
              <li><Link href="#" className="hover:text-[#FC9B89]">Méthodes de paiement acceptées</Link></li>
              <li><Link href="#" className="hover:text-[#FC9B89]">Problèmes de paiement</Link></li>
              <li><Link href="#" className="hover:text-[#FC9B89]">Remboursements</Link></li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-[#014F86] mb-3">Compte</h3>
            <ul className="space-y-2 text-gray-700">
              <li><Link href="#" className="hover:text-[#FC9B89]">Créer un compte</Link></li>
              <li><Link href="#" className="hover:text-[#FC9B89]">Modifier mon profil</Link></li>
              <li><Link href="#" className="hover:text-[#FC9B89]">Problèmes de connexion</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-[#014F86] mb-4">Questions fréquentes</h2>
        
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-[#014F86] mb-2">Comment fonctionne le processus de réservation ?</h3>
            <p className="text-gray-700">Pour réserver un logement sur Dekkway, recherchez d'abord un logement qui vous convient, vérifiez sa disponibilité aux dates souhaitées, puis procédez au paiement sécurisé. Une fois la réservation confirmée, vous recevrez tous les détails par email.</p>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-[#014F86] mb-2">Quelles sont les conditions d'annulation ?</h3>
            <p className="text-gray-700">Les conditions d'annulation varient selon le logement. Vous pouvez consulter les conditions spécifiques sur la page de chaque logement avant de réserver. Pour plus de détails, consultez notre <Link href="/annulation" className="text-[#FC9B89] hover:underline">page d'annulation</Link>.</p>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-[#014F86] mb-2">Comment contacter un propriétaire ?</h3>
            <p className="text-gray-700">Vous pouvez contacter le propriétaire directement depuis la page du logement en utilisant le formulaire de contact. Une fois votre réservation confirmée, vous aurez accès aux coordonnées du propriétaire dans votre espace personnel.</p>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-[#014F86] mb-2">Comment fonctionne le système de paiement ?</h3>
            <p className="text-gray-700">Dekkway propose plusieurs méthodes de paiement sécurisées. Le paiement est généralement effectué en totalité lors de la réservation. Pour certains logements, un acompte peut être demandé. Consultez notre page sur les <Link href="/remboursement" className="text-[#FC9B89] hover:underline">options de remboursement</Link> pour plus d'informations.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-[#014F86] mb-4">Besoin d'aide supplémentaire ?</h2>
        <p className="text-gray-700 mb-4">Notre équipe d'assistance est disponible 7j/7 pour répondre à vos questions.</p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <Link 
            href="/contact" 
            className="bg-[#014F86] text-white px-6 py-3 rounded-md hover:bg-[#013a63] transition-colors text-center"
          >
            Contactez-nous
          </Link>
          <Link 
            href="/Assistance" 
            className="bg-white text-[#014F86] border border-[#014F86] px-6 py-3 rounded-md hover:bg-gray-50 transition-colors text-center"
          >
            Assistance en ligne
          </Link>
        </div>
      </div>
    </div>
  );
}