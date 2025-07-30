'use client'
import { useEffect, useState } from "react";
import { Bookmark, Calendar, ChevronDown, ChevronLeft, ChevronRight, MapPin, Star, Users } from "lucide-react";


       
interface destType{
id: number,
name: string,
country: string,
description: string,
image: string,
cardImage: string,
rating: number,
reviews: string,
price: string,
duration: string,
gradient: string
}




const Slider = ({destinations}:{destinations:destType[]}) => {
      const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);

    useEffect(() => {
        if (!isAutoplay) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === destinations.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex, isAutoplay, destinations.length]);

    const nextSlide = () => {
        setIsAutoplay(false);
        setCurrentIndex(currentIndex === destinations.length - 1 ? 0 : currentIndex + 1);
    };

    const prevSlide = () => {
        setIsAutoplay(false);
        setCurrentIndex(currentIndex === 0 ? destinations.length - 1 : currentIndex - 1);
    };

    const goToSlide = (index:number) => {
        setIsAutoplay(false);
        setCurrentIndex(index);
    };

    const currentDestination = destinations[currentIndex];
  return (
    <div className="relative min-h-screen overflow-hidden">
         {/* Background Image */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
                    style={{
                        backgroundImage: `url(${currentDestination.image})`,
                    }}
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${currentDestination.gradient} opacity-60 transition-all duration-1000`} />
                <div className="absolute inset-0 bg-black opacity-20" />
      </div>

      {/* Header */}
      <header className="relative  flex items-center justify-between p-6 lg:p-8">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">F</span>
                    </div>
                    <span className="text-white text-xl font-bold">Foxico</span>
                </div>
                

        <div className="hidden lg:block bg-black/50 p-4 rounded-3xl">
        <nav className="hidden md:flex items-center space-x-8 text-white">
        {/* News with dropdown */}
        <div className="relative group">
          <a 
            href="#" 
            className="hover:text-orange-300 transition-colors flex items-center gap-1"
          >
            Destinations
            <ChevronDown className="w-4 h-4" />
          </a>
          
          {/* Dropdown menu */}
          <div className="absolute top-full left-0 mt-2 w-48 bg-black/40 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="py-2">
              <a href="#" className="block px-4 py-2 text-white hover:bg-orange-100 hover:text-orange-600 transition-colors">
                Latest News
              </a>
              <a href="#" className="block px-4 py-2 text-white hover:bg-orange-100 hover:text-orange-600 transition-colors">
                Breaking News
              </a>
              <a href="#" className="block px-4 py-2 text-white hover:bg-orange-100 hover:text-orange-600 transition-colors">
                Sports
              </a>
              <a href="#" className="block px-4 py-2 text-white hover:bg-orange-100 hover:text-orange-600 transition-colors">
                Technology
              </a>
              <a href="#" className="block px-4 py-2 text-white hover:bg-orange-100 hover:text-orange-600 transition-colors">
                Politics
              </a>
            </div>
          </div>
        </div>

        {/* Other navigation items */}
        <a href="#" className="hover:text-orange-300 transition-colors">Blog</a>
        <a href="/blog" className="hover:text-orange-300 transition-colors">About</a>
        <a href="#" className="hover:text-orange-300 transition-colors">Contact</a>
        <a href="#" className="hover:text-orange-300 transition-colors">News</a>

      </nav>
    </div>

                <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-white hidden sm:block">Hello, Anney !</span>
                </div>
            </header>

            {/* Main Content */}

            <div className="relative  flex flex-col lg:flex-row items-center justify-between px-6 lg:px-8 mt-8 lg:mt-16">

                {/* Left Content */}
                <div className="flex-1 max-w-2xl mb-8 lg:mb-0">
                    <h1 className="text-6xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
                        {currentDestination.name}
                    </h1>

                    <p className="text-white/90 text-lg lg:text-xl leading-relaxed mb-8 max-w-xl">
                        {currentDestination.description}
                    </p>

                    <button className="bg-orange-500 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                        <span>Explore</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Slide indicators */}
                    <div className="flex space-x-3 mt-12">
                        {destinations.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Content - Cards */}
                <div className="flex-1 lg:flex-none lg:w-1/2 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto lg:mx-0">

                        {/* Main Featured Card */}
                        <div className="relative group">
                            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-black/30 transition-all duration-500 transform hover:scale-105">
                                <div className="relative mb-4 overflow-hidden rounded-xl">
                                    <img
                                        src={currentDestination.cardImage}
                                        alt={currentDestination.name}
                                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                        <Bookmark className="w-5 h-5 text-white" />
                                    </button>
                                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                                        <MapPin className="w-3 h-3 inline mr-1" />
                                        {currentDestination.country}
                                    </div>
                                </div>

                                <h3 className="text-white text-xl font-bold mb-2">{currentDestination.name}</h3>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-white text-sm">{currentDestination.rating}</span>
                                        <span className="text-white/60 text-sm">({currentDestination.reviews})</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-white/80 text-sm">
                                        <Calendar className="w-4 h-4" />
                                        <span>{currentDestination.duration}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-white">{currentDestination.price}</span>
                                    <span className="text-white/60">per person</span>
                                </div>
                            </div>
                        </div>

                        {/* Secondary Cards */}
                         <div className="space-y-8 lg:mt-30">
                            {destinations.slice(1, 3).map((dest,_ ) => (
                                <div
                                    key={dest.id}
                                    className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer transform hover:scale-105"
                                    onClick={() => goToSlide(destinations.findIndex(d => d.id === dest.id))}
                                >
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={dest.cardImage}
                                            alt={dest.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h4 className="text-white font-semibold">{dest.name}</h4>
                                            <p className="text-white/60 text-sm">{dest.country}</p>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                                <span className="text-white/80 text-xs">{dest.rating}</span>
                                            </div>
                                        </div>
                                        <span className="text-white font-bold">{dest.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div> 


                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 "
            >
                <ChevronLeft className="w-4 h-4 text-white" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 "
            >
                <ChevronRight className="w-4 h-4 text-white" />
            </button>

            {/* Destination Labels (Top Right) */}
            <div className="absolute top-32 right-8 space-y-4 hidden lg:block">
                {destinations.map((dest, index) => (
                    <button
                        key={dest.id}
                        onClick={() => goToSlide(index)}
                        className={`block text-right transition-all duration-300 ${
                            index === currentIndex
                                ? 'text-white text-xl font-bold'
                                : 'text-white/60 hover:text-white text-lg'
                        }`}
                    >
                        {dest.name}
                        <div className={`w-12 h-0.5 ml-auto mt-1 transition-all duration-300 ${
                            index === currentIndex ? 'bg-white' : 'bg-white/30'
                        }`} />
                    </button>
                ))}
            </div>
    </div>
  )
}

export default Slider