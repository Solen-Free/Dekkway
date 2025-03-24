"use client";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useRouter } from "next/navigation";

// Fonction de normalisation pour la région
const normalizeRegion = (region: string) => {
  return region
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");
};

const Filtre = () => {
  const router = useRouter();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([50000, 1000000]);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [equipments, setEquipments] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) setDeviceType("mobile");
      else if (width >= 768 && width < 1024) setDeviceType("tablet");
      else setDeviceType("desktop");
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const toggleFilter = () => setIsFilterVisible(!isFilterVisible);

  const handleReset = () => {
    setSelectedPropertyType("");
    setPriceRange([50000, 1000000]);
    setBedrooms(null);
    setEquipments([]);
    setCity("");
  };

  const handleApply = async () => {
    try {
      const params = new URLSearchParams();

      // Type de propriété (converti en minuscules)
      if (selectedPropertyType && selectedPropertyType !== 'Tout') {
        params.append('type', selectedPropertyType.toLowerCase());
      }

      // Prix (adaptation aux paramètres Django)
      params.append('prix_min', priceRange[0].toString());
      params.append('prix_max', priceRange[1].toString());

      // Chambres (nom de paramètre Django)
      if (bedrooms !== null) {
        params.append('nombre_de_chambres', bedrooms.toString());
      }

      // Équipements (format spécifique avec :true)
      if (equipments.length > 0) {
        const equipementsStr = equipments
          .map(eq => `${eq.toLowerCase()}:true`)
          .join(',');
        params.append('equipements', equipementsStr);
      }

      // Ville (normalisation pour correspondre au paramètre 'region')
      if (city) {
        params.append('region', normalizeRegion(city));
      }

      router.push(`/?${params.toString()}`);
      setIsFilterVisible(false);

    } catch (error) {
      console.error("Erreur lors de l'application des filtres :", error);
    }
  };

  // Les animations restent identiques
  const mobileAnimation = {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    transition: { type: "spring", stiffness: 300, damping: 30 }
  };

  const desktopAnimation = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { type: "spring", stiffness: 200, damping: 25 }
  };

  return (
    <>
      <button
        onClick={toggleFilter}
        className="bg-[#FC9B89] p-2 rounded-full text-[#014F86] hover:bg-[#014F86] hover:text-white transition-colors"
        aria-label="Ouvrir les filtres"
      >
        <SlidersHorizontal className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isFilterVisible && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={toggleFilter}
            />

            <motion.div
              key="filter-content"
              {...(deviceType === "mobile" ? mobileAnimation : desktopAnimation)}
              className={`fixed bg-white shadow-xl z-50 ${
                deviceType === "mobile"
                  ? 'top-0 right-0 h-full w-full max-w-xs'
                  : deviceType === "tablet"
                    ? 'inset-0 m-auto max-w-md h-[90vh] rounded-xl'
                    : 'inset-0 m-auto max-w-lg rounded-xl'
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="p-4 bg-gradient-to-r from-[#FC9B89] to-[#FF6B6B] flex items-center justify-between">
                  <button onClick={handleReset} className="text-white hover:text-gray-200">
                    <GrPowerReset size={24} />
                  </button>
                  <h2 className="text-xl font-bold text-white">Filtres</h2>
                  <button onClick={toggleFilter} className="text-white hover:text-gray-200">
                    <IoClose size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {/* Type de propriété - Ajout de la conversion en minuscules */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Type de propriété</h3>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {["Tout", "Maison", "Appartement", "Co-Location", "Studio", "Villa", "Longue Durée", "Courte durée"].map((type) => (
                        <motion.button
                          key={type}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedPropertyType(type)}
                          className={`p-2 text-sm rounded-3xl transition-colors ${
                            selectedPropertyType === type
                              ? "bg-gradient-to-r from-[#FC9B89] to-[#FF6B6B] text-white"
                              : "bg-[#014F86] text-white hover:bg-[#013A63]"
                          }`}
                        >
                          {type}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Fourchette de prix - Mise à jour des noms de paramètres */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Fourchette de prix (FCFA)</h3>
                    <Slider
                      range
                      min={50000}
                      max={1000000}
                      value={priceRange}
                      onChange={(value) => setPriceRange(value as [number, number])}
                      trackStyle={{ backgroundColor: "#FC9B89" }}
                      railStyle={{ backgroundColor: "#E5E7EB" }}
                      handleStyle={{
                        backgroundColor: "#FC9B89",
                        borderColor: "#FFFFFF",
                        boxShadow: "0 3px 4px rgba(0, 0, 0, 0.2)"
                      }}
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>{priceRange[0].toLocaleString()}</span>
                      <span>{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Nombre de chambres - Nom de paramètre Django */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Nombre de chambres</h3>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <motion.button
                          key={num}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setBedrooms(current => current === num ? null : num)}
                          className={`w-12 h-12 rounded-lg text-lg font-semibold transition-colors
                            ${
                              bedrooms === num 
                                ? "bg-gradient-to-r from-[#FC9B89] to-[#FF6B6B] text-white" 
                                : "bg-[#014F86] text-white hover:bg-[#FC9B89]/80"
                            }`}
                        >
                          {num}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Équipements - Formatage pour Django */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Équipements</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "Climatiseur", "Piscine",
                        "Garage", "Chauffe-eau",
                        "Ménagères", "Meubles"
                      ].map((equipment) => (
                        <label
                          key={equipment}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={equipments.includes(equipment)}
                            onChange={(e) => {
                              const newEquipments = e.target.checked
                                ? [...equipments, equipment]
                                : equipments.filter(e => e !== equipment);
                              setEquipments(newEquipments);
                            }}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 border-2 rounded flex items-center justify-center 
                            ${equipments.includes(equipment) 
                              ? "bg-[#FC9B89] border-[#014F86]" 
                              : "bg-white border-[#014F86]"}`}>
                            {equipments.includes(equipment) && (
                              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm">{equipment}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Ville - Normalisation pour le paramètre 'region' */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Région</h3>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2 border-2 border-[#FC9B89] rounded-lg focus:outline-none focus:border-[#FF6B6B]"
                    >
                      <option value="">Sélectionnez une région</option>
                      {["Thiès", "Dakar", "Saint-Louis", "Diourbel", "Kaolack", "Matam", "Fatick", "Kaffrine", "Kédougou", "Kolda", "Louga", "Sédhiou","Tambacounda", "Ziguinchor"].map((ville) => (
                        <option key={ville} value={ville}>{ville}</option>
                      ))}
                    </select>
                  </div>

                  {/* Affichage des filtres actifs */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Filtres actifs :</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPropertyType && selectedPropertyType !== 'Tout' && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-[#FC9B89]/20 text-[#014F86] px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer hover:bg-[#FC9B89]/30 transition-colors"
                          onClick={() => setSelectedPropertyType("")}
                        >
                          {selectedPropertyType}
                          <IoClose className="text-[#014F86]" size={14} />
                        </motion.span>
                      )}

                      {(priceRange[0] !== 50000 || priceRange[1] !== 1000000) && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-[#FC9B89]/20 text-[#014F86] px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer hover:bg-[#FC9B89]/30 transition-colors"
                          onClick={() => setPriceRange([50000, 1000000])}
                        >
                          {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} FCFA
                          <IoClose className="text-[#014F86]" size={14} />
                        </motion.span>
                      )}

                      {bedrooms !== null && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-[#FC9B89]/20 text-[#014F86] px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer hover:bg-[#FC9B89]/30 transition-colors"
                          onClick={() => setBedrooms(null)}
                        >
                          {bedrooms} chambre{bedrooms > 1 && 's'}
                          <IoClose className="text-[#014F86]" size={14} />
                        </motion.span>
                      )}

                      {equipments.map((item) => (
                        <motion.span
                          key={item}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-[#FC9B89]/20 text-[#014F86] px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer hover:bg-[#FC9B89]/30 transition-colors"
                          onClick={() => setEquipments(equipments.filter(e => e !== item))}
                        >
                          {item}
                          <IoClose className="text-[#014F86]" size={14} />
                        </motion.span>
                      ))}

                      {city && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-[#FC9B89]/20 text-[#014F86] px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer hover:bg-[#FC9B89]/30 transition-colors"
                          onClick={() => setCity("")}
                        >
                          {city}
                          <IoClose className="text-[#014F86]" size={14} />
                        </motion.span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-[#FC9B89]">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleApply}
                    className="w-full py-3 bg-[#014F86] text-white rounded-lg font-semibold hover:bg-[#013A63] transition-colors"
                  >
                    Appliquer les filtres
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