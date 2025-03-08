import * as React from "react";
import { useState } from "react";
import { FaSearch, FaUserCircle, FaUserEdit, FaHeart, FaBell, FaRegHeart, FaRegBell } from "react-icons/fa";
import  Button  from "./button";
import Image from "next/image";
import AlertFiltre from "@/components/AlertFiltre";
import Link from "next/link";
import { Filter, Search, SlidersHorizontal } from "lucide-react";

export default function Header() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-leg">
      <Link
          href="/Acceuil"
          className="flex items-center gap-2 font-bold text-xl"
          onClick={() => setIsOpen(false)}>
                 
        <Image src="/icones/Logo.png" alt="Logo Dekkway" width={120} height={80} priority />
      </Link>
      </div>
      
      {/* Barre de recherche */}
      <div className="relative flex-1 max-w-sm mx-4">
        <input
          type="text"
          placeholder="Que cherchez-vous ?"
          className="w-full text-[#014F86] border-1 border-[#014F86] rounded-full py-2 px-4 pl-10 pr-12 hover:outline-[#FC9B89] focus:ring-0.5 focus:ring-[#FC9B89]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
    
        <FaSearch className="absolute left-3 top-3 text-[#FC9B89]" />
        <AlertFiltre />
      </div>
      
      {/* Liens & Boutons */}
      <div className="flex items-center space-x-6">
        <Link
          href="/Reservations"
          onClick={() => setIsOpen(false)}>
          <span className=" font-bold text-[#014F86]">Reservations</span>
        </Link>
        <Link
          href="/Favoris"
          onClick={() => setIsOpen(false)}>
          <FaRegHeart className="text-xl text-[#014F86]" />
        </Link>
        <Link
          href="/Notifications"
          onClick={() => setIsOpen(false)}>
          <FaRegBell className="text-xl text-[#014F86]" />
        </Link>
        <Link
          href="/"
          onClick={() => setIsOpen(false)}>
          <button className="bg-[#FC9B89] hover:bg-white border border-[#FC9B89] flex items-center space-x-2 py-2 px-4 rounded-full">
          <FaUserEdit className="text-xl text-[#014F86]" />
          <span className="text-[#014F86]">Mon Compte</span>
        </button>       
        </Link>
       
        
      </div>
    </header>
  );
}