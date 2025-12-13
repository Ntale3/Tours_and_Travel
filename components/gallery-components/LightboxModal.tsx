'use client'
import { ChevronLeft, ChevronRight, X, Star, Calendar, Users } from "lucide-react";
import { Destination, GalleryImage } from "@/types";
import Image from "next/image"
import { Button } from "../ui/button";
import { redirect } from "next/navigation";


interface Props {
  image: GalleryImage;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  destination?:Destination
}

export default function LightboxModal({ image, onClose, onPrev, onNext }: Props) {
  const primaryImg = image.images?.[0]?.url

  function handleNavigation(id:number): void {
   redirect(`destinations/${id}`)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
    >
      <div className="relative max-w-6xl max-h-full p-4">
        <button
          aria-label="Close Lightbox"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <button
          aria-label="Previous Image"
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          aria-label="Next Image"
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="relative">
          <Image
            src={primaryImg}
            alt={image.name}
            width={1200}
            height={800}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
            <h3 className="text-2xl font-bold text-white mb-2">{image.name}</h3>
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{image.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-5 h-5" />
                  <span>{image.duration_days}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-5 h-5" />
                  <span>{image.max_capacity} people</span>
                </div>
              </div>

              <Button onClick={()=>handleNavigation(image.id)}>
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
