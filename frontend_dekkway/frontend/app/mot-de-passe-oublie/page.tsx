// components/MotDePasseOublie.tsx
"use client"; // Directive pour indiquer que ce composant est un composant client

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function MotDePasseOublie() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Envoyer une requête à l'API pour réinitialiser le mot de passe
      const response = await fetch("/api/mot-de-passe-oublie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Un e-mail de réinitialisation a été envoyé à votre adresse.");
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          {/* Titre */}
          <h2 className="mt-6 text-center text-2xl sm:text-3xl font-bold text-gray-900">
            Mot de passe oublié
          </h2>
          {/* Sous-titre */}
          <p className="mt-2 text-center text-sm sm:text-base text-gray-600">
            Entrez votre adresse e-mail pour réinitialiser votre mot de passe.
          </p>
        </div>

        {/* Formulaire */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Adresse e-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#014F86] focus:border-[#014F86] focus:z-10 sm:text-sm"
                placeholder="Adresse e-mail"
              />
            </div>
          </div>

          {/* Message d'état */}
          {message && (
            <div className="text-center text-sm sm:text-base text-green-600">
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
              {isLoading ? "Envoi en cours..." : "Réinitialiser le mot de passe"}
            </button>
          </div>
        </form>

        {/* Lien pour retourner à la connexion */}
        <div className="text-center">
          <button
            onClick={() => router.push("../login")}
            className="text-sm sm:text-base text-[#014F86] hover:underline"
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    </div>
  );
}