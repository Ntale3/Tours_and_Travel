import { AlignRight, Users } from 'lucide-react'
import React, {useEffect, useState} from 'react'
import SideBar from './SideBar'
import Link from 'next/link'
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import {ModeToggle} from '@/components/Theme/ModeToggle'
import {auth$} from "@/store/auth.store";

// Add roles to your navigation items
const navs = [
    { link: '/', name: 'Home', roles: [] },
    { link: '/destinations', name: 'Destinations', roles: [] },
    { link: '/gallery', name: 'Gallery', roles: [] },
    { link: '/blogs', name: 'Blog', roles: [] },
    { link: '/about', name: 'About', roles: [] },
    { link: '/contact', name: 'Contact', roles: [] },
    { link: '/dashboard', name: 'Dashboard', roles: ['admin'] } 
]

const Header = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [mounted, setMounted] = useState<boolean>(false)
    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    const { user, isAuthenticated } = mounted ? auth$.get() : { user: null, isAuthenticated: false };

    // Filter navigation items based on user role
    const visibleNavs = navs.filter(nav => {
        // If no roles specified, show to everyone
        if (!nav.roles || nav.roles.length === 0) return true;

        // If roles specified, check if user has the required role
        return user?.role && nav.roles.includes(user.role);
    });

    return (
        <div>
            <header className="fixed z-50 bg-sidebar backdrop-blur-md right-0 left-0 top-0 flex items-center justify-between p-4  lg:py-1">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">F</span>
                    </div>
                    <span className="text-sidebar-foreground text-xl font-bold">Foxico</span>
                </div>

                <div className="hidden md:block bg- p-4 rounded-3xl">
                    <nav className="hidden md:flex items-center space-x-8 text-sidebar-foreground">
                        <ul className='flex gap-4'>
                            {visibleNavs.map((nav, index) => (
                                <li key={index} className={pathname === nav.link ? 'text-sidebar-accent-foreground font-semibold relative' : ''}>
                                    {nav.name !== 'Destinations' ? (
                                        <Link href={nav.link} className="hover:text-muted-foreground">
                                            {nav.name}
                                            {pathname === nav.link && (
                                                <div className='absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-400 rounded-full'/>
                                            )}
                                        </Link>
                                    ) : (
                                        <div className='relative group'>
                                            <div className='flex items-center'>
                                                <Link href={nav.link} className='transition-colors flex items-center gap-1 hover:text-muted-foreground'>
                                                    {nav.name}
                                                    {pathname === nav.link && (
                                                        <div className='absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-400 rounded-full'/>
                                                    )}
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="flex items-center space-x-4 justify-between">
                    <div className="bg-background w-8 h-8 rounded-full items-center justify-center hidden md:flex">
                        <ModeToggle/>
                    </div>

                    <Link href={"/profile"}>
                        <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center">
                            {user?.avatar ? (
                                <Image
                                    src={user.avatar}
                                    alt={``}
                                    width={32}
                                    height={32}
                                    className="rounded-full object-cover"
                                />
                            ) : (
                                <Users className="w-4 h-4 text-sidebar-foreground" />
                            )}
                        </div>
                    </Link>
                    <span className="text-sidebar-foreground hidden lg:block">
            {isAuthenticated ? `Hello, ${user?.first_name}!` : <Link href={'/sign-in'}>Login</Link>}
        </span>
                    <div className="lg:hidden md:hidden w-8 h-8 bg-background rounded-full flex items-center justify-center">
                        <AlignRight className="w-4 h-4 text-sidebar-foreground" onClick={toggleMenu} />
                    </div>
                </div>
            </header>
            <SideBar setShowMenu={setShowMenu} showMenu={showMenu} visibleNavs={visibleNavs} />
        </div>
    )
}

export default Header