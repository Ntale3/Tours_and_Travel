'use client'
import React, { useState, useEffect } from 'react';
import {useHydration} from "@/hooks/useHydration"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Heart, MessageCircle, Share2, MapPin, Eye, ArrowLeft, Send, ThumbsUp, MoreVertical, Trash2, Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import {
  fetchBlogDetails,
  toggleBlogLike,
  addComment,
  toggleCommentLike,
  replyToComment,
  deleteComment,
  $blogStore,

} from '@/store/blog.store';
import { auth$ } from '@/store/auth.store';
import { useObservable } from '@legendapp/state/react';

interface Author {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface Reply {
  id: number;
  content: string;
  likes_count: number;
  created_at: string;
  author: {
    id: number;
    first_name: string;
    last_name: string;
  };
}

interface Comment {
  id: number;
  content: string;
  likes_count: number;
  replies_count: number;
  created_at: string;
  author: Author;
  replies: Reply[];
}



const BlogDetailPage = () => {

  const params = useParams();
  const blogIdString = params?.slug as string;
  const blogId = parseInt(blogIdString)
  const {currentBlog:blog} =$blogStore.get();
  const isLoading = $blogStore.isLoadingDetail.get();
  const currentUser = useObservable(auth$.user);
  const isAuthenticated = useObservable(auth$.isAuthenticated);


  // Local state
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
  const [showReplyBox, setShowReplyBox] = useState<{ [key: number]: boolean }>({});
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isSubmittingReply, setIsSubmittingReply] = useState<{ [key: number]: boolean }>({});


console.log(isLoading)
  useEffect(() => {
     const fetchcurrentBlog =async()=>{
         await fetchBlogDetails(blogId);
     }
      fetchcurrentBlog()

  }, [blogId]);







  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return formatDate(dateString);
  };

  const handleLikeBlog = async () => {
    if (!isAuthenticated.get()) {
      alert('Please login to like this blog');
      return;
    }
    await toggleBlogLike(Number(blogId));
  };

  const handleAddComment = async () => {
    if (!isAuthenticated.get()) {
      alert('Please login to comment');
      return;
    }
    if (!commentText.trim()) return;

    setIsSubmittingComment(true);
    await addComment(Number(blogId), commentText);
    setCommentText('');
    setIsSubmittingComment(false);
  };

  const handleLikeComment = async (commentId: number) => {
    if (!isAuthenticated.get()) {
      alert('Please login to like comments');
      return;
    }
    await toggleCommentLike(commentId);
  };

  const handleReplyToComment = async (commentId: number) => {
    if (!isAuthenticated.get()) {
      alert('Please login to reply');
      return;
    }
    const reply = replyText[commentId];
    if (!reply?.trim()) return;

    setIsSubmittingReply(prev => ({ ...prev, [commentId]: true }));
    await replyToComment(commentId, reply);
    setReplyText(prev => ({ ...prev, [commentId]: '' }));
    setShowReplyBox(prev => ({ ...prev, [commentId]: false }));
    setIsSubmittingReply(prev => ({ ...prev, [commentId]: false }));
  };

  const handleDeleteComment = async (commentId: number) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      await deleteComment(commentId);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!useHydration()) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading blog....</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Blog not found</h2>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blogs">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all">
              Back to Blogs
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/blogs">
            <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Blogs</span>
            </button>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLikeBlog}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                blog.is_liked
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-secondary text-secondary-foreground border-border hover:border-primary'
              }`}
            >
              <Heart className={`w-4 h-4 ${blog.is_liked ? 'fill-current' : ''}`} />
              <span className="font-medium">{blog.likes_count}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground border border-border hover:border-primary transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span className="font-medium">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Section */}
        <header className="mb-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.map((tag) => (
              <span key={tag} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium text-foreground">
                {blog.author.first_name} {blog.author.last_name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(blog.published_date)}</span>
            </div>

            {blog.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{blog.location}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>{blog.views_count.toLocaleString()} views</span>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground leading-relaxed">
            {blog.excerpt}
          </p>
        </header>

        {/* Featured Image */}
        {blog.featured_image && (
          <div className="mb-12 rounded-2xl overflow-hidden border border-border">
            <Image
              src={blog.featured_image}
              alt={blog.title}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="text-foreground leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </div>
        </div>

        {/* Additional Images */}
        {blog.images && blog.images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-12">
            {blog.images.map((image, index) => (
              <div key={index} className="rounded-xl overflow-hidden border border-border">
                <Image
                  src={image}
                  alt={`${blog.title} - Image ${index + 1}`}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Engagement Stats */}
        <div className="flex items-center gap-6 py-8 border-y border-border mb-12">
          <button
            onClick={handleLikeBlog}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Heart className={`w-6 h-6 ${blog.is_liked ? 'fill-primary text-primary' : ''}`} />
            <span className="font-semibold">{blog.likes_count} likes</span>
          </button>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MessageCircle className="w-6 h-6" />
            <span className="font-semibold">{blog.comments_count} comments</span>
          </div>
        </div>

        {/* Comments Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Comments ({blog.comments_count})
          </h2>

          {/* Add Comment */}
          {isAuthenticated.get() ? (
            <div className="mb-8 bg-card border border-border rounded-xl p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                </div>

                <div className="flex-1">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    rows={3}
                  />

                  <div className="flex justify-end mt-3">
                    <button
                      onClick={handleAddComment}
                      disabled={!commentText.trim() || isSubmittingComment}
                      className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSubmittingComment ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                          Posting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Post Comment
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-8 bg-card border border-border rounded-xl p-6 text-center">
              <p className="text-muted-foreground mb-4">Please login to leave a comment</p>
              <Link href="/login">
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-all">
                  Login to Comment
                </button>
              </Link>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {blog.comments && blog.comments.length > 0 ? (
              blog.comments.map((comment) => (
                <div key={comment.id} className="bg-card border border-border rounded-xl p-6">
                  {/* Comment Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {comment.author.first_name} {comment.author.last_name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {formatRelativeTime(comment.created_at)}
                          </p>
                        </div>

                        {currentUser.get()?.id === comment.author.id && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <p className="text-foreground mb-4">{comment.content}</p>

                      {/* Comment Actions */}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleLikeComment(comment.id)}
                          className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm font-medium">{comment.likes_count}</span>
                        </button>

                        {isAuthenticated.get() && (
                          <button
                            onClick={() => setShowReplyBox(prev => ({ ...prev, [comment.id]: !prev[comment.id] }))}
                            className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Reply</span>
                          </button>
                        )}

                        {comment.replies_count > 0 && (
                          <span className="text-sm text-muted-foreground">
                            {comment.replies_count} {comment.replies_count === 1 ? 'reply' : 'replies'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Reply Box */}
                  {showReplyBox[comment.id] && (
                    <div className="ml-14 mt-4 bg-background border border-border rounded-lg p-4">
                      <textarea
                        value={replyText[comment.id] || ''}
                        onChange={(e) => setReplyText(prev => ({ ...prev, [comment.id]: e.target.value }))}
                        placeholder="Write a reply..."
                        className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        rows={2}
                      />

                      <div className="flex justify-end gap-2 mt-3">
                        <button
                          onClick={() => setShowReplyBox(prev => ({ ...prev, [comment.id]: false }))}
                          className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleReplyToComment(comment.id)}
                          disabled={!replyText[comment.id]?.trim() || isSubmittingReply[comment.id]}
                          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmittingReply[comment.id] ? 'Replying...' : 'Reply'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-14 mt-4 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="bg-background border border-border rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="w-4 h-4 text-primary"/>
                              </div>
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-semibold text-sm text-foreground">
                                  {reply.author.first_name} {reply.author.first_name}
                                </h5>
                                <p className="text-xs text-muted-foreground">
                                  {formatRelativeTime(reply.created_at)}
                                </p>
                              </div>

                              <p className="text-sm text-foreground mb-2">{reply.content}</p>

                              <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                                <ThumbsUp className="w-3 h-3" />
                                <span className="text-xs font-medium">{reply.likes_count}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-card border border-border rounded-xl">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </section>
      </article>
    </div>

  );

};

export default BlogDetailPage;