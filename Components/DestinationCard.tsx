import { MapPin, Star, Calendar, Bookmark, ArrowRight } from "lucide-react";

interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  price: string;
  rating: number;
  duration: string;
  groupSize: string;
  description: string;
  highlights: string[];
}

interface Props {
  destination: Destination;
  isFavorite: boolean;
  toggleFavorite: (id: number) => void;
}

const DestinationCard = ({ destination, isFavorite, toggleFavorite }: Props) => {
  return (
    <div className="group relative">
      <div className="bg-black/20 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10 hover:bg-black/30 transition-all duration-500 transform hover:-translate-y-2">
        <div className="relative h-64 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          <button
            onClick={() => toggleFavorite(destination.id)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300"
          >
            <Bookmark className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
          </button>

          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{destination.location}</span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white tracking-wide">{destination.name}</h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-white font-medium">{destination.rating}</span>
            </div>
          </div>

          <p className="text-white/80 mb-4 text-sm leading-relaxed">{destination.description}</p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{destination.duration}</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{destination.price}</div>
              <div className="text-white/70 text-sm">{destination.groupSize}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {destination.highlights.slice(0, 2).map((h, i) => (
              <span
                key={`${destination.id}-${h}`}
                className="text-xs bg-white/10 text-white px-3 py-1 rounded-full border border-white/20"
              >
                {h}
              </span>
            ))}
          </div>

          <button className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 rounded-full font-semibold hover:from-orange-500 hover:to-red-600 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2">
            Explore <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
