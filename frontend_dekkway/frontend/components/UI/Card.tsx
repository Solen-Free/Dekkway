import { Heart } from "lucide-react";

interface CardProps {
  imageUrl: string;
  title: string;
  location: string;
  price: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, location, price }) => {
  return (
    <div className="rounded-2xl shadow-lg border p-4 bg-white w-80 relative">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-lg" />
      <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
        <Heart className="text-gray-500" />
      </button>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600 flex items-center gap-2">
          📍 {location}
        </p>
        <p className="text-blue-600 font-bold text-xl mt-2">{price} FCFA</p>
      </div>
      <button className="w-full mt-4 bg-orange-400 text-white py-2 rounded-xl text-lg font-semibold hover:bg-orange-500">
        Détails
      </button>
    </div>
  );
};

export default Card;
