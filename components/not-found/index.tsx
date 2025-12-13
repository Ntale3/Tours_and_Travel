import Link from "next/link";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export function BlogNotfound(){
    return (
      <div className="bg-background flex items-center justify-center">
        <div className="text-center">
           <h2 className="text-2xl font-bold text-foreground mb-2">There are Blogs yet!</h2>
          <p className="text-muted-foreground mb-6">create your First Blog Post</p>
          <Link href="/createBlog">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all">
              Create Blog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  export function BookingNotFound(){
    return (
      <div className="bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">No Bookings yet!</h2>
          <p className="text-muted-foreground mb-6">Book your First Trip with us</p>
          <Link href="/destinations">
            <Button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all">
              <Plus className="h-4 w-4 mr-2" />
              View Destinations
            </Button>
          </Link>
        </div>
      </div>
    );

  }