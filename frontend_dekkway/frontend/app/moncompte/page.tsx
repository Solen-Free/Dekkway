"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaUser, FaHeart, FaCalendarAlt, FaBell, FaSignOutAlt, FaCog } from 'react-icons/fa';
import axios from 'axios';

export default function MonComptePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Utilisation de la clé API depuis .env.local
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user-profile`, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#014F86] mb-6">Mon Compte</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden">
                <Image 
                  src="/icones/avatar-placeholder.png" 
                  alt="Photo de profil" 
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h2 className="text-xl font-semibold text-[#014F86]">Utilisateur</h2>
              <p className="text-gray-600">utilisateur@example.com</p>
            </div>
            
            <nav className="space-y-2">
              <Link href="/Profil" className="flex items-center p-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-[#014F86] transition-colors">
                <FaUser className="mr-3" />
                <span>Mon Profil</span>
              </Link>
              <Link href="/Reservations" className="flex items-center p-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-[#014F86] transition-colors">
                <FaCalendarAlt className="mr-3" />
                <span>Mes Réservations</span>
              </Link>
              <Link href="/Favoris" className="flex items-center p-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-[#014F86] transition-colors">
                <FaHeart className="mr-3" />
                <span>Mes Favoris</span>
              </Link>
              <Link href="/Notifications" className="flex items-center p-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-[#014F86] transition-colors">
                <FaBell className="mr-3" />
                <span>Notifications</span>
              </Link>
              <hr className="my-3" />
              <Link href="/Modifier_mot_de_passe" className="flex items-center p-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-[#014F86] transition-colors">
                <FaCog className="mr-3" />
                <span>Paramètres</span>
              </Link>
              <Link href="/login" className="flex items-center p-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-[#014F86] transition-colors">
                <FaSignOutAlt className="mr-3" />
                <span>Déconnexion</span>
              </Link>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-[#014F86] mb-4">Tableau de bord</h2>
            <p className="text-gray-700 mb-4">Bienvenue sur votre espace personnel Dekkway. Gérez vos réservations, consultez vos favoris et personnalisez votre profil.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-[#014F86] mb-2">Réservations actives</h3>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-[#014F86] mb-2">Logements favoris</h3>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-[#014F86] mb-2">Notifications</h3>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#014F86] mb-4">Activité récente</h2>
            <p className="text-gray-700 italic">Aucune activité récente à afficher.</p>
            
            <div className="mt-6">
              <Link href="/logements" className="bg-[#014F86] text-white px-6 py-3 rounded-md hover:bg-[#013a63] transition-colors inline-block">
                Explorer les logements
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}