import { MapPin, Star, Calendar, Bookmark, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Destination } from "@/types";

interface Props {
  destination: Destination;
  isFavorite: boolean;
  toggleFavorite: (id: number) => void;
}

const DestinationCard = ({ destination, isFavorite, toggleFavorite }: Props) => {
  const primaryImage = destination.images?.[0]?.url;
  const displayAmenities = destination.amenities?.slice(0, 3) || [];

  return (
    <Link href={`/destinations/${destination.slug || destination.id}`}>
      <div className="group relative">
        <div className="bg-card rounded-3xl overflow-hidden border border-border hover:bg-secondary transition-all duration-500 transform hover:-translate-y-2 shadow-lg">
          {/* Image Section */}
          <div className="relative h-64 overflow-hidden">
            <Image
              width={400}
              height={300}
              src={primaryImage}
              alt={destination.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(destination.id);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-card backdrop-blur-sm text-card-foreground hover:bg-black/50 transition-all duration-300 z-10"
            >
              <Bookmark className={`w-5 h-5 ${isFavorite ? "fill-current text-primary" : ""}`} />
            </button>

            {/* Location */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">{destination.location}, {destination.country}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl md:text-2xl font-bold text-card-foreground tracking-wide line-clamp-1">
                {destination.name}
              </h3>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-card-foreground font-medium text-sm">
                  {destination.rating || "4.8"}
                </span>
              </div>
            </div>

            {/* Category Badge */}
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
              {destination.category}
            </span>

            <p className="text-card-foreground mb-4 text-sm leading-relaxed line-clamp-2">
              {destination.description}
            </p>

            {/* Duration & Price */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-card-foreground text-sm">
                <Calendar className="w-4 h-4" />
                <span>{destination.duration_days} {destination.duration_days === 1 ? 'day' : 'days'}</span>
              </div>
              <div className="text-right">
                <div className="text-xl md:text-2xl font-bold text-card-foreground">
                  ${destination.price_per_person}
                  <span className="text-sm font-normal text-muted-foreground">/person</span>
                </div>
                <div className="text-xs text-card-foreground">
                  Max {destination.max_capacity} guests
                </div>
              </div>
            </div>

            {/* Amenities */}
            {displayAmenities.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {displayAmenities.map((amenity, idx) => (
                  <span
                    key={`${destination.id}-${idx}`}
                    className="flex items-center gap-1 text-xs bg-card text-card-foreground px-3 py-1.5 rounded-full border border-border"
                  >
                    <Check className="w-3 h-3 text-green-500" />
                    {amenity}
                  </span>
                ))}
              </div>
            )}

            {/* CTA Button */}
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2">
              Explore Package <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;