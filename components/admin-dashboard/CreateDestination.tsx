'use client';

import { useState, ChangeEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  MapPin,
  Loader2,
  Calendar,
  Users,
  DollarSign,
  ImagePlus,
  X,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import {createDestination, fetchDestinations } from '@/store/destinations.store';


interface DestinationFormData {
  name: string;
  description: string;
  category: string;
  location: string;
  country: string;
  price_per_person: string;
  booking_fee: string;
  max_capacity: string;
  start_date: string;
  end_date: string;
  duration_days: string;
  is_active: boolean;
}

// Create Destination Dialog Component
export function CreateDestinationDialog({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<DestinationFormData>({
    name: '',
    description: '',
    category: '',
    location: '',
    country: '',
    price_per_person: '',
    booking_fee: '',
    max_capacity: '',
    start_date: '',
    end_date: '',
    duration_days: '',
    is_active: true
  });

  const [amenities, setAmenities] = useState<string[]>([]);
  const [currentAmenity, setCurrentAmenity] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleAddAmenity = () => {
    if (currentAmenity.trim() && !amenities.includes(currentAmenity.trim())) {
      setAmenities(prev => [...prev, currentAmenity.trim()]);
      setCurrentAmenity('');
    }
  };

  const handleRemoveAmenity = (amenity: string) => {
    setAmenities(prev => prev.filter(a => a !== amenity));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const filesArray = Array.from(files);
    setImages(prev => [...prev, ...filesArray]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Create FormData to handle file uploads
      const formDataToSend = new FormData();

      // Append basic fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('country', formData.country);
      formDataToSend.append('price_per_person', formData.price_per_person);
      formDataToSend.append('max_capacity', formData.max_capacity);
      formDataToSend.append('start_date', formData.start_date);
      formDataToSend.append('end_date', formData.end_date);
      formDataToSend.append('duration_days', formData.duration_days);
      formDataToSend.append('is_active', formData.is_active ? '1' : '0');

      if (formData.booking_fee) {
        formDataToSend.append('booking_fee', formData.booking_fee);
      }

      // Append amenities as array
      amenities.forEach((amenity, index) => {
        formDataToSend.append(`amenities[${index}]`, amenity);
      });

      // Append all images as array
      images.forEach((image, index) => {
        formDataToSend.append(`images[${index}]`, image);
      });

      await createDestination(formDataToSend);
      await fetchDestinations();

      toast.success("Destination created successfully!", {
        description: `${formData.name} has been added.`,
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        category: '',
        location: '',
        country: '',
        price_per_person: '',
        booking_fee: '',
        max_capacity: '',
        start_date: '',
        end_date: '',
        duration_days: '',
        is_active: true
      });
      setAmenities([]);
      setImages([]);
      setCurrentAmenity('');

      setOpen(false);

    } catch (error) {
      console.error('Error creating destination:', error);
      toast.error("Failed to create destination", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to discard this destination?')) {
      setFormData({
        name: '',
        description: '',
        category: '',
        location: '',
        country: '',
        price_per_person: '',
        booking_fee: '',
        max_capacity: '',
        start_date: '',
        end_date: '',
        duration_days: '',
        is_active: true
      });
      setAmenities([]);
      setImages([]);
      setCurrentAmenity('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Destination
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Destination</DialogTitle>
          <DialogDescription>
            Add a new travel destination with all the details travelers need to know
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Destination Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Bali Paradise Getaway"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={handleCategoryChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tropical paradise">Tropical Paradise</SelectItem>
                    <SelectItem value="Adventure">Adventure</SelectItem>
                    <SelectItem value="Cultural">Cultural</SelectItem>
                    <SelectItem value="Luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the destination, what makes it special, and what travelers can expect..."
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">City/Location *</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g., Ubud"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="e.g., Indonesia"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Pricing & Capacity */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Pricing & Capacity
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price_per_person">Price per Person (UGX) *</Label>
                <Input
                  id="price_per_person"
                  name="price_per_person"
                  type="number"
                  step="0.01"
                  placeholder="1500.00"
                  value={formData.price_per_person}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="booking_fee">Booking Fee (UGX)</Label>
                <Input
                  id="booking_fee"
                  name="booking_fee"
                  type="number"
                  step="0.01"
                  placeholder="50.00"
                  value={formData.booking_fee}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max_capacity">Max Capacity *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="max_capacity"
                    name="max_capacity"
                    type="number"
                    placeholder="20"
                    className="pl-9"
                    value={formData.max_capacity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dates & Duration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Dates & Duration
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date *</Label>
                <Input
                  id="start_date"
                  name="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end_date">End Date *</Label>
                <Input
                  id="end_date"
                  name="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration_days">Duration (Days) *</Label>
                <Input
                  id="duration_days"
                  name="duration_days"
                  type="number"
                  placeholder="7"
                  value={formData.duration_days}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Amenities</h3>

            <div className="flex gap-2">
              <Input
                placeholder="Add amenity (e.g., Free WiFi)"
                value={currentAmenity}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentAmenity(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddAmenity();
                  }
                }}
              />
              <Button type="button" onClick={handleAddAmenity} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {amenities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenity, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {amenity}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleRemoveAmenity(amenity)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ImagePlus className="w-5 h-5" />
              Images
            </h3>

            {/* New Images Upload */}
            <div className="space-y-2">
              <Label htmlFor="images">Upload New Images</Label>
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              <p className="text-sm text-gray-500">Upload additional images of the destination</p>
            </div>

            {images.length > 0 && (
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">New Images</Label>
                <div className="grid grid-cols-3 gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="is_active">Active Status</Label>
              <p className="text-sm text-gray-500">Make this destination available for booking</p>
            </div>
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked: boolean) => setFormData(prev => ({ ...prev, is_active: checked }))}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Destination
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}