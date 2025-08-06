'use client'
import React, { useState, useEffect } from 'react';
import { MapPin, Star, Calendar, Phone, Check, X, Heart, Share2 } from 'lucide-react';
import Header from '@/components/Header';

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  numberOfPeople: number;
  checkIn: string;
  checkOut: string;
  paymentMethod: 'mtn' | 'airtel' | '';
}

const DestinationPage = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    numberOfPeople: 2,
    checkIn: '',
    checkOut: '',
    paymentMethod: ''
  });

  const images = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=1200&h=800&fit=crop'
  ];

  const features = [
    'Private Beach Access',
    'Infinity Pool',
    'Spa & Wellness Center',
    'Local Cultural Tours',
    'Gourmet Dining',
    'Water Sports Activities'
  ];

  const reviews = [
    { name: 'Sarah Johnson', rating: 5, comment: 'Absolutely breathtaking! The perfect tropical escape.' },
    { name: 'Mike Chen', rating: 5, comment: 'Crystal clear waters and amazing hospitality.' },
    { name: 'Emma Wilson', rating: 4, comment: 'Beautiful location, great value for money.' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingStep === 1) {
      setBookingStep(2);
    } else {
      // Process booking
      alert(`Booking confirmed! Payment method: ${bookingForm.paymentMethod.toUpperCase()}`);
      setIsBookingOpen(false);
      setBookingStep(1);
    }
  };

  const totalPrice = bookingForm.numberOfPeople * 150; // $150 per person per night

  return (
    <div>
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 z-10"></div>

        {/* Image Carousel */}
        <div className="relative h-full">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
              Bali Paradise
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-50">
              Discover the ultimate tropical escape in Indonesia's crown jewel
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-1">
                <MapPin className="w-5 h-5" />
                <span>Ubud, Bali</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2">4.9 (324 reviews)</span>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Book Now - From $150/night
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-4 rounded-full transition-all duration-300 ${
                  isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-4 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Details Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Experience Paradise
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Immerse yourself in the enchanting beauty of Bali, where ancient temples meet pristine beaches,
                and lush rice terraces cascade down volcanic slopes. Our exclusive resort offers the perfect blend
                of luxury and authentic Balinese culture.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 text-center">Package Includes</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Luxury Accommodation</span>
                    <span className="font-semibold">✓</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Daily Breakfast</span>
                    <span className="font-semibold">✓</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Airport Transfer</span>
                    <span className="font-semibold">✓</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cultural Tour Guide</span>
                    <span className="font-semibold">✓</span>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total per person/night</span>
                      <span className="text-emerald-600">$150</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12">What Our Guests Say</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{review.comment}"</p>
                  <p className="font-semibold text-emerald-600">- {review.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">
                  {bookingStep === 1 ? 'Book Your Stay' : 'Payment Details'}
                </h2>
                <button
                  onClick={() => {
                    setIsBookingOpen(false);
                    setBookingStep(1);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    bookingStep >= 1 ? 'bg-emerald-500 text-white' : 'bg-gray-200'
                  }`}>
                    1
                  </div>
                  <div className={`w-16 h-1 ${bookingStep >= 2 ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    bookingStep >= 2 ? 'bg-emerald-500 text-white' : 'bg-gray-200'
                  }`}>
                    2
                  </div>
                </div>
              </div>

              <div>
                {bookingStep === 1 ? (
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          placeholder="+256 700 000 000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Number of People *
                        </label>
                        <select
                          value={bookingForm.numberOfPeople}
                          onChange={(e) => setBookingForm({...bookingForm, numberOfPeople: parseInt(e.target.value)})}
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        >
                          {[1,2,3,4,5,6,7,8].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Check-in Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={bookingForm.checkIn}
                          onChange={(e) => setBookingForm({...bookingForm, checkIn: e.target.value})}
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Check-out Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={bookingForm.checkOut}
                          onChange={(e) => setBookingForm({...bookingForm, checkOut: e.target.value})}
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className="bg-emerald-50 p-6 rounded-xl">
                      <h4 className="font-semibold mb-4">Booking Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Price per person/night:</span>
                          <span>$150</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Number of people:</span>
                          <span>{bookingForm.numberOfPeople}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                          <span>Total per night:</span>
                          <span className="text-emerald-600">${totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold mb-4">Booking Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Name:</span>
                          <p className="font-semibold">{bookingForm.name}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">People:</span>
                          <p className="font-semibold">{bookingForm.numberOfPeople}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Check-in:</span>
                          <p className="font-semibold">{bookingForm.checkIn}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Check-out:</span>
                          <p className="font-semibold">{bookingForm.checkOut}</p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-4">
                        Select Payment Method *
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setBookingForm({...bookingForm, paymentMethod: 'mtn'})}
                          className={`p-6 border-2 rounded-xl transition-all duration-300 ${
                            bookingForm.paymentMethod === 'mtn'
                              ? 'border-yellow-500 bg-yellow-50'
                              : 'border-gray-200 hover:border-yellow-300'
                          }`}
                        >
                          <div className="text-center">
                            <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
                              MTN
                            </div>
                            <p className="font-semibold">MTN Mobile Money</p>
                            <p className="text-sm text-gray-600">Pay with MTN MoMo</p>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setBookingForm({...bookingForm, paymentMethod: 'airtel'})}
                          className={`p-6 border-2 rounded-xl transition-all duration-300 ${
                            bookingForm.paymentMethod === 'airtel'
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-red-300'
                          }`}
                        >
                          <div className="text-center">
                            <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold">
                              <Phone className="w-8 h-8" />
                            </div>
                            <p className="font-semibold">Airtel Money</p>
                            <p className="text-sm text-gray-600">Pay with Airtel Money</p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Total Amount */}
                    <div className="bg-emerald-50 p-6 rounded-xl">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total Amount to Pay:</span>
                        <span className="text-emerald-600">${totalPrice}/night</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        You'll be redirected to {bookingForm.paymentMethod.toUpperCase()} to complete payment
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  {bookingStep === 2 && (
                    <button
                      type="button"
                      onClick={() => setBookingStep(1)}
                      className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleBookingSubmit}
                    disabled={bookingStep === 2 && !bookingForm.paymentMethod}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-gray-300 disabled:to-gray-300 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100"
                  >
                    {bookingStep === 1 ? 'Continue to Payment' : 'Confirm Booking'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsBookingOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-40"
      >
        <Calendar className="w-6 h-6" />
      </button>

    </div>
    <Header/>
  </div>
  );
};

export default DestinationPage;