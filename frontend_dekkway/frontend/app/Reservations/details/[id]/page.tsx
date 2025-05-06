"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Header from "@/components/header";
import { FaHome, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaFileAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import Loader from "@/components/UI/Loader";

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
  const [error, setError] = useState<string | null>(null);

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
            
            console.log("Données reçues de l'API:", data);
            
            // Vérifier si les données du bailleur existent et sont accessibles
            if (data && data.bailleur) {
              setBailleur({
                nom: data.bailleur.nom || "Diop",
                prenom: data.bailleur.prenom || "Amadou",
                email: data.bailleur.email || "agent@dekkway.com",
                telephone: data.bailleur.telephone || "77 675 46 78",
                photo_profil: data.bailleur.photo_profil || "/images/agent-default.jpg",
                adresse: data.bailleur.adresse || "Dakar, Sénégal"
              });
            } else if (data && data.agent) {
              // Alternative si les données sont sous "agent" au lieu de "bailleur"
              setBailleur({
                nom: data.agent.nom || "Diop",
                prenom: data.agent.prenom || "Amadou",
                email: data.agent.email || "agent@dekkway.com",
                telephone: data.agent.telephone || "77 675 46 78",
                photo_profil: data.agent.photo_profil || "/images/agent-default.jpg",
                adresse: data.agent.adresse || "Dakar, Sénégal"
              });
            } else {
              // Valeurs par défaut si les informations du bailleur ne sont pas disponibles
              console.log("Aucune information de bailleur trouvée dans la réponse:", data);
              setBailleur({
                nom: "Diop",
                prenom: "Amadou",
                email: "agent@dekkway.com",
                telephone: "77 675 46 78",
                photo_profil: "/images/agent-default.jpg",
                adresse: "Dakar, Sénégal"
              });
            }
          } catch (apiError) {
            console.error("Erreur lors de la récupération des détails du logement:", apiError);
            setError("Impossible de récupérer les informations du bailleur. Veuillez réessayer plus tard.");
            // Utiliser des valeurs par défaut en cas d'erreur
            setBailleur({
              nom: "Diop",
              prenom: "Amadou",
              email: "agent@dekkway.com",
              telephone: "77 675 46 78",
              photo_profil: "/images/agent-default.jpg",
              adresse: "Dakar, Sénégal"
            });
          }
        } else {
          // Si la réservation n'est pas trouvée, rediriger vers la page des réservations
          router.push("/Reservations");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la réservation:", error);
        setError("Impossible de récupérer les détails de la réservation. Veuillez réessayer plus tard.");
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
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto p-8 text-center pt-24">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
            <h1 className="text-xl font-bold text-red-600 mb-2">Erreur</h1>
            <p className="text-red-500">{error}</p>
          </div>
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

  if (!reservation) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto p-8 text-center pt-24">
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

  // Formater la date pour un affichage plus convivial
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto p-4 pt-24 pb-12">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {/* En-tête */}
          <div className="bg-[#014F86] text-white p-4 text-center">
            <h1 className="text-xl font-bold">Détails de la Réservation</h1>
          </div>
          
          <div className="p-6">
            {/* Image du logement avec badge de prix */}
            <div className="relative h-72 w-full mb-6 overflow-hidden rounded-lg">
              <img 
                src={reservation.image} 
                alt={reservation.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-[#FC9B89] text-white px-4 py-2 rounded-lg font-bold shadow-md">
                {reservation.price.toLocaleString('fr-FR')} XOF
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Colonne gauche */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-[#014F86] border-b border-gray-200 pb-2">Informations du Logement</h2>
                  <div className="flex items-center gap-3 text-sm text-gray-700 mt-4">
                    <FaHome className="h-5 w-5 text-[#FC9B89]" />
                    <span className="font-medium">Nom:</span>
                    <span className="font-normal">{reservation.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-700 mt-3">
                    <FaMapMarkerAlt className="h-5 w-5 text-[#FC9B89]" />
                    <span className="font-medium">Localisation:</span>
                    <span className="font-normal">{reservation.location}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-[#014F86] border-b border-gray-200 pb-2">Détails de la Réservation</h2>
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <FaCalendarAlt className="h-5 w-5 text-[#FC9B89]" />
                      <span className="font-medium">Date:</span>
                      <span className="font-normal">{formatDate(reservation.date)}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <FaClock className="h-5 w-5 text-[#FC9B89]" />
                      <span className="font-medium">Heure:</span>
                      <span className="font-normal">{reservation.time}</span>
                    </div>
                    
                    <div className="flex items-start gap-3 text-sm text-gray-700">
                      <FaFileAlt className="h-5 w-5 text-[#FC9B89] mt-0.5" />
                      <span className="font-medium">ID Transaction:</span>
                      <span className="font-normal break-all">{reservation.transactionId}</span>
                    </div>
                  </div>
                </div>

                {/* Statut de la réservation - Déplacé ici */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h2 className="text-base font-semibold text-green-700 mb-2">Statut de la Réservation</h2>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-700 font-medium">Confirmée</span>
                  </div>
                  <p className="text-sm text-green-600 mt-2">
                    Votre réservation a été confirmée. Vous recevrez un email de confirmation avec tous les détails.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
                  <h2 className="text-base font-semibold text-[#014F86] mb-3">Paiement</h2>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img 
                        src="/images/mastercard-logo.png" 
                        alt="Mastercard" 
                        className="h-8" 
                      />
                      <span className="text-sm text-gray-600">••••-••••-••••-4242</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Montant Total</p>
                      <p className="font-bold text-[#014F86]">{reservation.price.toLocaleString('fr-FR')} XOF</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonne droite - Informations du bailleur */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-[#014F86] border-b border-gray-200 pb-2">Informations du Bailleur</h2>
                  
                  {bailleur && (
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mt-4">
                      {/* Photo de profil du bailleur */}
                      <div className="flex justify-center mb-4">
                        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#FC9B89] shadow-md">
                          <img 
                            src={bailleur.photo_profil} 
                            alt={`${bailleur.prenom} ${bailleur.nom}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="text-center mb-5">
                        <h3 className="font-semibold text-[#014F86] text-lg">{bailleur.prenom} {bailleur.nom}</h3>
                        <p className="text-sm text-gray-600 mt-1">{bailleur.adresse}</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm text-gray-700 bg-white p-3 rounded-lg shadow-sm">
                          <FaEnvelope className="h-5 w-5 text-[#FC9B89]" />
                          <span className="font-normal">{bailleur.email}</span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm text-gray-700 bg-white p-3 rounded-lg shadow-sm">
                          <FaPhone className="h-5 w-5 text-[#FC9B89]" />
                          <span className="font-normal">{bailleur.telephone}</span>
                        </div>
                      </div>
                      
                      {/* Boutons de contact */}
                      <div className="mt-6 space-y-3">
                        <a 
                          href={`tel:${bailleur.telephone}`}
                          className="w-full py-3 bg-[#FC9B89] text-white rounded-lg hover:bg-[#e88a78] transition-colors flex items-center justify-center gap-2 block shadow-md font-medium"
                        >
                          <FaPhone className="h-4 w-4" />
                          Appeler le bailleur
                        </a>
                        
                        <a 
                          href={`mailto:${bailleur.email}`}
                          className="w-full py-3 bg-[#014F86] text-white rounded-lg hover:bg-[#01426f] transition-colors flex items-center justify-center gap-2 block shadow-md font-medium"
                        >
                          <FaEnvelope className="h-4 w-4" />
                          Envoyer un email
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Bouton de retour */}
            <div className="mt-8 text-center flex justify-center gap-4">
              <Link href={`/detaillog/${id}`}>
                <button className="py-3 px-8 bg-[#FC9B89] text-white text-sm rounded-lg font-medium hover:bg-[#014F86] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200">
                  Voir le logement
                </button>
              </Link>
              <Link href="/Reservations">
                <button className="py-3 px-8 bg-[#014F86] text-white text-sm rounded-lg font-medium hover:bg-[#FC9B89] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200">
                  Retour
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}