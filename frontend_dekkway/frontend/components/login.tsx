"use client";

import { useState, useEffect } from 'react';
import { FaGoogle, FaFacebook, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';
import Footer from './footer'; // Utilisez le même footer que la page d'inscription

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showImage, setShowImage] = useState(true); // Contrôle la visibilité de l'image

  // Masquer l'image après 2 secondes sur mobile
  useEffect(() => {
    const isMobile = window.innerWidth <= 768; // Définir la largeur maximale pour les appareils mobiles
    if (isMobile) {
      const timer = setTimeout(() => {
        setShowImage(false); // Masquer l'image après 2 secondes
      }, 2000); // 2 secondes
      return () => clearTimeout(timer); // Nettoyer le timer
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Données du formulaire :', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      {/* Conteneur principal */}
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        {/* Vidéo en arrière-plan */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover opacity-50"
          >
            <source src="/videos/dekk.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
        </div>

        {/* Logo en haut de la page, en dehors du conteneur du formulaire */}
        <div className="absolute top-22 left-1/2 transform -translate-x-1/2 animate-logoEntrance">
          <Image
            src="/images/logo.png" // Remplacez par le chemin de votre logo
            alt="DEKKWAY Logo"
            width={80}
            height={80}
            className="w-12 sm:w-16 md:w-20"
          />
        </div>

        {/* Conteneur du formulaire */}
        <div className="relative z-10 w-full max-w-4xl bg-[#FC9B89] rounded-lg shadow-[0_0_25px_#FC9B89] flex flex-col md:flex-row overflow-hidden animate-pageEntrance mt-32 sm:mt-40"> {/* Augmentation de la marge en haut */}
          {/* Formulaire à droite sur les écrans larges */}
          <div className={`w-full ${showImage ? 'md:w-1/2' : 'md:w-full'} p-6 md:p-8 bg-white order-1 md:order-2`}>
            {/* Image au coin supérieur droit */}
            <div className="absolute top-0 -right-4">
              <Image
                src="/images/coin.png" // Remplacez par le chemin de votre image
                alt="Icône de connexion"
                width={150} // Augmentation de la taille de l'image
                height={150}
                className="w-32 h-32 sm:w-36 sm:h-36" // Ajustement de la taille pour les écrans mobiles et desktop
              />
            </div>

            {/* Formulaire de connexion */}
            <form onSubmit={handleSubmit} className="space-y-4 mt-16 sm:mt-20"> {/* Augmentation de la marge en haut */}
              {/* Champ Email */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-[#014F86] rounded-lg focus:border-[#FC9B89] focus:outline-none bg-white"
                  placeholder="Entrez votre email"
                />
              </div>

              {/* Champ Mot de passe */}
              <div className="space-y-2 relative">
                <label className="block text-sm sm:text-base font-medium text-gray-700">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-2 border-[#014F86] rounded-lg focus:border-[#FC9B89] focus:outline-none bg-white pr-10"
                    placeholder="Entrez votre mot de passe"
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>

              {/* Lien "Mot de passe oublié" */}
              <div className="text-right">
                <a href="/forgot-password" className="text-sm text-[#014F86] hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>

              {/* Bouton de connexion */}
              <button
                type="submit"
                className="w-full py-2 bg-[#014F86] text-white rounded-lg hover:bg-[#013A63] transition-colors text-sm sm:text-base"
              >
                Se Connecter
              </button>
            </form>

            {/* Séparateur "Ou se connecter avec" */}
            <div className="flex items-center justify-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-sm sm:text-base text-gray-600">Ou se connecter avec</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Boutons des réseaux sociaux */}
            <div className="flex justify-center gap-4">
              <div
                onClick={() => console.log("Connexion avec Google")}
                className="p-3 bg-gray-100 border border-gray-300 rounded-full hover:bg-[#014F86] transition-colors cursor-pointer"
              >
                <FaGoogle className="text-gray-700 hover:text-white" />
              </div>
              <div
                onClick={() => console.log("Connexion avec Facebook")}
                className="p-3 bg-gray-100 border border-gray-300 rounded-full hover:bg-[#014F86] transition-colors cursor-pointer"
              >
                <FaFacebook className="text-gray-700 hover:text-white" />
              </div>
              <div
                onClick={() => console.log("Connexion avec Apple")}
                className="p-3 bg-gray-100 border border-gray-300 rounded-full hover:bg-[#014F86] transition-colors cursor-pointer"
              >
                <FaApple className="text-gray-700 hover:text-white" />
              </div>
            </div>

            {/* Lien vers l'inscription */}
            <div className="text-center mt-6">
              <p className="text-sm sm:text-base text-gray-600">
                Vous n'avez pas encore un compte ?{' '}
                <a href=" ../Register" className="text-[#014F86] hover:underline">
                  S'inscrire
                </a>
              </p>
            </div>
          </div>

          {/* Image à gauche sur les écrans larges */}
          {showImage && (
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-6 animate-zoomShrink hidden sm:block order-2 md:order-1">
              <Image
                src="/images/conn.png" // Remplacez par le chemin de votre image
                alt="Image de connexion"
                width={400}
                height={400}
                className="w-full h-auto md:h-full object-cover rounded-lg"
              />
            </div>
          )}

          {/* Image en bas sur mobile après disparition */}
          {!showImage && (
            <div className="w-full flex items-center justify-center p-4 sm:hidden order-3">
              <Image
                src="/images/conn.png" // Remplacez par le chemin de votre image
                alt="Image de connexion"
                width={300}
                height={300}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}