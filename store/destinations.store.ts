import {
    Destination,
    DestinationFilter,
    PaginationMeta,
    isPaginatedResponse,
    extractPaginationMeta,
    LaravelPaginatedResponse
} from "@/types";
import { observable } from "@legendapp/state";
import { synced } from "@legendapp/state/sync";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { auth$ } from "@/store/auth.store";
import { api } from "@/hooks/api";

type DestinationStore = {
    // Public destinations
    destinations: Destination[];
    destinationsMeta: PaginationMeta | null;

    // Admin destinations
    adminDestinations: Destination[];
    adminDestinationsMeta: PaginationMeta | null;

    // Single destination detail
    currentDestination: Destination | null;

    // Available destinations (date range)
    availableDestinations: Destination[];

    // Statistics
    statistics: any | null;

    // Loading states
    isLoading: boolean;
    isLoadingDetail: boolean;
    isSubmitting: boolean;

    // Error states
    error: string | null;
    errors: Record<string, string[]> | null;

    // Filters
    filters: DestinationFilter;
};

// ============================================
// STORE WITH SMART PERSISTENCE
// ============================================
export const $destinationStore = observable<DestinationStore>(
    synced({
        initial: {
            destinations: [],
            destinationsMeta: null,
            adminDestinations: [],
            adminDestinationsMeta: null,
            currentDestination: null,
            availableDestinations: [],
            statistics: null,
            isLoading: false,
            isLoadingDetail: false,
            isSubmitting: false,
            error: null,
            errors: null,
            filters: {},
        },
        persist: {
            name: "destinationState",
            plugin: ObservablePersistLocalStorage,
        }
    })
);

// ============================================
// STATE MANAGERS
// ============================================
const listStateManager = {
    isLoading: $destinationStore.isLoading,
    error: $destinationStore.error,
    errors: $destinationStore.errors,
};

const detailStateManager = {
    isLoading: $destinationStore.isLoadingDetail,
    error: $destinationStore.error,
    errors: $destinationStore.errors,
};

const submitStateManager = {
    isLoading: $destinationStore.isSubmitting,
    error: $destinationStore.error,
    errors: $destinationStore.errors,
};

// ============================================
// HELPER FUNCTIONS
// ============================================
function handlePaginatedResponse<T>(
    responseData: T[] | LaravelPaginatedResponse<T>
): { items: T[]; meta: PaginationMeta | null } {
    if (isPaginatedResponse(responseData)) {
        return {
            items: responseData.data,
            meta: extractPaginationMeta(responseData)
        };
    }
    return {
        items: Array.isArray(responseData) ? responseData : [],
        meta: null
    };
}

// ============================================
// PUBLIC API FUNCTIONS
// ============================================

/**
 * Fetch public destinations (active only)
 */
export async function fetchDestinations(filters?: DestinationFilter) {
    try {
        $destinationStore.filters.set(filters || {});

        const response = await api.get<Destination[] | LaravelPaginatedResponse<Destination>>(
            "/destinations",
            { params: filters as any },
            listStateManager
        );

        if (response.success && response.data) {
            const { items, meta } = handlePaginatedResponse(response.data);
            $destinationStore.destinations.set([...items]);
            $destinationStore.destinationsMeta.set(meta);
        }
        return response;
    } catch (error) {
        console.error("Failed to fetch destinations:", error);
        $destinationStore.error.set("Failed to load destinations");
        //return null;
    }
}

/**
 * Fetch single destination by ID
 */
export async function fetchDestinationDetails(destinationId: number) {
    try {
        const response = await api.get<Destination>(
            `/destinations/${destinationId}`,
            {},
            detailStateManager
        );

        if (response.success && response.data) {
            $destinationStore.currentDestination.set(response.data);
        }

        return response;
    } catch (error) {
        console.error("Failed to fetch destination details:", error);
        $destinationStore.error.set("Failed to load destination details");
        return null;
    }
}

/**
 * Fetch available destinations by date range
 */
