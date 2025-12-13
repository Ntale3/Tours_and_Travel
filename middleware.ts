
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

    const authToken = request.cookies.get('auth_token');
    const authUser = request.cookies.get('auth_user');

    const { pathname } = request.nextUrl;


    const isAuthenticated = !!authToken?.value;
    let userRole = null;


    if (authUser?.value) {
        try {
            const user = JSON.parse(decodeURIComponent(authUser.value));
            userRole = user?.role || null;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }


    if (pathname.startsWith('/profile')) {
        if (!isAuthenticated) {
            const loginUrl = new URL('/sign-in', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }


    }


    // if (pathname.startsWith('/dashboard')) {
    //     if (!isAuthenticated) {
    //         const loginUrl = new URL('/sign-in', request.url);
    //         loginUrl.searchParams.set('redirect', pathname);
    //         return NextResponse.redirect(loginUrl);
    //     }


    //     if (userRole !== 'admin' && userRole !== 'super_admin') {
    //         return NextResponse.redirect(new URL('/unauthorized', request.url));
    //     }


    // }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/profile/:path*',
        '/dashboard/:path*',
    ],
};