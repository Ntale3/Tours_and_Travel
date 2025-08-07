import { Star } from "lucide-react";

interface MiniCardProps {
  destination: {
    id: number;
    name: string;
    country: string;
    cardImage: string;
    rating: number;
    price: string;
  };
  onClick: () => void;
}

export default function MiniCard({ destination, onClick }: MiniCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-card backdrop-blur-md rounded-xl p-4 border border-border hover:bg-secondary transition-all duration-300 cursor-pointer transform hover:scale-105"
    >
      <div className="flex items-center space-x-4">
        <img
          src={destination.cardImage}
          alt={`Card for ${destination.name}`}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h4 className="text-card-foreground font-semibold">{destination.name}</h4>
          <p className="text-card-foreground text-sm">{destination.country}</p>
          <div className="flex items-center space-x-2 mt-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-muted-foreground text-xs">{destination.rating}</span>
          </div>
        </div>
        <span className="text-white font-bold">{destination.price}</span>
      </div>
    </div>
  );
}
