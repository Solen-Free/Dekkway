import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import Filter from "./filter"; const AlertFiltre = () => {
  const [showFilter, setShowFilter] = useState(false);

  const handleAlert = () => {
    setShowFilter(!showFilter); // Alterner l'état de visibilité du filtre
  };

  return (
    <div className="relative">
      {/* Bouton d'alerte */}
      <button 
        onClick={handleAlert} 
        className="absolute right-1 top-3/3 transform -translate-y-2/2 p-2 bg-[#FC9B89] hover:bg-[#014F86] rounded-full"
      >
        <SlidersHorizontal className="h-6 w-5 text-[#014F86] hover:text-white" />

      </button>

      {/* Le filtre s'affiche en dessous du bouton si showFilter est true */}
      {showFilter && (
        <div className="absolute top-full mt-2 w-96 bg-white p-4 shadow-lg rounded-md z-10">
          <Filter onClose={() => setShowFilter(false)} />
        </div>
      )}
    </div>
  );
};

export default AlertFiltre;
