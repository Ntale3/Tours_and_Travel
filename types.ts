export interface GalleryImage {
id: string;
src: string;
alt: string;
destination: string;
country: string;
rating: number;
reviewCount: number,
duration: string,
groupSize: string,
price: number,
category: string,
tags: string[],
description: string,
photographer: string,
featured: boolean

}

export interface FilterOption {
  value: string;
  label: string;
}

export interface DestinationType{
id: number,
name: string,
location: string,
feature?:string[],
category: string,
image: string,
price: string,
rating: number,
reviews: number,
duration: string,
groupSize: string,
description: string,
highlights: string[],
bestTime: string
}

export interface categoryType
{
 id:string,
 name:string,
 icon?:string

}

export interface Office {
    id: number;
    city: string;
    country: string;
    address: string;
    phone: string;
    email: string;
    timezone: string;
    image: string;
  }


  export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface ContactMethod {
  id: number;
  icon: string;
  title: string;
  description: string;
  value: string;
  action: string;
}


//Types
// User Interface
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

// Blog Post Interface (matches Laravel model)
interface BlogPost {
  id: number;
  title: string;
  content: string;
  featured_image: string | null;
  images: string[] | null;
  location: string;
  latitude: number | null;
  longitude: number | null;
  slug: string;
  excerpt: string | null;
  tags: string[] | null;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  admin_notes: string | null;
  user_id: number;
  approved_by: number | null;
  approved_at: string | null;
  views_count: number;
  created_at: string;
  updated_at: string;

  // Relationships
  user: User;
  approver?: User;

  // Computed attributes
  total_likes: number;
  total_comments: number;
  is_liked_by_user?: boolean; // If user is authenticated

  // Optional loaded relationships
  comments?: Comment[];
  likes?: Like[];
}

// Simplified BlogPost for listings/cards
interface BlogPostSummary {
  id: number;
  title: string;
  excerpt: string;
  featured_image: string | null;
  location: string;
  slug: string;
  tags: string[] | null;
  status: 'approved' | 'pending' | 'rejected';
  approved_at: string | null;
  views_count: number;
  created_at: string;

  // Author info
  user: Pick<User, 'id' | 'name' | 'avatar'>;

  // Engagement
  total_likes: number;
  total_comments: number;
  is_liked_by_user?: boolean;
}

// New Blog Post Creation Interface
interface NewBlogPost {
  title: string;
  content: string;
  featured_image: File | string;
  images?: File[] | string[];
  location: string;
  latitude?: number;
  longitude?: number;
  excerpt?: string;
  tags?: string[];
  status: 'draft' | 'pending'; // Will be set to pending for non-admins
}

// Blog Post Update Interface
interface UpdateBlogPost {
  title?: string;
  content?: string;
  featured_image?: File | string;
  images?: File[] | string[];
  location?: string;
  latitude?: number;
  longitude?: number;
  excerpt?: string;
  tags?: string[];
  status?: 'draft' | 'pending';
}

// Comment Interface (matches Laravel model)
interface Comment {
  id: number;
  content: string;
  user_id: number;
  blog_id: number;
  parent_id: number | null;
  is_approved: boolean;
  created_at: string;
  updated_at: string;

  // Relationships
  user: User;
  parent?: Comment;

  // Computed attributes
  total_likes: number;
  total_replies: number;
  is_liked_by_user?: boolean;

  // Optional loaded relationships
  replies?: Comment[];
  likes?: Like[];
}

// New Comment Interface
interface NewComment {
  content: string;
  blog_id: number;
  parent_id?: number; // For replies
}

// Like Interface
interface Like {
  id: number;
  user_id: number;
  likeable_id: number;
  likeable_type: 'App\\Models\\Blog' | 'App\\Models\\Comment';
  created_at: string;
  updated_at: string;

  // Relationships
  user: User;
}

// API Response Interfaces
interface BlogPostResponse {
  data: BlogPost;
  message?: string;
}

interface BlogPostsResponse {
  data: BlogPostSummary[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

interface CommentResponse {
  data: Comment;
  message?: string;
}

interface LikeResponse {
  liked: boolean;
  total_likes: number;
  message?: string;
}

// Admin specific interfaces
interface AdminBlogPost extends BlogPost {
  admin_notes: string | null;
  approver?: User;
}

interface PendingBlogPost {
  id: number;
  title: string;
  excerpt: string;
  location: string;
  user: User;
  created_at: string;
  admin_notes: string | null;
}

// Filter/Query Interfaces
interface BlogFilters {
  status?: 'draft' | 'pending' | 'approved' | 'rejected';
  location?: string;
  user_id?: number;
  tags?: string[];
  search?: string;
  sort_by?: 'created_at' | 'approved_at' | 'views_count' | 'total_likes';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
}

interface CommentFilters {
  blog_id?: number;
  user_id?: number;
  parent_id?: number | null; // null for parent comments only
  is_approved?: boolean;
}

// Form validation interfaces
interface BlogValidationErrors {
  title?: string[];
  content?: string[];
  location?: string[];
  featured_image?: string[];
  images?: string[];
  tags?: string[];
  latitude?: string[];
  longitude?: string[];
}

interface CommentValidationErrors {
  content?: string[];
  parent_id?: string[];
}

// Utility types for different states
type BlogPostStatus = 'draft' | 'pending' | 'approved' | 'rejected';
type SortOption = 'newest' | 'oldest' | 'most_liked' | 'most_viewed' | 'most_commented';

// Context/State interfaces for React/Vue
interface BlogState {
  posts: BlogPostSummary[];
  currentPost: BlogPost | null;
  loading: boolean;
  error: string | null;
  filters: BlogFilters;
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  replyingTo: number | null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

// API endpoint helpers (for consistent API calls)
// interface ApiEndpoints {
//   // Blog endpoints
//   blogs: '/api/blogs';
//   blogShow: (slug: string) => `/api/blogs/${slug}`;
//   blogLike: (id: number) => `/api/blogs/${id}/like`;
//   blogStore: '/api/blogs';
//   blogUpdate: (id: number) => `/api/blogs/${id}`;
//   blogDestroy: (id: number) => `/api/blogs/${id}`;

//   // Comment endpoints
//   comments: '/api/comments';
//   commentStore: (blogId: number) => `/api/blogs/${blogId}/comments`;
//   commentReply: (commentId: number) => `/api/comments/${commentId}/reply`;
//   commentLike: (commentId: number) => `/api/comments/${commentId}/like`;
//   commentDestroy: (commentId: number) => `/api/comments/${commentId}`;

//   // Admin endpoints
//   adminBlogs: '/api/admin/blogs';
//   adminApprove: (id: number) => `/api/admin/blogs/${id}/approve`;
//   adminReject: (id: number) => `/api/admin/blogs/${id}/reject`;
// }

export type {
  User,
  BlogPost,
  BlogPostSummary,
  NewBlogPost,
  UpdateBlogPost,
  Comment,
  NewComment,
  Like,
  BlogPostResponse,
  BlogPostsResponse,
  CommentResponse,
  LikeResponse,
  AdminBlogPost,
  PendingBlogPost,
  BlogFilters,
  CommentFilters,
  BlogValidationErrors,
  CommentValidationErrors,
  BlogPostStatus,
  SortOption,
  BlogState,
  CommentState,
  AuthState,
  //ApiEndpoints
};