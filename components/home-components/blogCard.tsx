'use client'
import { Blog } from "@/types";
import { useRouter } from "next/navigation";
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Eye,
  Edit,
  Trash2,
  Clock,
  Heart,
  Check,
  X,
  MessageCircle,
  Calendar,
  Users,

} from 'lucide-react';
import { observer } from "@legendapp/state/react";
import Link from "next/link";

interface BlogCardProps {
  blog: Blog;
  variant?: 'admin' | 'user';
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
  onView?: (id: number) => void;
}

export const BlogCard: React.FC<BlogCardProps> = observer(({
  blog,
  variant = 'user',
  onEdit,
  onDelete,
  onApprove,
  onReject,
  onView,
}) => {
  const router = useRouter();

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Check className="h-3 w-3" />;
      case 'pending':
        return <Clock className="h-3 w-3" />;
      case 'rejected':
        return <X className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const handleView = () => {
    if (onView) {
      onView(blog.id);
    } else {
      router.push(`/blogs/${blog.id}`);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(blog.id);
    } else {
      router.push(`/blog/${blog.id}/edit`);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      onDelete?.(blog.id);
    }
  };

  const handleApprove = () => {
    if (window.confirm(`Approve "${blog.title}"?`)) {
      onApprove?.(blog.id);
    }
  };

  const handleReject = () => {
    const notes = window.prompt(`Rejection reason for "${blog.title}":`);
    if (notes !== null) {
      onReject?.(blog.id);
    }
  };
  return (
    <><Link href={`blogs/${blog.id}`}>
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image Section */}
          <div className="w-full lg:w-48 h-48 lg:h-32 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
            {blog.featured_image ? (
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                No Image
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              {/* Left Side - Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold mb-2 line-clamp-2">
                  {blog.title}
                </h4>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{blog.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">By {blog.author.first_name} {blog.author.last_name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span>
                      {blog.published_date
                        ? new Date(blog.published_date).toLocaleDateString()
                        : new Date(blog.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{blog.views_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{blog.likes_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{blog.comments_count}</span>
                  </div>
                </div>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
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

                {/* Admin Notes (for user variant when rejected) */}
                {variant === 'user' && blog.status === 'rejected' && blog.admin_notes && (
                  <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">
                    <strong>Rejection reason:</strong> {blog.admin_notes}
                  </div>
                )}
              </div>

              {/* Right Side - Status */}
              <div className="flex-shrink-0">
                <Badge
                  variant={getStatusVariant(blog.status)}
                  className="inline-flex items-center gap-1"
                >
                  {getStatusIcon(blog.status)}
                  <span className="capitalize">{blog.status}</span>
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={handleView}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>

              {/* Admin Actions for Pending Blogs */}
              {variant === 'admin' && blog.status === 'pending' && (
                <>
                  <Button
                    size="sm"
                    variant="default"
                    onClick={handleApprove}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleReject}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </>
              )}

              {/* Admin Actions for Non-Pending Blogs */}
              {variant === 'admin' && blog.status !== 'pending' && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              )}

              {/* User Actions */}
              {variant === 'user' && (
                <>
                  {(blog.status === 'pending' || blog.status === 'rejected') && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleEdit}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
    </>
  );
});