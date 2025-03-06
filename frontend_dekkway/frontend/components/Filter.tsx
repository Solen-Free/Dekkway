import { useState } from "react";
import PriceRange from "./PriceRange";

interface Filters {
  propertyType: string;
  priceRange: number[];
  bedrooms: number;
  city: string;
  amenities: string[];  // ✅ Définir comme `string[]`
  rentalType: string;
}

interface FilterProps {
  onClose: () => void; // Définir la prop onClose ici
}

const Filter = ({ onClose }: FilterProps) => {
  const [filters, setFilters] = useState<Filters>({ // ✅ Ajout d'un type explicite ici
    propertyType: "",
    priceRange: [50000, 500000],
    bedrooms: 1,
    city: "",
    amenities: [], // ✅ Type string[] est bien respecté
    rentalType: ""
  });

  const handleCheckboxChange = (amenity: string) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity] // ✅ Aucun problème avec TypeScript ici
    }));
  };

  return (
    <div>
      <h2>Filtrer</h2>
      <PriceRange
        priceRange={filters.priceRange}
        onChange={(newValue) => setFilters({ ...filters, priceRange: newValue })}
      />

      <div>
        <h3>Équipements</h3>
        <label>
          <input
            type="checkbox"
            checked={filters.amenities.includes("Climatiseur")}
            onChange={() => handleCheckboxChange("Climatiseur")}
          />
          Climatiseur
        </label>
      </div>
    </div>
  );
};

export default Filter;
