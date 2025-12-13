// hooks/useDestinationFilters.ts
import { useState, useMemo } from 'react';
import { $destinationStore,fetchDestinations } from '@/store/destinations.store';
import { Destination, FilterState, DateRange, PriceRange } from '@/types';

  // React.useEffect(()=>{
      const fetchAllDestinatins=async ()=>{
        await fetchDestinations()
       }
       fetchAllDestinatins()
    // },[isLoading])

const destinations = $destinationStore.destinations.get();

const destinationsMeta = $destinationStore.destinationsMeta.get();


export const useDestinationFilters = () => {
  // Get destinations reactively from Legend State


  const [filters, setFilters] = useState<FilterState>({
    activeCategory: 'all',
    searchTerm: '',
    dateRange: { start: '', end: '' },
    priceRange: { min: '', max: '' }
  });

  // Filter logic with memoization for performance
  const filteredDestinations = useMemo(() => {
    if (!destinations || destinations.length === 0) {
      return [];
    }

    return destinations.filter((destination: Destination) => {
      // Category filter
      if (filters.activeCategory !== 'all' && destination.category !== filters.activeCategory) {
        return false;
      }

      // Search filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch =
          destination.name.toLowerCase().includes(searchLower) ||
          destination.location.toLowerCase().includes(searchLower) ||
          destination.country.toLowerCase().includes(searchLower) ||
          destination.description.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
      }

      // Date range filter - Start date
      if (filters.dateRange.start) {
        const destStart = new Date(destination.start_date);
        const filterStart = new Date(filters.dateRange.start);
        if (destStart < filterStart) return false;
      }

      // Date range filter - End date
      if (filters.dateRange.end) {
        const destEnd = new Date(destination.end_date);
        const filterEnd = new Date(filters.dateRange.end);
        if (destEnd > filterEnd) return false;
      }

      // Price range filter - Minimum
      if (filters.priceRange.min) {
        const minPrice = parseInt(filters.priceRange.min);
        if (!isNaN(minPrice) && destination.price_per_person < minPrice) {
          return false;
        }
      }

      // Price range filter - Maximum
      if (filters.priceRange.max) {
        const maxPrice = parseInt(filters.priceRange.max);
        if (!isNaN(maxPrice) && destination.price_per_person > maxPrice) {
          return false;
        }
      }

      return true;
    });
  }, [destinations, filters]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchTerm !== '' ||
      filters.dateRange.start !== '' ||
      filters.dateRange.end !== '' ||
      filters.priceRange.min !== '' ||
      filters.priceRange.max !== '' ||
      filters.activeCategory !== 'all'
    );
  }, [filters]);

  // Filter update functions
  const updateSearchTerm = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  const updateActiveCategory = (activeCategory: string) => {
    setFilters(prev => ({ ...prev, activeCategory }));
  };

  const updateDateRange = (dateRange: DateRange) => {
    setFilters(prev => ({ ...prev, dateRange }));
  };

  const updatePriceRange = (priceRange: PriceRange) => {
    setFilters(prev => ({ ...prev, priceRange }));
  };

  const clearFilters = () => {
    setFilters({
      activeCategory: 'all',
      searchTerm: '',
      dateRange: { start: '', end: '' },
      priceRange: { min: '', max: '' }
    });
  };

  return {
    destinations,
    filteredDestinations,
    filters,
    updateSearchTerm,
    updateActiveCategory,
    updateDateRange,
    updatePriceRange,
    clearFilters,
    hasActiveFilters,
    destinationsMeta
  };
};