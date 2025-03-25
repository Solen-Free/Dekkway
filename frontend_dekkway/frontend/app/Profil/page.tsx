"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, Pencil, Save } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  // Simuler les données récupérées lors de l'inscription
  const [userData, setUserData] = useState({
    username: "MohamedFall",
    birthdate: "1995-05-15",
    email: "mohamed.fall@example.com",
    password: "********", // On masque le mot de passe
  });

  const [isEditing, setIsEditing] = useState(false);

  // Gérer les modifications des inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Activer/Désactiver le mode édition
  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      {/* Header avec image de couverture */}
      <div className="w-full bg-[#FC9B89] h-25"></div>

      {/* Photo de profil */}
      <div className="relative -mt-16">
        <Image
          src="/images/profil.jpg" // Remplace avec le bon chemin
          alt="Profil"
          width={100}
          height={100}
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
        />
      </div>

      {/* Informations utilisateur */}
      <div className="text-center mt-3">
        <h2 className="text-xl font-semibold text-gray-900">{userData.username}</h2>
        <p className="text-[#FC9B89] text-lg font-medium">Locataire</p>
      </div>

      {/* Cadre des paramètres */}
      <div className="w-full max-w-3xl mt-6 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#014F86]">Paramètres</h3>
          <button
            onClick={toggleEdit}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white bg-[#FC9B89] hover:bg-[#014F86] transition"
          >
            {isEditing ? <Save size={18} /> : <Pencil size={18} />}
            {isEditing ? "Enregistrer" : "Modifier"}
          </button>
        </div>

        <form className="space-y-6">
          {/* Nom d'utilisateur */}
          <div className="pb-3 border-b border-gray-200">
            <label className="block text-[#014F86] font-medium mb-1">Nom d’utilisateur</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full bg-red-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                isEditing ? "text-black" : "text-gray-500 bg-gray-200"
              }`}
            />
          </div>

          {/* Date de naissance */}
          <div className="pb-3 border-b border-gray-200">
            <label className="block text-[#014F86] font-medium mb-1">Date de naissance</label>
            <div className="relative">
              <input
                type="date"
                name="birthdate"
                value={userData.birthdate}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full bg-red-50 border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  isEditing ? "text-black" : "text-gray-500 bg-gray-200"
                }`}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#014F86]" />
            </div>
          </div>

          {/* Email */}
          <div className="pb-3 border-b border-gray-200">
            <label className="block text-[#014F86] font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full bg-red-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                isEditing ? "text-black" : "text-gray-500 bg-gray-200"
              }`}
            />
          </div>

          {/* Mot de passe */}
          <div className="pb-3 flex justify-between items-center">
            <div>
              <label className="block text-[#014F86] font-medium mb-1">Mot de passe</label>
              <input
                type="password"
                value={userData.password}
                disabled
                className="w-full bg-blue-200 border border-gray-300 rounded-lg px-4 py-2 text-gray-500"
              />
            </div>
            <button className="text-blue-500 hover:underline">
              <Link href="/Modifier_mot_de_passe" >
                Modifier
            </Link></button>
          </div>
        </form>
      </div>
    </div>
  );
}
