import { ChevronDown, User, Users, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface  args{
    showMenu:boolean,
    setShowMenu:React.Dispatch<React.SetStateAction<boolean>>
}

const navigations = [
{ link: '/', name: 'Home' },
{ link: '/destinations', name: 'Destinations'},
{ link: '/blog', name: 'Blog' },
{ link: '#', name: 'About' },
{ link: '#', name: 'Contact'},
{ link: '#', name: 'News'}
];


const SideBar = ({showMenu,setShowMenu}:args) => {

  return (
    <div className={`${showMenu ? 'right-0' : "-right-[100%]"} fixed z-2 top-0 flex h-screen w-[75%] flex-col justify-between bg-white/40 backdrop-blur-lg px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden  shadow-md`}>
            <div>
                <button className='border border-black rounded-lg absolute top-4 right-9' onClick={()=>setShowMenu(false)}><X /></button>
                <div className='flex items-center justify-start gap-3'>
                    <Users/>
                    <div>
                        <h1>Hello User</h1>
                        <h1 className='text-sm text-slate-500'>Premium User</h1>
                    </div>
                </div>
        <nav className="items-center space-x-8 text-black ">
            
            <ul className='space-y-4 mt-12'>
                {navigations.map((nav,index)=>(
            
                <li key={index} onClick={()=>setShowMenu(false)}>                         
                    <Link href={nav.link} className="hover:text-orange-300 transition-colors flex items-center gap-1">
                        {nav.name} 
                    </Link>             
                </li>
           
                ))}
            </ul>
            

            
        
            </nav>
            </div>
           
        </div>
  )
}

export default SideBar