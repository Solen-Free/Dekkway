"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ModifierMotDePasse() {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour gérer le changement de mot de passe
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Réinitialiser l'erreur avant chaque nouvelle tentative
    setIsLoading(true); // Indiquer que le processus est en cours

    // Vérification : les mots de passe doivent correspondre
    if (newPassword !== confirmPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas.");
      setIsLoading(false);
      return;
    }

    try {
      // Récupérer le token d'authentification
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Vous devez être connecté pour modifier votre mot de passe");
        setIsLoading(false);
        return;
      }

      // Envoi de la requête à l'API pour changer le mot de passe
      const response = await fetch("/password-change/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Si la réponse est positive, on met à jour le token et on redirige vers le profil
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        alert("Mot de passe modifié avec succès");
        router.push("/profil");
      } else {
        setError(data.message || "Une erreur s'est produite.");
      }
    } catch (error) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false); // Fin du processus de chargement
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-xl font-semibold text-[#014F86] mb-4 text-center">Modifier le mot de passe</h2>

        {/* Affichage des erreurs */}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        {/* Formulaire de modification de mot de passe */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ancien mot de passe */}
          <div>
            <label className="block text-[#014F86] font-medium mb-1">Ancien mot de passe</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full bg-red-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Nouveau mot de passe */}
          <div className="relative">
            <label className="block text-[#014F86] font-medium mb-1">Nouveau mot de passe</label>
            <input
              type={isVisible ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-red-50 border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirmer le nouveau mot de passe */}
          <div>
            <label className="block text-[#014F86] font-medium mb-1">Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-red-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Bouton Enregistrer */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FC9B89] hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
          >
            {isLoading ? "En cours..." : "Enregistrer"}
          </button>
        </form>

        {/* Bouton Retour */}
        <button
          onClick={() => router.push("/profil")}
          className="w-full mt-3 bg-gray-300 hover:bg-gray-400 text-[#014F86] font-medium py-2 rounded-lg transition"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
