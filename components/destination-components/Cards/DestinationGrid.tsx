'use client'
import { DestinationCard } from './DestinationCard';
import { Destination } from '@/types';

interface DestinationGridProps {
  destinations: Destination[];
}

export const DestinationGrid: React.FC<DestinationGridProps> = ({ destinations }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {destinations.map((destination) => (
        <DestinationCard key={destination.id} destination={destination} />
      ))}
    </div>
  );
};

