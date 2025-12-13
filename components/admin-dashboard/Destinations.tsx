import { redirect, useRouter, useSearchParams } from 'next/navigation';


import { Card,  CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Plus } from "lucide-react";
import { $dashboardStats } from '@/store/statistics.store';
import { $destinationStore } from '@/store/destinations.store';
import { CreateDestinationDialog } from './CreateDestination';
import { ReusablePagination } from '../pagination';
import { DestinationCard } from './destnation-card';
import {deleteDestination,fetchAdminDestinations,fetchDestinations} from '@/store/destinations.store'
const {data:statistics} =$dashboardStats.get()
const {adminDestinations,adminDestinationsMeta,error,errors} = $destinationStore.get();






export const Destinations = () => {

  const router = useRouter();
  const searchParams = useSearchParams();



    const handleDelete= async (id: number) => {
     await deleteDestination(id)
     await fetchAdminDestinations()
     fetchDestinations();
     if(error===null && errors === null){
      window.alert("destination Deleted succesfully")
     }
    };

    const handleView = (id: number) => {
      redirect(`destinations/${id}`)
    };

   

  const handlePageChange = (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', page.toString());
      router.push(`?${params.toString()}`);
    };







  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card">
              <CardHeader>
                <CardDescription>Total Destinations</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {statistics?.overview.total_destinations}
                </CardTitle>
                <Badge variant="outline" className="w-fit">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +{statistics?.growth.booking_growth.percentage}%
                </Badge>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  Trending up this month <TrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Visitors for the last 6 months
                </div>
              </CardFooter>
            </Card>

            <Card className="@container/card">
              <CardHeader>
                <CardDescription>Active Destinations</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {statistics?.overview.active_destinations}
                </CardTitle>
                <Badge variant="outline" className="w-fit">
                  <TrendingDown className="mr-1 h-3 w-3" />
                  {statistics?.growth.booking_growth.percentage}
                </Badge>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  Down 20% this period <TrendingDown className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Acquisition needs attention
                </div>
              </CardFooter>
            </Card>

            <Card className="@container/card">
              <CardHeader>
                <CardDescription>InActive Destinations</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {statistics?.content?.destinations.inactive}
                </CardTitle>
                <Badge variant="outline" className="w-fit">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +12.5%
                </Badge>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  Strong user retention <TrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">Engagement exceed targets</div>
              </CardFooter>
            </Card>

            <Card className="@container/card">
              <CardHeader>
                <CardDescription>Average Reviews</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {statistics?.content.reviews.avg_rating}
                </CardTitle>
                <Badge variant="outline" className="w-fit">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +4.5%
                </Badge>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  Steady performance increase <TrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">Meets growth projections</div>
              </CardFooter>
            </Card>
          </div>
        <div className="flex flex-end pl-6">
        <CreateDestinationDialog
          trigger={
            <Button>
              <Plus className="w-5 h-5"/>
              Create Destination
            </Button>
          }
        />
        </div>

          {/* Destinations Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4 lg:px-6">
            {adminDestinations.map(dest=>
              <DestinationCard
                key={dest.id}
                destination={dest}
                onDelete={handleDelete}
                onView={handleView}
              />
            )}

          </div>

            <ReusablePagination
            meta={adminDestinationsMeta}
            paginatedDataName='Destionations'
            onPageChange={handlePageChange}
            />

        </div>
      </div>
    </div>
  );
};

export default Destinations;