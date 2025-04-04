'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PartenairesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#014F86] mb-6">Nos Partenaires</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-[#014F86] mb-4">Ils nous font confiance</h2>
        <p className="text-gray-700 mb-6">
          Chez Dekkway, nous sommes fiers de collaborer avec des partenaires de confiance qui partagent notre vision 
          d'améliorer l'expérience de location immobilière au Sénégal et en Afrique de l'Ouest. 
          Ensemble, nous travaillons à offrir des services de qualité et des solutions innovantes.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {/* Partenaire 1 */}
          <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
            <div className="h-40 relative mb-4">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-md">
                <p className="text-gray-500 font-medium">Logo Partenaire</p>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Banque Atlantique</h3>
            <p className="text-gray-700 mb-4">Partenaire financier offrant des solutions de financement adaptées pour les locataires et propriétaires.</p>
            <a href="#" className="text-[#FC9B89] hover:underline">Visiter le site →</a>
          </div>
          
          {/* Partenaire 2 */}
          <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
            <div className="h-40 relative mb-4">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-md">
                <p className="text-gray-500 font-medium">Logo Partenaire</p>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Sénégal Immobilier</h3>
            <p className="text-gray-700 mb-4">Agence immobilière de premier plan, spécialisée dans les biens de qualité à travers le Sénégal.</p>
            <a href="#" className="text-[#FC9B89] hover:underline">Visiter le site →</a>
          </div>
          
          {/* Partenaire 3 */}
          <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
            <div className="h-40 relative mb-4">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-md">
                <p className="text-gray-500 font-medium">Logo Partenaire</p>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Assurance Sécurité</h3>
            <p className="text-gray-700 mb-4">Compagnie d'assurance offrant des garanties spécifiques pour les locations et les biens immobiliers.</p>
            <a href="#" className="text-[#FC9B89] hover:underline">Visiter le site →</a>
          </div>
          
          {/* Partenaire 4 */}
          <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
            <div className="h-40 relative mb-4">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-md">
                <p className="text-gray-500 font-medium">Logo Partenaire</p>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Déménagement Express</h3>
            <p className="text-gray-700 mb-4">Service de déménagement professionnel pour faciliter votre installation dans votre nouveau logement.</p>
            <a href="#" className="text-[#FC9B89] hover:underline">Visiter le site →</a>
          </div>
          
          {/* Partenaire 5 */}
          <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
            <div className="h-40 relative mb-4">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-md">
                <p className="text-gray-500 font-medium">Logo Partenaire</p>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Clean Home</h3>
            <p className="text-gray-700 mb-4">Service de nettoyage professionnel pour les logements avant et après location.</p>
            <a href="#" className="text-[#FC9B89] hover:underline">Visiter le site →</a>
          </div>
          
          {/* Partenaire 6 */}
          <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
            <div className="h-40 relative mb-4">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-md">
                <p className="text-gray-500 font-medium">Logo Partenaire</p>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Décoration Intérieure</h3>
            <p className="text-gray-700 mb-4">Service de décoration et d'aménagement intérieur pour valoriser votre bien ou personnaliser votre location.</p>
            <a href="#" className="text-[#FC9B89] hover:underline">Visiter le site →</a>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-[#014F86] mb-4">Devenir partenaire</h2>
        <p className="text-gray-700 mb-6">
          Vous souhaitez rejoindre notre réseau de partenaires ? Nous sommes toujours à la recherche de nouvelles collaborations 
          qui peuvent apporter de la valeur à nos utilisateurs et contribuer à améliorer l'expérience de location immobilière.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-[#014F86] mb-4">Les avantages de notre programme partenaire</h3>
          
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-[#FC9B89] mr-2">✓</span>
              <span>Visibilité auprès de notre communauté grandissante de propriétaires et locataires</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#FC9B89] mr-2">✓</span>
              <span>Opportunités de collaboration sur des événements et initiatives spéciales</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#FC9B89] mr-2">✓</span>
              <span>Accès à notre plateforme pour promouvoir vos services auprès d'un public ciblé</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#FC9B89] mr-2">✓</span>
              <span>Possibilité d'offres exclusives pour nos utilisateurs</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#FC9B89] mr-2">✓</span>
              <span>Participation à notre réseau de professionnels de l'immobilier</span>
            </li>
          </ul>
          
          <div className="mt-6">
            <Link 
              href="/contact" 
              className="bg-[#014F86] text-white px-6 py-3 rounded-md hover:bg-[#013a63] transition-colors inline-block"
            >
              Contactez-nous pour devenir partenaire
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-[#014F86] mb-4">Témoignages de nos partenaires</h2>
        
        <div className="space-y-6">
          <div className="border-l-4 border-[#014F86] pl-4 py-2">
            <p className="text-gray-700 italic mb-2">"Notre collaboration avec Dekkway a considérablement augmenté notre visibilité auprès des locataires potentiels. Leur plateforme est intuitive et leur équipe est très réactive."</p>
            <p className="text-[#014F86] font-medium">— Directeur, Sénégal Immobilier</p>
          </div>
          
          <div className="border-l-4 border-[#014F86] pl-4 py-2">
            <p className="text-gray-700 italic mb-2">"En tant que service de déménagement, notre partenariat avec Dekkway nous a permis d'accéder à une clientèle ciblée et d'augmenter notre volume d'affaires de manière significative."</p>
            <p className="text-[#014F86] font-medium">— Fondateur, Déménagement Express</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            href="/contact" 
            className="text-[#014F86] hover:text-[#FC9B89] font-medium"
          >
            Vous avez des questions sur nos partenariats ? Contactez-nous →
          </Link>
        </div>
      </div>
    </div>
  );
}