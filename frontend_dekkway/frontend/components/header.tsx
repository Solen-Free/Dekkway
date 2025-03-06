import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Filter from "@/components/Filter";
import { FaSearch, FaUserCircle, FaUserEdit, FaHeart, FaBell, FaRegHeart, FaRegBell } from "react-icons/fa";
import { SlidersHorizontal } from "lucide-react";


export default function Header({ onFilterClick }: { onFilterClick: () => void }) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);


  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-leg">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl" onClick={() => setIsOpen(false)}>
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
        {/* Bouton filtre */}
        <button
          className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 bg-[#FC9B89] hover:bg-[#014F86] rounded-full"
          onClick={() => setShowFilter(true)}

        >
          <SlidersHorizontal className="h-5 w-5 text-[#014F86] hover:text-white" />
        </button>
      </div>

      {/* Liens & Boutons */}
      <div className="flex items-center space-x-6">
        <Link href="/" onClick={() => setIsOpen(false)}>
          <span className=" font-bold text-[#014F86]">Reservation</span>
        </Link>
        <Link href="/" onClick={() => setIsOpen(false)}>
          <FaRegHeart className="text-xl text-[#014F86]" />
        </Link>
        <Link href="/" onClick={() => setIsOpen(false)}>
          <FaRegBell className="text-xl text-[#014F86]" />
        </Link>
        <Link href="/" onClick={() => setIsOpen(false)}>
          <button className="bg-[#FC9B89] hover:bg-white border border-[#FC9B89] flex items-center space-x-2 py-2 px-4 rounded-full">
            <FaUserEdit className="text-xl text-[#014F86]" />
            <span className="text-[#014F86]">Mon Compte</span>
          </button>       
        </Link>
      </div>
      {showFilter && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <Filter onClose={() => setShowFilter(false)} />
      <button 
        className="mt-4 bg-[#FC9B89] hover:bg-[#014F86] text-white py-2 px-4 rounded"
        onClick={() => setShowFilter(false)}
      >
        Fermer
      </button>
    </div>
  </div>
)}

    </header>
  );
}
