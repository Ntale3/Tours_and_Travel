'use client'
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight} from "lucide-react";
import Header from "../Header";
import Link from "next/link";
import SlideIndicator from "./SlideIndicator";
import FeaturedCard from "./FeaturedCard";
import MiniCard from "./MiniCard";
import DestinationLabel from "./DestinationLabel";



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
    }, [isAutoplay, destinations.length]);

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
    <div className="relative min-h-screen overflow-hidden pb-4 bg-background">
         {/* Background Image */}

      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
                {/* <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
                    style={{
                        backgroundImage: `url(${currentDestination.image})`,
                    }}
                /> */}
                <div className={`absolute inset-0  opacity-60 transition-all duration-1000`} />
                <div className="absolute inset-0 bg-black opacity-20" />
      </div>



            {/* Main Content */}

            <div className="relative  flex flex-col lg:flex-row items-center justify-between px-6 lg:px-8 mt-8 lg:mt-16">

                {/* Left Content */}
                <div className="flex-1 max-w-2xl mt-10 mb-3 lg:mb-2">
                    <h1 className="text-6xl lg:text-8xl font-bold text-foreground mb-6 tracking-tight">
                        {currentDestination.name}
                    </h1>

                    <p className="text-foreground text-lg lg:text-xl leading-relaxed mb-8 max-w-xl">
                        {currentDestination.description}
                    </p>

                    <Link href='/destinations'>
                    <button className="bg-primary hover:bg-secondary hover:text-secondary-foreground text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                        <span className="font-bold">BOOK NOW</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                    </Link>

                    {/* Slide indicators */}
                     <div className="flex space-x-3 mt-12">
                        {destinations.map((_,index)=>(
                        <SlideIndicator key={index} index={index} isActive={index===currentIndex} onClick={()=>goToSlide}/>
                    ))}
                    </div>

                </div>

                {/* Right Content - Cards */}
                <div className="flex-1 lg:flex-none lg:w-1/2  mt-30 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto lg:mx-0">

                        {/* Main Featured Card */}
                         <div className="relative group mt-10">
                          <FeaturedCard destination={currentDestination}/>
                        </div>


                        {/* Secondary Cards */}
                         <div className="space-y-10 lg:mt-42">
                            {destinations.slice(1, 3).map((dest,_ ) => (
                             <MiniCard key={dest.id} destination={dest} onClick={() => goToSlide(destinations.findIndex(d => d.id === dest.id))}/>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-1 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-primary  rounded-full flex items-center justify-center  transition-all duration-300 "
            >
                <ChevronLeft className="w-4 h-4 text-primary-foreground" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-primary backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 "
            >
                <ChevronRight className="w-4 h-4 text-primary-foreground" />
            </button>

            {/* Destination Labels (Top Right) */}
            <div className="absolute top-18 right-8 space-y-4 hidden lg:block ">
                {destinations.map((dest, index) => (
                    <DestinationLabel key={index} name={dest.name} isActive={index===currentIndex} onClick={()=>goToSlide(index)}/>
                ))}
            </div>
        <div>
           <Header/>
        </div>
    </div>
  )
}

export default Slider