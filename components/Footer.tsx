import Link from 'next/link'
import React from 'react'

const navs={
  Link: [
    { link: '/', name: 'Home' },
    { link: '/destinations', name: 'Destinations'},
    { link: '/blog', name: 'Blog'},
    { link: '/about', name: 'About' },
    { link: '/contact', name: 'Contact'},
    { link: '/gallery', name: 'Gallery'}
  ],
  supportLinks:
  [

    { link: '/contact', name: 'Contact' },
    { link: '/help', name: 'Help'},
    { link: '/privacy', name: 'Privacy'},
    { link: '/terms', name: 'Terms' },
  ]
}



const Footer = () => {
  return (
   <footer className="bg-sidebar text-sidebar-foreground py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">F</span>
                  </div>
                  <span className="font-bold text-xl">Foxico</span>
                </div>
                <p className="text-sidebar-foreground mb-4 max-w-md">
                  Creating extraordinary travel experiences that connect you with the world&apos;s most beautiful destinations.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <div className="space-y-2">
                  {
                  navs.Link.map((nav,index)=>(
                  <Link key={index}href={nav.link} className="block text-sidebar-foreground hover:text-orange-500 transition-colors">{nav.name}</Link>
                  ))
                }
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <div className="space-y-2">
                  {
                  navs.supportLinks.map((nav,index)=>(
                  <Link key={index}href={nav.link} className="block text-sidebar-foreground hover:text-orange-500 transition-colors">{nav.name}</Link>
                  ))
                }

                </div>
              </div>
            </div>

            <div className="border-t border-accent mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Foxico. All rights reserved.</p>
            </div>
          </div>
        </footer>
  )
}

export default Footer