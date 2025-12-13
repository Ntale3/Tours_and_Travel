'use client'
import { Globe, Camera, MapPin, Heart, Plane } from 'lucide-react';
import { CategoryType } from '@/types';

interface CategoryFiltersProps {
  categories: CategoryType[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const iconMap: Record<string, any> = {
  Globe,
  Camera,
  MapPin,
  Heart,
  Plane
};

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Globe;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className="flex justify-center gap-3 mb-8 flex-wrap">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
            activeCategory === category.id
              ? 'bg-primary text-primary-foreground shadow-lg'
              : 'bg-card text-foreground hover:bg-accent border border-border'
          }`}
        >
          {getIcon(category.icon)}
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};