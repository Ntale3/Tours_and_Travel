'use client'
import React, { useEffect, useState } from "react";
import GalleryCard from '@/components/gallery-components/GalleryCard';
import FilterBar from '@/components/gallery-components/FilterBar';
import LightboxModal from '@/components/gallery-components/LightboxModal';
import { GalleryImage } from "@/types";
import Header from "@/components/Header";
import { $destinationStore, fetchDestinations } from "@/store/destinations.store";
import { ReusablePagination } from "@/components/pagination";
import { useRouter, useSearchParams } from "next/navigation";

export default function Gallery() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const {destinationsMeta} = $destinationStore.get();



  useEffect(() => {
    const loadDestinations = async () => {
      try {
        await fetchDestinations();
        const { destinations: fetchedDestinations} = $destinationStore.get();
        setDestinations(fetchedDestinations);


      } catch (error) {
        console.error('Failed to fetch destinations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDestinations();
   }, []);



  const images: GalleryImage[] = destinations.map((dest) => ({
    id: dest.id,
    name: dest.name,
    location: dest.location,
    country: dest.country,
    rating: dest.rating,
    duration_days: dest.duration_days,
    max_capacity: dest.max_capacity,
    amenities: dest.amenities,
    category: dest.category,
    images: dest.images,
  }));

  const filterOptions = [
    { value: "all", label: "All Gallery" },
    { value: "Tropical paradise", label: "Tropical paradise" },
    { value: "Adventure", label: "Adventure" },
    { value: "Cultural", label: "Cultural" },
    { value: "Luxury", label: "Luxury" },
  ];

  const filteredImages =
    activeFilter === "all"
      ? images
      : images.filter((img) => img.category === activeFilter);

  const navigateImage = (dir: "prev" | "next") => {
    if (!selectedImage) return;
    const index = filteredImages.findIndex((img) => img.id === selectedImage.id);
    const newIndex =
      dir === "next"
        ? (index + 1) % filteredImages.length
        : (index - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[newIndex]);
  };

  const router = useRouter();
    const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-20">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground text-center mb-6">
          Photo Gallery
        </h1>

        <FilterBar options={filterOptions} active={activeFilter} onChange={setActiveFilter} />

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-lg text-muted-foreground">Loading destinations...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((img, i) => (
              <GalleryCard key={img.id} image={img} index={i} onClick={() => setSelectedImage(img)}/>
            ))}
          </div>
        )}
      </main>

      {selectedImage && (
        <LightboxModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onPrev={() => navigateImage("prev")}
          onNext={() => navigateImage("next")}
        />
      )}

      <Header />
      <ReusablePagination
      meta={destinationsMeta}
      paginatedDataName="Gallery"
      onPageChange={handlePageChange}
      />
    </div>
  );
}