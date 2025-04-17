// "use client";

// import * as React from "react";
// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { FaUser } from 'react-icons/fa';
// import { Menu, Search, Heart, Bell, FolderEdit as UserEdit, X } from "lucide-react";
// import Filtre from "./Filtre"; // Importez votre composant Filtre
// import { useSearchParams, useRouter } from "next/navigation";

// export default function Header() {
//   const [search, setSearch] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!search.trim()) return;
  
//     // Réinitialiser TOUS les paramètres existants
//     const newParams = new URLSearchParams();
//     newParams.set('search', encodeURIComponent(search.trim()));
  
//     router.push(`/?${newParams.toString()}`);
//     setSearch("");
//     setIsMobileSearchOpen(false);
//     setIsOpen(false); // Fermer aussi le menu principal si ouvert
//   };


//   return (
//     <header className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
//         <div className="flex justify-between items-center h-16 md:h-20">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link
//               href="/"
//               className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
//               onClick={() => {
//                 setIsOpen(false);
//                 setIsMobileSearchOpen(false);
//               }}
//             >
//               <Image 
//                 src="/icones/Logo.png" 
//                 alt="Logo Dekkway" 
//                 width={100} 
//                 height={40} 
//                 className="w-auto h-8 md:h-17"
//                 priority 
//               />
//             </Link>
//           </div>

//           {/* Desktop Search Bar */}
//           <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-6">
//           <div className="hidden md:flex flex-1 max-w-md mx-6">
//             <div className="relative w-full flex items-center">
//               <input
//                 type="text"
//                 placeholder="Que cherchez-vous ?"
//                 className="w-full h-10 text-[#014F86] border-2 border-[#014F86] rounded-full py-3 px-4 pl-10 pr-12
//                          focus:outline-none focus:border-[#FC9B89] focus:ring-1 focus:ring-[#FC9B89] transition-colors"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FC9B89]" />
//               {/* Ajoutez le composant Filtre ici */}
//               <div className="absolute right-1 top-0 bottom-0 flex items-center">
//                 <Filtre />
//               </div>
//             </div>
//           </div>
//           </form>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-6">
//             <Link 
//               href="/Reservations" 
//               className="font-semibold text-[#014F86] hover:text-[#FC9B89] transition-colors"
//             >
//               Reservations
//             </Link>
//             <Link 
//               href="/Favoris"
//               className="text-[#014F86] hover:text-[#FC9B89] transition-colors"
//             >
//               <Heart className="h-6 w-6" />
//             </Link>
//             <Link 
//               href="/Notifications"
//               className="text-[#014F86] hover:text-[#FC9B89] transition-colors"
//             >
//               <Bell className="h-6 w-6" />
//             </Link>
//             <button className="bg-[#FC9B89] hover:bg-white border-2 border-[#FC9B89] flex items-center space-x-2 
//                            py-2 px-4 rounded-full transition-colors duration-200">
//               <FaUser className="h-5 w-5 text-[#014F86]" />
//               <span className="text-[#014F86] font-medium">Mon Compte</span>
//             </button>
//           </nav>

//           {/* Mobile Navigation Controls */}
//           <div className="flex md:hidden items-center space-x-4">
//             <button
//               onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
//               className="text-[#014F86] hover:text-[#FC9B89] transition-colors p-2"
//             >
//               <Search className="h-6 w-6" />
//             </button>
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-[#014F86] hover:text-[#FC9B89] transition-colors p-2"
//             >
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Search Bar */}
//         {isMobileSearchOpen && (
//           <div className="md:hidden px-4 py-3 border-t border-gray-200">
//              <form onSubmit={handleSearchSubmit}>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Que cherchez-vous ?"
//                 className="w-full h-10 text-[#014F86] border-2 border-[#014F86] rounded-full py-2 px-4 pl-10 pr-12
//                          focus:outline-none focus:border-[#FC9B89] focus:ring-1 focus:ring-[#FC9B89] transition-colors"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FC9B89]" />
//               {/* Ajoutez le composant Filtre ici pour la version mobile */}
//               <div className="absolute right-1 top-0 bottom-0 flex items-center">
//                 <Filtre />
//               </div>
//             </div>
//             </form>
//           </div>
//         )}

//         {/* Mobile Menu */}
//         {isOpen && (
//           <nav className="md:hidden border-t border-gray-200">
//             <div className="flex flex-col space-y-4 px-4 py-6">
//               <Link
//                 href="/Reservations"
//                 onClick={() => setIsOpen(false)}
//                 className="flex items-center space-x-2 text-[#014F86] hover:text-[#FC9B89] transition-colors"
//               >
//                 <span className="font-semibold">Reservations</span>
//               </Link>
//               <Link
//                 href="/Favoris"
//                 onClick={() => setIsOpen(false)}
//                 className="flex items-center space-x-2 text-[#014F86] hover:text-[#FC9B89] transition-colors"
//               >
//                 <Heart className="h-5 w-5" />
//                 <span>Favoris</span>
//               </Link>
//               <Link
//                 href="/Notifications"
//                 onClick={() => setIsOpen(false)}
//                 className="flex items-center space-x-2 text-[#014F86] hover:text-[#FC9B89] transition-colors"
//               >
//                 <Bell className="h-5 w-5" />
//                 <span>Notifications</span>
//               </Link>
//               <button className="bg-[#FC9B89] hover:bg-white border-2 border-[#FC9B89] flex items-center 
//                              justify-center space-x-2 py-2 px-4 rounded-full w-full transition-colors duration-200">
//                 <UserEdit className="h-5 w-5 text-[#014F86]" />
//                 <span className="text-[#014F86] font-medium">Mon Compte</span>
//               </button>
//             </div>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// }

