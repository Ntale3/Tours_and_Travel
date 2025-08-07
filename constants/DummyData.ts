import {Office,FAQ, ContactMethod} from '@/types'


export const faqs: FAQ[] = [
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


  // Offices


  export const offices: Office[] = [
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



  // Sample data
  export const contactMethods: ContactMethod[] = [
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


