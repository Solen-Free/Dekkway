// components/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = [
    { title: 'Réservation', id: 1 },
    { title: 'Options', id: 2 },
    { title: 'Paiement', id: 3 },
    { title: 'Validation', id: 4 },
  ];

  return (
    <div className="w-full py-12 px-4 relative">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              {/* Cercle avec icône */}
              <div className="relative flex flex-col items-center">
                {/* Titre au-dessus de la ligne */}
                <div className={`absolute -top-8 text-sm font-medium ${
                  isCompleted || isActive ? 'text-[#014F86]' : 'text-gray-400'
                }`}>
                  {step.title}
                </div>

                {/* Cercle */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300
                  ${isCompleted ? 'bg-[#FC9B89] text-white' : 
                  isActive ? 'bg-white border-4 border-[#FC9B89]' : 
                  'bg-gray-200'}`}>
                  
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className={`${isActive ? 'text-[#FC9B89]' : 'text-gray-500'}`}>
                      {step.id}
                    </span>
                  )}
                </div>
              </div>

              {/* Ligne (sauf après le dernier cercle) */}
              {!isLast && (
                <div className={`flex-1 h-1 rounded-2xl mx-2 ${isCompleted ? 'bg-[#FC9B89]' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;