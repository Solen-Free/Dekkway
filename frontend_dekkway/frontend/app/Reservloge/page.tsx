"use client";
import React, { useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import ReservationForm from '@/components/ReservationForm';
import OptionsForm from '@/components/OptionsForm';
import PaymentForm from '@/components/PaymentForm';
import Confirmation from '@/components/Confirmation';
import { ReservationDetails } from '@/types/reservation'; // Chemin corrigé

const ReservationPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1); // Renommer en currentStep
  const [reservationDetails, setReservationDetails] = useState<ReservationDetails>({
    name: '',
    phone: '',
    email: '',
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    propertyName: 'Grand-Standing, Thiès',
    location: 'Thiès',
  });

  const handleNext = (data: Partial<ReservationDetails>) => {
    setReservationDetails((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  const renderStep = () => {
    switch (currentStep) { // Utiliser currentStep
      case 1:
        return <ReservationForm onNext={handleNext} />;
      case 2:
        return <OptionsForm onNext={handleNext} />;
      case 3:
        return <PaymentForm onNext={handleNext} />;
      case 4:
        return <Confirmation reservationDetails={reservationDetails} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md border-2 border-[#FC9B89] rounded-xl">
      <ProgressBar currentStep={currentStep} /> {/* Prop corrigée */}
      {renderStep()}
    </div>
  );
};

export default ReservationPage;