'use client'
import React from 'react';
import {SearchBar} from './SearchBar';

interface HeroSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchTerm,
  onSearchChange,
  showFilters,
  onToggleFilters
}) => {
  return (
    <div className="bg-gradient-to-br from-primary/10 via-background to-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Explore breathtaking destinations across East Africa. From tropical paradises to cultural experiences.
          </p>
          <SearchBar
            value={searchTerm}
            onChange={onSearchChange}
            showFilters={showFilters}
            onToggleFilters={onToggleFilters}
          />
        </div>
      </div>
    </div>
  );
};
