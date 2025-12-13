'use client'

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Star,
  Edit,
  Trash2,
  Eye,
  Clock
} from 'lucide-react';
import { Destination } from '@/types';
import { EditDestinationDialog } from './EditDestinationDialog';



interface DestinationCardProps {
  destination: Destination;
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onView,
  onDelete
}) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tropical paradise':
        return 'bg-cyan-100 text-cyan-800 hover:bg-cyan-100';
      case 'Adventure':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-100';
      case 'Cultural':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      case 'Luxury':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="w-full overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Section */}
      <div className="relative w-full h-56 overflow-hidden">
        <img
          src={destination.images[0]?.url || '/placeholder.jpg'}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <Badge className={getCategoryColor(destination.category)}>
            {destination.category}
          </Badge>
          {!destination.is_active && (
            <Badge variant="destructive">Inactive</Badge>
          )}
        </div>
        {destination.average_rating && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-sm">{destination.average_rating.toFixed(1)}</span>
            {destination.reviews_count && (
              <span className="text-xs text-gray-600">({destination.reviews_count})</span>
            )}
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-xl line-clamp-1">{destination.name}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm">
          <MapPin className="w-4 h-4" />
          {destination.location}, {destination.country}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">{destination.description}</p>

        {/* Key Info Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Start Date</p>
              <p className="font-medium">{formatDate(destination.start_date)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="font-medium">{destination.duration_days} days</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Capacity</p>
              <p className="font-medium">{destination.max_capacity} people</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Price</p>
              <p className="font-medium">{formatPrice(destination.price_per_person)}</p>
            </div>
          </div>
        </div>

        {/* Amenities */}
        {destination.amenities && destination.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {destination.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {destination.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{destination.amenities.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 pt-4 border-t">
        <Button
          onClick={() => onView?.(destination.id)}
          variant="outline"
          className="flex-1"
        >
          <Eye className="w-4 h-4 mr-2" />
          View
        </Button>
         <EditDestinationDialog
          destination={destination}
          trigger={
            <Button variant="outline" className="flex-1">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          }
        />
        <Button
          onClick={() => onDelete?.(destination.id)}
          variant="destructive"
          size="icon"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};