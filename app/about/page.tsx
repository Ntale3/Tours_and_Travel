'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface Stat {
  id: number;
  value: string;
  label: string;
  icon: string;
}

const About: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('story');
  //const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Sample data
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/api/placeholder/300/300",
      bio: "Travel enthusiast with 15 years of experience in creating unforgettable journeys."
    },
    {
      id: 2,
      name: "David Chen",
      role: "Head of Operations",
      image: "/api/placeholder/300/300",
      bio: "Operations expert ensuring seamless travel experiences worldwide."
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      role: "Travel Curator",
      image: "/api/placeholder/300/300",
      bio: "Local culture expert specializing in authentic destination experiences."
    }
  ];

  const stats: Stat[] = [
    { id: 1, value: "50K+", label: "Happy Travelers", icon: "✈️" },
    { id: 2, value: "100+", label: "Destinations", icon: "🌍" },
    { id: 3, value: "15", label: "Years Experience", icon: "⭐" },
    { id: 4, value: "24/7", label: "Support", icon: "🛟" }
  ];

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 50);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <>


    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-black to-orange-600">
        {/* Navigation */}

        <Header/>
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                About <span className="text-orange-400">Foxico</span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                We're passionate about creating extraordinary travel experiences that connect you
                with the world's most beautiful destinations and cultures.
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat) => (
                <div key={stat.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="bg-white/95 backdrop-blur-md">
          {/* Section Navigation */}
          <div className="border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex space-x-8 overflow-x-auto">
                {[
                  { id: 'story', label: 'Our Story' },
                  { id: 'mission', label: 'Mission' },
                  { id: 'team', label: 'Team' },
                  { id: 'values', label: 'Values' }
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeSection === section.id
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Story Section */}
          {activeSection === 'story' && (
            <div className="py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900">
                      Our Story Began in 2008
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      What started as a small passion project to help friends discover hidden gems
                      around the world has grown into a trusted platform serving thousands of travelers.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      We believe that travel is more than just visiting places – it's about creating
                      connections, understanding cultures, and building memories that last a lifetime.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                        Authentic Experiences
                      </span>
                      <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        Local Partnerships
                      </span>
                      <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Sustainable Tourism
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src="/api/placeholder/600/450"
                        alt="Our Story"
                        width={600}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl opacity-20"></div> */}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mission Section */}
          {activeSection === 'mission' && (
            <div className="py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Our Mission
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed mb-12">
                  To make extraordinary travel accessible to everyone while promoting sustainable
                  tourism and supporting local communities worldwide.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                    <div className="text-4xl mb-4">🌍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility</h3>
                    <p className="text-gray-700">
                      Making travel dreams achievable for everyone, regardless of budget or experience level.
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                    <div className="text-4xl mb-4">🌱</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
                    <p className="text-gray-700">
                      Promoting responsible travel that protects environments and benefits local communities.
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
                    <div className="text-4xl mb-4">🤝</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
                    <p className="text-gray-700">
                      Building bridges between travelers and local communities for authentic experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Team Section */}
          {activeSection === 'team' && (
            <div className="py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Meet Our Team
                  </h2>
                  <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                    The passionate individuals behind Foxico who work tirelessly to make your travel dreams come true.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="aspect-w-1 aspect-h-1">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={300}
                          height={300}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {member.name}
                        </h3>
                        <p className="text-orange-600 font-medium mb-3">
                          {member.role}
                        </p>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Values Section */}
          {activeSection === 'values' && (
            <div className="py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                  Our Core Values
                </h2>

                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">🎯</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
                      <p className="text-gray-700 leading-relaxed">
                        We strive for excellence in every aspect of our service, from trip planning to customer support.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">💙</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Integrity</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Honesty and transparency guide all our interactions with travelers and partners.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">🌟</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
                      <p className="text-gray-700 leading-relaxed">
                        We continuously innovate to provide better, more personalized travel experiences.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">🤗</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Inclusivity</h3>
                      <p className="text-gray-700 leading-relaxed">
                        We believe travel should be accessible and welcoming to people from all backgrounds.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500 to-pink-500">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of travelers who trust Foxico to create their perfect getaway.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/destinations"
                className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Destinations
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer/>
      </div>
    </>
  );
};

export default About;