import { AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  hasActiveFilters: boolean|string;
  onClearFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ hasActiveFilters, onClearFilters }) => {
  return (
    <div className="text-center py-20">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-2">No destinations found</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {hasActiveFilters
          ? "We couldn't find any destinations matching your criteria. Try adjusting your filters or search terms."
          : "No destinations are currently available. Please check back later."}
      </p>
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all font-medium"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};