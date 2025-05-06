"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import Cardh from "@/components/UI/Cardh";
import Link from "next/link";
import Image from "next/image";
// Make sure the import path is correct
import ProtectedRoute from "@/components/ProtectedRoute";

interface Reservation {
  id: string;
  name: string;
  location: string;
  price: number;
  image: string;
  date: string;
  time: string;
  transactionId: string;
  reservationDate: string;
}

function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    // Fonction pour récupérer les réservations depuis localStorage
    const fetchReservations = () => {
      try {
        // Récupérer les réservations depuis localStorage
        const storedReservations = JSON.parse(localStorage.getItem("reservations") || "[]");
        
        // Vérifier également dans les favoris si aucune réservation n'est trouvée
        if (storedReservations.length === 0) {
          const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
          if (favorites.length > 0) {
            // Convertir les favoris en format de réservation
            const reservationsFromFavorites = favorites.map((fav: any) => ({
              id: fav.id.toString(),
              name: fav.name || "Grand Standing",
              location: fav.location || "Dakar",
              price: fav.price || 150000,
              image: fav.image || "/images/maison.jpg",
              date: new Date().toLocaleDateString('fr-FR'),
              time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
              transactionId: `TR-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
              reservationDate: new Date().toISOString()
            }));
            
            // Sauvegarder ces réservations
            localStorage.setItem("reservations", JSON.stringify(reservationsFromFavorites));
            setReservations(reservationsFromFavorites);
          }
        } else {
          // Trier les réservations par date (les plus récentes d'abord)
          const sortedReservations = storedReservations.sort((a: Reservation, b: Reservation) => 
            new Date(b.reservationDate).getTime() - new Date(a.reservationDate).getTime()
          );
          
          setReservations(sortedReservations);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleCancelReservation = (id: string, transactionId: string) => {
    // Filtrer pour supprimer la réservation spécifique
    const updatedReservations = reservations.filter(
      (res) => !(res.id === id && res.transactionId === transactionId)
    );
    
    // Mettre à jour localStorage et l'état
    localStorage.setItem("reservations", JSON.stringify(updatedReservations));
    setReservations(updatedReservations);
    
    // Fermer les détails si la réservation supprimée était sélectionnée
    if (selectedReservation && selectedReservation.id === id && selectedReservation.transactionId === transactionId) {
      setSelectedReservation(null);
    }
  };

  const handleViewDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-bold text-[#014F86] text-center">Mes Réservations</h1>
        <p className="text-center text-gray-600 mt-2">
          Retrouvez ici toutes vos réservations de logements
        </p>
      </div>
      
      {/* Modal de détails */}
      {selectedReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#014F86]">Détails de la Réservation</h2>
                <button 
                  onClick={() => setSelectedReservation(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Colonne gauche */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Nom du logement</h3>
                      <p className="flex items-center gap-2 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FC9B89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>{selectedReservation.name}</span>
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Localisation</h3>
                      <p className="flex items-center gap-2 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FC9B89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{selectedReservation.location}</span>
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Réservé par</h3>
                      <p className="flex items-center gap-2 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FC9B89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Mohamed Fall</span>
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Méthode de paiement</h3>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FC9B89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                          <span>Mastercard</span>
                        </div>
                        <div>
                          <span className="font-medium text-[#014F86]">Montant Total :</span>
                          <span className="ml-2 font-bold">{selectedReservation.price.toLocaleString('fr-FR')} XOF</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Colonne droite */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Informations du Bailleur</h3>
                      <div className="space-y-2 mt-1">
                        <p className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FC9B89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                          <span>agent@example.com</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FC9B89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>77675467</span>
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Date et Heure</h3>
                      <div className="space-y-2 mt-1">
                        <p className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FC9B89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{selectedReservation.date}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FC9B89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{selectedReservation.time}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Transaction ID</h3>
                      <p className="flex items-center gap-2 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FC9B89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span className="text-xs">{selectedReservation.transactionId}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setSelectedReservation(null)}
                  className="py-2 px-6 bg-[#014F86] text-white text-sm rounded-lg font-normal hover:bg-[#FC9B89] transition-colors shadow-md hover:shadow-lg"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Affichage des réservations */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#014F86]"></div>
        </div>
      ) : reservations.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-gray-600 text-lg font-medium mb-2">
              Aucune réservation pour le moment
            </p>
            <p className="text-gray-500 mb-6">Explorez nos logements et réservez dès maintenant !</p>
            <Link 
              href="/" 
              className="py-3 px-8 bg-[#014F86] text-white rounded-lg hover:bg-[#FC9B89] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
            >
              Découvrir les logements
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          {reservations.map((reservation, index) => (
            <div key={`${reservation.id}-${reservation.transactionId}-${index}`}>
              <Cardh
                image={reservation.image}
                title={reservation.name}
                location={reservation.location}
                price={`${reservation.price.toLocaleString('fr-FR')} FCFA`}
                id={reservation.id}
                transactionId={reservation.transactionId}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Wrap the component with ProtectedRoute
export default function ProtectedReservations() {
  return (
    <ProtectedRoute>
      <Reservations />
    </ProtectedRoute>
  );
}
