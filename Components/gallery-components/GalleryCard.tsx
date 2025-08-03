'use client'
import { MapPin, Star, Calendar, Users } from "lucide-react";

interface Props {
  image: any;
  index: number;
  onClick: () => void;
}

export default function GalleryCard({ image, index, onClick }: Props) {
  return (
    <div
      key={image.id}
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
      onClick={onClick}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
        <div className="aspect-w-4 aspect-h-3 relative h-64">
          <img
            src={image.src}
            alt={`${image.alt} - ${image.destination}`}
            //fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">{image.destination}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{image.rating}</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{image.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{image.groupSize}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
