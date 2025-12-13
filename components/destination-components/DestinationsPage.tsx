'use client'

import { useState, useEffect } from 'react';
import Header from "@/components/Header"
import { observer } from '@legendapp/state/react';
import { HeroSection } from '@/components/destination-components/hero/HeroSection';
import { CategoryFilters } from '@/components/destination-components/filters/CategoryFilters';
import { AdvancedFilters } from '@/components/destination-components/filters/AdvancedFilters';
import { DestinationGrid } from '@/components/destination-components/Cards/DestinationGrid';
import { EmptyState } from '@/components/destination-components/Cards/EmptyState';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useDestinationFilters } from '@/hooks/useDestinationFilters';
import { CategoryType } from '@/types';
import {useHydration} from "@/hooks/useHydration"
import { $destinationStore, fetchDestinations } from '@/store/destinations.store';
import { Loader2 } from 'lucide-react';
import { ReusablePagination } from '../pagination';
import { useRouter, useSearchParams } from 'next/navigation';


const DestinationsPage = observer(() => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const isHydrated = useHydration();
  const {destinationsMeta} = $destinationStore.get();
  const [showFilters, setShowFilters] = useState(false);
  const {
    filteredDestinations,
    filters,
    updateSearchTerm,
    updateActiveCategory,
    updateDateRange,
    updatePriceRange,
    clearFilters,
    hasActiveFilters
  } = useDestinationFilters();

  const categories: CategoryType[] = [
    { id: 'all', name: 'All Destinations', icon: 'Globe' },
    { id: 'Tropical paradise', name: 'Tropical Paradise', icon: 'Camera' },
    { id: 'Adventure', name: 'Adventure', icon: 'MapPin' },
    { id: 'Cultural', name: 'Cultural', icon: 'Heart' },
    { id: 'Luxury', name: 'Luxury', icon: 'Plane' }
  ];


   if(!isHydrated)
    {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading destination...</p>
        </div>
      </div>
      )
    }


  const isLoading = $destinationStore.isLoading.get();
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };





  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        searchTerm={filters.searchTerm}
        onSearchChange={updateSearchTerm}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <CategoryFilters
          categories={categories}
          activeCategory={filters.activeCategory}
          onCategoryChange={updateActiveCategory}
        />

        {showFilters && (
          <AdvancedFilters
            dateRange={filters.dateRange}
            priceRange={filters.priceRange}
            onDateRangeChange={updateDateRange}
            onPriceRangeChange={updatePriceRange}
            onClose={() => setShowFilters(false)}
            onClearAll={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        )}

        {/* Fixed: Only show count after client mount */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {isLoading ? (
              'Loading destinations...'
            ) : (
              <>
                <span className="font-semibold text-foreground">
                  {filteredDestinations.length}
                </span>
              </>
            )}
          </p>
        </div>

        {isLoading && (
          <LoadingSpinner message='Loading your favorite Destinations.......' />
        )}

        {!isLoading && filteredDestinations.length > 0 && (
          <DestinationGrid destinations={filteredDestinations} />
        )}

        {!isLoading && filteredDestinations.length === 0 && (
          <EmptyState
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
          />
        )}
      </div>
      <ReusablePagination paginatedDataName='Destinations'
      onPageChange={handlePageChange} meta={destinationsMeta}/>
      <Header/>
    </div>
  );
});

export default DestinationsPage;