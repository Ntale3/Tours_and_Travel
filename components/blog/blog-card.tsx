import {Calendar, User, ArrowRight, Heart, MessageCircle, Share2} from 'lucide-react';
import { Blog } from '@/types';
import Image from "next/image"
import Link from "next/link"

interface BlogCardProps {
  post: Blog;
  featured?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const calculateReadTime = (views: number) => {
    return `${Math.max(5, Math.floor(views / 200))} min read`;
  };

  if (featured) {
    return (
      <Link href={`/blogs/${post.id}`}>
        <article className="group bg-card backdrop-blur-md rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 cursor-pointer">
          <div className="relative overflow-hidden">
            {post.featured_image && (
              <Image
                width={800}
                height={400}
                src={post.featured_image}
                alt={post.title}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
            )}
            <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author.first_name} {post.author.last_name}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.published_date)}
                </span>
              </div>
              <span>{calculateReadTime(post.views_count)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-muted-foreground">
                <button
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  {post.likes_count}
                </button>
                <button
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  {post.comments_count}
                </button>
                <button
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-primary transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              <span className="flex items-center gap-2 text-card-foreground hover:text-primary transition-colors group">
                Read More
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blogs/${post.id}`}>
      <article className="group bg-card backdrop-blur-md rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 cursor-pointer h-full">
        <div className="relative overflow-hidden">
          {post.featured_image && (
            <Image
              width={400}
              height={300}
              src={post.featured_image}
              alt={post.title}
              className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )}
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            {post.tags.slice(0, 1).map((tag) => (
              <span key={tag} className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {post.author.first_name}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.published_date)}
              </span>
            </div>
            <span>{calculateReadTime(post.views_count)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-muted-foreground">
              <button
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Heart className="w-3 h-3" />
                {post.likes_count}
              </button>
              <button
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <MessageCircle className="w-3 h-3" />
                {post.comments_count}
              </button>
            </div>
            <span className="flex items-center gap-1 text-card-foreground hover:text-primary transition-colors group text-sm">
              Read
              <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};