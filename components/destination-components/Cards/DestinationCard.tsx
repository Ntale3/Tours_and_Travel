'use client'

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Users, Calendar, Star } from 'lucide-react';
import { Destination } from '@/types';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const formatCurrency = (amount: number) => {
    return `UGX ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  

  // Ensure we have a valid image
  const imageUrl = destination.images?.[0]?.url || '/placeholder-destination.jpg';

  return (
    <Link href={`/destinations/${destination.id}`}>
      <article className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={imageUrl}
            alt={destination.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              {destination.category}
            </span>
          </div>

          {/* Rating Badge */}
          {destination.average_rating && (
            <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-semibold text-foreground">
                {destination.average_rating.toFixed(1)}
              </span>
              {destination.reviews_count && (
                <span className="text-xs text-muted-foreground">
                  ({destination.reviews_count})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
              {destination.name}
            </h3>

            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="line-clamp-1">
                {destination.location}, {destination.country}
              </span>
            </div>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {destination.description}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>{destination.duration_days} days</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span>Max {destination.max_capacity}</span>
            </div>
          </div>

          {/* Dates */}
          <div className="bg-accent/50 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Calendar className="w-3 h-3" />
              <span>Available dates</span>
            </div>
            <p className="text-sm font-medium text-foreground">
              {formatDate(destination.start_date)} - {formatDate(destination.end_date)}
            </p>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground">From</p>
              <p className="text-lg font-bold text-foreground">
                {formatCurrency(destination.price_per_person)}
              </p>
              <p className="text-xs text-muted-foreground">per person</p>
            </div>
            <button
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-all font-medium text-sm"
              onClick={(e) => {
                // Prevent link navigation, let Link handle it
                e.stopPropagation();
              }}
            >
              View Details
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
};