"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";

interface CompteAlertProps {
  onClose: () => void;
  isLoggedIn: boolean; // Ajout de l'état de connexion
}

const CompteAlert: React.FC<CompteAlertProps> = ({ onClose, isLoggedIn }) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);
  

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
    >
      <ul className="py-2 text-gray-800">
        {isLoggedIn ? (
          <>
            <Link href="/Profil">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Mon Profil</li>
            </Link>
            <Link href="">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Se Déconnecter</li>
            </Link>
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
