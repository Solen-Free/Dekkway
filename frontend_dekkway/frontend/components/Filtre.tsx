"use client";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

// Chargement dynamique du sélecteur de carte pour éviter les problèmes SSR
const MapSelector = dynamic(() => import("./MapSelector"), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />,
});


// Fonction de normalisation pour la région
const normalizeRegion = (region: string) => {
  return region
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");
};

const Filtre = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([25000, 1000000]);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [equipments, setEquipments] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState<[number, number]>([14.6937, -17.4441]); // Dakar par défaut
  const [searchRadius, setSearchRadius] = useState<number>(1); // 5km par défaut
  const [useMapFilter, setUseMapFilter] = useState<boolean>(false);
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop");
  
  // Récupération des filtres depuis l'URL au chargement du composant
  useEffect(() => {
    // Type de propriété
    const typeParam = searchParams.get('type');
    if (typeParam) {
      // Gestion de plusieurs types séparés par des virgules
      const types = typeParam.split(',');
      const formattedTypes = types.map(type => {
        // Première lettre en majuscule pour correspondre au format des boutons
        return type.charAt(0).toUpperCase() + type.slice(1);
      });
      setSelectedPropertyTypes(formattedTypes);
    }
    
    // Durée
    const dureeParam = searchParams.get('duree');
    if (dureeParam) {
      // Première lettre en majuscule pour correspondre au format des boutons
      const formattedDuree = dureeParam.charAt(0).toUpperCase() + dureeParam.slice(1);
      setSelectedDuration(formattedDuree === 'Longue' ? 'Longue durée' : 'Courte durée');
    }
    
    // Prix
    const prixMinParam = searchParams.get('prix_min');
    const prixMaxParam = searchParams.get('prix_max');
    if (prixMinParam && prixMaxParam) {
      setPriceRange([parseInt(prixMinParam), parseInt(prixMaxParam)]);
    }
    
    // Nombre de chambres
    const chambresParam = searchParams.get('nombre_de_chambres');
    if (chambresParam) {
      setBedrooms(parseInt(chambresParam));
    }
    
    // Équipements
    const equipementsParam = searchParams.get('equipements');
    if (equipementsParam) {
      const equipList = equipementsParam.split(',').map(item => {
        const [equip] = item.split(':');
        // Première lettre en majuscule pour correspondre au format des boutons
        return equip.charAt(0).toUpperCase() + equip.slice(1);
      });
      setEquipments(equipList);
    }
    
    // Région
    const regionParam = searchParams.get('region');
    if (regionParam) {
      // Trouver la région correspondante dans la liste des régions disponibles
      const regions = ["Thiès", "Dakar", "Saint-Louis", "Diourbel", "Kaolack", "Matam", "Fatick", "Kaffrine", "Kédougou", "Kolda", "Louga", "Sédhiou","Tambacounda", "Ziguinchor"];
      const matchedRegion = regions.find(r => normalizeRegion(r) === regionParam);
      if (matchedRegion) {
        setCity(matchedRegion);
      }
    }
    
    // Filtre par carte
    const latParam = searchParams.get('lat');
    const lngParam = searchParams.get('lng');
    const rayonParam = searchParams.get('rayon');
    
    if (latParam && lngParam) {
      setUseMapFilter(true);
      setCoordinates([parseFloat(latParam), parseFloat(lngParam)]);
      if (rayonParam) {
        setSearchRadius(parseInt(rayonParam));
      }
    }
  }, [searchParams]);

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
  

  const toggleFilter = () => {
    // Si le filtre est visible et qu'on va le fermer, on applique les filtres
    if (isFilterVisible) {
      handleApply();
    }
    setIsFilterVisible(!isFilterVisible);
  };

  const handleReset = () => {
    setSelectedPropertyTypes([]);
    setSelectedDuration("");
    setPriceRange([50000, 1000000]);
    setBedrooms(null);
    setEquipments([]);
    setCity("");
    setUseMapFilter(false);
    setSearchRadius(5);
    setCoordinates([14.6937, -17.4441]);
  };

  const handleApply = async () => {
    try {
      const params = new URLSearchParams();

      // Types de propriété (convertis en minuscules)
      if (selectedPropertyTypes.length > 0 && !selectedPropertyTypes.includes('Tout')) {
        const typesParam = selectedPropertyTypes.map(type => type.toLowerCase()).join(',');
        params.append('type', typesParam);
      }
      
      // Durée (converti en minuscules)
      if (selectedDuration) {
        // Utiliser la valeur exacte comme dans le modèle Django
        params.append('duree', selectedDuration.toLowerCase());
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
      
      // Ajout des paramètres de localisation si le filtre par carte est activé
      if (useMapFilter) {
        params.append('lat', coordinates[0].toString());
        params.append('lng', coordinates[1].toString());
        params.append('rayon', searchRadius.toString());
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
              onClick={() => {
                handleApply(); // Appliquer les filtres avant de fermer
                setIsFilterVisible(false);
              }}
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
                  <button onClick={handleReset} className="text-white hover:text-gray-200 flex items-center gap-2">
                    <GrPowerReset size={24} />
                    <span>Enlever filtre</span>
                  </button>
                  <h2 className="text-xl font-bold text-white">Filtres</h2>
                  <button onClick={() => {
                    handleApply(); // Appliquer les filtres avant de fermer
                    setIsFilterVisible(false);
                  }} className="text-white hover:text-gray-200">
                    <IoClose size={24} />
                  </button>
                </div>

                {/* Affichage des filtres actifs en position fixe */}
                <div className="p-3 border-b border-[#FC9B89] bg-white sticky top-0 z-10 shadow-sm">
                  <div className="flex flex-wrap gap-2">
                    {selectedPropertyTypes.length > 0 && !selectedPropertyTypes.includes('Tout') && 
                      selectedPropertyTypes.map((type) => (
                        <motion.span
                          key={type}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-[#FC9B89]/20 text-[#014F86] px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer hover:bg-[#FC9B89]/30 transition-colors"
                          onClick={() => setSelectedPropertyTypes(prev => prev.filter(t => t !== type))}
                        >
                          {type}
                          <IoClose className="text-[#014F86]" size={14} />
                        </motion.span>
                      ))
                    }
                    
                    {selectedDuration && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#FC9B89]/20 text-[#014F86] px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer hover:bg-[#FC9B89]/30 transition-colors"
                        onClick={() => setSelectedDuration("")}
                      >
                        {selectedDuration}
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
                    
                    {useMapFilter && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#FC9B89]/20 text-[#014F86] px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer hover:bg-[#FC9B89]/30 transition-colors"
                        onClick={() => setUseMapFilter(false)}
                      >
                        Recherche par carte ({searchRadius} km)
                        <IoClose className="text-[#014F86]" size={14} />
                      </motion.span>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4">
                  {/* Type de propriété - Sélection multiple */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Type de propriété (sélection multiple)</h3>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {["Tout", "Maison", "Appartement", "Co-Location", "Studio", "Villa"].map((type) => (
                        <motion.button
                          key={type}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (type === "Tout") {
                              // Si "Tout" est sélectionné, on efface les autres sélections
                              setSelectedPropertyTypes(["Tout"]);
                            } else {
                              // Si on clique sur un type déjà sélectionné, on le retire
                              if (selectedPropertyTypes.includes(type)) {
                                setSelectedPropertyTypes(prev => prev.filter(t => t !== type));
                              } else {
                                // Sinon on l'ajoute, en retirant "Tout" s'il était sélectionné
                                setSelectedPropertyTypes(prev => {
                                  const newTypes = prev.filter(t => t !== "Tout");
                                  return [...newTypes, type];
                                });
                              }
                            }
                          }}
                          className={`p-2 text-sm rounded-3xl transition-colors ${
                            selectedPropertyTypes.includes(type)
                              ? "bg-gradient-to-r from-[#FC9B89] to-[#FF6B6B] text-white"
                              : "bg-[#014F86] text-white hover:bg-[#013A63]"
                          }`}
                        >
                          {type}
                        </motion.button>
                      ))}
                    </div>
                  </div>

               
                  {/* Durée - Utilisation de la variable d'état dédiée */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Durée</h3>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {["Longue durée", "Courte durée"].map((duration) => (
                        <motion.button
                          key={duration}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedDuration(duration)}
                          className={`p-2 text-sm rounded-3xl transition-colors ${
                            selectedDuration === duration
                              ? "bg-gradient-to-r from-[#FC9B89] to-[#FF6B6B] text-white"
                              : "bg-[#014F86] text-white hover:bg-[#013A63]"
                          }`}
                        >
                          {duration}
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
                  
                  {/* Filtre par carte */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Recherche par carte</h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={useMapFilter} 
                          onChange={() => setUseMapFilter(!useMapFilter)} 
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FC9B89]"></div>
                      </label>
                    </div>
                    
                    {useMapFilter && (
                      <div className="mt-2">
                        <MapSelector 
                          onLocationChange={(coords, radius) => {
                            setCoordinates(coords);
                            setSearchRadius(radius);
                          }}
                          initialCoordinates={coordinates}
                          initialRadius={searchRadius}
                        />
                      </div>
                    )}
                  </div>

                  {/* La section des filtres actifs a été déplacée en haut */}
                </div>

                {/* Le bouton d'application a été supprimé car les filtres s'appliquent automatiquement à la fermeture */}
                <div className="p-4 border-t border-[#FC9B89]">
                  <p className="text-center text-sm text-gray-500">Les filtres seront appliqués automatiquement à la fermeture</p>
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