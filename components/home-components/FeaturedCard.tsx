import { Bookmark, Calendar, MapPin, Star } from "lucide-react";

interface FeaturedCardProps {
name: string;
country: string;
cardImage: string;
rating: number;
reviews: string;
duration: string;
price: string;
 
}

export default function FeaturedCard({ destination }: {destination:FeaturedCardProps}) {
  return (
    <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-black/30 transition-all duration-500 transform hover:scale-105">
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <img
          src={destination.cardImage}
          alt={`Card for ${destination.name}`}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
          <Bookmark className="w-5 h-5 text-white" />
        </button>
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          <MapPin className="w-3 h-3 inline mr-1" />
          {destination.country}
        </div>
      </div>

      <h3 className="text-white text-xl font-bold mb-2">{destination.name}</h3>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-white text-sm">{destination.rating}</span>
          <span className="text-white/60 text-sm">({destination.reviews})</span>
        </div>
        <div className="flex items-center space-x-1 text-white/80 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{destination.duration}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-white">{destination.price}</span>
        <span className="text-white/60">per person</span>
      </div>
    </div>
  );
}
