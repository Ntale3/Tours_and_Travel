'use client'
import React, { useState} from "react";
import GalleryCard from '@/components/gallery-components/GalleryCard';
import FilterBar from '@/components/gallery-components/FilterBar';
import LightboxModal from '@/components/gallery-components/LightboxModal';
import { GalleryImage } from "@/types";
import Header from "@/components/Header";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  //const [isLoading, setIsLoading] = useState(true);

  const galleryImages: GalleryImage[] = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop',
      alt: 'Bali Temple at Sunset',
      destination: 'Tanah Lot Temple',
      country: 'Bali, Indonesia',
      rating: 4.8,
      reviewCount: 2847,
      duration: '7 days',
      groupSize: '8-12',
      price: 1299,
      category: 'culture',
      tags: ['temple', 'sunset', 'spiritual', 'iconic'],
      description: 'Experience the mystical beauty of Bali\'s most photographed temple perched on a rock formation.',
      photographer: 'Sarah Chen',
      featured: true
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
      alt: 'Kerala Backwaters',
      destination: 'Alleppey Backwaters',
      country: 'Kerala, India',
      rating: 4.7,
      reviewCount: 1923,
      duration: '5 days',
      groupSize: '6-10',
      price: 899,
      category: 'beach',
      tags: ['backwaters', 'houseboat', 'serene', 'nature'],
      description: 'Cruise through tranquil backwaters on traditional houseboats surrounded by lush greenery.',
      photographer: 'Raj Patel',
      featured: true
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Maldives Luxury Resort',
      destination: 'Overwater Villa',
      country: 'Maldives',
      rating: 4.9,
      reviewCount: 3421,
      duration: '4 days',
      groupSize: '2-4',
      price: 2199,
      category: 'luxury',
      tags: ['overwater', 'luxury', 'romance', 'pristine'],
      description: 'Ultimate luxury experience in overwater villas with crystal clear lagoons and world-class service.',
      photographer: 'Maria Santos',
      featured: true
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1544366503-4b6dcd1e4bc4?w=800&h=600&fit=crop',
      alt: 'Thailand Mountain Adventure',
      destination: 'Chiang Mai Hills',
      country: 'Thailand',
      rating: 4.6,
      reviewCount: 1567,
      duration: '8 days',
      groupSize: '10-15',
      price: 1099,
      category: 'adventure',
      tags: ['mountains', 'trekking', 'adventure', 'culture'],
      description: 'Embark on thrilling mountain adventures through Northern Thailand\'s pristine landscapes.',
      photographer: 'Alex Kim',
      featured: false
    },
    {
      id: '5',
      src: 'https://images.unsplash.com/photo-1539650116574-75c0c6d0d765?w=800&h=600&fit=crop',
      alt: 'Bali Rice Terraces',
      destination: 'Jatiluwih Rice Terraces',
      country: 'Ubud, Bali',
      rating: 4.8,
      reviewCount: 2156,
      duration: '6 days',
      groupSize: '8-12',
      price: 1199,
      category: 'culture',
      tags: ['rice terraces', 'unesco', 'cultural', 'photography'],
      description: 'Witness the stunning beauty of UNESCO World Heritage rice terraces in the heart of Bali.',
      photographer: 'David Wong',
      featured: false
    },
    {
      id: '6',
      src: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop',
      alt: 'Kerala Tea Plantations',
      destination: 'Munnar Tea Gardens',
      country: 'Munnar, Kerala',
      rating: 4.5,
      reviewCount: 987,
      duration: '4 days',
      groupSize: '6-8',
      price: 699,
      category: 'mountain',
      tags: ['tea plantations', 'hills', 'peaceful', 'scenic'],
      description: 'Explore the rolling hills of Munnar covered in emerald green tea plantations.',
      photographer: 'Priya Sharma',
      featured: false
    },
    {
      id: '7',
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      alt: 'Maldives Sunset Villa',
      destination: 'Sunset Water Villa',
      country: 'Maldives',
      rating: 4.9,
      reviewCount: 2789,
      duration: '7 days',
      groupSize: '2-6',
      price: 2599,
      category: 'luxury',
      tags: ['sunset', 'villa', 'romantic', 'exclusive'],
      description: 'Experience breathtaking sunsets from your private overwater villa in paradise.',
      photographer: 'Elena Rodriguez',
      featured: true
    },
    {
      id: '8',
      src: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=600&fit=crop',
      alt: 'Bangkok Street Culture',
      destination: 'Bangkok Markets',
      country: 'Bangkok, Thailand',
      rating: 4.7,
      reviewCount: 1834,
      duration: '3 days',
      groupSize: '8-15',
      price: 599,
      category: 'city',
      tags: ['street food', 'markets', 'culture', 'vibrant'],
      description: 'Immerse yourself in the vibrant street culture and culinary delights of Bangkok.',
      photographer: 'Tommy Lee',
      featured: false
    }
  ];

  const filterOptions = [
    { value: "all", label: "All Destinations" },
    { value: "beach", label: "Beach & Islands" },
    { value: "mountain", label: "Mountains" },
    { value: "culture", label: "Cultural Sites" },
    { value: "city", label: "City Tours" },
    { value: "adventure", label: "Adventure" },
  ];

  const filteredImages =
    activeFilter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  // useEffect(() => {
  //   const timer = setTimeout(() => setIsLoading(false), 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  const navigateImage = (dir: "prev" | "next") => {
    if (!selectedImage) return;
    const index = filteredImages.findIndex((img) => img.id === selectedImage.id);
    const newIndex =
      dir === "next"
        ? (index + 1) % filteredImages.length
        : (index - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header remains unchanged */}

      <main className="container mx-auto px-4 py-20">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground text-center mb-6">
          Photo Gallery
        </h1>

        <FilterBar options={filterOptions} active={activeFilter} onChange={setActiveFilter} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((img, i) => (
            <GalleryCard key={img.id} image={img} index={i} onClick={() => setSelectedImage(img)} />
          ))}
        </div>
      </main>

      {selectedImage && (
        <LightboxModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onPrev={() => navigateImage("prev")}
          onNext={() => navigateImage("next")}
        />
      )}
      <Header/>
    </div>
  );
}
