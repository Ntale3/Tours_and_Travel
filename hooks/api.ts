import { ApiResponse, FetchOptions, StateManager } from "@/types";

const DEFAULT_BASE_URL = "http://localhost:8000/api";

/**
 * Builds query parameters string from object
 */
function buildQueryParams(params: Record<string, string | number | boolean>): string {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value));
    });
    return searchParams.toString();
}

/**
 * Generic fetch wrapper with error handling and state management
 */
export async function apiFetch<T = any>(
    endpoint: string,
    options: FetchOptions = {},
    stateManager?: StateManager
): Promise<ApiResponse<T>> {
    const {
        baseURL = DEFAULT_BASE_URL,
        token,
        params,
        headers = {},
        ...fetchOptions
    } = options;

    // Set loading state
    stateManager?.isLoading.set(true);
    stateManager?.error.set(null);
    stateManager?.errors.set(null);

    try {
        // Build URL with query params if provided
        let url = `${baseURL}${endpoint}`;
        if (params) {
            const queryString = buildQueryParams(params);
            url += `?${queryString}`;
        }

        // Prepare headers
        const requestHeaders: HeadersInit = {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...headers,
        };

        // Add authorization header if token provided
        if (token) {
            // @ts-ignore
            requestHeaders.Authorization = `Bearer ${token}`;
        }

        // Make the request
        const response = await fetch(url, {
            credentials: "include",
            ...fetchOptions,
            headers: requestHeaders,
        });

        // Parse response
        const data: ApiResponse<T> = await response.json();

        // Handle non-OK responses
        if (!response.ok) {
            const errorMessage = data.message || `Request failed with status ${response.status}`;
            stateManager?.error.set(errorMessage);
            stateManager?.errors.set(data.errors || null);
            return data;
        }

        // Handle invalid response structure
        if (!data.success) {
            const errorMessage = data.message || "Invalid response from server";
            stateManager?.error.set(errorMessage);
            stateManager?.errors.set(data.errors || null);
            return data;
        }

        return data;
    } catch (err) {
        console.error("API Error:", err);
        const errorMessage = err instanceof Error ? err.message : "Network error. Please try again.";
        stateManager?.error.set(errorMessage);

        return {
            success: false,
            message: errorMessage,
            errors: null,
        };
    } finally {
        stateManager?.isLoading.set(false);
    }
}

/**
 * FormData fetch wrapper for file uploads (images, etc.)
 * Does NOT set Content-Type header - browser handles multipart/form-data boundary
 */
export async function apiFetchFormData<T = any>(
    endpoint: string,
    formData: FormData,
    options: Omit<FetchOptions, 'body'> = {},
    stateManager?: StateManager
): Promise<ApiResponse<T>> {
    const {
        baseURL = DEFAULT_BASE_URL,
        token,
        params,
        headers = {},
        ...fetchOptions
    } = options;

    // Set loading state
    stateManager?.isLoading.set(true);
    stateManager?.error.set(null);
    stateManager?.errors.set(null);

    try {
        // Build URL with query params if provided
        let url = `${baseURL}${endpoint}`;
        if (params) {
            const queryString = buildQueryParams(params);
            url += `?${queryString}`;
        }

        // Prepare headers (NO Content-Type for FormData!)
        const requestHeaders: HeadersInit = {
            Accept: "application/json",
            ...headers,
        };

        // Add authorization header if token provided
        if (token) {
            // @ts-ignore
            requestHeaders.Authorization = `Bearer ${token}`;
        }

        // Make the request
        const response = await fetch(url, {
            credentials: "include",
            method: "POST", // FormData is typically POST
            ...fetchOptions,
            headers: requestHeaders,
            body: formData,
        });

        // Parse response
        const data: ApiResponse<T> = await response.json();

        // Handle non-OK responses
        if (!response.ok) {
            const errorMessage = data.message || `Request failed with status ${response.status}`;
            stateManager?.error.set(errorMessage);
            stateManager?.errors.set(data.errors || null);
            return data;
        }

        // Handle invalid response structure
        if (!data.success) {
            const errorMessage = data.message || "Invalid response from server";
            stateManager?.error.set(errorMessage);
            stateManager?.errors.set(data.errors || null);
            return data;
        }

        return data;
    } catch (err) {
        console.error("API FormData Error:", err);
        const errorMessage = err instanceof Error ? err.message : "Network error. Please try again.";
        stateManager?.error.set(errorMessage);

        return {
            success: false,
            message: errorMessage,
            errors: null,
        };
    } finally {
        stateManager?.isLoading.set(false);
    }
}

/**
 * Convenience methods for common HTTP operations
 */
export const api = {
    get: <T = any>(endpoint: string, options?: FetchOptions, stateManager?: StateManager) =>
        apiFetch<T>(endpoint, { ...options, method: "GET" }, stateManager),

    post: <T = any>(endpoint: string, body?: any, options?: FetchOptions, stateManager?: StateManager) =>
        apiFetch<T>(
            endpoint,
            { ...options, method: "POST", body: body ? JSON.stringify(body) : undefined },
            stateManager
        ),

    put: <T = any>(endpoint: string, body?: any, options?: FetchOptions, stateManager?: StateManager) =>
        apiFetch<T>(
            endpoint,
            { ...options, method: "PUT", body: body ? JSON.stringify(body) : undefined },
            stateManager
        ),

    patch: <T = any>(endpoint: string, body?: any, options?: FetchOptions, stateManager?: StateManager) =>
        apiFetch<T>(
            endpoint,
            { ...options, method: "PATCH", body: body ? JSON.stringify(body) : undefined },
            stateManager
        ),

    delete: <T = any>(endpoint: string, options?: FetchOptions, stateManager?: StateManager) =>
        apiFetch<T>(endpoint, { ...options, method: "DELETE" }, stateManager),

    /**
     * POST with FormData for file uploads
     * Automatically handles multipart/form-data with proper boundaries
     */
    postFormData: <T = any>(
        endpoint: string,
        formData: FormData,
        options?: Omit<FetchOptions, 'body'>,
        stateManager?: StateManager
    ) => apiFetchFormData<T>(endpoint, formData, options, stateManager),

    /**
     * PUT with FormData (for updates with file uploads)
     * Note: Laravel needs _method field set to 'PUT' in FormData
     */
    putFormData: <T = any>(
        endpoint: string,
        formData: FormData,
        options?: Omit<FetchOptions, 'body'>,
        stateManager?: StateManager
    ) => {
        // Add Laravel method spoofing
        if (!formData.has('_method')) {
            formData.append('_method', 'PUT');
        }
        return apiFetchFormData<T>(endpoint, formData, options, stateManager);
    },
};