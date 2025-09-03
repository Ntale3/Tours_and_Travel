'use client'
import { useState } from "react";
import Header from "@/components/Header";
import DestinationCard from "@/components/DestinationCard";
import CategoryFilters from "@/components/destination-components/CategoriesFilters";
import SearchBar from "@/components/destination-components/SearchBar";
import { DestinationType,categoryType } from '@/types'






const Destinations = ({destinations,categories}:{destinations:DestinationType[],categories:categoryType[]}) => {

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [favorites, setFavorites] = useState<Set<number>>(new Set());

      const toggleFavorite = (id: number) => {
        setFavorites((prev) => {
          const updated = new Set(prev);
          if(updated.has(id)){
            updated.delete(id)
          }else{
            updated.add(id);
          }
          return updated;
        });
      };

      const filteredDestinations = destinations.filter(
        (d) =>
          (selectedCategory === "all" || d.category === selectedCategory) &&
          (d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.location.toLowerCase().includes(searchQuery.toLowerCase()))
      );





  return (
    <div className="bg-background">
      <div className="relative px-6 py-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-8xl font-bold text-foreground my-6 tracking-tight">DESTINATIONS</h1>
          <p className="text-xl text-foreground mb-8 max-w-2xl mx-auto">
            Explore breathtaking tropical destinations around the world
          </p>

          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <CategoryFilters
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((d) => (
            <DestinationCard
              key={d.id}
              destination={d}
              isFavorite={favorites.has(d.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    <Header/>
    </div>
  )
}

export default Destinations