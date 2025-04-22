"use client";

import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#014F86] text-white text-sm">
      <div className="w-full px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Logo and Social Media */}
          <div className="flex flex-col items-start">
            <Link href="/Acceuil" className="flex items-center gap-2">
              <Image src="/icones/Logob.png" alt="Logo Dekkway" width={120} height={80} priority />
            </Link>
            <p className="mt-4 text-sm">Suivez-nous sur nos réseaux :</p>
            <div className="flex gap-4 mt-2">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="text-2xl text-[#FC9B89] hover:text-white transition-colors" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-2xl text-[#FC9B89] hover:text-white transition-colors" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl text-[#FC9B89] hover:text-white transition-colors" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn className="text-2xl text-[#FC9B89] hover:text-white transition-colors" />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="text-2xl text-[#FC9B89] hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">Assistance</h3>
              <ul className="space-y-2">
                <li><Link href="/aide" className="hover:underline">Centre d'aide</Link></li>
                <li><Link href="/annulation" className="hover:underline">Option d'annulation</Link></li>
                <li><Link href="/remboursement" className="hover:underline">Option de remboursement</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Entreprise</h3>
              <ul className="space-y-2">
                <li><Link href="/a-propos" className="hover:underline">À propos de nous</Link></li>
                <li><Link href="/contact" className="hover:underline">Contactez-nous</Link></li>
                <li><Link href="/partenaires" className="hover:underline">Nos partenaires</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li><Link href="/Reservations" className="hover:underline">Réservations</Link></li>
                <li><Link href="/moncompte" className="hover:underline">Mon Compte</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full border-t border-white/20 py-4 text-center">
        <p className="text-sm">© 2025 Dekkway. Tous droits réservés.</p>
      </div>
    </footer>
  );
}