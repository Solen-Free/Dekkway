'use client';

import React from 'react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#014F86] mb-6">Contactez-nous</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-[#014F86] mb-4">Nous sommes à votre écoute</h2>
        <p className="text-gray-700 mb-6">
          Vous avez des questions, des suggestions ou besoin d'assistance ? Notre équipe est là pour vous aider.
          N'hésitez pas à nous contacter par le moyen qui vous convient le mieux.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-[#014F86] mb-4">Formulaire de contact</h3>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Nom complet</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#014F86]"
                  placeholder="Votre nom"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#014F86]"
                  placeholder="Votre email"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">Sujet</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#014F86]"
                  placeholder="Sujet de votre message"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#014F86]"
                  placeholder="Votre message"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="bg-[#014F86] text-white px-6 py-3 rounded-md hover:bg-[#013a63] transition-colors"
              >
                Envoyer
              </button>
            </form>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-[#014F86] mb-4">Informations de contact</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-[#014F86]">Adresse</h4>
                <p className="text-gray-700">Randoulene nord, Thiès, Sénégal</p>
              </div>
              
              <div>
                <h4 className="font-medium text-[#014F86]">Email</h4>
                <p className="text-gray-700">contact@dekkway.com</p>
              </div>
              
              <div>
                <h4 className="font-medium text-[#014F86]">Téléphone</h4>
                <p className="text-gray-700">+221 77 123 45 67</p>
              </div>
              
              <div>
                <h4 className="font-medium text-[#014F86]">Horaires</h4>
                <p className="text-gray-700">Lundi - Vendredi: 9h - 18h</p>
                <p className="text-gray-700">Samedi: 9h - 13h</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-[#014F86] mb-2">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-[#014F86] hover:text-[#FC9B89]">Facebook</a>
                <a href="#" className="text-[#014F86] hover:text-[#FC9B89]">Twitter</a>
                <a href="#" className="text-[#014F86] hover:text-[#FC9B89]">Instagram</a>
                <a href="#" className="text-[#014F86] hover:text-[#FC9B89]">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-[#014F86] mb-4">Foire aux questions</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-[#014F86] mb-2">Combien de temps pour obtenir une réponse ?</h3>
            <p className="text-gray-700">Nous nous efforçons de répondre à toutes les demandes dans un délai de 24 heures ouvrables.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-[#014F86] mb-2">Comment puis-je signaler un problème avec un logement ?</h3>
            <p className="text-gray-700">Vous pouvez signaler un problème directement depuis votre espace personnel ou en utilisant le formulaire de contact ci-dessus.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-[#014F86] mb-2">Proposez-vous un service client téléphonique ?</h3>
            <p className="text-gray-700">Oui, notre service client est disponible par téléphone du lundi au vendredi de 9h à 18h.</p>
          </div>
        </div>
        
        <div className="mt-6">
          <Link 
            href="/aide" 
            className="text-[#014F86] hover:text-[#FC9B89] font-medium"
          >
            Consulter notre centre d'aide complet →
          </Link>
        </div>
      </div>
    </div>
  );
}