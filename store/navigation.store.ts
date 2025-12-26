import { observable } from "@legendapp/state";

type NavigationStore = {
    activePage: string;
}

export const $navigationStore = observable<NavigationStore>({
    activePage: "Dashboard"
});

// Define actions separately
export const setActivePage = (page: string) => {
    $navigationStore.activePage.set(page);
};