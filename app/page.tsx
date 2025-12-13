'use client'
import React, { useState } from 'react';
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Camera,
  MapPin,
  Heart,
  Plane,
  Star,
  Users,
  Calendar,
  Shield,
  Headphones,
  Award,
  Search,
  ChevronRight,
  Quote,
  CheckCircle2
} from 'lucide-react';
import Header from '@/components/Header';
import { fetchDestinations,$destinationStore} from '@/store/destinations.store';
import { fetchBlogs } from '@/store/blog.store';

interface Destination {
  id: number;
  name: string;
  slug: string;
  location: string;
  country: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  destination: string;
}

const FixicoHomePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const {isLoading} =$destinationStore.get()

  React.useEffect(()=>{
    const fetchAllDestinatins=async ()=>{
      await fetchDestinations()
      await fetchBlogs()
     }
     fetchAllDestinatins()
  },[isLoading])



  const featuredDestinations: Destination[] = [
    {
      id: 1,
      name: "Bwindi Forest National Park",
      slug: "bwindi-forest-national-park",
      location: "Kisoro",
      country: "Uganda",
      category: "Adventure",
      price: 40000,
      image: "https://res.cloudinary.com/dnimgcmap/image/upload/v1763160999/destinations/nqiffmak3wiestj93nrt.jpg",
      rating: 4.8,
      reviews: 24
    },
    {
      id: 3,
      name: "Zanzibar Island",
      slug: "zanzibar-island",
      location: "Zanzibar",
      country: "Tanzania",
      category: "Tropical Paradise",
      price: 30000,
      image: "https://res.cloudinary.com/dnimgcmap/image/upload/v1763191291/destinations/co9yqod2jregtcrxtt4m.jpg",
      rating: 4.9,
      reviews: 32
    },
    {
      id: 2,
      name: "Queen Elizabeth National Park",
      slug: "queen-elizabeth-national-park",
      location: "Kasese",
      country: "Uganda",
      category: "Adventure",
      price: 50000,
      image: "https://res.cloudinary.com/dnimgcmap/image/upload/v1763162400/destinations/txmejrtf5t5idbgmaq6n.jpg",
      rating: 4.6,
      reviews: 18
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "London, UK",
      rating: 5,
      comment: "Fixico made our dream safari a reality! The gorilla trekking experience was absolutely life-changing. Professional guides and seamless organization from start to finish.",
      avatar: "SJ",
      destination: "Bwindi Forest"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Singapore",
      rating: 5,
      comment: "Best travel booking experience ever! The team was responsive, accommodating, and truly cared about making our trip memorable. Highly recommend Fixico!",
      avatar: "MC",
      destination: "Zanzibar Island"
    },
    {
      id: 3,
      name: "Emma Williams",
      location: "New York, USA",
      rating: 5,
      comment: "From booking to the actual trip, everything was perfect. Great value for money and the destinations exceeded all expectations. Already planning our next adventure!",
      avatar: "EW",
      destination: "Queen Elizabeth Park"
    }
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Travelers" },
    { icon: MapPin, value: "50+", label: "Destinations" },
    { icon: Award, value: "10+", label: "Years Experience" },
    { icon: Star, value: "4.9", label: "Average Rating" }
  ];

  const categories = [
    { id: 'adventure', name: 'Adventure', icon: MapPin, description: 'Thrilling experiences', count: 12 },
    { id: 'tropical', name: 'Tropical Paradise', icon: Camera, description: 'Beach & islands', count: 8 },
    { id: 'cultural', name: 'Cultural', icon: Heart, description: 'Heritage tours', count: 10 },
    { id: 'luxury', name: 'Luxury', icon: Plane, description: 'Premium escapes', count: 6 }
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure Booking",
      description: "Your payments and personal information are always protected with industry-standard encryption."
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our dedicated support team is available round the clock to assist you with any queries."
    },
    {
      icon: Award,
      title: "Best Price Guarantee",
      description: "We offer competitive prices and the best value for your travel experiences."
    },
    {
      icon: CheckCircle2,
      title: "Easy Cancellation",
      description: "Flexible cancellation policies to give you peace of mind when booking your trip."
    }
  ];

  const formatCurrency = (amount: number) => {
    return `UGX ${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&h=1080&fit=crop"
            alt="Travel background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="inline-block mb-6">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
              ✨ Discover Your Next Adventure
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Explore East Africa's
            <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Hidden Wonders
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            From pristine beaches to majestic wildlife. Book unforgettable experiences with Fixico and create memories that last a lifetime.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/destinations">
              <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full hover:bg-primary/90 transition-all font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform flex items-center gap-2 group">
                Explore Destinations
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <Link href="/blogs">
              <button className="bg-card text-foreground border-2 border-border px-8 py-4 rounded-full hover:border-primary transition-all font-semibold text-lg hover:scale-105 transform">
                Read Travel Stories
              </button>
            </Link>
          </div>

          {/* Quick search hint */}
          <div className="mt-12 flex items-center justify-center gap-2 text-muted-foreground">
            <Search className="w-4 h-4" />
            <span className="text-sm">Popular: Gorilla Trekking, Beach Holidays, Safari Tours</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 text-muted-foreground rotate-90" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect adventure that matches your travel style and interests
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/destinations?category=${category.id}`}>
                <div className="group bg-card border border-border rounded-2xl p-6 hover:border-primary transition-all duration-300 hover:shadow-xl hover:scale-105 transform cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <category.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{category.count} destinations</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Featured Destinations
              </h2>
              <p className="text-lg text-muted-foreground">
                Handpicked experiences for the ultimate adventure
              </p>
            </div>
            <Link href="/destinations">
              <button className="hidden md:flex items-center gap-2 text-primary hover:gap-4 transition-all font-semibold">
                View All
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <Link key={destination.id} href={`/destinations/${destination.id}`}>
                <article className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                        {destination.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold text-foreground">{destination.rating}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {destination.name}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{destination.location}, {destination.country}</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground">From</p>
                        <p className="text-lg font-bold text-foreground">{formatCurrency(destination.price)}</p>
                      </div>
                      <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-all font-medium text-sm">
                        Book Now
                      </button>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/destinations">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition-all font-medium">
                View All Destinations
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Fixico */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose Fixico?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to making your travel experience seamless and unforgettable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl p-6 hover:border-primary transition-all hover:shadow-lg">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from real travelers who've explored with Fixico
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-card border border-border rounded-2xl p-6 hover:border-primary transition-all hover:shadow-lg">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.comment}"</p>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-12 text-center text-primary-foreground relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ready for Your Next Adventure?
              </h2>
              <p className="text-xl mb-8 text-primary-foreground/90">
                Join thousands of travelers who've discovered East Africa with Fixico
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-full text-foreground bg-card border-2 border-transparent focus:border-primary-foreground focus:outline-none"
                />
                <button className="bg-card text-primary px-8 py-4 rounded-full hover:bg-card/90 transition-all font-semibold whitespace-nowrap">
                  Get Started
                </button>
              </div>

              <p className="text-sm mt-4 text-primary-foreground/80">
                Get exclusive deals and travel tips delivered to your inbox
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Travel Inspiration
              </h2>
              <p className="text-lg text-muted-foreground">
                Stories and guides from fellow adventurers
              </p>
            </div>
            <Link href="/blogs">
              <button className="hidden md:flex items-center gap-2 text-primary hover:gap-4 transition-all font-semibold">
                View All Stories
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Link key={i} href="/blogs">
                <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary transition-all cursor-pointer hover:shadow-lg">
                  <div className="relative h-48 bg-accent">
                    <Image
                      src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=600&h=400&fit=crop`}
                      alt="Blog post"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>Nov {15 + i}, 2024</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      Travel Blog Post Title {i}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      Discover amazing stories and tips from travelers exploring East Africa...
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/blogs">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition-all font-medium">
                View All Stories
              </button>
            </Link>
          </div>
        </div>
      </section>
      <Header/>
    </div>
  );
};

export default FixicoHomePage;