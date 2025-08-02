'use client'
import React, { useState } from 'react';
import { ArrowLeft, Calendar, User, Heart, MessageCircle, Share2, BookOpen, Clock, MapPin, Tag, Send, ThumbsUp, Reply, MoreHorizontal, Facebook, Twitter, Instagram, Link, X } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

interface RelatedPost {
  id: number;
  title: string;
  image: string;
  category: string;
  readTime: string;
}

const BlogDetailPage: React.FC = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  const blogPost = {
    id: 1,
    title: "Hidden Temples of Northern Thailand: A Spiritual Journey",
    content: `
      <p>Northern Thailand holds secrets that most travelers never discover. Beyond the bustling markets of Chiang Mai and the famous elephant sanctuaries lies a world of ancient spirituality, where golden temples emerge from morning mist and centuries-old traditions continue unchanged.</p>

      <p>My journey began at 4 AM, when the alarm jolted me from a peaceful sleep in my guesthouse in Chiang Rai. The plan was ambitious: visit five hidden temples in remote areas that required hours of hiking through dense jungle and mountainous terrain. What I discovered was far more than just architectural marvels – it was a transformative experience that changed my perspective on travel and spirituality.</p>

      <h2>Wat Rong Khun: The White Temple</h2>
      
      <p>Our first stop was Wat Rong Khun, known as the White Temple. Unlike traditional Thai temples with their golden facades, this contemporary Buddhist temple gleams in pure white, symbolizing the purity of Buddha. The intricate details are mesmerizing – every surface is covered in mirrors that sparkle in the sunlight, creating an almost otherworldly atmosphere.</p>

      <p>The bridge leading to the main hall represents the crossing from the cycle of rebirth to the path of enlightenment. Below, hundreds of outstretched hands emerge from the ground, representing unrestrained desire. The symbolism is powerful and immediate – you feel the weight of the message as you walk across.</p>

      <h2>The Mountain Temple of Doi Suthep</h2>

      <p>The 300-step climb to Wat Phra That Doi Suthep tested my endurance, but the reward was magnificent. Perched 1,073 meters above sea level, this temple offers panoramic views of Chiang Mai below. The golden chedi at the center houses a relic of Buddha, and pilgrims from around the world come here to pay their respects.</p>

      <p>What struck me most was the devotion of the local visitors. Families would climb the steps together, carrying flowers and incense, their faces filled with quiet reverence. Children as young as five made the entire climb without complaint, understanding the significance of their journey.</p>

      <h2>Into the Jungle: Wat Pa Thammachat</h2>

      <p>The most challenging part of our journey was reaching Wat Pa Thammachat, a forest monastery hidden deep in the mountains. The two-hour hike through thick jungle tested our resolve, but our local guide, Somchai, kept our spirits high with stories of the monks who had walked these same paths for decades.</p>

      <p>The monastery itself is incredibly simple – just a few wooden structures built in harmony with the natural environment. The monks here practice meditation in caves and follow strict rules of simplicity. Meeting the head monk, who had lived there for 30 years, was a profound experience. Despite the language barrier, his peaceful presence and gentle smile communicated more than words ever could.</p>

      <h2>Lessons from the Journey</h2>

      <p>This spiritual journey taught me that travel isn't just about collecting passport stamps or Instagram photos. It's about opening yourself to experiences that challenge your perspective and connect you with something larger than yourself. The temples of Northern Thailand offer this in abundance – each one a doorway to understanding, peace, and personal growth.</p>

      <p>If you're planning a similar journey, I recommend traveling with a local guide who can provide cultural context and ensure you're being respectful of sacred spaces. Dress modestly, remove your shoes when required, and approach each temple with an open heart and mind.</p>
    `,
    excerpt: "Discover the mystical temples tucked away in Thailand's mountainous north, where ancient traditions meet breathtaking landscapes.",
    category: "Culture",
    author: "Sarah Chen",
    authorBio: "Travel writer and photographer specializing in Southeast Asian culture and spirituality. Sarah has visited over 40 countries and lived in Thailand for 3 years.",
    authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    date: "July 28, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1563492065-5a4b989d9d56?w=1200&h=600&fit=crop",
    likes: 142,
    comments: 23,
    tags: ["Thailand", "Temples", "Spirituality", "Culture", "Travel", "Buddhism"],
    location: "Chiang Mai, Thailand"
  };

  const comments: Comment[] = [
    {
      id: 1,
      author: "Michael Torres",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content: "This was such an inspiring read! I've been to Chiang Mai twice but never ventured to these hidden temples. Definitely adding them to my next itinerary. The way you described the spiritual experience really resonated with me.",
      date: "2 days ago",
      likes: 12,
      replies: [
        {
          id: 11,
          author: "Sarah Chen",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
          content: "Thank you Michael! I hope you get to experience that same sense of peace and wonder. Make sure to hire a local guide - it makes all the difference in understanding the cultural significance.",
          date: "1 day ago",
          likes: 5
        }
      ]
    },
    {
      id: 2,
      author: "Emma Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content: "Beautiful photography and storytelling! As someone who practices meditation, I'm really drawn to visiting Wat Pa Thammachat. How did you arrange the visit to the forest monastery?",
      date: "3 days ago",
      likes: 8
    },
    {
      id: 3,
      author: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content: "The White Temple is absolutely stunning! I visited last year and was blown away by the detail. Your description perfectly captures the feeling of walking across that bridge.",
      date: "4 days ago",
      likes: 6
    }
  ];

  const relatedPosts: RelatedPost[] = [
    {
      id: 2,
      title: "Street Food Adventures in Bangkok",
      image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop",
      category: "Food",
      readTime: "5 min read"
    },
    {
      id: 3,
      title: "Bali's Best Kept Secrets",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
      category: "Adventure",
      readTime: "10 min read"
    },
    {
      id: 4,
      title: "Solo Travel Safety Tips for Asia",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
      category: "Tips",
      readTime: "7 min read"
    }
  ];

  const handleShare = (platform: string) => {
    console.log(`Sharing to ${platform}`);
    setShowShareModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-md z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center font-bold text-white">
                F
              </div>
              <span className="text-xl font-bold text-white">Foxico</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full">
              <a href="#" className="text-white/80 hover:text-orange-400 transition-colors">Home</a>
              <a href="#" className="text-white/80 hover:text-orange-400 transition-colors">Destinations</a>
              <a href="#" className="text-orange-400 font-semibold relative">
                Blog
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-400 rounded-full"></div>
              </a>
              <a href="#" className="text-white/80 hover:text-orange-400 transition-colors">About</a>
              <a href="#" className="text-white/80 hover:text-orange-400 transition-colors">Contact</a>
              <a href="#" className="text-white/80 hover:text-orange-400 transition-colors">News</a>
            </nav>

            {/* User Profile */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="hidden sm:inline text-white">Hello, Anney !</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </button>

          {/* Article Header */}
          <article className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 mb-8">
            {/* Hero Image */}
            <div className="relative h-96 overflow-hidden">
              <img
                src={blogPost.image}
                alt={blogPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6">
                <span className="bg-orange-500 text-white px-4 py-2 rounded-full font-medium">
                  {blogPost.category}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-6 right-6 flex gap-3">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`w-12 h-12 rounded-full backdrop-blur-md transition-all ${
                    isBookmarked 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <BookOpen className="w-5 h-5 mx-auto" />
                </button>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all"
                >
                  <Share2 className="w-5 h-5 mx-auto" />
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-8">
              {/* Title and Meta */}
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {blogPost.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-white/70 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{blogPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{blogPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{blogPost.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{blogPost.location}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {blogPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm border border-orange-400/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center gap-6 text-white/60">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center gap-2 transition-colors ${
                      isLiked ? 'text-red-400' : 'hover:text-red-400'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    {blogPost.likes + (isLiked ? 1 : 0)}
                  </button>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    {blogPost.comments}
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    2.1k reads
                  </div>
                </div>
              </div>

              {/* Article Body */}
              <div 
                className="prose prose-lg prose-invert max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
                style={{
                  lineHeight: '1.8',
                  fontSize: '1.1rem'
                }}
              />

              {/* Author Card */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 mb-8">
                <div className="flex items-start gap-4">
                  <img
                    src={blogPost.authorAvatar}
                    alt={blogPost.author}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">About {blogPost.author}</h3>
                    <p className="text-white/80 mb-4">{blogPost.authorBio}</p>
                    <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105">
                      Follow
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">Comments ({comments.length})</h3>
                
                {/* Add Comment */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 mb-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts about this journey..."
                        rows={4}
                        className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl py-3 px-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                      />
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-white/60 text-sm">{newComment.length}/500</span>
                        <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                      <div className="flex items-start gap-4">
                        <img
                          src={comment.avatar}
                          alt={comment.author}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-white">{comment.author}</h4>
                            <span className="text-white/60 text-sm">{comment.date}</span>
                          </div>
                          <p className="text-white/80 mb-3">{comment.content}</p>
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-white/60 hover:text-red-400 transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                              {comment.likes}
                            </button>
                            <button className="flex items-center gap-1 text-white/60 hover:text-orange-400 transition-colors">
                              <Reply className="w-4 h-4" />
                              Reply
                            </button>
                            <button className="text-white/60 hover:text-white transition-colors">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Replies */}
                          {comment.replies && (
                            <div className="mt-4 pl-8 space-y-4">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="bg-white/5 rounded-xl p-4">
                                  <div className="flex items-start gap-3">
                                    <img
                                      src={reply.avatar}
                                      alt={reply.author}
                                      className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h5 className="font-medium text-white text-sm">{reply.author}</h5>
                                        <span className="text-white/60 text-xs">{reply.date}</span>
                                      </div>
                                      <p className="text-white/80 text-sm mb-2">{reply.content}</p>
                                      <button className="flex items-center gap-1 text-white/60 hover:text-red-400 transition-colors text-sm">
                                        <ThumbsUp className="w-3 h-3" />
                                        {reply.likes}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Related Posts */}
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-orange-400" />
              Related Stories
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-orange-400/50 transition-all duration-500 transform hover:scale-[1.02] cursor-pointer"
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
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-white mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <span className="text-white/60 text-sm">{post.readTime}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl max-w-md w-full p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Share this story</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => handleShare('facebook')}
                className="w-full flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl transition-colors"
              >
                <Facebook className="w-5 h-5" />
                Share on Facebook
              </button>
              
              <button
                onClick={() => handleShare('twitter')}
                className="w-full flex items-center gap-3 bg-sky-500 hover:bg-sky-600 text-white p-4 rounded-xl transition-colors"
              >
                <Twitter className="w-5 h-5" />
                Share on Twitter
              </button>
              
              <button
                onClick={() => handleShare('instagram')}
                className="w-full flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-xl transition-colors"
              >
                <Instagram className="w-5 h-5" />
                Share on Instagram
              </button>
              
              <button
                onClick={() => handleShare('copy')}
                className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl transition-colors border border-white/20"
              >
                <Link className="w-5 h-5" />
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .prose h2 {
          color: #ff6b35;
          font-size: 1.75rem;
          font-weight: bold;
          margin: 2rem 0 1rem 0;
        }

        .prose p {
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1.5rem;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BlogDetailPage;