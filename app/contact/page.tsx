'use client'
import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  travelType: string;
  budget: string;
}

interface ContactMethod {
  id: number;
  icon: string;
  title: string;
  description: string;
  value: string;
  action: string;
}

interface Office {
  id: number;
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  timezone: string;
  image: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const Contact: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('contact');
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    travelType: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Sample data
  const contactMethods: ContactMethod[] = [
    {
      id: 1,
      icon: "📞",
      title: "Call Us",
      description: "Speak with our travel experts",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      id: 2,
      icon: "📧",
      title: "Email Us",
      description: "Send us your questions",
      value: "hello@foxico.com",
      action: "mailto:hello@foxico.com"
    },
    {
      id: 3,
      icon: "💬",
      title: "Live Chat",
      description: "Chat with us in real-time",
      value: "Available 24/7",
      action: "#"
    },
    {
      id: 4,
      icon: "📍",
      title: "Visit Us",
      description: "Our main office location",
      value: "New York, NY",
      action: "#"
    }
  ];

  const offices: Office[] = [
    {
      id: 1,
      city: "New York",
      country: "United States",
      address: "123 Travel Ave, Suite 100, New York, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "ny@foxico.com",
      timezone: "EST (UTC-5)",
      image: "/api/placeholder/400/300"
    },
    {
      id: 2,
      city: "London",
      country: "United Kingdom",
      address: "456 Adventure St, London SW1A 1AA",
      phone: "+44 20 7946 0958",
      email: "london@foxico.com",
      timezone: "GMT (UTC+0)",
      image: "/api/placeholder/400/300"
    },
    {
      id: 3,
      city: "Tokyo",
      country: "Japan",
      address: "789 Journey Blvd, Shibuya, Tokyo 150-0002",
      phone: "+81 3-1234-5678",
      email: "tokyo@foxico.com",
      timezone: "JST (UTC+9)",
      image: "/api/placeholder/400/300"
    }
  ];

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "How far in advance should I book my trip?",
      answer: "We recommend booking 2-3 months in advance for international trips and 4-6 weeks for domestic travel. However, we can accommodate last-minute bookings based on availability."
    },
    {
      id: 2,
      question: "What is included in your travel packages?",
      answer: "Our packages typically include accommodation, transportation, guided tours, and 24/7 support. Specific inclusions vary by package and destination. We'll provide a detailed itinerary before booking."
    },
    {
      id: 3,
      question: "Do you offer travel insurance?",
      answer: "Yes, we partner with leading insurance providers to offer comprehensive travel insurance options. We highly recommend purchasing travel insurance to protect your investment."
    },
    {
      id: 4,
      question: "Can I customize my travel itinerary?",
      answer: "Absolutely! We specialize in creating personalized travel experiences. Our travel experts will work with you to customize every aspect of your trip to match your preferences and interests."
    },
    {
      id: 5,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, bank transfers, and PayPal. Payment plans are available for bookings over $2,000, with a deposit required to secure your reservation."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        travelType: '',
        budget: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }

    // Reset status after 5 seconds
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <>
    <Header/>
      <div className="min-h-screen bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600">
        {/* Navigation */}

        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Get in <span className="text-orange-400">Touch</span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Have questions about your next adventure? Our travel experts are here to help
                you plan the perfect getaway.
              </p>
            </div>

            {/* Quick Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method) => (
                <a
                  key={method.id}
                  href={method.action}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {method.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {method.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-2">
                    {method.description}
                  </p>
                  <p className="text-orange-300 font-medium">
                    {method.value}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="bg-white/95 backdrop-blur-md">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex space-x-8 overflow-x-auto">
                {[
                  { id: 'contact', label: 'Contact Form' },
                  { id: 'offices', label: 'Our Offices' },
                  { id: 'faq', label: 'FAQ' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Contact Form Tab */}
          {activeTab === 'contact' && (
            <div className="py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Send Us a Message
                  </h2>
                  <p className="text-xl text-gray-700">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="What's this about?"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="travelType" className="block text-sm font-medium text-gray-700 mb-2">
                        Travel Type
                      </label>
                      <select
                        id="travelType"
                        name="travelType"
                        value={formData.travelType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      >
                        <option value="">Select travel type</option>
                        <option value="solo">Solo Travel</option>
                        <option value="couple">Couple/Romantic</option>
                        <option value="family">Family Vacation</option>
                        <option value="group">Group Travel</option>
                        <option value="business">Business Travel</option>
                        <option value="adventure">Adventure Travel</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-1000">Under $1,000</option>
                        <option value="1000-2500">$1,000 - $2,500</option>
                        <option value="2500-5000">$2,500 - $5,000</option>
                        <option value="5000-10000">$5,000 - $10,000</option>
                        <option value="over-10000">Over $10,000</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
                      placeholder="Tell us about your dream destination, travel dates, and any specific requirements..."
                    ></textarea>
                  </div>

                  {/* Submit Status */}
                  {submitStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 font-medium">
                        ✅ Message sent successfully! We'll get back to you within 24 hours.
                      </p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800 font-medium">
                        ❌ Something went wrong. Please try again or contact us directly.
                      </p>
                    </div>
                  )}

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center space-x-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Sending...</span>
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Offices Tab */}
          {activeTab === 'offices' && (
            <div className="py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Our Global Offices
                  </h2>
                  <p className="text-xl text-gray-700">
                    Visit us at any of our worldwide locations or reach out to your nearest office.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {offices.map((office) => (
                    <div key={office.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="aspect-w-16 aspect-h-9">
                        <Image
                          src={office.image}
                          alt={`${office.city} office`}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {office.city}
                        </h3>
                        <p className="text-orange-600 font-medium mb-4">
                          {office.country}
                        </p>

                        <div className="space-y-3 text-sm text-gray-600">
                          <div className="flex items-start space-x-2">
                            <span>📍</span>
                            <span>{office.address}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>📞</span>
                            <a href={`tel:${office.phone}`} className="hover:text-orange-600 transition-colors">
                              {office.phone}
                            </a>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>📧</span>
                            <a href={`mailto:${office.email}`} className="hover:text-orange-600 transition-colors">
                              {office.email}
                            </a>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>🕐</span>
                            <span>{office.timezone}</span>
                          </div>
                        </div>

                        <div className="mt-6">
                          <button className="w-full bg-orange-100 text-orange-600 py-2 px-4 rounded-lg hover:bg-orange-200 transition-colors font-medium">
                            Get Directions
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xl text-gray-700">
                    Find answers to common questions about our services and booking process.
                  </p>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </h3>
                          <div className={`transform transition-transform duration-200 ${
                            expandedFAQ === faq.id ? 'rotate-180' : ''
                          }`}>
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </button>
                      {expandedFAQ === faq.id && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <p className="text-gray-600 mb-4">
                    Still have questions? We're here to help!
                  </p>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Contact Us Directly
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">F</span>
                  </div>
                  <span className="font-bold text-xl">Foxico</span>
                </div>
                <p className="text-gray-400 mb-4 max-w-md">
                  Creating extraordinary travel experiences that connect you with the world's most beautiful destinations.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link href="/" className="block text-gray-400 hover:text-white transition-colors">Home</Link>
                  <Link href="/destinations" className="block text-gray-400 hover:text-white transition-colors">Destinations</Link>
                  <Link href="/blog" className="block text-gray-400 hover:text-white transition-colors">Blog</Link>
                  <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">About</Link>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <div className="space-y-2">
                  <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">Contact</Link>
                  <Link href="/help" className="block text-gray-400 hover:text-white transition-colors">Help Center</Link>
                  <Link href="/privacy" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Foxico. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Contact;