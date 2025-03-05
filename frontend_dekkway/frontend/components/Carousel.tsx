import Button from "@/components/button";
import Buttons from "@/components/buttons";
import { FaTruck, FaBroom, FaHandSparkles } from "react-icons/fa";
import { useState } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: '/images/Pcarrousel1.png', alt: 'Image 1', text: 'Bienvenue sur DEKKWAY!' },
    { src: '/images/Pcarrousel2.png', alt: 'Image 2', text: 'Trouvez des logements disponibles à tout moment et selon vos goûts !' },
    { src: '/images/Pcarrousel3.png', alt: 'Image 3', text: 'Vous avez la possibilité de vendre vos propriétés sur notre plateforme !' },
    { src: '/images/Pcarrousel4.png', alt: 'Image 4', text: 'DEKKWAY vous propose également des services supplémentaires' },
  ];

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative max-w-screen-2xl mx-auto px-3 py-4">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="relative w-full min-w-full">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-[300px] object-cover"
              />
              <div className={`absolute top-0 bottom-20 p-10  text-4xl font-bold ${
                     index === 0 ? " text-6xl left-1/2 transform -translate-x-1/2 w-full" :
                     index === 1 ? "absolute top-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-3xl " :
                      index === 2 ? "text-left left-5 w-1/2":
                     index === 3 ? "text-right   right-5 w-1/2" : "text-left left-0 w-1/2"
                    } ${
                     index === 0 ? "text-white" : 
                     index === 1 ? "text-[#014F86]" : 
                     index === 2 ? "text-white" : 
                     "text-[#014F86]"
                    }`}>
                {image.text}
              </div>

              {/* Ajout des nouveaux textes et icônes sur la dernière image */}
              {index === 0 && (
                <div className="absolute bottom-35 left-20 flex flex-col font-semi-bold gap-2 text-lg text-white">
                  <p className="flex items-center gap-2">
                    <span>Trouvez votre endroit idéal ! </span>
                  </p>
                </div>
              )}
              {index === 2 && (
                <div className="absolute bottom-15 left-20  text-lg text-white">
                  <Button text="Devenir Bailleur"  href="/" />
                </div>
              )}
              {index === 3 && (
                <div className="absolute bottom-6 left-200 flex flex-col gap-3 text-sm text-white">
                  <Button text="Service de déménagement" icon={<FaTruck />} href="/" />
                  <Buttons text="Service de nettoyage" icon={<FaBroom />} bgColor="#FC9B89" hoverColor="#014F86" href="/" />
               
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Boutons de navigation */}
      <button
        aria-label="Image précédente"
        onClick={prevImage}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#FC9B89] text-white p-2 rounded-full hover:bg-[#014F86]"
      >
        &lt;
      </button>
      <button
        aria-label="Image suivante"
        onClick={nextImage}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#FC9B89] text-white p-2 rounded-full hover:bg-[#014F86]"
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
