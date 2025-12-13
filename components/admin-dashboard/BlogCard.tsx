import React from 'react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Eye, Check, X, Edit, FileText } from 'lucide-react';
import { Blog, BlogPost } from '@/types';
import BlogDialog from './blog-dialog';



interface BlogCardProps {
  blog: Blog;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
}

export const BlogCard= ({ blog, onApprove, onReject, onView, onEdit }: BlogCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'rejected':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'draft':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  return (
    <Card className="w-full overflow-hidden hover:shadow-lg transition-shadow">
      {blog.featured_image && (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={blog.featured_image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <Badge className={`absolute top-3 right-3 ${getStatusColor(blog.status)}`}>
            {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
          </Badge>
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl line-clamp-2">{blog.title}</CardTitle>
          {!blog.featured_image && (
            <Badge className={getStatusColor(blog.status)}>
              {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
            </Badge>
          )}
        </div>
        <CardDescription className="line-clamp-2 mt-2">
          {blog?.excerpt}
        </CardDescription>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {blog.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{blog.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{blog.views_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart
              className={`w-4 h-4 ${blog.is_liked ? 'fill-red-500 text-red-500' : ''}`}
            />
            <span>{blog.likes_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{blog.comments_count}</span>
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-2">
          By {blog.author.first_name + blog.author.last_name } • {blog.location}
        </div>
      </CardHeader>

      <CardFooter className="flex gap-2 pt-4">
        {blog.status === 'pending' && (
          <>
            <Button
              onClick={() => onApprove?.(blog.id)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Check className="w-4 h-4 mr-2" />
              Approve
            </Button>
            <Button
              onClick={() => onReject?.(blog.id)}
              variant="destructive"
              className="flex-1"
            >
              <X className="w-4 h-4 mr-2" />
              Reject
            </Button>
          </>
        )}

        {blog.status === 'approved' && (
          <>
            <Button
              onClick={() => onView?.(blog.id)}
              variant="outline"
              className="flex-1"
            >
              <FileText className="w-4 h-4 mr-2" />
              View
            </Button>
            <BlogDialog
              mode="edit"
              blog={blog}
              triggerButton={
                <Button
                onClick={() => onEdit?.(blog.id)}
                className="flex-1"
                >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
              }
            />

          </>
        )}

        { blog.status === 'rejected' && (
          <Button
            onClick={() => onEdit?.(blog.id)}
            variant="outline"
            className="w-full"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

