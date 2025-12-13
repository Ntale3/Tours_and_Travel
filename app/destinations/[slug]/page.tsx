'use client'
import React, { useState, useEffect } from 'react';
import Image from "next/image"
import Link from "next/link"
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowLeft,
  Star,
  Check,
  Phone,
  AlertCircle,
  Loader2,
  User
} from 'lucide-react';
import { redirect, useParams } from 'next/navigation';
import { $destinationStore, fetchDestinationDetails,refreshCurrentDestination } from '@/store/destinations.store';
import {DeleteReview,createReviews,updateReview} from "@/store/review.store"
import { useHydration } from '@/hooks/useHydration';
import { Button } from '@/components/ui/button';
import { bookings$, createBooking } from '@/store/bookings.store';
import {auth$} from "@/store/auth.store"

interface Review {
  id: number;
  user_id: number;
  destination_id: number;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string | null;
  created_at?: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
  };
}
interface BookingFormData {
  destination_id: number;
  number_of_travelers: number;
  trip_date_start: string;
  trip_date_end: string;
  phone_number: string;
  currency: 'EUR' | 'USD' | 'UGX' | 'GBP';
}

const DestinationDetailPage: React.FC = () => {
  const {isAuthenticated,user} = auth$.get();

  const params = useParams().slug as string;
  const destinationId = parseInt(params)

  const {isLoading:Loading,error} =bookings$.get();

  //const [destination, setDestination] = useState<Destination | null>(null);
  const {currentDestination:destination,isLoading} = $destinationStore.get();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const [reviewFormData, setReviewFormData] = useState({
    rating: 5 as 1 | 2 | 3 | 4 | 5,
    comment: ''
  });
  const [reviewErrors, setReviewErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<BookingFormData>({
    destination_id: 0,
    number_of_travelers: 1,
    trip_date_start: '',
    trip_date_end: '',
    phone_number: '',
    currency: 'EUR'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchDestination=async()=>{
      await fetchDestinationDetails(destinationId)


    }
    fetchDestination();

    setTimeout(() => {
      setFormData(prev => ({ ...prev, destination_id: destination!.id }));

    }, 100);
  }, [destinationId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatCurrency = (amount: number, currency: string = 'UGX') => {
    const symbols: Record<string, string> = {
      UGX: 'UGX',
      USD: '$',
      EUR: '€',
      GBP: '£'
    };
    return `${symbols[currency]} ${amount.toLocaleString()}`;
  };

  const normalizePhoneNumber = (phone: string): string => {
    let cleaned = phone.replace(/\D/g, '');

    if (cleaned.startsWith('0')) {
      cleaned = '256' + cleaned.substring(1);
    } else if (!cleaned.startsWith('256')) {
      cleaned = '256' + cleaned;
    }

    return cleaned;
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (formData.number_of_travelers < 1) {
      errors.number_of_travelers = 'Must have at least 1 traveler';
    }

    if (destination && formData.number_of_travelers > destination.max_capacity) {
      errors.number_of_travelers = `Maximum ${destination.max_capacity} travelers allowed`;
    }

    if (!formData.trip_date_start) {
      errors.trip_date_start = 'Start date is required';
    }

    if (!formData.trip_date_end) {
      errors.trip_date_end = 'End date is required';
    }

    if (formData.trip_date_start && formData.trip_date_end) {
      const start = new Date(formData.trip_date_start);
      const end = new Date(formData.trip_date_end);

      if (end <= start) {
        errors.trip_date_end = 'End date must be after start date';
      }
    }

    if (!formData.phone_number) {
      errors.phone_number = 'Phone number is required';
    } else {
      const normalized = normalizePhoneNumber(formData.phone_number);
      if (normalized.length < 12) {
        errors.phone_number = 'Invalid phone number';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };





  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    const bookingData = {
      ...formData,
      phone_number: normalizePhoneNumber(formData.phone_number)
    };

    try {
      if(!isAuthenticated){
        window.alert("sign in to Book destination.")
        redirect('/sign-in')

      }
      await createBooking(bookingData)

      if(!Loading && error===null){
        setBookingSuccess(true);
      }

       setShowBookingForm(false);

      setFormData({
        destination_id: destination?.id || 0,
        number_of_travelers: 1,
        trip_date_start: '',
        trip_date_end: '',
        phone_number: '',
        currency: 'EUR'
      });
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateReview = (): boolean => {
    const errors: Record<string, string> = {};

    if (!reviewFormData.rating) {
      errors.rating = 'Please select a rating';
    }

    if (reviewFormData.comment && reviewFormData.comment.length > 1000) {
      errors.comment = 'Comment must be less than 1000 characters';
    }

    setReviewErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitReview = async () => {
    if(!isAuthenticated){
        window.alert("UnAuthenticated User!")
        redirect('/sign-in')

      }
    if (!validateReview()) return;

    setIsSubmittingReview(true);

    try {
      if (editingReview) {

         await updateReview(reviewFormData,destination!.id,editingReview.id);
         await refreshCurrentDestination();
      } else {
         await createReviews(reviewFormData,destination!.id);
         await refreshCurrentDestination();
      }


      setReviewSuccess(true);
      setShowReviewForm(false);
      setEditingReview(null);
      setReviewFormData({ rating: 5, comment: '' });

      // Refresh destination to get updated reviews
      // await fetchDestinationBySlug(destinationSlug);

      setTimeout(() => setReviewSuccess(false), 5000);
    } catch (error) {
      console.error('Review submission error:', error);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setReviewFormData({
      rating: review.rating,
      comment: review.comment || ''
    });
    setShowReviewForm(true);
  };

  const handleDeleteReview = async (reviewId: number) => {
    if(!isAuthenticated){
        window.alert("unAuthorised..")
        redirect('/sign-in')

      }
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
       await DeleteReview(reviewId,destination!.id);
       await refreshCurrentDestination()

    } catch (error) {
      console.error('Delete review error:', error);
    }
  };

  const formatRelativeTime = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return formatDate(dateString);
  };

  const renderStars = (rating: number, interactive: boolean = false, onRate?: (rating: 1 | 2 | 3 | 4 | 5) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRate && onRate(star as 1 | 2 | 3 | 4 | 5)}
            disabled={!interactive}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-all`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-border'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (!useHydration()) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading destination...</p>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Destination not found</h2>
          <p className="text-muted-foreground mb-6">The destination you're looking for doesn't exist.</p>
          <Link href="/destinations">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all">
              Back to Destinations
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/destinations">
            <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Destinations</span>
            </button>
          </Link>

          <Button
            onClick={() => setShowBookingForm(true)}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all font-semibold"
          >
            Book Now
          </Button>
        </div>
      </div>

      {/* Success Message */}
      {bookingSuccess && (
        <div className="max-w-7xl mx-auto px-6 mt-6">
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3">
            <Check className="w-5 h-5 text-green-500" />
            <p className="text-green-700 dark:text-green-400 font-medium">
              Booking submitted successfully! Check your email for confirmation.
            </p>
          </div>
        </div>
      )}

      {reviewSuccess && (
        <div className="max-w-7xl mx-auto px-6 mt-6">
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3">
            <Check className="w-5 h-5 text-green-500" />
            <p className="text-green-700 dark:text-green-400 font-medium">
              {editingReview ? 'Review updated successfully!' : 'Review submitted successfully!'}
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-border h-[500px]">
                <Image
                  src={destination.images[selectedImage].url}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
              </div>

              {destination.images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {destination.images.map((image, index) => (
                    <button
                      key={image.public_id}
                      onClick={() => setSelectedImage(index)}
                      className={`relative rounded-lg overflow-hidden border-2 transition-all h-24 ${
                        selectedImage === index
                          ? 'border-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={`${destination.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Badge */}
            <div className="flex items-center gap-3">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                {destination.category}
              </span>
              {destination.average_rating && destination.reviews_count && (
                <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-foreground">{destination.average_rating.toFixed(1)}</span>
                  <span className="text-muted-foreground text-sm">({destination.reviews_count} reviews)</span>
                </div>
              )}
            </div>

            {/* Title & Location */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {destination.name}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground text-lg">
                <MapPin className="w-5 h-5" />
                <span>{destination.location}, {destination.country}</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">About this destination</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {destination.description}
              </p>
            </div>

            {/* Amenities */}
            {destination.amenities && destination.amenities.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Amenities & Activities</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {destination.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span className="text-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Reviews ({destination.reviews_count || 0})
                </h2>
                <button
                  onClick={() => {
                    setEditingReview(null);
                    setReviewFormData({ rating: 5, comment: '' });
                    setShowReviewForm(true);
                  }}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-all font-medium text-sm"
                >
                  Write a Review
                </button>
              </div>

              {destination.reviews_count  ? (
                <div className="space-y-6">
                  {destination.reviews.map((review) => (
                    <div key={review.id} className="border-b border-border last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">
                              {review.user.first_name} {review.user.last_name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              {renderStars(review.rating)}
                              <span className="text-sm text-muted-foreground">
                                {formatRelativeTime(review.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Show edit/delete for user's own review */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditReview(review)}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            title="Edit review"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteReview(review.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            title="Delete review"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                      </div>

                      {review.comment && (
                        <p className="text-foreground leading-relaxed ml-13">
                          {review.comment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No reviews yet. Be the first to review this destination!</p>
                  <button
                    onClick={() => {
                      setEditingReview(null);
                      setReviewFormData({ rating: 5, comment: '' });
                      setShowReviewForm(true);
                    }}
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-all font-medium"
                  >
                    Write the First Review
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 space-y-6">
              <div>
                <p className="text-muted-foreground text-sm mb-2">Price per person</p>
                <p className="text-3xl font-bold text-foreground">
                  {formatCurrency(destination.price_per_person, formData.currency)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  + {formatCurrency(destination.booking_fee, formData.currency)} booking fee
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm">Duration</span>
                  </div>
                  <span className="font-semibold text-foreground">{destination.duration_days} days</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-5 h-5" />
                    <span className="text-sm">Max capacity</span>
                  </div>
                  <span className="font-semibold text-foreground">{destination.max_capacity} people</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm">Available dates</span>
                  </div>
                </div>
                <div className="bg-background rounded-lg p-3">
                  <p className="text-sm text-foreground font-medium">
                    {formatDate(destination.start_date)}
                  </p>
                  <p className="text-xs text-muted-foreground">to</p>
                  <p className="text-sm text-foreground font-medium">
                    {formatDate(destination.end_date)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowBookingForm(true)}
                className="w-full bg-primary text-primary-foreground py-4 rounded-lg hover:bg-primary/90 transition-all font-semibold text-lg"
              >
                Book Your Trip
              </button>

              <p className="text-xs text-muted-foreground text-center">
                You won't be charged yet. Review your booking details before confirming.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Book Your Trip</h2>
              <button
                onClick={() => setShowBookingForm(false)}
                className="text-muted-foreground hover:text-foreground transition-colors text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Number of Travelers */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Number of Travelers *
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, number_of_travelers: Math.max(1, prev.number_of_travelers - 1) }))}
                    className="bg-secondary text-secondary-foreground w-10 h-10 rounded-lg hover:bg-secondary/80 transition-all font-semibold"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={formData.number_of_travelers}
                    onChange={(e) => setFormData(prev => ({ ...prev, number_of_travelers: parseInt(e.target.value) || 1 }))}
                    className="flex-1 bg-input border border-border rounded-lg px-4 py-2 text-center text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    min="1"
                    max={destination.max_capacity}
                  />
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, number_of_travelers: Math.min(destination.max_capacity, prev.number_of_travelers + 1) }))}
                    className="bg-secondary text-secondary-foreground w-10 h-10 rounded-lg hover:bg-secondary/80 transition-all font-semibold"
                  >
                    +
                  </button>
                </div>
                {formErrors.number_of_travelers && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {formErrors.number_of_travelers}
                  </p>
                )}
              </div>

              {/* Trip Dates */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.trip_date_start}
                    onChange={(e) => setFormData(prev => ({ ...prev, trip_date_start: e.target.value }))}
                    className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {formErrors.trip_date_start && (
                    <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {formErrors.trip_date_start}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={formData.trip_date_end}
                    onChange={(e) => setFormData(prev => ({ ...prev, trip_date_end: e.target.value }))}
                    className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {formErrors.trip_date_end && (
                    <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {formErrors.trip_date_end}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number *
                </label>
                <div className="flex gap-2">
                  <div className="bg-secondary border border-border rounded-lg px-4 py-2 flex items-center">
                    <Phone className="w-4 h-4 text-muted-foreground mr-2" />
                    <span className="text-foreground font-medium">+256</span>
                  </div>
                  <input
                    type="tel"
                    value={formData.phone_number}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
                    placeholder="700123456"
                    className="flex-1 bg-input border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Enter your phone number (we'll add +256 automatically)
                </p>
                {formErrors.phone_number && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {formErrors.phone_number}
                  </p>
                )}
              </div>

              {/* Currency */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value as any }))}
                  className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="UGX">UGX - Ugandan Shilling</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>

              {/* Price Summary */}
              <div className="bg-background border border-border rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {formatCurrency(destination.price_per_person, formData.currency)} × {formData.number_of_travelers} travelers
                  </span>
                  <span className="text-foreground font-medium">
                    {formatCurrency(destination.price_per_person * formData.number_of_travelers, formData.currency)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Booking fee</span>
                  <span className="text-foreground font-medium">
                    {formatCurrency(destination.booking_fee, formData.currency)}
                  </span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-foreground text-lg">
                    {formatCurrency(destination.price_per_person * formData.number_of_travelers, formData.currency)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-4 rounded-lg hover:bg-primary/90 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-lg w-full">
            <div className="border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {editingReview ? 'Edit Your Review' : 'Write a Review'}
              </h2>
              <button
                onClick={() => {
                  setShowReviewForm(false);
                  setEditingReview(null);
                  setReviewFormData({ rating: 5, comment: '' });
                  setReviewErrors({});
                }}
                className="text-muted-foreground hover:text-foreground transition-colors text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Your Rating *
                </label>
                <div className="flex items-center gap-2">
                  {renderStars(reviewFormData.rating, true, (rating) => {
                    setReviewFormData(prev => ({ ...prev, rating }));
                    setReviewErrors(prev => ({ ...prev, rating: '' }));
                  })}
                  <span className="text-foreground font-semibold ml-2">
                    {reviewFormData.rating} {reviewFormData.rating === 1 ? 'star' : 'stars'}
                  </span>
                </div>
                {reviewErrors.rating && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {reviewErrors.rating}
                  </p>
                )}
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Review (Optional)
                </label>
                <textarea
                  value={reviewFormData.comment}
                  onChange={(e) => {
                    setReviewFormData(prev => ({ ...prev, comment: e.target.value }));
                    setReviewErrors(prev => ({ ...prev, comment: '' }));
                  }}
                  placeholder="Share your experience with this destination..."
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  rows={6}
                  maxLength={1000}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-muted-foreground">
                    Maximum 1000 characters
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {reviewFormData.comment.length}/1000
                  </p>
                </div>
                {reviewErrors.comment && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {reviewErrors.comment}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowReviewForm(false);
                    setEditingReview(null);
                    setReviewFormData({ rating: 5, comment: '' });
                    setReviewErrors({});
                  }}
                  className="flex-1 bg-secondary text-secondary-foreground py-3 rounded-lg hover:bg-secondary/80 transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={isSubmittingReview}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmittingReview ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    editingReview ? 'Update Review' : 'Submit Review'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationDetailPage;