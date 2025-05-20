"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/ProgressBar';
import ReservationForm from '@/components/ReservationForm';
import OptionsForm from '@/components/OptionsForm';
import PaymentForm from '@/components/PaymentForm';
import Confirmation from '@/components/Confirmation';
import { ReservationDetails } from '@/types/reservation';
import axios from 'axios';



const ReservationPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [reservationDetails, setReservationDetails] = useState<ReservationDetails>({
    property: {
      id: 0,
      name: '',
      location: '',
      monthlyPrice: 0,
      image: ''
    },
    name: '',
    phone: '',
    email: '',
    paymentMethod: 'mastercard',
    transactionId: '',
  });
  
  useEffect(() => {
    const propertyParam = searchParams.get('property');
    if (propertyParam) {
      try {
        const apiData = JSON.parse(propertyParam);
        setReservationDetails(prev => ({
          ...prev,
          property: {
            id: Number(apiData.id),
            name: apiData.nom,
            location: apiData.ville,
            monthlyPrice: apiData.prix,
            image: apiData.image
          }
        }));
      } catch (error) {
        console.error('Erreur de conversion des données:', error);
      }
    }
  }, [searchParams]);

  const handleNext = (data: Partial<ReservationDetails>) => {
    setReservationDetails(prev => ({
      ...prev,
      ...data,
      property: {
        ...prev.property,
        ...(data.property || {})
      }
    }));
    
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      // const sendConfirmation = async () => {
      //   try {
      //     await axios.post('/api/reservations', reservationDetails);
      //   } catch (error) {
      //     console.error("Erreur d'enregistrement", error);
      //   }
      // };
      // sendConfirmation();
    }
  };

  const renderStep = () => {
    const totalAmount = reservationDetails.property.monthlyPrice + 2000; // Frais de réservation de 2000 XOF
    switch (currentStep) {
      case 1:
        return <ReservationForm onNext={handleNext} />;
      case 2:
        return <OptionsForm 
                 onNext={handleNext} 
                 onPrevious={() => setCurrentStep(1)}
                 property={reservationDetails.property}
               />;
               case 3:
                return (
                  <PaymentForm
                    onSuccess={(transactionId) => {
                      handleNext({ transactionId });
                      setCurrentStep(4);
                    }}
                    onError={(message) => console.error(message)}
                    onPrevious={() => setCurrentStep(2)}
                    paymentMethod={reservationDetails.paymentMethod}
                    amount={totalAmount}
                    userDetails={{
                      name: reservationDetails.name,
                      email: reservationDetails.email,
                      phone: reservationDetails.phone
                    }}
                    propertyDetails={{
                      id: reservationDetails.property.id,
                      name: reservationDetails.property.name,
                      location: reservationDetails.property.location,
                      monthlyPrice: reservationDetails.property.monthlyPrice
                    
                      
                    }}
                  />
                );
  
      case 4:
        return <Confirmation reservationDetails={reservationDetails} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-7 max-w-lg bg-[#FC9B89]/10 border-2 border-[#014F86] rounded-xl">
      <ProgressBar currentStep={currentStep} />
      {renderStep()}
    </div>
  );
};

// Regular function (not exported)
function Reservloge() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [reservationDetails, setReservationDetails] = useState<ReservationDetails>({
    property: {
      id: 0,
      name: '',
      location: '',
      monthlyPrice: 0,
      image: ''
    },
    name: '',
    phone: '',
    email: '',
    paymentMethod: 'visa'
  });

  useEffect(() => {
    const propertyParam = searchParams.get('property');
    if (propertyParam) {
      try {
        const apiData = JSON.parse(propertyParam);
        setReservationDetails(prev => ({
          ...prev,
          property: {
            id: Number(apiData.id),
            name: apiData.nom,
            location: apiData.ville,
            monthlyPrice: apiData.prix,
            image: apiData.image
          }
        }));
      } catch (error) {
        console.error('Erreur de conversion des données:', error);
        // Rediriger vers la page d'accueil en cas d'erreur
        router.push('/');
      }
    } else {
      // Si aucune donnée de propriété n'est disponible, rediriger vers la page d'accueil
      router.push('/');
    }
  }, [searchParams, router]);

  const handleNext = (data: Partial<ReservationDetails>) => {
    setReservationDetails(prev => ({
      ...prev,
      ...data,
      property: {
        ...prev.property,
        ...(data.property || {})
      }
    }));
    
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Define renderStep function here
  const renderStep = () => {
    const totalAmount = reservationDetails.property.monthlyPrice + 2000; // Frais de réservation de 2000 XOF
    switch (currentStep) {
      case 1:
        return <ReservationForm onNext={handleNext} />;
      case 2:
        return <OptionsForm 
                 onNext={handleNext} 
                 onPrevious={handlePrevious}
                 property={reservationDetails.property}
               />;
      case 3:
        return (
          <PaymentForm
            onSuccess={(transactionId) => {
              handleNext({ transactionId });
              setCurrentStep(4);
            }}
            onError={(message) => console.error(message)}
            onPrevious={handlePrevious}
            paymentMethod={reservationDetails.paymentMethod}
            amount={totalAmount}
            userDetails={{
              name: reservationDetails.name,
              email: reservationDetails.email,
              phone: reservationDetails.phone
            }}
            propertyDetails={{
              id: reservationDetails.property.id,
              name: reservationDetails.property.name,
              location: reservationDetails.property.location,
              monthlyPrice: reservationDetails.property.monthlyPrice
            }}
          />
        );
      case 4:
        return <Confirmation reservationDetails={reservationDetails} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg mx-auto p-4 sm:p-6 md:p-8 bg-[#FC9B89]/10 border-2 border-[#014F86] rounded-xl shadow-lg">
        <ProgressBar currentStep={currentStep} totalAmount={reservationDetails.property.monthlyPrice + 2000} />
        {renderStep()}
      </div>
    </div>
  );
}

// Only one default export that wraps the component with ProtectedRoute
export default function ProtectedReservloge() {
  return (
    <ProtectedRoute>
      <Reservloge />
    </ProtectedRoute>
  );
}

// Remove this line:
// export default ReservationPage;