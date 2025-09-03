import { Users, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { ModeToggle } from '@/components/Theme/ModeToggle';

interface  args{
    showMenu:boolean,
    setShowMenu:React.Dispatch<React.SetStateAction<boolean>>
}

const navigations = [
{ link: '/', name: 'Home' },
{ link: '/destinations', name: 'Destinations'},
{ link: '/blog', name: 'Blog' },
{ link: '/about', name: 'About' },
{ link: '/contact', name: 'Contact'},
{ link: '/gallery', name: 'Gallery'},
];


const SideBar = ({showMenu,setShowMenu}:args) => {

const pathname=usePathname();

  return (
    <div className={`${showMenu ? 'right-0' : "-right-[100%]"} fixed z-50 top-0 flex h-screen w-[75%] flex-col justify-between bg-sidebar backdrop-blur-lg px-8 pb-6 pt-16 text-black transition-all duration-300 md:hidden  shadow-md`}>
            <div>
                <button className='border border-sidebar-foreground rounded-lg absolute top-4 right-9 text-sidebar-foreground' onClick={()=>setShowMenu(false)}><X /></button>
                <div className='flex items-center justify-start gap-3 text-sidebar-foreground'>
                    <Users/>
                    <div>
                        <h1 className="text-sidebar-foreground">Hello User</h1>
                        <h1 className='text-sm text-primary '>Premium User</h1>
                    </div>
                </div>
            <nav className="items-center space-x-8 text-black ">

                <ul className='space-y-4 mt-12'>
                    {navigations.map((nav,index)=>(

                    <li key={index} onClick={()=>setShowMenu(false)} className={pathname===nav.link?'text-orange-400 font-semibold relative':''}>
                        <Link href={nav.link} className="hover:text-orange-500 transition-colors text-sidebar-foreground flex items-center gap-1">
                            {nav.name}
                            {pathname===nav.link &&( <div className='absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-400 rounded-full w-4'/> )}

                        </Link>
                    </li>

                    ))}
                </ul>

            <div className="flex bg-sidebar-primary gap-3 items-center justify-center justify-between flex-end rounded-lg mt-4 ">
                <p className="text-sidebar-primary-foreground">Appearance</p>
                 <div className="bg-card rounded-full w-8 h-8 flex items-center justify-center my-2 text-card-foreground">
                    <ModeToggle/>
                </div>
            </div>


            </nav>
            </div>

    </div>
  )
}

export default SideBar