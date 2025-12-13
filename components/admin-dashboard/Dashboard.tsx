import { $dashboardStats } from "@/store/statistics.store";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { BookOpen, Calendar,Loader2, User } from "lucide-react";
import { useHydration } from "@/hooks/useHydration";
import { observer } from "@legendapp/state/react";
import { IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "../ui/badge";

const {data:statistics} =$dashboardStats.get()




export const Dashboard = observer(() => {
     if(!useHydration())
  {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
  }

    return (
        <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ${statistics?.overview.total_revenue}
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
          <CardDescription>Bookings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {statistics?.overview.total_bookings}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              {statistics?.growth.user_growth.percentage}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Up{statistics?.growth.user_growth.percentage}% this period <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            only {statistics?.overview.total_bookings} confirmed bookings
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {statistics?.overview.active_users}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +{statistics?.growth.user_growth.percentage}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">only {statistics?.overview.active_users} active users</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Destinations</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {statistics?.overview.active_destinations}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Growing spontaneously</div>
        </CardFooter>
      </Card>
    </div>


    <div className="p-4" >
        <Card className="@container/card">
        <CardHeader>
            <h1 className="text-sm md:text-lg font-bold">Recent activity</h1>
            <p className="text-sm md:text-lg text-muted-foreground">Latest updates from your platform</p>
        </CardHeader>
        <CardContent>
        <p className="text-sm md:text-lg font-bold border-b mb-1 border-border">BOOKINGS</p>
        {statistics?.recent_activity.recent_bookings.slice(0,2).map((b,i)=>(
                <div className="flex items-start gap-4 bg-background my-2 rounded-3xl shadow-4xl p-4 " key={i}>
                    <div className={`h-10 w-10 rounded-full  flex items-center justify-center flex-shrink-0`}>
                    <Calendar className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1 border-b mb-1 p-2">
                    <p className="text-sm font-medium leading-none ">Booking Created</p>
                    <p className="text-sm text-muted-foreground">{b.reference} for {b.destination} </p>
                    <p className="text-xs text-muted-foreground">{b.created_at}</p>
                    </div>
                </div>
        ))}
        <p className="text-sm md:text-lg font-bold border-b mb-1 border-border">BLOGS</p>
        {statistics?.recent_activity.recent_blogs.slice(0,2).map((b,i)=>(
                <div className="flex items-start gap-4 bg-background my-2 rounded-3xl shadow-4xl p-4"  key={i}>
            <div className={`h-10 w-10 rounded-full  flex items-center justify-center flex-shrink-0`}>
            <BookOpen className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-1 border-b p-2 rounded-xl">
                <p className="text-sm font-medium leading-none ">Booking Created</p>
                <p className="text-sm text-muted-foreground">{b.title} by {b.author} </p>
                <p className="text-xs text-muted-foreground">{b.created_at}</p>
        </div>
        </div>
        ))}

        <p className="text-sm md:text-lg font-bold border-b mb-1 border-border">New User</p>
        {statistics?.recent_activity.recent_users.slice(0,2).map((b,i)=>(
                <div className="flex items-start gap-4 bg-background my-2 rounded-3xl shadow-4xl p-4"  key={b.id}>
            <div className={`h-10 w-10 rounded-full  flex items-center justify-center flex-shrink-0`}>
            <User className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-1 border-b p-2 rounded-xl">
                <p className="text-sm font-medium leading-none ">New User Registered</p>
                <p className="text-sm text-muted-foreground">{`${b.name} ---> ${b.email}`}</p>
                <p className="text-xs text-muted-foreground">{b.created_at}</p>
        </div>
        </div>
        ))}
        </CardContent>
        </Card>



    </div>



                </div>
            </div>
        </div>
    )
})