"use client";
import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from 'react-icons/fa';
import { Menu, Search, Heart, Bell, FolderEdit as UserEdit, X } from "lucide-react";
import Filtre from "./Filtre";
import { useSearchParams, useRouter } from "next/navigation";

export default function Header() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
  
    const newParams = new URLSearchParams();
    newParams.set('search', search.trim());
  
    setIsOpen(false);
    setIsMobileSearchOpen(false);
  
    router.push(`/?${newParams.toString()}`);
    setSearch("");
  };

  const resetFilters = () => {
    router.push('/');
    setIsOpen(false);
    setIsMobileSearchOpen(false);
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
              onClick={resetFilters}
              aria-label="Retour à l'accueil"
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

          {/* Desktop Search Bar and Filter */}
          <div className="hidden md:flex flex-1 max-w-md mx-6 items-center">
            <div className="relative flex-1">
              <form 
                onSubmit={handleSearchSubmit}
                role="search"
                className="w-full"
              >
                <div className="relative w-full flex items-center">
                  <input
                    type="text"
                    placeholder="Que cherchez-vous ?"
                    className="w-full h-10 text-[#014F86] border-2 border-[#014F86] rounded-full py-3 px-4 pl-10 pr-12
                             focus:outline-none focus:border-[#FC9B89] focus:ring-1 focus:ring-[#FC9B89] transition-colors"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Recherche de logements"
                  />
                  <button 
                    type="submit" 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FC9B89] hover:text-[#014F86] transition-colors"
                    aria-label="Lancer la recherche"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </form>
              <div className="absolute right-1 top-[0.5px] h-full flex items-center z-10 ">
                <Filtre />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/Reservations" 
              className="font-semibold text-[#014F86] hover:text-[#FC9B89] transition-colors"
              aria-label="Voir les réservations"
            >
              Réservations
            </Link>
            <Link 
              href="/Favoris"
              className="text-[#014F86] hover:text-[#FC9B89] transition-colors"
              aria-label="Voir les favoris"
            >
              <Heart className="h-6 w-6" />
            </Link>
            <Link 
              href="/Notifications"
              className="text-[#014F86] hover:text-[#FC9B89] transition-colors"
              aria-label="Voir les notifications"
            >
              <Bell className="h-6 w-6" />
            </Link>
            <button 
              className="bg-[#FC9B89] hover:bg-white border-2 border-[#FC9B89] flex items-center space-x-2 
                       py-2 px-4 rounded-full transition-colors duration-200"
              aria-label="Gérer mon compte"
            >
              <FaUser className="h-5 w-5 text-[#014F86]" />
              <span className="text-[#014F86] font-medium">Mon Compte</span>
            </button>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="text-[#014F86] hover:text-[#FC9B89] transition-colors p-2"
              aria-label="Ouvrir la recherche mobile"
            >
              <Search className="h-6 w-6" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#014F86] hover:text-[#FC9B89] transition-colors p-2"
              aria-label="Ouvrir le menu mobile"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar and Filter */}
        {isMobileSearchOpen && (
          <div className="md:hidden px-4 py-3 border-t border-gray-200">
            <div className="relative">
              <form onSubmit={handleSearchSubmit} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Que cherchez-vous ?"
                    className="w-full h-10 text-[#014F86] border-2 border-[#014F86] rounded-full py-2 px-4 pl-10 pr-12
                             focus:outline-none focus:border-[#FC9B89] focus:ring-1 focus:ring-[#FC9B89] transition-colors"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Recherche mobile"
                  />
                  <button 
                    type="submit"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FC9B89] hover:text-[#014F86] transition-colors"
                    aria-label="Lancer la recherche"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </form>
              <div className="absolute right-1 top-[0.5px] h-full flex items-center z-10 ">
                <Filtre />
              </div>
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
                <span className="font-semibold">Réservations</span>
              </Link>
              <Link href="/Favoris" onClick={() => setIsOpen(false)} className="text-[#014F86] hover:text-[#FC9B89] transition-colors">
                <Heart className="h-5 w-5" />
                Favoris
              </Link>
              <Link href="/Notifications" onClick={() => setIsOpen(false)} className="text-[#014F86] hover:text-[#FC9B89] transition-colors">
                <Bell className="h-5 w-5" />
                Notifications
              </Link>
              <button 
                className="bg-[#FC9B89] hover:bg-white border-2 border-[#FC9B89] flex items-center 
                         justify-center space-x-2 py-2 px-4 rounded-full w-full transition-colors duration-200"
                aria-label="Éditer le profil"
              >
                <UserEdit className="h-5 w-5 text-[#014F86]" />
                <span className="text-[#014F86] font-medium">Mon Compte</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
