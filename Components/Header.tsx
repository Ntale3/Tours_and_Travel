import { AlignRight, ChevronDown, Users } from 'lucide-react'
import React, { useState } from 'react'
import SideBar from './SideBar'

const Header = () => {

   const [showMenu, setShowMenu] = useState<boolean>(false)
    const toggleMenu = ()=>{
        setShowMenu(!showMenu)
    }
  return (
    
    
    <header className="relative  flex items-center justify-between p-6 lg:p-8">       
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">F</span>
                    </div>
                    <span className="text-white text-xl font-bold">Foxico</span>
                </div>
    <div className="hidden lg:block md:block bg-black/50 p-4 rounded-3xl">
        <nav className="hidden md:flex items-center space-x-8 text-white">
        <a 
            href="/" 
            className="hover:text-orange-300 transition-colors flex items-center gap-1"
             >
            Home            
          </a>
        {/* News with dropdown */}
        <div className="relative group">            
          <a 
            href="/destinations" 
            className="hover:text-orange-300 transition-colors flex items-center gap-1"
          >
            Destinations
            <ChevronDown className="w-4 h-4" />
          </a>
          
          {/* Dropdown menu */}
          <div className="absolute top-full left-0 mt-2 w-48 bg-black/60 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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
        <a href="/blog" className="hover:text-orange-300 transition-colors">Blog</a>
        <a href="#" className="hover:text-orange-300 transition-colors">About</a>
        <a href="#" className="hover:text-orange-300 transition-colors">Contact</a>
        <a href="#" className="hover:text-orange-300 transition-colors">News</a>
      </nav>
    </div>
    <div className="flex items-center space-x-4 justify-between">
                  
                    <div className=" w-8 h-8 bg-white rounded-full flex items-center justify-center ">
                        <Users className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-white hidden lg:block">Hello, Anney !</span>
                 
                    <div className=" lg:hidden md:hidden w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <AlignRight className="w-4 h-4 text-gray-600" onClick={toggleMenu} />                        
                    </div>
                   
    </div>
         <SideBar showMenu={showMenu} setShowMenu={setShowMenu}/>
        </header>
       
  )
}

export default Header