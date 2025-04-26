"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

interface CompteAlertProps {
  onClose: () => void;
  isLoggedIn: boolean;
}

const CompteAlert: React.FC<CompteAlertProps> = ({ onClose, isLoggedIn }) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Utilisation du contexte d'authentification
  const { logout } = useAuth();

  // Déconnexion de l'utilisateur
  const handleLogout = () => {
    logout(); // Utilisation de la fonction logout du contexte
    router.push("/"); // Rediriger vers la page de connexion
    onClose(); // Fermer le menu après la déconnexion
  };

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
      onMouseLeave={onClose}
    >
      <ul className="py-2 text-gray-800">
        {isLoggedIn ? (
          <>
            <Link href="/Profil">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Mon Profil</li>
            </Link>
            <li
              onClick={handleLogout}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Se Déconnecter
            </li>
          </>
        ) : (
          <>
            <Link href="/Register">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">S’inscrire</li>
            </Link>
            <Link href="/login">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Se connecter</li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default CompteAlert;
