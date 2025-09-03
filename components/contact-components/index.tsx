'use client'
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Faqs from '@/components/contact-components/Faqs';
import {offices,contactMethods} from '@/constants/DummyData'
import ContactForm from '@/components/contact-components/ContactForm';
import Offices from '@/components/contact-components/Offices';








const ContactIndex: React.FC = () => {
 // const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('contact');






  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 50);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);







  return (
    <>
    <Header/>
      <div className="min-h-screen bg-gradient-to-tr from-primary via-secondary to-background">
        {/* Navigation */}

        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Get in <span className="text-orange-400">Touch</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Have questions about your next adventure? Our travel experts are here to help
                you plan the perfect getaway.
              </p>
            </div>

            {/* Quick Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 ">
              {contactMethods.map((method) => (
                <a
                  key={method.id}
                  href={method.action}
                  className="bg-card border border-border backdrop-blur-md rounded-2xl p-6 text-center hover:bg-secondary transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {method.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    {method.title}
                  </h3>
                  <p className="text-accent-foreground text-sm mb-2">
                    {method.description}
                  </p>
                  <p className="text-orange-400 font-medium">
                    {method.value}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="bg-background backdrop-blur-md">
          {/* Tab Navigation */}
          <div className="border-b border-border bg-secondary">
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
                    className={`py-4 px-2 border-b-2 font-medium text-secondary-foreground text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text hover:primary hover:border-gray-300'
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
            <ContactForm/>
          )}

          {/* Offices Tab */}
          {activeTab === 'offices' && (
            <Offices offices={offices}/>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <Faqs setActiveTab={setActiveTab}/>
          )}
        </section>

        {/* Footer */}
        <Footer/>
      </div>
    </>
  );
};

export default ContactIndex;