// "use client";

// import { useState, useEffect } from 'react';
// import Button from "@/components/button";
// import Buttons from "@/components/buttons";
// import { FaTruck, FaBroom } from "react-icons/fa";

// const Carousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);

//   const images = [
//     { src: '/images/Pcarrousel1.png', alt: 'Image 1', text: 'Bienvenue sur DEKKWAY!' },
//     { src: '/images/Pcarrousel2.png', alt: 'Image 2', text: 'Trouvez des logements disponibles à tout moment et selon vos goûts !' },
//     { src: '/images/Pcarrousel3.png', alt: 'Image 3', text: 'Vous avez la possibilité de vendre vos propriétés sur notre plateforme !' },
//     { src: '/images/Pcarrousel4.png', alt: 'Image 4', text: 'DEKKWAY vous propose également des services supplémentaires' },
//   ];

//   // Auto-advance carousel
//   useEffect(() => {
//     const timer = setInterval(() => {
//       nextImage();
//     }, 4000);
//     return () => clearInterval(timer);
//   }, [currentIndex]);

//   const nextImage = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const prevImage = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
//   };

//   // Touch handlers for mobile swipe
//   const handleTouchStart = (e: React.TouchEvent) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (touchStart - touchEnd > 75) {
//       nextImage(); // Swipe left
//     }
//     if (touchStart - touchEnd < -75) {
//       prevImage(); // Swipe right
//     }
//   };

//   return (
//     <div className="relative w-full max-w-screen-2xl mx-auto px-2 sm:px-3 py-2 sm:py-4">
//       <div className="overflow-hidden rounded-lg sm:rounded-xl">
//         <div
//           className="flex transition-transform duration-500 ease-out"
//           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//         >
//           {images.map((image, index) => (
//             <div key={index} className="relative w-full min-w-full">
//               <img
//                 src={image.src}
//                 alt={image.alt}
//                 className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover"
//               />
//               <div 
//                 className={`absolute p-4 sm:p-6 md:p-8 ${
//                   index === 0 ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full animate-zoom-in" :
//                   index === 1 ? "top-1/4 left-1/2 transform -translate-x-1/2 text-center w-full animate-bounce" :
//                   index === 2 ? "top-2 left-10 w-2/8 sm:w-1/2 animate-zoom-ind" :
//                   "top-1 right-10 w-2/3 sm:w-1/2 text-right animate-zoom-ind"
//                 } ${
//                   index === 0 ? "text-white" : 
//                   index === 1 ? "text-[#014F86]" : 
//                   index === 2 ? "text-white" : 
//                   "text-[#014F86]"
//                 }`}
//               >
//                 <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-4xl font-bold leading-tight">
//                   {image.text}
//                 </h2>
//               </div>

//               {/* Additional content for specific slides */}
//               {index === 0 && (
//                 <div className="absolute bottom-6 left-4 sm:left-8 text-white">
//                   <p className="text-sm sm:text-base md:text-lg font-semibold">
//                     Trouvez votre endroit idéal !
//                   </p>
//                 </div>
//               )}

//               {index === 2 && (
//                 <div className="absolute bottom-8 left-4 sm:left-8">
//                   <div className="transform scale-90 sm:scale-100">
//                     <Buttons 
//                       text="Devenir Bailleur" 
//                       bgColor="#FC9B89" 
//                       hoverColor="#014F86" 
//                       href="/InscriptionBailleur" 
//                     />
//                   </div>
//                 </div>
//               )}

//               {index === 3 && (
//                 <div className="absolute bottom-2 sm:bottom-4 right-6 sm:right-14 flex flex-col gap-2 sm:gap-3">
//                   <div className="transform scale-90 sm:scale-100">
//                     <Buttons 
//                       text="Service de déménagement" 
//                       icon={<FaTruck />} 
//                       href="/Demenagements" 
//                     />
//                   </div>
//                   <div className="transform scale-90 sm:scale-100">
//                     <Buttons 
//                       text="Service de nettoyage" 
//                       icon={<FaBroom />} 
//                       bgColor="#FC9B89" 
//                       hoverColor="#014F86" 
//                       href="/Nettoyages" 
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Navigation dots */}
//       <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             className={`w-2 h-2 rounded-full transition-all duration-300 ${
//               currentIndex === index ? 'bg-[#FC9B89] w-4' : 'bg-[#014F86]'
//             }`}
//             onClick={() => setCurrentIndex(index)}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>

