'use client'
import {  IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { $dashboardStats } from "@/store/statistics.store"
import { Button } from "../ui/button"
import {  Plus } from "lucide-react"
import { Tabs } from "@radix-ui/react-tabs"
import { TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { $blogStore,getAllBlogsForAdmin,updateBlogApprovalStatus } from "@/store/blog.store"
import {toast} from "sonner"



import { BlogCard } from "./BlogCard"
import { redirect, useRouter, useSearchParams } from "next/navigation"
import { ReusablePagination } from "../pagination";
import BlogDialog from "./blog-dialog"
import { BlogNotfound } from "../not-found"


export const Blogs = () => {
const {data:statistics} =$dashboardStats.get()
const {pendingBlogs,allBlogs,pendingBlogsMeta,allBlogsMeta,error,errors} = $blogStore.get();

const router = useRouter();
const searchParams = useSearchParams();




  const handleApprove = async(id: number) => {
    await updateBlogApprovalStatus(id,"approve")
    await getAllBlogsForAdmin();
    if(!error && ! errors){
      toast.success("Blog Approved")
      return;
    }else{
      toast.error("Failed to approve Blog")
      return;
    }


  };

  const handleReject = async(id: number) => {

    await updateBlogApprovalStatus(id,"reject")
    await getAllBlogsForAdmin();
    if(!error && ! errors){
      toast.success("Blog Rejected")
      return;
    }else{
      toast.error("Rejection Failed")
      return;
    }
  };

  const handleView = (id: number) => {
    redirect(`blogs/${id}`)
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
                    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Blogs</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {statistics?.overview.total_blogs}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +{statistics?.growth.blog_growth?.percentage}%
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
          <CardDescription>Pending Blogs</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {statistics?.overview.pending_blogs}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
               +{statistics?.growth.blog_growth?.percentage}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Approved Blogs</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {statistics?.overview.approved_blogs}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {statistics?.growth.blog_growth.percentage}%
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
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>

      <div className="px-6">


          <BlogDialog
              mode="create"
              triggerButton={
                <Button variant="secondary">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Blog
                </Button>
              }
            />


        <div className="my-2">
          <Tabs defaultValue="outline" className="space-y-6">
              <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
                <TabsTrigger value="outline">Pending Blogs</TabsTrigger>
                <TabsTrigger value="past-performance">
                  All BLogs <Badge variant="secondary">3</Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="outline"
                className="relative flex flex-col gap-4 overflow-auto  lg:px-6"
              >


                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {pendingBlogs.length === 0?<div className="flex flex-1 items-center justify-center w-full">
                    <BlogNotfound />
                  </div>:
                   pendingBlogs.map(blog=>(
                      <BlogCard
                        blog={blog}
                        key={blog.id}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onView={handleView}

                      />

                  ))
                }
                  </div>

                {/* Pagination with metadata display */}

                <ReusablePagination
                  paginatedDataName="Pending Blogs"
                  meta={pendingBlogsMeta}
                  onPageChange={handlePageChange}
                />






              </TabsContent>

              <TabsContent
                      value="past-performance"
                      className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
                    >
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {

                  allBlogs.length === 0?<div>
                    <BlogNotfound />
                  </div>:

                  allBlogs.map(blog=>(
                      <BlogCard
                        blog={blog}
                        key={blog.id}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onView={handleView}
                        />

                  ))
                }
                </div>
                  {/* Pagination with metadata display */}

                <ReusablePagination
                  paginatedDataName="All Blogs"
                  meta={allBlogsMeta}
                  onPageChange={handlePageChange}
                />


              </TabsContent>


          </Tabs>
        </div>




      </div>
        </div>
    </div>
</div>
    )
}