export async function fetchAvailableDestinations(startDate: string, endDate: string) {
    try {
        const response = await api.get<Destination[]>(
            "/destinations/available",
            {
                params: {
                    start_date: startDate,
                    end_date: endDate
                }
            },
            listStateManager
        );

        if (response.success && response.data) {
            const destinations = Array.isArray(response.data) ? response.data : [];
           $destinationStore.availableDestinations.set(destinations);
        }

        return response;
    } catch (error) {
        console.error("Failed to fetch available destinations:", error);
        return null;
    }
}

//Get current Destination
// export const getCurrent=(destination_id:number)=>{

//     const current = $destinationStore.destinations.get().filter((dest)=>dest.id === destination_id)
//     $destinationStore.currentDestination.set(current)



// }

/**
 * Fetch destination statistics
 */
export async function fetchDestinationStatistics() {
    const token = auth$.token.get();
    if (!token) return null;

    try {
        const response = await api.get(
            "/admin/destinations/statistics",
            { token },
            listStateManager
        );

        if (response.success && response.data) {
            $destinationStore.statistics.set(response.data);
        }

        return response;
    } catch (error) {
        console.error("Failed to fetch statistics:", error);
        return null;
    }
}

// ============================================
// ADMIN FUNCTIONS
// ============================================

/**
 * Fetch all destinations (admin view)
 */
export async function fetchAdminDestinations(filters?: DestinationFilter) {
    const token = auth$.token.get();
    if (!token) {
        $destinationStore.error.set("Authentication required");
        return null;
    }

    try {
        const response = await api.get<Destination[] | LaravelPaginatedResponse<Destination>>(
            "/admin/destinations",
            { token, params: filters as any },
            listStateManager
        );

        if (response.success && response.data) {
            const { items, meta } = handlePaginatedResponse(response.data);
            $destinationStore.adminDestinations.set(items);
            $destinationStore.adminDestinationsMeta.set(meta);
        }

        return response;
    } catch (error) {
        console.error("Failed to fetch admin destinations:", error);
        return null;
    }
}

/**
 * Create new destination (admin)
 */
export async function createDestination(formData: FormData) {
    const token = auth$.token.get();
    if (!token) {
        $destinationStore.error.set("Authentication required");
        return null;
    }

    try {
        const response = await api.postFormData<Destination>(
            "/admin/destinations/create",
            formData,
            { token },
            submitStateManager
        );

        if (response.success && response.data) {
            // Prepend to admin list
            const current = $destinationStore.adminDestinations.get();
            $destinationStore.adminDestinations.set([response.data, ...current]);

            // Update meta count
            const meta = $destinationStore.adminDestinationsMeta.get();
            if (meta) {
                $destinationStore.adminDestinationsMeta.set({
                    ...meta,
                    total: meta.total + 1
                });
            }
        }

        return response;
    } catch (error) {
        console.error("Failed to create destination:", error);
        $destinationStore.error.set("Failed to create destination");
        return null;
    }
}

/**
 * Update destination (admin)
 */
export async function updateDestination(destinationId: number, formData: FormData) {
    const token = auth$.token.get();
    if (!token) {
        $destinationStore.error.set("Authentication required");
        return null;
    }

    try {
        const response = await api.putFormData<Destination>(
            `/destinations/${destinationId}`,
            formData,
            { token },
            submitStateManager
        );

        if (response.success && response.data) {
            // Update in admin list
            updateDestinationInList('adminDestinations', destinationId, response.data);

            // Update in public list if active
            if (response.data.is_active) {
                updateDestinationInList('destinations', destinationId, response.data);
            } else {
                // Remove from public list if deactivated
                removeDestinationFromList('destinations', destinationId);
            }

            // Update current if viewing
            if ($destinationStore.currentDestination.get()?.id === destinationId) {
                $destinationStore.currentDestination.set(response.data);
            }
        }

        return response;
    } catch (error) {
        console.error("Failed to update destination:", error);
        $destinationStore.error.set("Failed to update destination");
        return null;
    }
}

