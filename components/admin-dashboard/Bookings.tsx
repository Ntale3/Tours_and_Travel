'use client'

import {$dashboardStats } from "@/store/statistics.store";
import { Card, CardAction,  CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge"
import { Eye,MapPin, MoreVertical, Plus } from "lucide-react";
import { bookings$, } from "@/store/bookings.store";

const {data:statistics} =$dashboardStats.get()
const {adminBookings} = bookings$.get();

export const Bookings = () => {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                        <Card className="@container/card">
                            <CardHeader>
                                <CardDescription>Active Bookings</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                    {statistics?.bookings?.active}
                                </CardTitle>
                                <CardAction>
                                    <Badge variant="outline">
                                        <IconTrendingUp />
                                        +{statistics?.growth.revenue_growth.percentage}%
                                    </Badge>
                                </CardAction>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Trending up this month <IconTrendingUp className="size-4" />
                                </div>
                                <div className="text-muted-foreground">
                                    Visitors for the last 6 months
                                </div>
                            </CardFooter>
                        </Card>
                        <Card className="@container/card">
                            <CardHeader>
                                <CardDescription>Total Bookings</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                    {statistics?.users.new_this_period}
                                </CardTitle>
                                <CardAction>
                                    <Badge variant="outline">
                                        <IconTrendingUp />
                                        {statistics?.bookings?.total}%
                                    </Badge>
                                </CardAction>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Up{statistics?.growth.user_growth.percentage}% this period <IconTrendingUp className="size-4" />
                                </div>
                                <div className="text-muted-foreground">
                                    Acquisition needs attention
                                </div>
                            </CardFooter>
                        </Card>
                        <Card className="@container/card">
                            <CardHeader>
                                <CardDescription>Upcoming Trips</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                    {statistics?.bookings.upcoming}
                                </CardTitle>
                                <CardAction>
                                    <Badge variant="outline">
                                        <IconTrendingUp />
                                        +{statistics?.growth.booking_growth.percentage}%
                                    </Badge>
                                </CardAction>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Hightened Bookings <IconTrendingUp className="size-4" />
                                </div>
                                <div className="text-muted-foreground">Engagement exceed targets</div>
                            </CardFooter>
                        </Card>
                        <Card className="@container/card">
                            <CardHeader>
                                <CardDescription>Bookings per User</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                    {statistics?.engagement.avg_bookings_per_user}
                                </CardTitle>
                                <CardAction>
                                    <Badge variant="outline">
                                        <IconTrendingDown />
                                        -{statistics?.growth.booking_growth.percentage}%
                                    </Badge>
                                </CardAction>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Steady performance increase <IconTrendingUp className="size-4" />
                                </div>
                                <div className="text-muted-foreground">Meets growth projections</div>
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="px-6">
                                <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
                                <p className="text-muted-foreground mt-1">View and manage all bookings</p>
                            </div>
                            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 mr-4 py-2">
                                <Plus className="mr-2 h-4 w-4" />
                                New Booking
                            </button>
                        </div>

                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm mx-5">
                            <div className="p-3">
                                <div className="relative w-full overflow-auto">
                                    <table className="w-full caption-bottom text-sm">
                                        <thead className="border-b">
                                            <tr className="border-b transition-colors hover:bg-muted/50">
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Reference</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Destination</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Travel Date</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Travelers</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="[&_tr:last-child]:border-0">
                                            {adminBookings?.data.map((booking) => (
                                                <tr key={booking.id} className="border-b transition-colors hover:bg-muted/50">
                                                    <td className="p-4 align-middle">
                                                        <div>
                                                            <p className="text-sm font-medium">{booking.booking_reference}</p>
                                                            <p className="text-xs text-muted-foreground">{new Date(booking.created_at).toLocaleDateString()}</p>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <div>
                                                            <p className="text-sm font-medium">{booking.user?.first_name}</p>
                                                            <p className="text-xs text-muted-foreground">{booking.user?.email}</p>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">{booking.destination?.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle text-sm">
                                                        {new Date(booking.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="p-4 align-middle text-sm">{booking.number_of_travelers}</td>
                                                    <td className="p-4 align-middle">
                                                        <p className="text-sm font-semibold">UGX {booking.total_amount.toLocaleString()}</p>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                            booking.booking_status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-600' :
                                                            booking.booking_status === 'pending' ? 'bg-yellow-500/10 text-yellow-600' :
                                                            'bg-red-500/10 text-red-600'
                                                        }`}>
                                                            {booking.booking_status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 align-middle text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8">
                                                                <Eye className="h-4 w-4" />
                                                            </button>
                                                            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8">
                                                                <MoreVertical className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}