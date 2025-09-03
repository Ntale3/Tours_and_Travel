import { Bookmark, Calendar, MapPin, Star } from "lucide-react";
import Image from 'next/image'

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
    <div className="bg-card backdrop-blur-md rounded-2xl p-6 border border-border hover:bg-secondary transition-all duration-500 transform hover:scale-105">
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <Image
          src={destination.cardImage}
          alt={`Card for ${destination.name}`}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <button className="absolute top-4 right-4 w-10 h-10 bg-card backdrop-blur-md rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
          <Bookmark className="w-5 h-5 text-card-foreground" />
        </button>
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          <MapPin className="w-3 h-3 inline mr-1" />
          {destination.country}
        </div>
      </div>

      <h3 className="text-card-foreground text-xl font-bold mb-2">{destination.name}</h3>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-card-foreground text-sm">{destination.rating}</span>
          <span className="text-muted-foreground text-sm">({destination.reviews})</span>
        </div>
        <div className="flex items-center space-x-1 text-card-foreground text-sm">
          <Calendar className="w-4 h-4" />
          <span>{destination.duration}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-card-foreground">{destination.price}</span>
        <span className="text-muted-foreground">per person</span>
      </div>
    </div>
  );
}
