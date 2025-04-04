'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AProposPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#014F86] mb-6">À propos de Dekkway</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold text-[#014F86] mb-4">Notre mission</h2>
            <p className="text-gray-700 mb-4">
              Chez Dekkway, notre mission est de révolutionner l'expérience de location immobilière au Sénégal et en Afrique de l'Ouest. 
              Nous créons une plateforme qui connecte les propriétaires et les locataires de manière transparente, sécurisée et efficace.
            </p>
            <p className="text-gray-700 mb-4">
              Nous croyons que trouver un logement devrait être une expérience simple et agréable. 
              C'est pourquoi nous avons développé une plateforme intuitive qui permet aux utilisateurs de trouver facilement 
              le logement idéal, tout en offrant aux propriétaires un moyen fiable de gérer leurs biens.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
              <Image 
                src="/images/dekk.png" 
                alt="L'équipe Dekkway" 
                fill 
                style={{objectFit: 'cover'}} 
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-[#014F86] mb-6">Nos valeurs</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-l-4 border-[#014F86] pl-4">
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Transparence</h3>
            <p className="text-gray-700">Nous croyons en une communication ouverte et honnête avec nos utilisateurs. Toutes nos politiques, frais et conditions sont clairement indiqués.</p>
          </div>
          
          <div className="border-l-4 border-[#014F86] pl-4">
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Innovation</h3>
            <p className="text-gray-700">Nous utilisons les dernières technologies pour améliorer constamment notre plateforme et offrir une expérience utilisateur exceptionnelle.</p>
          </div>
          
          <div className="border-l-4 border-[#014F86] pl-4">
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Confiance</h3>
            <p className="text-gray-700">La sécurité et la confiance sont au cœur de notre service. Nous vérifions rigoureusement les annonces et offrons des systèmes de paiement sécurisés.</p>
          </div>
          
          <div className="border-l-4 border-[#014F86] pl-4">
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Accessibilité</h3>
            <p className="text-gray-700">Nous nous efforçons de rendre notre plateforme accessible à tous, avec une interface intuitive et un support client réactif.</p>
          </div>
          
          <div className="border-l-4 border-[#014F86] pl-4">
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Communauté</h3>
            <p className="text-gray-700">Nous construisons une communauté forte entre propriétaires et locataires, basée sur le respect mutuel et la collaboration.</p>
          </div>
          
          <div className="border-l-4 border-[#014F86] pl-4">
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Impact local</h3>
            <p className="text-gray-700">Nous nous engageons à avoir un impact positif sur les communautés locales en facilitant l'accès au logement et en soutenant l'économie locale.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-[#014F86] mb-4">Notre histoire</h2>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="bg-[#014F86] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">1</div>
            <div>
              <h3 className="text-lg font-medium text-[#014F86] mb-1">Les débuts</h3>
              <p className="text-gray-700">Dekkway a été fondée en 2025 par une équipe d'étudiants passionnés par l'immobilier et la technologie. Face aux difficultés rencontrées pour trouver un logement de qualité au Sénégal, ils ont décidé de créer une solution innovante.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-[#014F86] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">2</div>
            <div>
              <h3 className="text-lg font-medium text-[#014F86] mb-1">Croissance</h3>
              <p className="text-gray-700">Après un lancement réussi à Thiès, Dekkway veut rapidement se développée dans d'autres villes du Sénégal, répondant à une demande croissante pour des solutions de location immobilière fiables et transparentes.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-[#014F86] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">3</div>
            <div>
              <h3 className="text-lg font-medium text-[#014F86] mb-1">Innovation continue</h3>
              <p className="text-gray-700">Aujourd'hui, Dekkway continue d'innover en intégrant de nouvelles fonctionnalités comme les visites virtuelles, les services de déménagement et de nettoyage, et une assistance IA pour mieux répondre aux besoins de nos utilisateurs.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-[#014F86] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">4</div>
            <div>
              <h3 className="text-lg font-medium text-[#014F86] mb-1">Vision future</h3>
              <p className="text-gray-700">Notre ambition est de devenir la plateforme de référence pour la location immobilière en Afrique de l'Ouest, en offrant une expérience utilisateur exceptionnelle et en contribuant à résoudre les défis du logement dans la région.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-[#014F86] mb-4">Notre équipe</h2>
        <p className="text-gray-700 mb-6">
          Dekkway est composée d'une équipe diversifiée de professionnels passionnés par l'immobilier, la technologie et le service client. 
          Ensemble, nous travaillons chaque jour pour améliorer votre expérience et révolutionner le secteur de la location immobilière.
        </p>
        
        <div className="mt-8 text-center">
          <p className="text-gray-700 mb-4">Vous souhaitez en savoir plus sur Dekkway ou nous faire part de vos suggestions ?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-[#014F86] text-white px-6 py-3 rounded-md hover:bg-[#013a63] transition-colors text-center"
            >
              Contactez-nous
            </Link>
            <Link 
              href="/partenaires" 
              className="bg-white text-[#014F86] border border-[#014F86] px-6 py-3 rounded-md hover:bg-gray-50 transition-colors text-center"
            >
              Nos partenaires
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}