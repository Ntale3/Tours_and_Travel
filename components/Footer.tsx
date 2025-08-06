import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
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
  )
}

export default Footer