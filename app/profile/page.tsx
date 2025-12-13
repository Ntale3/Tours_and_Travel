'use client'
import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  DollarSign,
  Edit3,
  Bookmark,
  Users,
  CheckCircle,
  XCircle,
  MoveRight,
  AlertTriangle,
  Mail,
  Phone,
  Settings,
  Camera,
  Trash2,
  Eye,
  Globe,
  Save,
  Shield,
  Download,
  Lock,
  Loader2,
  Power
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { useHydration } from '@/hooks/useHydration';
import { auth$ } from '@/store/auth.store';
import { $blogStore } from '@/store/blog.store';
import { bookings$ } from '@/store/bookings.store';
import { IconTrendingUp } from '@tabler/icons-react';
import { BlogNotfound,BookingNotFound} from '@/components/not-found';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const Dashboard = () => {
  const isHydrated = useHydration();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Sarah',
    lastName: 'Anderson',
    email: 'sarah.anderson@example.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
  });

 if(!isHydrated)
  {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
  }
  const {user,isAuthenticated} = auth$.get();
  const {myBlogs:blogs} = $blogStore.get()
  const {userBookings:bookings} = bookings$.get();
  if(!isAuthenticated){
    redirect('/sign-in')
  }






  const stats = [
    {
      label: 'Total Bookings',
      value: '24',
      change: '+12%',
      icon: Bookmark,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'Published Blogs',
      value: '18',
      change: '+5%',
      icon: Edit3,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      label: 'Countries Visited',
      value: '32',
      change: '+8',
      icon: Globe,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      label: 'Total Spent',
      value: '$42.8K',
      change: '+18%',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    }
  ];


  //@ts-ignore
  const getStatusBadge = (status) => {
    const variants = {
      confirmed: { variant: 'default', className: 'bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20' },
      pending: { variant: 'secondary', className: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20' },
      completed: { variant: 'default', className: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20' },
      cancelled: { variant: 'destructive', className: 'bg-destructive/10 hover:bg-destructive/20' },
      published: { variant: 'default', className: 'bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20' },
      draft: { variant: 'outline' }
    };

    //@ts-ignore
    const config = variants[status] || variants.draft;

    return (
      <Badge variant={config.variant} className={config.className}>
        {status === 'confirmed' && <CheckCircle className="h-3 w-3 mr-1" />}
        {status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
        {status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
        {status === 'cancelled' && <XCircle className="h-3 w-3 mr-1" />}
        {status === 'published' && <CheckCircle className="h-3 w-3 mr-1" />}
        {status === 'draft' && <Edit3 className="h-3 w-3 mr-1" />}
        <span className="capitalize">{status}</span>
      </Badge>
    );
  };



  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center shadow-lg">
                <span className="font-bold text-white text-lg">F</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">My Profile</h1>
                <p className="text-xs text-muted-foreground">Welcome back {user?.first_name}!</p>
              </div>
            </div>

            <Link href={'/'}>
            <Button variant="ghost" size="icon">
              <MoveRight className="h-5 w-5" />
            </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-2">
                  {user?.avatar &&<AvatarImage src={user.avatar} alt={user?.first_name} />}
                  <AvatarFallback>{profile.firstName[0]}{profile.lastName[0]}</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 hover:bg-black/70 rounded-full"
                >
                  <Camera className="h-5 w-5 text-white" />
                </Button>
              </div>

              <div className="flex-1">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {user?.first_name} {user?.last_name}
                </h2>
                <div className="flex flex-wrap gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{user?.phone_number}</span>
                  </div>
                </div>
              </div>

              <Button variant="secondary">
              <Power className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card className="@container/card" key={index}>
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {stat.value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  {stat.change}
                </Badge>
              </CardAction>
            </CardHeader>
      </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">Recent Bookings</h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All
                </Button>
              </div>
              {bookings.length===0?<BookingNotFound/>:<div className="grid gap-6">
                {bookings.slice(0, 2).map((booking) => (
                  <Card key={booking.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-64 h-48 md:h-auto relative overflow-hidden">
                        <img
                          src={booking.destination?.images[0].url}
                          alt={booking.destination?.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <CardContent className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground mb-3">{booking.destination?.name}</h4>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                <Calendar className="h-4 w-4" />
                                <span>{booking.created_at}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                <Users className="h-4 w-4" />
                                <span>{booking.number_of_travelers} travelers</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            {getStatusBadge(booking.booking_status)}
                            <p className="text-2xl font-bold text-foreground mt-3">{booking.total_amount}</p>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex gap-2">
                          <Button variant="secondary" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          {booking.booking_status === 'pending' && (
                            <Button variant="destructive" size="sm">
                              Cancel
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>}
            </div>

            <div>


              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">Latest Blogs</h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All
                </Button>
              </div>
              {blogs.length===0?(<BlogNotfound/>):(<div className="grid md:grid-cols-2 gap-6">
                {blogs.slice(0, 2).map((blog) => (
                  <Card key={blog.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.featured_image?.at(0)}
                        alt={blog.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        {getStatusBadge(blog.status)}
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{blog.title}</h4>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{blog.excerpt}</p>

                      <Separator className="my-4" />

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{blog.created_at}</span>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{blog.views_count}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>)}
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">All Bookings</h3>
            </div>

            {
              bookings.length===0?
              (<BookingNotFound/>)
              :
              <div className="grid gap-6">
                {bookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-64 h-48 md:h-auto relative overflow-hidden">
                      <img
                        src={booking.destination?.images[0].url}
                        alt={booking.destination?.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <CardContent className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-foreground mb-3">{booking.destination?.name}</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                              <Calendar className="h-4 w-4" />
                              <span>{booking?.created_at}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                              <Users className="h-4 w-4" />
                              <span>{booking?.number_of_travelers} travelers</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          {getStatusBadge(booking.booking_status)}
                          <p className="text-2xl font-bold text-foreground mt-3">{booking.total_amount}</p>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        {booking.booking_status === 'pending' && (
                          <Button variant="destructive" size="sm">
                            Cancel
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>}
          </TabsContent>

          {/* Blogs Tab */}
          <TabsContent value="blogs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">My Blog Posts</h3>
            </div>

            {blogs.length === 0?
              (<BlogNotfound/>)
              :
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.featured_image?.at(0)}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      {getStatusBadge(blog.status)}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{blog.title}</h4>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{blog.excerpt}</p>

                    <Separator className="mb-4" />

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{blog.created_at}</span>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{blog.views_count}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" className="flex-1">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={user?.first_name}
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={user?.last_name}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={user?.phone_number}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>


                {isEditing && (
                  <Button className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about your bookings and blogs</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get instant updates on your mobile device</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive deals, offers, and travel inspiration</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Community Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about new blogs from travelers</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="secondary" className="w-full justify-start">
                  <Lock className="h-4 w-4 mr-3" />
                  Change Password
                  <MoveRight className="h-4 w-4 ml-auto" />
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-3" />
                  Two-Factor Authentication
                  <MoveRight className="h-4 w-4 ml-auto" />
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-3" />
                  Privacy Settings
                  <MoveRight className="h-4 w-4 ml-auto" />
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-3" />
                  Download Your Data
                  <MoveRight className="h-4 w-4 ml-auto" />
                </Button>
              </CardContent>
            </Card>

            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Danger Zone</AlertTitle>
              <AlertDescription>
                <p className="mb-4">
                  Once you delete your account, there is no going back. All your data, bookings, and blogs will be permanently removed.
                </p>
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete My Account
                </Button>
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Delete Account
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setShowDeleteModal(false)}>
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;