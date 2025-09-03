import { useState } from "react";
import {faqs} from '@/constants/DummyData'



export default function Faq({setActiveTab}:{setActiveTab:React.Dispatch<React.SetStateAction<string>>}){
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return(
     <div className="py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xl text-foreground">
                    Find answers to common questions about our services and booking process.
                  </p>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq) => (
                   <div key={faq.id} className="bg-card rounded-lg shadow-md overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full px-6 py-4 text-left hover:bg-secondary transition-colors focus:outline-none focus:bg-secondary"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-card-foreground pr-4">
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
                          <p className="text-card-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <p className="text-muted-foreground mb-4">
                    Still have questions? We&apos;re here to help!
                  </p>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Contact Us Directly
                  </button>
                </div>
              </div>
            </div>
  )

}