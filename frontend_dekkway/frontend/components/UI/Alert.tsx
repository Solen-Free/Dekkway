import { useState } from "react";
import { Filter, Search, SlidersHorizontal } from "lucide-react";

const Alert = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Bouton pour afficher l'alerte */}
      <button
        onClick={() => setIsOpen(true)}
        className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 bg-[#FC9B89] hover:bg-[#014F86] rounded-full"
      >
        <SlidersHorizontal className="h-5 w-5 text-[#014F86] hover:text-white" />
      </button>

      {/* Conteneur de l'alerte */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-red-600 text-white p-4 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <h2 className="text-lg font-bold">Alerte Personnalisée</h2>
        <p>Voici une alerte qui apparaît depuis la gauche.</p>
        
        {/* Bouton pour fermer */}
        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 px-4 py-2 bg-white text-red-600 rounded-lg"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default Alert;
