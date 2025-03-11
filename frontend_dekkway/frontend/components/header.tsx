"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from 'react-icons/fa';
import CompteAlert from "@/components/UI/CompteAlert";
import { Menu, Search, SlidersHorizontal, Heart, Bell, FolderEdit as UserEdit, X } from "lucide-react";

export default function Header() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isCompteOpen, setIsCompteOpen] = useState(false);

  return (
    <header className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/Acceuil"
              className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
              onClick={() => {
                setIsOpen(false);
                setIsMobileSearchOpen(false);
              }}
            >
              <Image 
                src="/icones/Logo.png" 
                alt="Logo Dekkway" 
                width={100} 
                height={40} 
                className="w-auto h-8 md:h-17"
                priority 
              />
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Que cherchez-vous ?"
                className="w-full h-10 text-[#014F86] border-2 border-[#014F86] rounded-full py-2 px-4 pl-10 pr-12
                         focus:outline-none focus:border-[#FC9B89] focus:ring-1 focus:ring-[#FC9B89] transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FC9B89]" />
              <button 
                className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-[#FC9B89] hover:bg-[#014F86] 
                         rounded-full transition-colors duration-200"
              >
                <SlidersHorizontal className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/Reservations" 
              className="font-semibold text-[#014F86] hover:text-[#FC9B89] transition-colors"
            >
              Reservations
            </Link>
            <Link 
              href="/Favoris"
              className="text-[#014F86] hover:text-[#FC9B89] transition-colors"
            >
              <Heart className="h-6 w-6" />
            </Link>
            <Link 
              href="/Notifications"
              className="text-[#014F86] hover:text-[#FC9B89] transition-colors"
            >
              <Bell className="h-6 w-6" />
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsCompteOpen(!isCompteOpen)}
                className="bg-[#FC9B89] hover:bg-white border-2 border-[#FC9B89] flex items-center space-x-2 
                           py-2 px-4 rounded-full transition-colors duration-200"
              >
                <FaUser className="h-5 w-5 text-[#014F86]" />
                <span className="text-[#014F86] font-medium">Mon Compte</span>
              </button>

              {/* Menu déroulant Mon Compte */}
              {isCompteOpen && <CompteAlert onClose={() => setIsCompteOpen(false)} />}
            </div>
          </nav>

          {/* Mobile Navigation Controls */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="text-[#014F86] hover:text-[#FC9B89] transition-colors p-2"
            >
              <Search className="h-6 w-6" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#014F86] hover:text-[#FC9B89] transition-colors p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="md:hidden px-4 py-3 border-t border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Que cherchez-vous ?"
                className="w-full h-10 text-[#014F86] border-2 border-[#014F86] rounded-full py-2 px-4 pl-10 pr-12
                         focus:outline-none focus:border-[#FC9B89] focus:ring-1 focus:ring-[#FC9B89] transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FC9B89]" />
              <button 
                className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-[#FC9B89] hover:bg-[#014F86] 
                         rounded-full transition-colors duration-200"
              >
                <SlidersHorizontal className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden border-t border-gray-200">
            <div className="flex flex-col space-y-4 px-4 py-6">
              <Link
                href="/Reservations"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 text-[#014F86] hover:text-[#FC9B89] transition-colors"
              >
                <span className="font-semibold">Reservations</span>
              </Link>
              <Link
                href="/Favoris"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 text-[#014F86] hover:text-[#FC9B89] transition-colors"
              >
                <Heart className="h-5 w-5" />
                <span>Favoris</span>
              </Link>
              <Link
                href="/Notifications"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 text-[#014F86] hover:text-[#FC9B89] transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </Link>
              <div className="relative">
              <button
                onClick={() => setIsCompteOpen(!isCompteOpen)}
                className="bg-[#FC9B89] hover:bg-white border-1 border-[#FC9B89] flex items-center space-x-1 
                           py-1 px-2 rounded-full transition-colors duration-200"
              >
                <FaUser className="h-5 w-5 text-[#014F86]" />
                <span className="text-[#014F86] font-medium">Mon Compte</span>
              </button>

              {/* Menu déroulant Mon Compte */}
              {isCompteOpen && <CompteAlert onClose={() => setIsCompteOpen(false)} />}
            </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}