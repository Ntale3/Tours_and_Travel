'use client'
import { X, Calendar, DollarSign } from 'lucide-react';
import { DateRange, PriceRange } from '@/types';

interface AdvancedFiltersProps {
  dateRange: DateRange;
  priceRange: PriceRange;
  onDateRangeChange: (range: DateRange) => void;
  onPriceRangeChange: (range: PriceRange) => void;
  onClose: () => void;
  onClearAll: () => void;
  hasActiveFilters: boolean|string;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  dateRange,
  priceRange,
  onDateRangeChange,
  onPriceRangeChange,
  onClose,
  onClearAll,
  hasActiveFilters
}) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 mb-8 animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-foreground">Advanced Filters</h3>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            <Calendar className="w-4 h-4 inline mr-2" />
            Travel Dates
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">From</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">To</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            <DollarSign className="w-4 h-4 inline mr-2" />
            Price Range (UGX)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Min</label>
              <input
                type="number"
                placeholder="0"
                value={priceRange.min}
                onChange={(e) => onPriceRangeChange({ ...priceRange, min: e.target.value })}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Max</label>
              <input
                type="number"
                placeholder="200000"
                value={priceRange.max}
                onChange={(e) => onPriceRangeChange({ ...priceRange, max: e.target.value })}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};