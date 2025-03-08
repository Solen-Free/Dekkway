"use client";

import { useState, useEffect } from 'react';
import { FaGoogle, FaFacebook, FaApple, FaEye, FaEyeSlash, FaUser, FaCalendar, FaLock, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link'; // Importez le composant Link
import Footer from './footer'; // Importez votre footer existant

export default function Register() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    username: '',
    birthDate: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showImage, setShowImage] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptConditions, setAcceptConditions] = useState(false); // État pour l'acceptation des conditions

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      const timer = setTimeout(() => {
        setShowImage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!acceptConditions) {
      alert("Veuillez accepter les conditions d'utilisation.");
      return;
    }
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

        {/* Conteneur du formulaire */}
        <div className="relative z-10 w-full max-w-3xl sm:max-w-4xl mx-4">
          {/* Logo */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 animate-logoEntrance">
            <Image
              src="/images/logo.png"
              alt="DEKKWAY Logo"
              width={80}
              height={80}
              className="w-12 sm:w-16 md:w-20"
            />
          </div>

          {/* Conteneur principal avec fond coloré et box-shadow */}
          <div className="bg-[#FC9B89] rounded-lg shadow-[0_0_25px_#FC9B89] w-full flex flex-col md:flex-row overflow-hidden animate-pageEntrance mt-8 sm:mt-10">
            {/* Image à gauche (masquée sur les très petits écrans) */}
            {showImage && (
              <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 animate-zoomShrink hidden sm:block">
                <Image
                  src="/images/dekk.png"
                  alt="Inscription"
                  width={400}
                  height={400}
                  className="w-full h-auto md:h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Formulaire à droite */}
            <div className={`w-full ${showImage ? 'md:w-1/2' : 'md:w-full'} p-4 sm:p-6 md:p-8 bg-white`}>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-center text-[#014F86] animate-zigzagInfinite">
                  Inscrivez-Vous 
                </h2>

                {/* Champ Nom */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="block text-sm sm:text-base font-medium text-gray-700">Nom</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 border-[#014F86] rounded-lg focus:border-[#FC9B89] focus:outline-none bg-white pl-8 sm:pl-10"
                      placeholder="Entrez votre nom"
                    />
                    <FaUser className="absolute left-3 top-3 text-gray-500 text-sm" />
                  </div>
                </div>

                {/* Champ Prénom */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="block text-sm sm:text-base font-medium text-gray-700">Prénom</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 border-[#014F86] rounded-lg focus:border-[#FC9B89] focus:outline-none bg-white pl-8 sm:pl-10"
                      placeholder="Entrez votre prénom"
                    />
                    <FaUser className="absolute left-3 top-3 text-gray-500 text-sm" />
                  </div>
                </div>

                {/* Champ Nom d'utilisateur */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="block text-sm sm:text-base font-medium text-gray-700">Nom d'utilisateur</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 border-[#014F86] rounded-lg focus:border-[#FC9B89] focus:outline-none bg-white pl-8 sm:pl-10"
                      placeholder="Entrez votre nom d'utilisateur"
                    />
                    <FaUser className="absolute left-3 top-3 text-gray-500 text-sm" />
                  </div>
                </div>

                {/* Champ Date de naissance */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="block text-sm sm:text-base font-medium text-gray-700">Date de naissance</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 border-[#014F86] rounded-lg focus:border-[#FC9B89] focus:outline-none bg-white pl-8 sm:pl-10"
                    />
                    <FaCalendar className="absolute left-3 top-3 text-gray-500 text-sm" />
                  </div>
                </div>

                {/* Champ Email */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="block text-sm sm:text-base font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 border-[#014F86] rounded-lg focus:border-[#FC9B89] focus:outline-none bg-white pl-8 sm:pl-10"
                      placeholder="Entrez votre email"
                    />
                    <FaEnvelope className="absolute left-3 top-3 text-gray-500 text-sm" />
                  </div>
                </div>

                {/* Champ Mot de passe */}
                <div className="space-y-2 sm:space-y-3 relative">
                  <label className="block text-sm sm:text-base font-medium text-gray-700">Mot de passe</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 border-[#014F86] rounded-lg focus:border-[#FC9B89] focus:outline-none bg-white pl-8 sm:pl-10"
                      placeholder="Entrez votre mot de passe"
                    />
                    <FaLock className="absolute left-3 top-3 text-gray-500 text-sm" />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 cursor-pointer"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </div>

                {/* Champ Confirmation du mot de passe */}
                <div className="space-y-2 sm:space-y-3 relative">
                  <label className="block text-sm sm:text-base font-medium text-gray-700">Confirmer le mot de passe</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 border-[#014F86] rounded-lg focus:border-[#FC9B89] focus:outline-none bg-white pl-8 sm:pl-10"
                      placeholder="Confirmez votre mot de passe"
                    />
                    <FaLock className="absolute left-3 top-3 text-gray-500 text-sm" />
                    <div
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 cursor-pointer"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </div>

                {/* Case à cocher pour accepter les conditions */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="acceptConditions"
                    checked={acceptConditions}
                    onChange={(e) => setAcceptConditions(e.target.checked)}
                    className="w-4 h-4 border-2 border-[#014F86] rounded focus:ring-[#FC9B89]"
                  />
                  <label htmlFor="acceptConditions" className="text-sm sm:text-base text-gray-700">
                    J'accepte les{' '}
                    <Link href="../conditions-utilisation" className="text-[#014F86] hover:underline">
                      conditions d'utilisation
                    </Link>
                  </label>
                </div>

                {/* Bouton de soumission */}
                <button
                  type="submit"
                  disabled={!acceptConditions} // Désactiver le bouton si les conditions ne sont pas acceptées
                  className="w-full py-2 bg-[#014F86] text-white rounded-lg hover:bg-[#013A63] transition-colors text-sm sm:text-base disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  S’inscrire
                </button>
              </form>

              {/* Séparateur "Ou s'inscrire avec" */}
              <div className="flex items-center justify-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-sm sm:text-base text-gray-600">Ou s'inscrire avec</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Boutons des réseaux sociaux */}
              <div className="flex justify-center gap-4">
                <div
                  onClick={() => console.log("Inscription avec Google")}
                  className="p-3 bg-gray-100 border border-gray-300 rounded-full hover:bg-[#014F86] transition-colors cursor-pointer"
                >
                  <FaGoogle className="text-gray-700 hover:text-white" />
                </div>
                <div
                  onClick={() => console.log("Inscription avec Facebook")}
                  className="p-3 bg-gray-100 border border-gray-300 rounded-full hover:bg-[#014F86] transition-colors cursor-pointer"
                >
                  <FaFacebook className="text-gray-700 hover:text-white" />
                </div>
                <div
                  onClick={() => console.log("Inscription avec Apple")}
                  className="p-3 bg-gray-100 border border-gray-300 rounded-full hover:bg-[#014F86] transition-colors cursor-pointer"
                >
                  <FaApple className="text-gray-700 hover:text-white" />
                </div>
              </div>

              {/* Lien vers la connexion */}
              <div className="text-center mt-6">
                <p className="text-sm sm:text-base text-gray-600">
                  Vous avez déjà un compte ?{' '}
                  <Link href="/login" className="text-[#014F86] hover:underline">
                    Se connecter
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Votre footer existant */}
      <Footer />
    </>
  );
}