'use client'
import { Search, Filter } from 'lucide-react';
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export const SearchBar= ({
  value,
  onChange,
  showFilters,
  onToggleFilters
}:SearchBarProps ) => {
  return (
    <div className="relative max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
      <input
        type="text"
        placeholder="Search destinations, locations, or activities..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-card border border-border rounded-full py-4 pl-12 pr-32 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring shadow-lg"
      />
      <button
        onClick={onToggleFilters}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-all flex items-center gap-2 font-medium"
      >
        <Filter className="w-4 h-4" />
        Filters
      </button>
    </div>
  );
};
