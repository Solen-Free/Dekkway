"use client";
import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa';
import { Menu, Search, Heart, Bell, FolderEdit as UserEdit, X } from "lucide-react";
import Filtre from "./Filtre";
import CompteAlert from "@/components/UI/CompteAlert";
import { useAuth } from "@/app/context/AuthContext";

export default function Header() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isCompteOpen, setIsCompteOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      const params = new URLSearchParams();
      params.append('search', search.trim());
      router.push(`/?${params.toString()}`);
    } else {
      // Si le champ de recherche est vide, rediriger vers la page d'accueil sans paramètres
      router.push('/');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearch(newValue);
    
    // Si l'utilisateur efface complètement le champ, réinitialiser la recherche
    if (newValue === '') {
      router.push('/');
    }
  };

  const clearSearch = () => {
    setSearch('');
    router.push('/');
  };

  return (
    <header className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
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
            <form onSubmit={handleSearch} className="relative w-full flex items-center">
              <input
                type="text"
                placeholder="Que cherchez-vous ? (ex: maison à thiès)"
                className="w-full h-10 text-[#014F86] border-2 border-[#014F86] rounded-full py-3 px-4 pl-10 pr-12
                         focus:outline-none focus:border-[#FC9B89] focus:ring-1 focus:ring-[#FC9B89] transition-colors"
                value={search}
                onChange={handleSearchChange}
              />
              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-12 top-1/2 -translate-y-1/2 p-1 bg-white rounded-full border border-[#FC9B89] hover:bg-[#FC9B89] hover:text-white transition-colors"
                  aria-label="Effacer la recherche"
                >
                  <X className="h-4 w-4 text-[#014F86]" />
                </button>
              )}
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1 hover:text-[#014F86] transition-colors"
              >
                <Search className="h-5 w-5 text-[#FC9B89]" />
              </button>
              <div className="absolute right-1 top-0 bottom-0 flex items-center">
                <Filtre />
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/Reservations" className="font-semibold text-[#014F86] hover:text-[#FC9B89] transition-colors">
              Reservations
            </Link>
            <Link href="/Favoris" className="text-[#014F86] hover:text-[#FC9B89] transition-colors">
              <Heart className="h-6 w-6" />
            </Link>
            <Link href="/Notifications" className="text-[#014F86] hover:text-[#FC9B89] transition-colors">
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

              {/* Menu déroulant Mon Compte - Version desktop */}
              {isCompteOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                  {isAuthenticated ? (
                    <>
                      <Link 
                        href="/Profil" 
                        className="block px-4 py-3 text-[#014F86] hover:bg-[#FC9B89]/10 transition-colors"
                        onClick={() => setIsCompteOpen(false)}
                      >
                        <UserEdit className="inline-block mr-2 h-4 w-4" />
                        Profil
                      </Link>
                      <button 
                        onClick={() => {
                          localStorage.removeItem("token");
                          router.push("/");
                          setIsCompteOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <X className="inline-block mr-2 h-4 w-4" />
                        Déconnexion
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        href="/login" 
                        className="block px-4 py-3 text-[#014F86] hover:bg-[#FC9B89]/10 transition-colors"
                        onClick={() => setIsCompteOpen(false)}
                      >
                        Connexion
                      </Link>
                      <Link 
                        href="/Register" 
                        className="block px-4 py-3 text-[#014F86] hover:bg-[#FC9B89]/10 transition-colors"
                        onClick={() => setIsCompteOpen(false)}
                      >
                        Inscription
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Navigation */}
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
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Que cherchez-vous ? (ex: maison à thiès)"
                className="w-full h-10 text-[#014F86] border-2 border-[#014F86] rounded-full py-2 px-4 pl-10 pr-12
                         focus:outline-none focus:border-[#FC9B89] focus:ring-1 focus:ring-[#FC9B89] transition-colors"
                value={search}
                onChange={handleSearchChange}
              />
              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-12 top-1/2 -translate-y-1/2 p-1 bg-white rounded-full border border-[#FC9B89] hover:bg-[#FC9B89] hover:text-white transition-colors"
                  aria-label="Effacer la recherche"
                >
                  <X className="h-4 w-4 text-[#014F86]" />
                </button>
              )}
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1 hover:text-[#014F86] transition-colors"
              >
                <Search className="h-5 w-5 text-[#FC9B89]" />
              </button>
              <div className="absolute right-1 top-0 bottom-0 flex items-center">
                <Filtre />
              </div>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden border-t border-gray-200">
            <div className="flex flex-col space-y-4 px-4 py-6">
              <Link href="/Reservations" onClick={() => setIsOpen(false)} className="text-[#014F86] hover:text-[#FC9B89] transition-colors">
                Reservations
              </Link>
              <Link href="/Favoris" onClick={() => setIsOpen(false)} className="text-[#014F86] hover:text-[#FC9B89] transition-colors">
                <Heart className="h-5 w-5" />
                Favoris
              </Link>
              <Link href="/Notifications" onClick={() => setIsOpen(false)} className="text-[#014F86] hover:text-[#FC9B89] transition-colors">
                <Bell className="h-5 w-5" />
                Notifications
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsCompteOpen(!isCompteOpen)}
                  className="bg-[#FC9B89] hover:bg-white border-2 border-[#FC9B89] flex items-center space-x-2 
                            py-2 px-4 rounded-full transition-colors duration-200 w-full"
                >
                  <FaUser className="h-5 w-5 text-[#014F86]" />
                  <span className="text-[#014F86] font-medium">Mon Compte</span>
                </button>

                {/* Menu déroulant Mon Compte - Version mobile */}
                {isCompteOpen && (
                  <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200">
                    {isAuthenticated ? (
                      <>
                        <Link 
                          href="/Profil" 
                          className="block px-4 py-3 text-[#014F86] hover:bg-[#FC9B89]/10 transition-colors"
                          onClick={() => {
                            setIsCompteOpen(false);
                            setIsOpen(false);
                          }}
                        >
                          <UserEdit className="inline-block mr-2 h-4 w-4" />
                          Profil
                        </Link>
                        <button 
                          onClick={() => {
                            localStorage.removeItem("token");
                            router.push("/");
                            setIsCompteOpen(false);
                            setIsOpen(false);
                          }}
                          className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <X className="inline-block mr-2 h-4 w-4" />
                          Déconnexion
                        </button>
                      </>
                    ) : (
                      <>
                        <Link 
                          href="/login" 
                          className="block px-4 py-3 text-[#014F86] hover:bg-[#FC9B89]/10 transition-colors"
                          onClick={() => {
                            setIsCompteOpen(false);
                            setIsOpen(false);
                          }}
                        >
                          Connexion
                        </Link>
                        <Link 
                          href="/Register" 
                          className="block px-4 py-3 text-[#014F86] hover:bg-[#FC9B89]/10 transition-colors"
                          onClick={() => {
                            setIsCompteOpen(false);
                            setIsOpen(false);
                          }}
                        >
                          Inscription
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
