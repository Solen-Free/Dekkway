import { useState } from "react";
import PriceRange from "./PriceRange";

interface Filters {
  propertyType: string;
  priceRange: number[];
  bedrooms: number;
  city: string;
  amenities: string[];  
  rentalType: string;
}

interface FilterProps {
  onClose: () => void; 
}

const Filter = ({ onClose }: FilterProps) => {
  const [filters, setFilters] = useState<Filters>({ 
    propertyType: "",
    priceRange: [50000, 500000],
    bedrooms: 1,
    city: "",
    amenities: [],
    rentalType: ""
  });

  const handleCheckboxChange = (amenity: string) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity] 
    }));
  };

  return (
    <div>
      <h2>Filtrer</h2>
      
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
          <label>
            <input
              type="checkbox"
              checked={filters.amenities.includes("Climatiseur")}
              onChange={() => handleCheckboxChange("Climatiseur")}
            />
            Climatiseur
          </label>
      </div>
      <div>
      <PriceRange
        priceRange={filters.priceRange}
        onChange={(newValue) => setFilters({ ...filters, priceRange: newValue })}
      />
      </div>
    </div>
  );
};

export default Filter;
