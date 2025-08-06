import Destination from '@/components/destination-components/index'


  const destinations = [
    {
      id: 1,
      name: "KERALA",
      location: "India",
      category: "tropical",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      price: "$899",
      rating: 4.7,
      reviews: 1800,
      duration: "6 days",
      groupSize: "per person",
      description: "Discover God's Own Country with palm-lined beaches, backwaters, and spice plantations in Kerala's tropical paradise.",
      highlights: ["Backwater Cruise", "Tea Gardens", "Beach Resorts", "Spice Tours"],
      bestTime: "October - March"
    },
    {
      id: 2,
      name: "MALDIVES",
      location: "Maldives",
      category: "adventure",
      image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      price: "$2,199",
      rating: 4.9,
      reviews: 2400,
      duration: "5 days",
      groupSize: "per person",
      description: "Ultimate luxury in crystal-clear waters with overwater villas and pristine coral reefs.",
      highlights: ["Overwater Villas", "Snorkeling", "Spa Treatments", "Private Dining"],
      bestTime: "November - April"
    },
    {
      id: 3,
      name: "BALI",
      location: "Indonesia",
      category: "tropical",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      price: "$1,299",
      rating: 4.6,
      reviews: 3200,
      duration: "8 days",
      groupSize: "per person",
      description: "Island of the Gods featuring ancient temples, rice terraces, and pristine beaches.",
      highlights: ["Temple Tours", "Rice Terraces", "Beach Clubs", "Volcano Sunrise"],
      bestTime: "April - October"
    },
    {
      id: 5,
      name: "SRI LANKA",
      location: "Sri Lanka",
      category: "tropical",
      image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      price: "$799",
      rating: 4.4,
      reviews: 1600,
      duration: "9 days",
      groupSize: "per person",
      description: "Pearl of the Indian Ocean with ancient ruins, tea plantations, and wildlife safaris.",
      highlights: ["Wildlife Safari", "Tea Plantations", "Ancient Ruins", "Beach Relaxation"],
      bestTime: "December - March"
    },
    {
      id: 6,
      name: "SEYCHELLES",
      location: "Seychelles",
      category: "tropical",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      price: "$2,899",
      rating: 4.8,
      reviews: 1200,
      duration: "6 days",
      groupSize: "per person",
      description: "Pristine archipelago with granite boulders, turquoise waters, and endemic wildlife.",
      highlights: ["Pristine Beaches", "Nature Reserves", "Island Hopping", "Luxury Resorts"],
      bestTime: "April - May, October - November"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Destinations', icon: 'Globe' },
    { id: 'tropical', name: 'Tropical Paradise', icon: 'Camera' },
    { id: 'adventure', name: 'Adventure', icon: 'MapPin' },
    { id: 'cultural', name: 'Cultural', icon: 'Heart' },
    { id: 'luxury', name: 'Luxury', icon: 'Plane' }
  ];

const DestinationsPage = () => {

  return (
    <div className="min-h-screen  relative overflow-hidden">

     <Destination destinations={destinations} categories={categories}/>
    </div>
  );
};

export default DestinationsPage;
