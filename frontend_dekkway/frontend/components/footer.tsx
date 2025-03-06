import React from 'react';
import { useState } from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

 export default function Footer() {
   const [search, setSearch] = useState("");
   const [isOpen, setIsOpen] = useState(false);
  return (
    <footer
      className="w-full h-screen-15 flex flex-col text-white text-sm"
      style={{ backgroundColor: "#014F86" }}
    >
      {/* Partie supérieure du footer */}
      <div className="w-full px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between">

          {/* Présentation et appel à l'action */}

          <div className="mb-6 md:mb-0">
              <div className="flex items-leg">
                 <Link
                   href="/Acceuil"
                   className="flex items-center gap-2 font-bold text-xl"
                   onClick={() => setIsOpen(false)}>
                   <Image src="/icones/Logob.png" alt="Logo Dekkway" width={120} height={80} priority />
                 </Link>
              </div>
              <div className="left-20 relative items-center flex-1 max-w-sm mx-4 my-2">
               <h3 className="font-light text-base">Suivez-Nous sur nos réseaux :</h3>
               <ul className=" mt-2 flex space-x-2 font-light">
                <li>
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    <FaFacebookF className="text-2xl rounded bg-[#FC9B89] text-white hover:text-gray-600 transition duration-300" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    <FaTwitter className="text-2xl rounded bg-[#FC9B89] text-white hover:text-gray-600 transition duration-300" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                  <FaInstagram className="text-2xl rounded bg-[#FC9B89] text-white hover:text-gray-600 transition duration-300" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                  <FaLinkedinIn className="text-2xl rounded bg-[#FC9B89] text-white hover:text-gray-600 transition duration-300" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                  <FaYoutube className="text-2xl rounded bg-[#FC9B89] text-white hover:text-gray-600 transition duration-300" />
                  </a>
                </li>
               </ul>
              </div>
            
          </div>
          {/* Liens rapides répartis en colonnes */}
          <div className="text-left py-6 grid grid-cols-2 md:grid-cols-3 gap-4 w-4/6">

            {/* Colonne "Assistance" */}

            <div>
              <h3 className="font-light text-base">Assistance</h3>
              <ul className="mt-2 font-light">
                <li>
                  <a href="/a-propos" className="hover:underline">
                    Centre d'aide
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">
                    Option d'annulation
                  </a>
                </li>
                <li>
                  <a href="/partenaires" className="hover:underline">
                    Option de remboursement
                  </a>
                </li>
              </ul>
            </div>

            {/* Colonne "Entreprise" */}

            <div>
              <h3 className="font-light text-base">Entreprise</h3>
              <ul className="mt-2 font-light">
                <li>
                  <a href="/aide" className="hover:underline">
                    A propos de nous
                  </a>
                </li>
                <li>
                  <a href="/annulation" className="hover:underline"> 
                    Contactez-nous
                  </a>
                </li>
                <li>
                  <a href="/remboursement" className="hover:underline">
                    Nos partenaires
                  </a>
                </li>
              </ul>
            </div>

            {/* Colonne "Navigation" */}
            
            <div>
              <h3 className="font-light text-base">Navigation</h3>
              <ul className="mt-2 font-light">
                <li>
                  <a href="/reservation" className="hover:underline">
                    Reservation
                  </a>
                </li>
                <li>
                  <a href="/mon-compte" className="hover:underline">
                    Mon Compte
                  </a>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
      </div>

      {/* Ligne séparatrice courte et centrée */}
      <div className="w-full">
        <hr className="w-2/3 border-t border-white mx-auto my-1" />
      </div>

      {/* Informations de copyright */}
      <div className="max-w-7xl mx-auto px-4 py-2 text-center text-gray text-opacity-70 font-thin">
        <p>Copyright © 2025 BRIX Templates | All Rights Reserved | <a href="/terms" className="hover:underline">
            Terms and Conditions
          </a>{" "}
          |{" "}
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a> 
        </p>
    
      </div>
    </footer>
  );
};
