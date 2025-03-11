"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { label: "Tout", href: "/Acceuil" },
  { label: "Maison", href: "/Maison" },
  { label: "Appartement", href: "/Appartement" },
  { label: "Studio", href: "/Studio" },
  { label: "Villa", href: "/Vila" },
  { label: "Co-location", href: "/Co-location" },
  { label: "Longue-durée", href: "/Longue-duree" },
  { label: "Courte-durée", href: "/Courte-duree" },
  { label: "Localisation", href: "/Localisation" },
];

export default function ButtonsBar() {
  const pathname = usePathname();

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
      {/* 
        flex-nowrap + overflow-x-auto => 1 seule ligne avec scroll horizontal
        sur tous les écrans
      */}
      <div className="flex flex-nowrap overflow-x-auto scrollbar-hide items-center gap-4 my-6">
        {pages.map((page) => {
          const isActive = pathname === page.href;
          return (
            <Link
              key={page.href}
              href={page.href}
              className={`
                shrink-0
                px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 
                rounded-full text-xs sm:text-sm md:text-base 
                text-white transition-transform duration-200 
                hover:scale-105 active:scale-95
                ${
                  isActive
                    ? "bg-[#FC9B89]"        /* Bouton actif : rose */
                    : "bg-[#014F86] hover:bg-[#FC9B89]" /* Sinon : bleu + hover rose */
                }
              `}
            >
              {page.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}