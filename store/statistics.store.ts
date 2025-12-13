import {observable} from "@legendapp/state";
import {synced} from "@legendapp/state/sync";
import {DashboardStats} from "@/types";
import {ObservablePersistLocalStorage} from "@legendapp/state/persist-plugins/local-storage";
import {api} from "@/hooks/api";
import {auth$} from "@/store/auth.store";

type DashboardStatsStore = {
    data: DashboardStats | null;
    isLoading: boolean;
    error: string | null;
    lastFetched: string | null;
};

export const $dashboardStats = observable<DashboardStatsStore>(
    synced({
        initial:{
            data: null,
            isLoading: false,
            error: null,
            lastFetched: null,
         },
        persist:{
            name: "statsState",
            plugin: ObservablePersistLocalStorage,
        }
    })
);

export const fetchDashboardStats=async (forceRefresh = false)=>{
    const token=auth$.token.get();
    if($dashboardStats.isLoading.get()){ return }
    if(!forceRefresh && $dashboardStats.data.get()){ return }

    try {

      const response  = await api.get<DashboardStats>(
            '/admin/statistics',
            // @ts-ignore
            {token},
            $dashboardStats
        )
      if(response.success && response.data){
          $dashboardStats.data.set(response.data);
          $dashboardStats.isLoading.set(false)
          $dashboardStats.lastFetched.set(new Date().toISOString())
      }
    }catch(error){
    console.error("Failed to fetch dashboard stats:",error);
    }

}

/**
 * Refresh dashboard statistics
 * @param token - Optional auth token
 */
export async function refreshDashboardStats(token?: string) {
    return fetchDashboardStats( true);
}

/**
 * Clear dashboard statistics cache
 */
export function clearDashboardStats() {
    $dashboardStats.data.set(null);
    $dashboardStats.error.set(null);
    $dashboardStats.lastFetched.set(null);
}

/**
 * Check if data is stale (older than 5 minutes)
 */
export function isDashboardStatsStale(): boolean {
    const lastFetched = $dashboardStats.lastFetched.get();
    if (!lastFetched) return true;

    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    return new Date(lastFetched).getTime() < fiveMinutesAgo;
}

/**
 * Auto-refresh if data is stale
 * @param token - Optional auth token
 */
export async function autoRefreshDashboardStats() {
    if (isDashboardStatsStale()) {
        await fetchDashboardStats( true);
    }
}