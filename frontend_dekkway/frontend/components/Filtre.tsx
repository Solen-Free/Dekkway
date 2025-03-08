"use client";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Filtre = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false); // État pour gérer la visibilité du filtre
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([50000, 1000000]);
  const [bedrooms, setBedrooms] = useState<number>(1);
  const [equipments, setEquipments] = useState<string[]>([]);
  const [city, setCity] = useState<string>("");
  const [showAllEquipments, setShowAllEquipments] = useState(false);

  // Fonction pour ouvrir/fermer le filtre
  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleSelectPropertyType = (type: string) => {
    setSelectedPropertyType(type);
  };

  const handleReset = () => {
    setSelectedPropertyType("");
    setPriceRange([50000, 1000000]);
    setBedrooms(1);
    setEquipments([]);
    setCity("");
  };

  const handleApply = () => {
    console.log({ selectedPropertyType, priceRange, bedrooms, equipments, city });
    setIsFilterVisible(false); // Fermer le filtre après application
  };

  return (
    <>
      {/* Bouton pour ouvrir le filtre */}
      <button
        onClick={toggleFilter}
        className="bg-[#FC9B89] rounded-full p-2 text-[#014F86] hover:text-[#FFFFFF] hover:bg-[#014F86] transition-colors"
      >
        <SlidersHorizontal className="w-5 h-5" />
      </button>

      {/* Contenu du filtre (affiché conditionnellement) */}
      <AnimatePresence>
        {isFilterVisible && (
          <>
            {/* Fond semi-transparent */}
            <motion.div
              key="filtre-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              
              onClick={toggleFilter} // Fermer le filtre en cliquant à l'extérieur
            />

            {/* Contenu du filtre */}
            <motion.div
              key="filtre-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden">
                {/* En-tête du filtre */}
                <div className="relative p-4 border-b border-[#FC9B89] shadow-sm flex items-center justify-between bg-gradient-to-r from-[#FC9B89] to-[#FF6B6B]">
                  <button
                    onClick={handleReset}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <GrPowerReset size={24} />
                  </button>
                  <h2 className="text-lg font-bold text-white">Filtres</h2>
                  <button
                    onClick={toggleFilter}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <IoClose size={24} />
                  </button>
                </div>

                {/* Contenu défilable */}
                <div className="p-6 overflow-y-auto flex-1">
                  {/* Type de propriété */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6"
                  >
                    <h3 className="text-black font-semibold mb-4">Type de Propriété</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {["Tout", "Maison", "Appartement", "Co-Location", "Studio", "Villa", "Longue Durée", "Courte durée"].map(
                        (type) => (
                          <motion.button
                            key={type}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSelectPropertyType(type)}
                            className={`p-2 text-xs rounded-3xl transition-all ${
                              selectedPropertyType === type
                                ? "bg-gradient-to-r from-[#FC9B89] to-[#FF6B6B] text-white shadow-lg"
                                : "bg-[#014F86] text-white hover:bg-[#013A63] hover:shadow-md"
                            }`}
                          >
                            {type}
                          </motion.button>
                        )
                      )}
                    </div>
                  </motion.div>

                  {/* Fourchette de prix */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="mb-6"
                  >
                    <h3 className="text-black font-semibold mb-4">Fourchette de prix</h3>
                    <Slider
                      range
                      min={50000}
                      max={1000000}
                      defaultValue={priceRange}
                      onChange={(value) => setPriceRange(value as [number, number])}
                      styles={{
                        track: { backgroundColor: "#FC9B89" },
                        rail: { backgroundColor: "#E5E7EB" },
                        handle: {
                          backgroundColor: "#FC9B89",
                          borderColor: "#FFFFFF",
                          boxShadow: "0 3px 4px rgba(0, 0, 0, 0.2)",
                        },
                      }}
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>{priceRange[0]} FCFA</span>
                      <span>{priceRange[1]} FCFA</span>
                    </div>
                  </motion.div>

                  {/* Nombre de chambres */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="mb-6"
                  >
                    <h3 className="text-black font-semibold mb-4">Nombre de chambres</h3>
                    <div className="flex gap-3">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <motion.button
                          key={num}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setBedrooms(num)}
                          className={`w-10 h-10 flex items-center justify-center rounded-full text-white text-lg font-semibold transition ${
                            bedrooms === num
                              ? "bg-gradient-to-r from-[#FC9B89] to-[#FF6B6B] shadow-lg"
                              : "bg-[#014F86] hover:bg-[#013A63] hover:shadow-md"
                          }`}
                        >
                          {num}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Équipements */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="mb-6"
                  >
                    <h3 className="font-semibold mb-2">Équipements</h3>
                    <div className="border-2 border-[#FC9B89] rounded-lg p-4 bg-gray-50 shadow-sm">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          "Climatiseur",
                          "Electricité",
                          "Réfrigérateur",
                          "Garage",
                          "Piscine",
                          "Chauffe-eau",
                          "Ménagères",
                          "Micro-onde",
                          "Meubles",
                        ].map((equipment) => (
                          <motion.label
                            key={equipment}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={equipments.includes(equipment)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setEquipments([...equipments, equipment]);
                                } else {
                                  setEquipments(equipments.filter((e) => e !== equipment));
                                }
                              }}
                              className="hidden"
                            />
                            <div
                              className={`w-5 h-5 border-2 rounded flex items-center justify-center transition ${
                                equipments.includes(equipment)
                                  ? "border-[#014F86] bg-[#FC9B89]"
                                  : "border-[#014F86] bg-white"
                              }`}
                            >
                              {equipments.includes(equipment) && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                            <span className="text-sm">{equipment}</span>
                          </motion.label>
                        ))}
                      </div>
                      {equipments.length > 4 && (
                        <button
                          onClick={() => setShowAllEquipments(!showAllEquipments)}
                          className="text-[#014F86] hover:text-[#FC9B89] text-sm mt-2 transition-colors"
                        >
                          {showAllEquipments ? "Voir moins" : "Voir plus"}
                        </button>
                      )}
                    </div>
                  </motion.div>

                  {/* Ville */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="mb-6"
                  >
                    <h3 className="font-semibold mb-2">Ville</h3>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2 border-2 border-[#FC9B89] rounded-xl focus:outline-none focus:border-[#FF6B6B] transition-colors"
                    >
                      <option value="">Sélectionnez une ville</option>
                      {["Thiès", "Dakar", "Saint-Louis", "Diourbel", "Kaolack", "Matam"].map((ville) => (
                        <option key={ville} value={ville}>
                          {ville}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  {/* Filtres sélectionnés */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="mb-6"
                  >
                    <h3 className="font-semibold mb-2">Filtres sélectionnés :</h3>
                    <div className="flex flex-wrap gap-2">
                      {/* Filtre : Type de propriété */}
                      {selectedPropertyType && (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer"
                          onClick={() => setSelectedPropertyType("")} // Supprimer le filtre
                        >
                          {selectedPropertyType}
                          <IoClose className="text-blue-600 cursor-pointer" size={14} />
                        </motion.span>
                      )}

                      {/* Filtre : Fourchette de prix */}
                      {(priceRange[0] !== 50000 || priceRange[1] !== 1000000) && (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer"
                          onClick={() => setPriceRange([50000, 1000000])} // Réinitialiser la fourchette de prix
                        >
                          {priceRange[0]} FCFA - {priceRange[1]} FCFA
                          <IoClose className="text-blue-600 cursor-pointer" size={14} />
                        </motion.span>
                      )}

                      {/* Filtre : Nombre de chambres */}
                      {bedrooms > 1 && (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer"
                          onClick={() => setBedrooms(1)} // Réinitialiser le nombre de chambres
                        >
                          {bedrooms} chambres
                          <IoClose className="text-blue-600 cursor-pointer" size={14} />
                        </motion.span>
                      )}

                      {/* Filtre : Équipements */}
                      {equipments.length > 0 &&
                        equipments.map((item) => (
                          <motion.span
                            key={item}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer"
                            onClick={() => setEquipments(equipments.filter((e) => e !== item))} // Supprimer l'équipement
                          >
                            {item}
                            <IoClose className="text-blue-600 cursor-pointer" size={14} />
                          </motion.span>
                        ))}

                      {/* Filtre : Ville */}
                      {city && (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer"
                          onClick={() => setCity("")} // Réinitialiser la ville
                        >
                          {city}
                          <IoClose className="text-blue-600 cursor-pointer" size={14} />
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Bouton Appliquer */}
                <div className="flex justify-start p-4 border-t border-[#FC9B89] bg-gray-50">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleApply}
                    className="w-full p-2 bg-gradient-to-r from-[#FC9B89] to-[#FF6B6B] text-white rounded-3xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Appliquer
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Filtre;