"use client";

import { useState, useEffect } from "react";
import { FaGoogle, FaFacebook, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/loca-connexion/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token, data.user);
        toast.success("Connexion réussie");
        router.push("/");
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
    <div className="min-h-screen flex flex-col items-center p-4 relative">
      {/* Logo en haut */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 animate-logoEntrance">
        <Image
          src="/images/logo.png"
          alt="DEKKWAY Logo"
          width={80}
          height={80}
          className="w-12 sm:w-16 md:w-20"
        />
      </div>

      {/* Conteneur principal */}
      <div className="w-full max-w-2xl mt-32">
        {/* Image mobile */}
        {isMobile && (
          <div className="w-full">
            <Image
              src="/images/insc.png"
              alt="Connexion"
              width={600}
              height={200}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Formulaire */}
        <div className={`bg-[#FC9B89] rounded-lg shadow-[0_0_25px_#FC9B89] w-full flex flex-col md:flex-row overflow-hidden animate-pageEntrance ${isMobile ? 'mt-0' : ''}`}>
          {/* Image desktop */}
          {!isMobile && (
            <div className="w-full md:w-2/5 flex items-center justify-center p-6 animate-zoomShrink">
              <Image
                src="/images/conn.png"
                alt="Connexion"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Contenu du formulaire (inchangé) */}
          <div className={`w-full ${!isMobile ? "md:w-3/5" : "md:w-full"} p-6 md:p-8 bg-white`}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold text-center text-[#014F86] animate-zigzagInfinite">
                Connectez-Vous
              </h2>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-[#014F86] rounded-lg focus:border-[#FC9B89] focus:outline-none"
                  placeholder="Entrez votre email"
                  required
                />
              </div>

              <div className="space-y-2 relative">
                <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-2 border-[#014F86] rounded-lg focus:border-[#FC9B89] focus:outline-none pr-10"
                    placeholder="Entrez votre mot de passe"
                    required
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <Link href="../mot-de-passe-oublie" className="text-sm text-[#014F86] hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#014F86] text-white rounded-lg hover:bg-[#013A63] transition-colors"
              >
                Se Connecter
              </button>
            </form>

            <div className="flex items-center justify-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-sm text-gray-600">Ou se connecter avec</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

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

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Vous n'avez pas encore un compte ?{" "}
                <Link href="../Register" className="text-[#014F86] hover:underline">
                  S'inscrire
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

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
      />
    </div>
  );
}