import Slider from "@mui/material/Slider";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface PriceRangeProps {
  priceRange: number[];
  onChange: (newValue: number[]) => void;
}

const priceDistribution = [
  { price: 50000, count: 5 },
  { price: 100000, count: 15 },
  { price: 150000, count: 30 },
  { price: 200000, count: 25 },
  { price: 250000, count: 20 },
  { price: 300000, count: 18 },
  { price: 350000, count: 10 },
  { price: 400000, count: 8 },
  { price: 450000, count: 5 },
  { price: 500000, count: 2 },
];

const PriceRange: React.FC<PriceRangeProps> = ({ priceRange, onChange }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg w-full">
      <h2 className="text-lg font-semibold">Fourchette de prix</h2>
      <p className="text-sm text-gray-500">Prix par nuit, frais et taxes compris</p>

      {/* Histogramme */}
      <div className="w-full h-24 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={priceDistribution}>
            <XAxis dataKey="price" hide />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="count" fill="#E40064" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Slider de sélection de prix */}
      <Slider
        value={priceRange}
        onChange={(event, newValue) => onChange(newValue as number[])}
        min={50000}
        max={500000}
        step={5000}
        valueLabelDisplay="auto"
        sx={{
          color: "#E40064",
          "& .MuiSlider-thumb": { width: 24, height: 24, backgroundColor: "white", border: "3px solid #E40064" },
        }}
      />

      <p className="text-center mt-2 text-sm">
        {priceRange[0].toLocaleString()} FCFA - {priceRange[1].toLocaleString()} FCFA
      </p>
    </div>
  );
};

export default PriceRange;