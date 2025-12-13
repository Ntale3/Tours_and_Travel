import {observable} from "@legendapp/state";
import { synced } from "@legendapp/state/sync"
import {ObservablePersistLocalStorage} from "@legendapp/state/persist-plugins/local-storage";
import {AuthData, LoginCredentials, RegisterData, User} from "@/types";
import {api} from "@/hooks/api";
import { authCookies } from "@/lib/authCookies";



interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    errors: Record<string, string[]>|null;
}



export const auth$ = observable<AuthState>(
    synced({
        initial: {
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            errors: null,
        },
        persist: {
            name: "authState",
            plugin: ObservablePersistLocalStorage,
        },
    })
);

// Helper function to sync auth state to cookies
const syncAuthToCookies = (user: User | null, token: string | null) => {
    if (user && token) {
        authCookies.setAuthCookies(token, user);
    } else {
        authCookies.clearAuthCookies();
    }
};

export const register = async (data: RegisterData): Promise<void> => {
    const response = await api.post<AuthData>(
        "/auth/register",
        data,
        {},
        auth$
    );

    if (response.success && response.data) {
        const { user, access_token } = response.data;
        auth$.user.set(user);
        auth$.token.set(access_token);
        auth$.isAuthenticated.set(true);

        // Sync to cookies
        syncAuthToCookies(user, access_token);

        console.log("Registration successful:", user.email);
    }
};

export const login = async (data: LoginCredentials): Promise<void> => {
    const response = await api.post<AuthData>(
        "/auth/login",
        data,
        {},
        auth$
    );

    if (response.success && response.data) {
        const { user, access_token } = response.data;
        auth$.user.set(user);
        auth$.token.set(access_token);
        auth$.isAuthenticated.set(true);

        // Sync to cookies
        syncAuthToCookies(user, access_token);
    }
};

export const logout = async (): Promise<void> => {
    const token = auth$.token?.get();
    if (token) {
        api.post(
            "/auth/logout",
            {},
            {token},
        );
        auth$.user.set(null);
        auth$.token.set(null);
        auth$.isAuthenticated.set(false);

        // Clear cookies
        syncAuthToCookies(null, null);
    }
};

export const delete_account = async (data: LoginCredentials): Promise<void> => {
    await api.post(
        "/auth/account",
        {data},
    );
    auth$.user.set(null);
    auth$.token.set(null);
    auth$.isAuthenticated.set(false);

    // Clear cookies
    syncAuthToCookies(null, null);
};

export const forgot_password = async (email: string): Promise<void> => {
    await api.post(
        "auth/forget_password",
        {email},
    );
    auth$.user.set(null);
    auth$.token.set(null);
    auth$.isAuthenticated.set(false);

    // Clear cookies
    syncAuthToCookies(null, null);
};

export const reset_password = async ({email, otp, password, password_confirmation}: {
    email: string,
    otp: number,
    password: string,
    password_confirmation: string
}): Promise<void> => {
    await api.post(
        "auth/reset_password",
        {email, otp, password, password_confirmation},
    );
};

export const googleAuth = (): void => {
    window.location.href = "https://unsigneted-agonic-helen.ngrok-free.dev/api/auth/google/redirect";
};

export const handleGoogleCallback = (): void => {
    if (typeof window === 'undefined') return;
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const userParam = urlParams.get("user");
    const error = urlParams.get("error");

    auth$.isLoading.set(true);

    if (error) {
        auth$.error.set(decodeURIComponent(error));
        auth$.isLoading.set(false);
        return;
    }

    if (!token || !userParam) {
        auth$.error.set("Missing token or user data");
        auth$.isLoading.set(false);
        return;
    }

    try {
        const user = JSON.parse(decodeURIComponent(userParam)) as User;
        console.log(user.avatar);
        auth$.token.set(token);
        auth$.user.set(user);
        auth$.isAuthenticated.set(true);
        auth$.error.set(null);
        auth$.errors.set(null);

        // Sync to cookies
        syncAuthToCookies(user, token);

        console.log("Google login successful:", user.email);

        // Clean URL
        window.history.replaceState({}, '', '/');

        // Redirect to dashboard
        window.location.href = '/';
    } catch (err) {
        console.error("Parse error:", err);
        auth$.error.set("Invalid user data from Google");
        auth$.isLoading.set(false);
    }
};