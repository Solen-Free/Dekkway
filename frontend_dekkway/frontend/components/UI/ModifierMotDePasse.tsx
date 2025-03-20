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

  // Fonction pour gérer le changement de mot de passe
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Vérification : les mots de passe doivent correspondre
    if (newPassword !== confirmPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    // Simulation : vérification de l'ancien mot de passe (dans un vrai projet, requête API)
    if (oldPassword !== "motdepasse123") {
      setError("Ancien mot de passe incorrect.");
      return;
    }

    // Ici, tu enverrais une requête API pour mettre à jour le mot de passe
    console.log("Mot de passe changé avec succès !");
    
    // Rediriger vers la page profil après modification
    router.push("/profil");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-xl font-semibold text-[#014F86] mb-4 text-center">Modifier le mot de passe</h2>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

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
            className="w-full bg-[#FC9B89] hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
          >
            Enregistrer
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
