'use client';

import { MapPin, Star, Calendar, Users, Check } from "lucide-react";
import Image from "next/image";
import { GalleryImage } from "@/types";

interface Props {
  image: GalleryImage;
  index: number; 
  onClick: () => void;
}

export default function GalleryCard({ image, index, onClick }: Props) {
  const primaryImg = image.images?.[0]?.url || "/placeholder-gallery.jpg";
  const displayedAmenities = image.amenities?.slice(0, 3) ?? [];

  return (
    <div
      key={image.id} // Use image.id as React key
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4"
      onClick={onClick}
      style={{
        // Use CSS custom property + :nth-child instead
        // We'll handle stagger in CSS
      }}
      data-index={index} // Optional: for debugging
    >
      <div className="relative overflow-hidden rounded-2xl bg-card backdrop-blur-sm border border-border shadow-xl">
        {/* Image */}
        <div className="aspect-w-4 aspect-h-3 relative h-64">
          <Image
            width={400}
            height={500}
            src={primaryImg}
            alt={`${image.name} – ${image.location}`}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Hover Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">
                {image.location}, {image.country}
              </span>
            </div>
            <span className="px-2 py-0.5 text-xs bg-primary/20 rounded-full">
              {image.category}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{image.rating ?? "4.8"}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {image.duration_days} {image.duration_days === 1 ? "day" : "days"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{image.max_capacity}</span>
              </div>
            </div>
          </div>

          {displayedAmenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {displayedAmenities.map((amenity, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 text-xs bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full"
                >
                  <Check className="w-3 h-3 text-green-400" />
                  {amenity}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}