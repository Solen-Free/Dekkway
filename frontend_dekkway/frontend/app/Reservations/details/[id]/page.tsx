"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Header from "@/components/header";

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

interface Bailleur {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  photo_profil?: string;
  adresse?: string;
}

export default function ReservationDetails() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = params.id as string;
  const transactionId = searchParams.get("transactionId");
  
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [bailleur, setBailleur] = useState<Bailleur | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer les réservations depuis localStorage
    const fetchReservation = async () => {
      try {
        const storedReservations = JSON.parse(localStorage.getItem("reservations") || "[]");
        
        // Trouver la réservation spécifique
        const foundReservation = storedReservations.find(
          (res: Reservation) => res.id === id && res.transactionId === transactionId
        );
        
        if (foundReservation) {
          setReservation(foundReservation);
          
          // Récupérer les informations du bailleur depuis l'API
          try {
            const response = await axios.get(`http://127.0.0.1:8000/details-logements/${id}/`);
            const data = response.data;
            
            console.log("Données reçues de l'API:", data); // Ajout d'un log pour déboguer
            
            // Vérifier si les données du bailleur existent et sont accessibles
            if (data && data.bailleur) {
              setBailleur({
                nom: data.bailleur.nom || "non definit",
                prenom: data.bailleur.prenom || "non definit",
                email: data.bailleur.email || "non definit",
                telephone: data.bailleur.telephone || "non definit",
                photo_profil: data.bailleur.photo_profil || "/images/agent-default.jpg",
                adresse: data.bailleur.adresse || "non definit",
                description: data.bailleur.description || "non definit"
              });
            } else if (data && data.agent) {
              // Alternative si les données sont sous "agent" au lieu de "bailleur"
              setBailleur({
                nom: data.agent.nom || "non definit",
                prenom: data.agent.prenom || "non definit",
                email: data.agent.email || "non definit",
                telephone: data.agent.telephone || "non definit",
                photo_profil: data.agent.photo_profil || "/images/agent-default.jpg",
                adresse: data.agent.adresse || "non definit",
                description: data.agent.description || "non definit"
              });
            } else {
              // Valeurs par défaut si les informations du bailleur ne sont pas disponibles
              console.log("Aucune information de bailleur trouvée dans la réponse:", data);
              setBailleur({
                nom: "Diop",
                prenom: "Amadou",
                email: "agent@example.com",
                telephone: "77675467",
                photo_profil: "/images/agent-default.jpg",
                adresse: "Dakar, Sénégal",
                description: "Agent immobilier professionnel avec plusieurs années d'expérience."
              });
            }
          } catch (apiError) {
            console.error("Erreur lors de la récupération des détails du logement:", apiError);
            // Utiliser des valeurs par défaut en cas d'erreur
            setBailleur({
              nom: "Diop",
              prenom: "Amadou",
              email: "agent@example.com",
              telephone: "77675467",
              photo_profil: "/images/agent-default.jpg",
              adresse: "Dakar, Sénégal",
              description: "Agent immobilier professionnel avec plusieurs années d'expérience."
            });
          }
        } else {
          // Si la réservation n'est pas trouvée, rediriger vers la page des réservations
          router.push("/Reservations");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la réservation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [id, transactionId, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#014F86]"></div>
        </div>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto p-8 text-center">
          <h1 className="text-2xl font-bold text-[#014F86] mb-4">Réservation non trouvée</h1>
          <p className="mb-6">La réservation que vous recherchez n'existe pas ou a été supprimée.</p>
          <Link 
            href="/Reservations" 
            className="py-2 px-6 bg-[#014F86] text-white rounded-lg hover:bg-[#FC9B89] transition-colors"
          >
            Retour aux réservations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto p-4 pt-24">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {/* En-tête */}
          <div className="bg-[#014F86] text-white p-4 text-center">
            <h1 className="text-xl font-bold">Détails de la Réservation</h1>
          </div>
          
          <div className="p-6">
            {/* Image du logement */}
            <div className="relative h-64 w-full mb-6 overflow-hidden rounded-lg">
              <img 
                src={reservation.image} 
                alt={reservation.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Colonne gauche */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-base font-semibold text-[#014F86]">Nom du logement</h2>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FC9B89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="font-normal">{reservation.name}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-base font-semibold text-[#014F86]">Localisation</h2>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FC9B89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-normal">{reservation.location}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-base font-semibold text-[#014F86]">Réservé par :</h2>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FC9B89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-normal">Mohamed Fall</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-base font-semibold text-[#014F86]">Méthode de paiement</h2>
                  <div className="flex items-center w-full text-sm text-gray-700 mt-4">
                    <div className="flex items-center justify-between w-full gap-8">
                      <img 
                        src="/images/mastercard-logo.png" 
                        alt="Mastercard" 
                        className="h-8 flex-shrink-0" 
                      />
                      <div className="flex items-center gap-4 whitespace-nowrap">
                        <span className="font-normal text-[#014F86]">Montant Total :</span>
                        <span className="font-semibold text-[#014F86]">{reservation.price.toLocaleString('fr-FR')} XOF</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonne droite - Informations du bailleur */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-base font-semibold text-[#014F86] whitespace-nowrap">Informations du Bailleur</h2>
                  
                  {bailleur && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      {/* Photo de profil du bailleur */}
                      <div className="flex justify-center mb-4">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#FC9B89]">
                          <img 
                            src={bailleur.photo_profil} 
                            alt={`${bailleur.prenom} ${bailleur.nom}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="text-center mb-4">
                        <h3 className="font-semibold text-[#014F86]">{bailleur.prenom} {bailleur.nom}</h3>
                        <p className="text-sm text-gray-600">{bailleur.adresse}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FC9B89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                          <span className="font-normal">{bailleur.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FC9B89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="font-normal">{bailleur.telephone}</span>
                        </div>
                      </div>
                      
                      {/* Description du bailleur - À SUPPRIMER */}
                      {/* <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-700 italic">{bailleur.description}</p>
                      </div> */}
                      
                      {/* Bouton de contact */}
                      <div className="mt-4">
                        <button 
                          onClick={() => window.location.href = `tel:${bailleur.telephone}`}
                          className="w-full py-2 bg-[#FC9B89] text-white rounded-lg hover:bg-[#014F86] transition-colors flex items-center justify-center gap-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Contacter le bailleur
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h2 className="text-base font-semibold text-[#014F86]">Date et Heure</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FC9B89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-normal">{reservation.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FC9B89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-normal">{reservation.time}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-base font-semibold text-[#014F86]">ID de Transaction</h2>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FC9B89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="font-normal text-xs">{reservation.transactionId}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bouton de retour */}
            <div className="mt-8 text-center">
              <Link href="/Reservations">
                <button className="py-2 px-6 bg-[#014F86] text-white text-sm rounded-lg font-normal hover:bg-[#FC9B89] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200">
                  Retour aux réservations
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}