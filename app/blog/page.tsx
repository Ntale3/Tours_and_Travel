'use client'
import React, { useState } from 'react';
import { Search, Calendar, User, ArrowRight, Heart, MessageCircle, Share2, BookOpen, Plus, X, Upload, Eye, Save, Send, Tag, MapPin } from 'lucide-react';
import Header from '@/Components/Header';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  likes: number;
  comments: number;
  featured?: boolean;
  userGenerated?: boolean;
  status?: 'draft' | 'pending' | 'published';
}

interface NewBlogPost {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  location: string;
  image: string;
  status: 'draft' | 'pending';
}

const BlogPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPost, setNewPost] = useState<NewBlogPost>({
    title: '',
    content: '',
    excerpt: '',
    category: 'Adventure',
    tags: [],
    location: '',
    image: '',
    status: 'draft'
  });
  const [currentTag, setCurrentTag] = useState('');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Hidden Temples of Northern Thailand: A Spiritual Journey",
      excerpt: "Discover the mystical temples tucked away in Thailand's mountainous north, where ancient traditions meet breathtaking landscapes.",
      category: "Culture",
      author: "Sarah Chen",
      date: "July 28, 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1563492065-5a4b989d9d56?w=800&h=600&fit=crop",
      likes: 142,
      comments: 23,
      featured: true
    },
    {
      id: 2,
      title: "Island Hopping in the Maldives: Your Ultimate Guide",
      excerpt: "From overwater bungalows to pristine coral reefs, explore the best islands and experiences the Maldives has to offer.",
      category: "Adventure",
      author: "Marcus Rivera",
      date: "July 25, 2025",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop",
      likes: 89,
      comments: 17,
      featured: true
    },
    {
      id: 3,
      title: "My Solo Backpacking Adventure Through Vietnam",
      excerpt: "Three weeks, countless memories, and life-changing experiences exploring Vietnam's hidden gems on a budget.",
      category: "Adventure",
      author: "Anney (You)",
      date: "July 30, 2025",
      readTime: "15 min read",
      image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop",
      likes: 67,
      comments: 12,
      userGenerated: true,
      status: 'published'
    },
    {
      id: 4,
      title: "Kerala Backwaters: Floating Through Paradise",
      excerpt: "Navigate the tranquil waterways of Kerala on a traditional houseboat and experience India's most serene landscapes.",
      category: "Nature",
      author: "Priya Nair",
      date: "July 22, 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
      likes: 76,
      comments: 12
    },
    {
      id: 5,
      title: "Street Food Adventures in Bangkok",
      excerpt: "From pad thai to mango sticky rice, navigate Bangkok's incredible street food scene like a local.",
      category: "Food",
      author: "David Kim",
      date: "July 20, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&h=600&fit=crop",
      likes: 203,
      comments: 45
    },
    {
      id: 6,
      title: "Bali's Best Kept Secrets: Beyond the Tourist Trail",
      excerpt: "Uncover hidden waterfalls, secluded beaches, and authentic villages away from Bali's crowded hotspots.",
      category: "Adventure",
      author: "Lisa Martinez",
      date: "July 18, 2025",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop",
      likes: 156,
      comments: 31
    }
  ];

  const categories = ['Adventure', 'Culture', 'Food', 'Nature', 'Sustainability', 'Tips'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesFilter = activeFilter === 'All' || post.category === activeFilter;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const handleAddTag = () => {
    if (currentTag.trim() && !newPost.tags.includes(currentTag.trim())) {
      setNewPost(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmitPost = (status: 'draft' | 'pending') => {
    console.log('Submitting post:', { ...newPost, status });
    // Here you would typically send to your API
    setShowCreateModal(false);
    setNewPost({
      title: '',
      content: '',
      excerpt: '',
      category: 'Adventure',
      tags: [],
      location: '',
      image: '',
      status: 'draft'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-600 via-black-500 to-orange-400">
          

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
              TRAVEL BLOG
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Stories, guides, and inspiration from around the world. Discover your next adventure through our travel experiences.
            </p>
            
            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                />
              </div>
              
              {/* Share Your Journey Button */}
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Share Your Journey
              </button>
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
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-white/10 backdrop-blur-md text-white hover:bg-orange-500/20 border border-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Posts */}
          {activeFilter === 'All' && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-orange-400" />
                Featured Stories
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-orange-400/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/10"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                      {post.userGenerated && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Community
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-white/80 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </span>
                        </div>
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-white/60">
                          <button className="flex items-center gap-1 hover:text-orange-400 transition-colors">
                            <Heart className="w-4 h-4" />
                            {post.likes}
                          </button>
                          <button className="flex items-center gap-1 hover:text-orange-400 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            {post.comments}
                          </button>
                          <button className="hover:text-orange-400 transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                        <button className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors group">
                          Read More
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <article
                key={post.id}
                className="group bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-orange-400/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  {post.userGenerated && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Community
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-white/60 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white/60">
                      <button className="flex items-center gap-1 hover:text-orange-400 transition-colors">
                        <Heart className="w-3 h-3" />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-orange-400 transition-colors">
                        <MessageCircle className="w-3 h-3" />
                        {post.comments}
                      </button>
                    </div>
                    <button className="flex items-center gap-1 text-orange-400 hover:text-orange-300 transition-colors group text-sm">
                      Read
                      <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
              Load More Stories
            </button>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-20 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Never Miss an Adventure</h3>
            <p className="text-white/80 mb-6 max-w-md mx-auto">
              Get the latest travel stories, tips, and destination guides delivered straight to your inbox.
            </p>
            <div className="flex max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-3 px-6 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Create Blog Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Plus className="w-6 h-6 text-orange-400" />
                Share Your Journey
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-white font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Give your story an amazing title..."
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl py-3 px-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Category and Location */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Category *</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                    <input
                      type="text"
                      value={newPost.location}
                      onChange={(e) => setNewPost(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Where did this happen?"
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-white font-medium mb-2">Cover Image</label>
                <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-orange-400/50 transition-colors">
                  <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
                  <p className="text-white/80 mb-2">Drop your image here or click to browse</p>
                  <p className="text-white/60 text-sm">Supports: JPG, PNG, WebP (Max 5MB)</p>
                  <input
                    type="url"
                    value={newPost.image}
                    onChange={(e) => setNewPost(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="Or paste image URL..."
                    className="w-full mt-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg py-2 px-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-white font-medium mb-2">Excerpt *</label>
                <textarea
                  value={newPost.excerpt}
                  onChange={(e) => setNewPost(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Write a compelling summary of your story (150-200 characters)..."
                  rows={3}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl py-3 px-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                />
                <div className="text-right text-white/60 text-sm mt-1">
                  {newPost.excerpt.length}/200
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-white font-medium mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {newPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-orange-400/30"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-white transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      placeholder="Add tags (travel, solo, budget...)"
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl py-2 pl-10 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  <button
                    onClick={handleAddTag}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-white font-medium mb-2">Your Story *</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share your amazing travel experience... Tell us about the places you visited, people you met, challenges you faced, and memories you made. Be detailed and authentic!"
                  rows={12}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl py-4 px-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                />
                <div className="text-right text-white/60 text-sm mt-1">
                  {newPost.content.length} characters (minimum 500 recommended)
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-white/20">
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSubmitPost('draft')}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-colors border border-white/20"
                  >
                    <Save className="w-4 h-4" />
                    Save Draft
                  </button>
                  <button
                    onClick={() => handleSubmitPost('pending')}
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Send className="w-4 h-4" />
                    Submit for Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Destinations Sidebar */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 hidden xl:block">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 space-y-4">
          <div className="text-white font-semibold text-sm mb-4">Popular Destinations</div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-12 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-white">BALI</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-12 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-white">KERALA</span>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold text-sm">$899</div>
                <div className="text-yellow-400 text-xs">★ 4.7</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer border-2 border-orange-400">
              <div className="w-12 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-white">THAILAND</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-white">MALDIVES</span>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold text-sm">$2,199</div>
                <div className="text-yellow-400 text-xs">★ 4.9</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeInUp 1s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        article {
          animation: fadeInUp 0.6s ease-out both;
        }
      `}</style>
      <Header/>
    </div>
  );
};

export default BlogPage;