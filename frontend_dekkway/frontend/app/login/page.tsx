"use client";

import { useState, useEffect } from "react";
import { FaGoogle, FaFacebook, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Masquer l'image après 2 secondes sur mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    if (isMobile) {
      const timer = setTimeout(() => setShowImage(false), 2000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", handleResize);
      };
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/loca-connexion/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
      } else {
        const errorData = await response.json();
        toast.error(errorData.non_field_errors?.[0] || "Erreur de connexion");
      }
    } catch (error) {
      toast.error("Le serveur ne répond pas");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Logo en haut */}
      <div className="absolute top-12 sm:top-22 left-1/2 transform -translate-x-1/2 animate-logoEntrance">
        <Image
          src="/images/logo.png"
          alt="DEKKWAY Logo"
          width={80}
          height={80}
          className="w-12 sm:w-16 md:w-20"
        />
      </div>

      {/* Image horizontale sur mobile */}
      {isMobile && showImage && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full px-4">
          <Image
            src="/images/insc.png"
            alt="Connexion"
            layout="intrinsic"
            width={600}
            height={200}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Conteneur principal du formulaire */}
      <div className="relative z-10 w-full max-w-2xl sm:max-w-3xl mx-4 mt-64 sm:mt-40">
        <div className="bg-[#FC9B89] rounded-lg shadow-[0_0_25px_#FC9B89] w-full flex flex-col md:flex-row overflow-hidden animate-pageEntrance">
          {/* Image décorative (affichée sur desktop) */}
          {showImage && (
            <div className="w-full md:w-2/5 flex items-center justify-center p-4 sm:p-6 animate-zoomShrink hidden sm:block">
              <Image
                src="/images/conn.png"
                alt="Connexion"
                width={300}
                height={300}
                className="w-full h-auto md:h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Formulaire de connexion */}
          <div className={`w-full ${showImage ? "md:w-3/5" : "md:w-full"} p-4 sm:p-6 md:p-8 bg-white`}>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-center text-[#014F86] animate-zigzagInfinite">
                Connectez-Vous
              </h2>

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
                    required
                  />
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
                    required
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
                <Link href="../mot-de-passe-oublie" className="text-sm text-[#014F86] hover:underline">
                  Mot de passe oublié ?
                </Link>
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
              <div className="p-3 bg-gray-100 border border-gray-300 rounded-full hover:bg-[#014F86] transition cursor-pointer">
                <FaGoogle className="text-gray-700 hover:text-white" />
              </div>
              <div className="p-3 bg-gray-100 border border-gray-300 rounded-full hover:bg-[#014F86] transition cursor-pointer">
                <FaFacebook className="text-gray-700 hover:text-white" />
              </div>
              <div className="p-3 bg-gray-100 border border-gray-300 rounded-full hover:bg-[#014F86] transition cursor-pointer">
                <FaApple className="text-gray-700 hover:text-white" />
              </div>
            </div>

            {/* Lien vers l'inscription */}
            <div className="text-center mt-6">
              <p className="text-sm sm:text-base text-gray-600">
                Vous n'avez pas encore un compte ?{" "}
                <Link href="../Register" className="text-[#014F86] hover:underline">
                  S'inscrire
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ToastContainer pour les notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="toast-container"
        toastClassName={() =>
          "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg rounded-lg p-5 flex items-center justify-between"
        }
        progressClassName="bg-blue-500"
        style={{
          top: "6rem",
          right: "1rem",
          width: "auto",
          maxWidth: "400px",
        }}
      />
    </div>
  );
}