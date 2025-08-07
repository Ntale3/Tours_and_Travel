import { FormEvent, useState } from "react";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  travelType: string;
  budget: string;
}


const ContactForm=()=>{
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<ContactForm>({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      travelType: '',
      budget: ''
    });

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
  return(
    <div className="py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Send Us a Message
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-secondary rounded-lg focus:border-primary transition-colors placeholder:muted-foreground"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-secondary rounded-lg focus:border-primary transition-colors placeholder:muted-foreground"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-secondary rounded-lg focus:border-primary transition-colors placeholder:muted-foreground"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-secondary rounded-lg focus:border-primary transition-colors placeholder:muted-foreground"
                        placeholder="What's this about?"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="travelType" className="block text-sm font-medium text-foreground mb-2">
                        Travel Type
                      </label>
                      <select
                        id="travelType"
                        name="travelType"
                        value={formData.travelType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-card text-card-foreground border border-secondary rounded-lg focus:border-primary transition-colors placeholder:muted-foreground"
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
                      <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-card text-card-foreground border border-secondary rounded-lg focus:border-primary transition-colors placeholder:muted-foreground"
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
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-lg  focus:border-primary transition-colors resize-none"
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
  )

}
export default ContactForm