//       {/* Navigation buttons */}
//       <button
//         aria-label="Image précédente"
//         onClick={prevImage}
//         className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-[#FC9B89] text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-[#014F86] transition-colors duration-300 flex items-center justify-center"
//       >
//         <span className="sr-only">Précédent</span>
//         <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>
//       <button
//         aria-label="Image suivante"
//         onClick={nextImage}
//         className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-[#FC9B89] text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-[#014F86] transition-colors duration-300 flex items-center justify-center"
//       >
//         <span className="sr-only">Suivant</span>
//         <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>
//     </div>
//   );
// };

// export default Carousel;

// ---------------deeep1--------------

"use client";

import { useState, useEffect } from 'react';
import Button from "@/components/button";
import Buttons from "@/components/buttons";
import { FaTruck, FaBroom } from "react-icons/fa";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const images = [
    { src: '/images/Pcarrousel1.png', alt: 'Image 1', text: 'Bienvenue sur DEKKWAY!' },
    { src: '/images/Pcarrousel2.png', alt: 'Image 2', text: 'Trouvez des logements disponibles à tout moment et selon vos goûts !' },
    { src: '/images/Pcarrousel3.png', alt: 'Image 3', text: 'Vous avez la possibilité de vendre vos propriétés sur notre plateforme !' },
    { src: '/images/Pcarrousel4.png', alt: 'Image 4', text: 'DEKKWAY vous propose également des services supplémentaires' },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      nextImage();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextImage(); // Swipe left
    }
    if (touchStart - touchEnd < -75) {
      prevImage(); // Swipe right
    }
  };

  return (
    <div className="relative w-full max-w-screen-2xl mx-auto px-2 sm:px-3 py-2 sm:py-4">
      <div className="overflow-hidden rounded-lg sm:rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((image, index) => (
            <div key={index} className="relative w-full min-w-full">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover"
              />
              <div 
                className={`absolute p-4 sm:p-6 md:p-8 ${
                  index === 0 ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full animate-zoom-in" :
                  index === 1 ? "top-1/4 left-1/2 transform -translate-x-1/2 text-center w-full animate-bounce" :
                  index === 2 ? "top-2 left-10 w-2/8 sm:w-1/2 animate-zoom-ind" :
                  "top-1 right-10 w-2/3 sm:w-1/2 text-right animate-zoom-ind"
                } ${
                  index === 0 ? "text-white" : 
                  index === 1 ? "text-[#014F86]" : 
                  index === 2 ? "text-white" : 
                  "text-[#014F86]"
                }`}
              >
                <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-4xl font-bold leading-tight">
                  {image.text}
                </h2>
              </div>

              {/* Additional content for specific slides */}
              {index === 0 && (
                <div className="absolute bottom-6 left-4 sm:left-8 text-white">
                  <p className="text-sm sm:text-base md:text-lg font-semibold">
                    Trouvez votre endroit idéal !
                  </p>
                </div>
              )}

              {index === 2 && (
                <div className="absolute bottom-8 left-4 sm:left-8">
                  <div className="transform scale-90 sm:scale-100">
                    <Buttons 
                      text="Devenir Bailleur" 
                      bgColor="#FC9B89" 
                      hoverColor="#014F86" 
                      href="/InscriptionBailleur" 
                    />
                  </div>
                </div>
              )}

              {index === 3 && (
                <div className="absolute bottom-2 sm:bottom-4 right-6 sm:right-14">
                  <div className="transform scale-90 sm:scale-100">
                    <Buttons
                      text=" Nos Services Supplementaires"
                      bgColor="#FC9B89"
                      hoverColor="#014F86"
                      href="/servicessuplementaires"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-[#FC9B89] w-4' : 'bg-[#014F86]'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        aria-label="Image précédente"
        onClick={prevImage}
        className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-[#FC9B89] text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-[#014F86] transition-colors duration-300 flex items-center justify-center"
      >
        <span className="sr-only">Précédent</span>
        <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        aria-label="Image suivante"
        onClick={nextImage}
        className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-[#FC9B89] text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-[#014F86] transition-colors duration-300 flex items-center justify-center"
      >
        <span className="sr-only">Suivant</span>
        <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;