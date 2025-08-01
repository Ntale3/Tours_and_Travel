'use client'
import { useEffect, useState } from "react";
import BackgroundPalms from "./BackgroundPalms";
import Header from "../Header";
import DestinationCard from "../DestinationCard";
import CategoryFilters from "./CategoriesFilters";
import SearchBar from "./SearchBar";

interface detinationType
{
id: number,
name: string,
location: string,
category: string,
image: string,
price: string,
rating: number,
reviews: number,
duration: string,
groupSize: string,
description: string,
highlights: string[],
bestTime: string
}

interface categoryType
{
 id:string,  
 name:string,
 icon?:string

}



const Destinations = ({destinations,categories}:{destinations:detinationType[],categories:categoryType[]}) => {

     const [selectedCategory, setSelectedCategory] = useState("all");
      const [searchQuery, setSearchQuery] = useState("");
      const [favorites, setFavorites] = useState<Set<number>>(new Set());
      const [isLoading, setIsLoading] = useState(true);
      
    
      useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
      }, []);
    
      const toggleFavorite = (id: number) => {
        setFavorites((prev) => {
          const updated = new Set(prev);
          updated.has(id) ? updated.delete(id) : updated.add(id);
          return updated;
        });
      };
    
      const filteredDestinations = destinations.filter(
        (d) =>
          (selectedCategory === "all" || d.category === selectedCategory) &&
          (d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.location.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    
      if (isLoading) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-lg font-medium">Discovering tropical destinations...</p>
            </div>
          </div>
        );
      }





  return (
    <div>
        <BackgroundPalms />
        <Header/>

      <div className="relative px-6 py-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-8xl font-bold text-white mb-6 tracking-tight">DESTINATIONS</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
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

    </div>
  )
}

export default Destinations