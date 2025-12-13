import Cookies from 'js-cookie';

export const authCookies = {
    setAuthCookies: (token: string, user: any) => {
        // Set token cookie (7 days expiry)
        Cookies.set('auth_token', token, {
            expires: 7,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            path: '/'
        });

        // Set user cookie (7 days expiry) - encode the JSON string
        const userString = JSON.stringify(user);
        Cookies.set('auth_user', userString, {
            expires: 7,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            path: '/'
        });

      
    },

    clearAuthCookies: () => {
        Cookies.remove('auth_token', { path: '/' });
        Cookies.remove('auth_user', { path: '/' });
        console.log('Cookies cleared');
    },

    getAuthToken: () => {
        return Cookies.get('auth_token');
    },

    getAuthUser: () => {
        const userStr = Cookies.get('auth_user');
        if (!userStr) return null;
        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    }
};