/**
 * Delete destination (admin)
 */
export async function deleteDestination(destinationId: number) {
    const token = auth$.token.get();
    if (!token) {
        $destinationStore.error.set("Authentication required");
        return null;
    }

    try {
        const response = await api.delete(
            `/destinations/${destinationId}`,
            { token },
            submitStateManager
        );

        if (response.success) {
            // Remove from all lists
            removeDestinationFromList('destinations', destinationId);
            removeDestinationFromList('adminDestinations', destinationId);
            removeDestinationFromList('availableDestinations', destinationId);

            // Clear current if viewing
            if ($destinationStore.currentDestination.get()?.id === destinationId) {
                $destinationStore.currentDestination.set(null);
            }

            // Update meta counts
            decrementMetaCount('adminDestinationsMeta');
        }

        return response;
    } catch (error) {
        console.error("Failed to delete destination:", error);
        $destinationStore.error.set("Failed to delete destination");
        return null;
    }
}

/**
 * Toggle destination active status (admin)
 */
export async function toggleDestinationStatus(destinationId: number) {
    const token = auth$.token.get();
    if (!token) return null;

    try {
        const response = await api.patch<Destination>(
            `/destinations/${destinationId}/toggle-status`,
            {},
            { token },
            submitStateManager
        );

        if (response.success && response.data) {
            // Update in admin list
            updateDestinationInList('adminDestinations', destinationId, response.data);

            // Add/remove from public list based on status
            if (response.data.is_active) {
                const destinations = $destinationStore.destinations.get();
                if (!destinations.find(d => d.id === destinationId)) {
                    $destinationStore.destinations.set([response.data, ...destinations]);
                }
            } else {
                removeDestinationFromList('destinations', destinationId);
            }

            // Update current if viewing
            if ($destinationStore.currentDestination.get()?.id === destinationId) {
                $destinationStore.currentDestination.set(response.data);
            }
        }

        return response;
    } catch (error) {
        console.error("Failed to toggle destination status:", error);
        return null;
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function updateDestinationInList(
    listKey: 'destinations' | 'adminDestinations' | 'availableDestinations',
    destinationId: number,
    updates: Partial<Destination> | Destination
) {
    const list = $destinationStore[listKey].get();
    const index = list.findIndex(d => d.id === destinationId);
    if (index !== -1) {
        list[index] = { ...list[index], ...updates };
        $destinationStore[listKey].set([...list]);
    }
}

function removeDestinationFromList(
    listKey: 'destinations' | 'adminDestinations' | 'availableDestinations',
    destinationId: number
) {
    const list = $destinationStore[listKey].get();
    $destinationStore[listKey].set(list.filter(d => d.id !== destinationId));
}

function decrementMetaCount(
    metaKey: 'destinationsMeta' | 'adminDestinationsMeta'
) {
    const meta = $destinationStore[metaKey].get();
    if (meta) {
        $destinationStore[metaKey].set({
            ...meta,
            total: Math.max(0, meta.total - 1)
        });
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Clear all destination data
 */
export function clearDestinationStore() {
    $destinationStore.set({
        destinations: [],
        destinationsMeta: null,
        adminDestinations: [],
        adminDestinationsMeta: null,
        currentDestination: null,
        availableDestinations: [],
        statistics: null,
        isLoading: false,
        isLoadingDetail: false,
        isSubmitting: false,
        error: null,
        errors: null,
        filters: {},
    });
}

/**
 * Clear current destination
 */
export function clearCurrentDestination() {
    $destinationStore.currentDestination.set(null);
}

/**
 * Clear errors
 */
export function clearDestinationErrors() {
    $destinationStore.error.set(null);
    $destinationStore.errors.set(null);
}

/**
 * Refresh current destination
 */
export async function refreshCurrentDestination() {
    const current = $destinationStore.currentDestination.get();
    if (current) {
        return fetchDestinationDetails(current.id);
    }
}

