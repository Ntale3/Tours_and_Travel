import { AlignRight, ChevronDown, Users } from 'lucide-react'
import React, { useState } from 'react'
import SideBar from './SideBar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navs=[
    { link: '/', name: 'Home',hyperLinks:[] },
    { link: '/destinations', name: 'Destinations',
      hyperLinks:[
        {link:'#',name:'Latest News'},
        {link:'#',name:'Breaking News'},
        {link:'#',name:'Sports'},
        {link:'#',name:'Technology'},
        {link:'#',name:'Politics'}
      ]},
    { link: '/blog', name: 'Blog', hyperLinks:[] },
    { link: '/about', name: 'About' ,hyperLinks:[]},
    { link: '/contact', name: 'Contact',hyperLinks:[]},
    { link: '/gallery', name: 'Gallery',hyperLinks:[]}
  ]

const Header = () => {
   const [showMenu, setShowMenu] = useState<boolean>(false)
    const toggleMenu = ()=>{
        setShowMenu(!showMenu)
    }
const pathname = usePathname();
  

  return (
    
    <div>
    <header className="fixed z-50 bg-white/30 backdrop-blur-md right-0 left-0 top-0 flex items-center justify-between p-4  lg:py-1">       
      <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="text-white text-xl font-bold">Foxico</span>
      </div>
    
    <div className="hidden lg:block md:block bg-black/50 p-4 rounded-3xl">
        <nav className="hidden md:flex items-center space-x-8 text-white">
          <ul className='flex gap-4'>
            {navs.map((nav,index)=>(
              <li key={index} className={pathname===nav.link?'text-orange-400 font-semibold relative':''}>                
                { nav.name!=='Destinations'?
                  <Link href={nav.link} >
                    {nav.name}
                    {pathname===nav.link &&( <div className='absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-400 rounded-full'/> )}
                  </Link>  
                    :
                    <div className='relative group'>
                      <div className='flex items-center '>
                      <Link href={nav.link} className='hover:text-orange-300 transition-colors flex items-center gap-1'>
                      {nav.name}  
                      {pathname===nav.link &&( <div className='absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-400 rounded-full'/> )}
                      </Link>
                      <ChevronDown className="w-4 h-4" />
                      </div>
                    
                    <div className="absolute top-full left-0 mt-2 w-48 bg-black/60 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      <ul>
                        {
                          nav.hyperLinks.map((hyperslink,index)=>(
                            <li key={index}>
                              <Link href={hyperslink.link}
                              className='block px-4 py-2 text-white hover:bg-orange-100 hover:text-orange-600 transition-colors'
                              >                                
                                {hyperslink.name}                              
                              
                              </Link>
                            </li>
                          ))
                        }                        
                      </ul>
                    </div>
                    </div>
                  </div>
                }
                
              </li>
            ))}
          </ul>        
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
        </header>
        <SideBar setShowMenu={setShowMenu} showMenu={showMenu}/>
  </div>    
  )
}

export default Header