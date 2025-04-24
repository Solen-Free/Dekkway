// components/ResetPassword.tsx
"use client"; // Directive pour indiquer que ce composant est côté client

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importez les icônes FontAwesome

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!token) {
      setMessage("Token manquant.");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/reinitialiser-mot-de-passe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (response.ok) {
        setMessage("Mot de passe réinitialisé avec succès.");
        router.push("/connexion");
      } else {
        const data = await response.json();
        setMessage(data.message || "Une erreur s'est produite.");
      }
    } catch (error) {
      setMessage("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-2 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md space-y-8 animate-extraModal">
        <div>
          <h2 className="mt-6 text-center text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Réinitialiser votre mot de passe
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Champ Nouveau Mot de Passe */}
          <div className="relative">
            <label htmlFor="newPassword" className="sr-only">
              Nouveau mot de passe
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#014F86] focus:border-[#014F86] focus:z-10 text-sm sm:text-base"
              placeholder="Nouveau mot de passe"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              aria-label={showNewPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showNewPassword ? (
                <FaEyeSlash className="h-5 w-5 text-gray-500" />
              ) : (
                <FaEye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          {/* Champ Confirmation du Mot de Passe */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="sr-only">
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#014F86] focus:border-[#014F86] focus:z-10 text-sm sm:text-base"
              placeholder="Confirmer le mot de passe"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="h-5 w-5 text-gray-500" />
              ) : (
                <FaEye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          {/* Message d'état */}
          {message && (
            <div
              className={`text-center text-sm sm:text-base ${
                message.includes("succès") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </div>
          )}

          {/* Bouton de soumission */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-[#014F86] hover:bg-[#013A63] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#014F86]"
            >
              {isLoading ? "En cours..." : "Réinitialiser le mot de passe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}