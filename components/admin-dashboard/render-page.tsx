'use client'
import {$navigationStore} from "@/store/navigation.store";
import {observer} from "@legendapp/state/react";
import { fetchDashboardStats, } from "@/store/statistics.store";
import {  fetchAdminBookings } from "@/store/bookings.store";
import { fetchAdminDestinations} from "@/store/destinations.store";
import {Destinations} from "./Destinations"
import { Dashboard } from "./Dashboard";
import { Bookings } from "./Bookings";
import { Users } from "./Users";
import { Blogs } from "./Blogs";
import { getPendingBlogs,getAllBlogsForAdmin} from "@/store/blog.store";



export const RenderPage=observer(()=> {

    async function fetchStatistics (){
        await getAllBlogsForAdmin();
        await fetchDashboardStats()
        await fetchAdminBookings();
        await fetchAdminDestinations();
        await getPendingBlogs()

    }
    fetchStatistics();


    const {activePage} = $navigationStore.get()
    switch (activePage.toLocaleLowerCase()) {
        case "dashboard":
            return (<Dashboard/>)
        case "bookings":
            return (<Bookings />)
        case "destinations":
            return (<Destinations />)
        case "blogs":
            return (<Blogs />)
        case "users":
            return (<Users />)

        default:
            return (<Dashboard />)
    }
})

