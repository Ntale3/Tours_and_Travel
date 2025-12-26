'use client'
import React, { useState } from 'react';
import { BookOpen, Plus, X, Search, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import { useHydration } from '@/hooks/useHydration';
import { $blogStore, fetchBlogs } from '@/store/blog.store';
import BlogDialog from '@/components/admin-dashboard/blog-dialog';
import { Button } from '@/components/ui/button';
import {BlogCard} from "@/components/blog/blog-card"



const BlogPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  if(!useHydration())
    {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading destination...</p>
        </div>
      </div>
      )
    }

      const getBlogs= async()=>{
        const response=  await fetchBlogs()
        return response
      }

      getBlogs()


      const {blogs} = $blogStore.get();



  const categories = ['Adventure', 'Culture', 'Food', 'Nature', 'Sustainability', 'Tips'];



  const filteredPosts = blogs.filter(post => {
    const matchesFilter = activeFilter === 'All' || post.tags.includes(activeFilter);
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredPosts = filteredPosts.slice(0, 2);
  const regularPosts = filteredPosts.slice(2);

  return (
    <div className='min-h-screen bg-background'>
      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              TRAVEL BLOG
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Stories, guides, and inspiration from around the world. Discover your next adventure through our travel experiences.
            </p>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mb-8 flex-wrap items-center">
              {/* Search Bar */}
              <div className="relative max-w-md w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-input border border-border rounded-full py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>

              {/* Share Your Journey Button */}
             <BlogDialog
              mode="create"
              triggerButton={
                <Button variant="secondary" className="rounded-full h-12">
                  <Plus className="w-4 h-4 mr-2" />
                  Share your Journey
                </Button>
              }
            />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {['All', ...categories].map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === category
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* No Blogs Message */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-2">No Blogs Found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || activeFilter !== 'All'
                  ? "We couldn't find any blogs matching your search criteria. Try adjusting your filters or search terms."
                  : "No travel stories have been published yet. Be the first to share your adventure!"
                }
              </p>
              {(searchTerm || activeFilter !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveFilter('All');
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}

          {/* Featured Posts */}
          {filteredPosts.length > 0 && featuredPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-primary" />
                Featured Stories
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} featured />
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts Grid */}
          {regularPosts.length > 0 && (
            <>
              {featuredPosts.length > 0 && (
                <h2 className="text-3xl font-bold text-foreground mb-8">More Stories</h2>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, index) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                  />
                ))}
              </div>
            </>
          )}

          {/* Load More Button */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Load More Stories
              </button>
            </div>
          )}

          {/* Newsletter Signup */}
          {filteredPosts.length > 0 && (
            <div className="mt-20 bg-card border border-border rounded-3xl p-8 text-center">
              <h3 className="text-3xl font-bold text-foreground mb-4">Never Miss an Adventure</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Get the latest travel stories, tips, and destination guides delivered straight to your inbox.
              </p>
              <div className="flex flex-col md:flex-row max-w-md mx-auto gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-input border border-border rounded-full py-3 px-6 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Create Blog Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex justify-center items-center p-4">
          <div className="w-full max-w-4xl max-h-[90vh] bg-card rounded-2xl shadow-2xl overflow-y-auto border border-border">
            <button
              onClick={() => setShowCreateModal(false)}
              className="sticky top-4 float-right m-4 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full p-2 transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 pt-16">
              <h2 className="text-3xl font-bold text-foreground mb-6">Share Your Travel Story</h2>
              <p className="text-muted-foreground mb-8">
                Your blog post will be reviewed by our team before being published. This helps maintain the quality of our community.
              </p>
            </div>
          </div>
        </div>
      )}
      <Header/>
    </div>
  );
};

export default BlogPage;