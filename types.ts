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
// interface User {
//   id: number;
//   name: string;
//   email: string;
//   avatar?: string;
//   is_admin: boolean;
//   created_at: string;
//   updated_at: string;
// }

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
  //user: Pick<User, 'id' | 'name' | 'avatar'>;

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
export type {
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
//Blog Types
export type Blog = {
    id: number;
    title: string;
    slug: string;
    content?: string;
    excerpt: string;
    featured_image: string | null;
    images?: string[];
    location: string;
    latitude?: string;
    longitude?: string;
    tags: string[];
    status: 'pending' | 'approved' | 'rejected';
    admin_notes?: string | null;
    views_count: number;
    likes_count: number;
    comments_count: number;
    is_liked?: boolean;
    published_date?: string;
    published_at?: string;
    approved_at?: string | null;
    created_at: string;
    updated_at?: string;
    author: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
    };
    approved_by?: {
        id: number;
        first_name: string;
        last_name: string;
    } | null;
    comments?: Comment2[];
};

export type Comment2 = {
    id: number;
    content: string;
    likes_count: number;
    replies_count: number;
    created_at: string;
    author: {
        id: number;
        first_name: string;
        last_name:string
    };
    replies: Reply[];
};

export type Reply = {
    id: number;
    content: string;
    likes_count: number;
    created_at: string;
    author: {
        id: number;
        first_name: string;
    };
};

export type PaginationMeta = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from?: number;
    to?: number;
};

export type BlogFilter= {
    location?: string;
    search?: string;
    tags?: string[];
    sort_by?: 'latest' | 'popular' | 'most_liked' | 'oldest';
    status?: 'pending' | 'approved' | 'rejected';
    per_page?: number;
    page?: number;
};

export interface Review {
  id: number;
  user_id: number;
  destination_id: number;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string | null;
  created_at?: string;
  updated_at?: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
  };
}

//payoad ${api/destinations/{id}/review}
export interface CreateReviewRequest {
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
}

/**
 * Payload for updating a review
 * PUT /api/reviews/{review}
 */
export interface UpdateReviewRequest {
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string; // Optional, max 1000 characters
}

//============================================
// API RESPONSE STRUCTURES
// ============================================

/**
 * Response from GET /api/destinations/{destination}/reviews
 * Returns an array of reviews directly (not wrapped in ApiResponse)
 */
export type GetReviewsResponse = Review[];

/**
 * Response from POST /api/destinations/{destination}/reviews
 * Status: 201 Created
 */
export interface CreateReviewResponse {
  message: string;
  review: Review;
}

/**
 * Response from PUT /api/reviews/{review}
 */
export interface UpdateReviewResponse {
  message: string; // "Review updated."
  review: Review;
}

/**
 * Response from DELETE /api/reviews/{review}
 */
export interface DeleteReviewResponse {
  message: string;
}

// ============================================
// ERROR RESPONSES
// ============================================

/**
 * Validation error when user already reviewed
 * Status: 422 Unprocessable Entity
 */
export interface ReviewValidationError {
  message: string;
  errors: {
    destination_id?: string[]; // ["You have already reviewed this destination."]
    rating?: string[];
    comment?: string[];
  };
}

/**
 * Authorization error (not your review)
 * Status: 403 Forbidden
 */
export interface ReviewAuthorizationError {
  message: string; // "Unauthorized action."
}

// ============================================
// GENERIC API RESPONSE WRAPPER (from your api.ts)
// ============================================

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]> | null;
}

// ============================================
// STATE MANAGEMENT TYPES
// ============================================




// //Statistics Api
// export type DashboardStats = {
//     overview: {
//         total_users: number;
//         active_users: number;
//         inactive_users: number;
//         admin_users: number;
//         unverified_users: number;
//         total_bookings: number;
//         total_blogs: number;
//         total_revenue: number;
//         pending_approvals: number;
//     };
//     users: {
//         new_users: number;
//         total_users: number;
//         active_users: number;
//         inactive_users: number;
//         growth_percentage: number;
//         repeat_customers: number;
//     };
//     growth: {
//         bookings: number;
//         blogs: number;
//         comments: number;
//         new_users: number;
//     };
//     content: {
//         total_blogs: number;
//         approved_blogs: number;
//         pending_blogs: number;
//         rejected_blogs: number;
//         total_comments: number;
//     };
//     bookings: {
//         recent_bookings: number;
//         total_bookings: number;
//         growth_percentage: number;
//     };
//     revenue: {
//         total_revenue: number;
//         recent_revenue: number;
//         growth_percentage: number;
//         average_booking_value: number;
//     };
//     geography: {
//         total_countries: number;
//         top_countries: any[];
//         top_cities: any[];
//     };
//     top_performers: {
//         top_users: Array<{
//             id: number;
//             name: string;
//             email: string;
//             avatar: string | null;
//             bookings_count: number;
//             blogs_count: number;
//             comments_count: number;
//             total_spent: number;
//         }>;
//         top_destinations: any[];
//         top_bloggers: any[];
//     };
//     recent_activity: {
//         recent_users: Array<{
//             id: number;
//             first_name: string;
//             last_name: string;
//             email: string;
//             avatar: string | null;
//             created_at: string;
//         }>;
//         recent_bookings: any[];
//         recent_blogs: any[];
//         recent_comments: any[];
//     };
// };

export type DashboardStats={
  overview:{
    total_users: number,
    active_users: number,
    inactive_users: number,
    verified_users: number,
    admin_users: number,
    total_bookings: number,
    confirmed_bookings: number,
    pending_bookings: number,
    total_destinations: number,
    active_destinations: number,
    total_blogs: number,
    approved_blogs: number,
    pending_blogs: number,
    total_revenue: number,
    total_reviews: number,
    total_comments: number,
    total_likes: number
  };
users: {
total: number,
new_this_period: number,
active: number,
inactive: number,
verified: number,
unverified: number,
by_role:
{
admin: number,
user: number
},
by_provider: any[],
with_bookings: number,
with_blogs: number,
with_reviews: number,
repeat_customers: number,
one_time_customers: number
};

bookings: {
  total: number,
  this_period: number,
  this_month: number,
  today: number,
  by_status: {
      confirmed: number
  },
  upcoming: number,
  active: number,
  past: number,
  avg_travelers: number,
  total_travelers: number,

  popular_destinations?: Array<
    {
        id: number,
        name: string,
        location: string,
        country: string,
        bookings_count: string

    }>;
};
 revenue: {
  total_all_time: number,
  this_period: number,
  this_month: number,
  last_month: number,
  today: number,
  avg_booking_value: number,
  highest_booking: number,
  by_status: {
    confirmed: number
  },
  top_spenders: Array<
  {
  id: number,
  name: string,
  email: string
  total_spent: number,
  bookings_count: number
  }>
  ,
  monthly_trend: Array<
  {
      year: number,
      month: number,
      bookings: number,
      revenue: number
  }>

};
 content: {
  blogs: {
      total: number,
      approved: number,
      pending: number,
      rejected: number,
      with_comments: number,
      with_likes: number,
      total_views: number,
      avg_views: number,
  },
  comments: {
      total: number,
      approved: number,
      parent_comments: number,
      replies: number
  },
  reviews: {
      total: number,
      avg_rating: number,
      by_rating: any[]
  },
  likes: {
      total: number,
      on_blogs: number,
      on_comments: number
  },
  destinations: {
      total: number,
      active: number,
      inactive: number,
      with_bookings: number,
      with_reviews: number
  }
};

 engagement:{
user_engagement_rate: number,
avg_bookings_per_user: number,
avg_blogs_per_author: number,
avg_comments_per_blog: number,
avg_likes_per_blog: number,
avg_reviews_per_destination: number,
repeat_customer_rate: number
};
growth: {
    user_growth: {
        current: number,
        previous: number,
        change: number,
        percentage: number,
        trend: string
},
    booking_growth: {
        current: number,
        previous: number,
        change: number,
        percentage: number,
        trend: string
    },
    revenue_growth: {
        current: number,
        previous: number,
        change: number,
        percentage: number,
        trend: string
    },
  blog_growth: {
      current: number,
      previous: number,
      change: number,
      percentage: number,
      trend: string
  },
  daily_registrations: Array<
      {
          date: string,
          count: number
      }>,
  daily_bookings: Array<
      {
          date: string,
          count: number,
          revenue: number
      }>

  };
top_performers: {
top_destinations: Array<
    {
        id: number,
        name: string
        location: string
        country: string,
        bookings_count: number
    }>;
top_spenders: [
    {
        id: number,
        name: string,
        email: string,
        total_spent: number,
        bookings_count: number
    }
],
top_bloggers: [
    {
        id: number,
        name: string,
        email: string,
        blogs_count: number,
        total_views: number
    },

],
most_reviewed_destinations: any[],
most_liked_blogs: [
    {
        id: number,
        title: string
        slug: string,
        likes_count: number
    },

]
},
geography: {
users_by_country: any[],
users_by_city: any[],
bookings_by_destination_country: [
    {
        country: string,
        bookings_count: number
    }
]
},
recent_activity: {
recent_users: Array<{
        id: number,
        name: string,
        email: string,
        created_at: string
    }>;
recent_bookings: Array<{
        id: number,
        reference: string,
        user: string,
        destination: string,
        amount: number,
        status: string,
        created_at: string
    }>;
recent_blogs: Array<{
        id:number,
        title:number,
        author:number,
        status:number,
        views: number,
        created_at:number

}>;

};

}



// AUTH types
export interface User {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    avatar: string | null;
    provider: string | null;
    country: string | null;
    city: string | null;
    is_admin: boolean;
    role: string | null;
    created_at: string;
    email_verified_at: string | null;
    last_login_at: string;
}


export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    password_confirmation: string;
    phone_number: string;
    first_name: string;
    last_name: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        access_token: string;
        token_type: string;
    };
    errors?: Record<string, string[]>;
}

export interface ApiResponse<T=any> {
    success: boolean;
    message?: string;
    data?: T;
    errors?: Record<string, string[]> | null;
}

export interface FetchOptions extends RequestInit {
    baseURL?: string;
    token?: string;
    params?: Record<string, string | number | boolean>;
}

export interface StateManager {
    error: { set: (value: string | null) => void };
    errors: { set: (value: Record<string, string[]> | null) => void };
    isLoading: { set: (value: boolean) => void };
}

export interface AuthData {
    user: User;
    access_token: string;
}

export interface PaginationData {
    current_page: number;
    total: number;
    per_page: number;
    last_page: number;
}


interface ImageData {
    url: string;
    public_id: string;
    width: number;
    height: number;
    format: string;
}

export interface DestinationFormData {
    name: string;
    description: string;
    category: 'Tropical paradise' | 'Adventure' | 'Cultural';
    location: string;
    country: string;
    packages?: Package[];
    price_per_person: number;
    booking_fee?: number;
    max_capacity: number;
    start_date: string;
    end_date: string;
    duration_days: number;
    images?: File[];
    amenities?: string[];
    is_active?: boolean;
}

interface Package {
    id?: string | number;
    name: string;
    description?: string;
    price?: number;
    included?: string[];
    [key: string]: any;
}


//================================================
//      BOOKING ENTITY
//================================================

export interface Booking {
  id: number;
  booking_reference: string;
  user_id: number;
  destination_id: number;
  payment_id: number | null;
  number_of_travelers: number;
  trip_date_start: string; // ISO 8601
  trip_date_end: string; // ISO 8601
  total_amount: number;
  currency: string; // EUR, USD, UGX, GBP
  booking_status: BookingStatus;
  created_at: string;
  updated_at: string;

  // Relationships (loaded via with())
  destination?: Destination;
  payment?: Payment;
  user?: User;
}
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Payment {
  id: number;
  booking_id: number | null;
  payment_reference: string;
  amount: number;
  currency: string;
  phone_number: string;
  payment_method: string;
  status: PaymentStatus;
  mtn_transaction_id: string | null;
  gateway_response: any;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'processing';

// ============================================
// API REQUEST PAYLOADS
// ============================================
export interface CreateBookingRequest {
  destination_id: number;
  number_of_travelers: number;
  trip_date_start: string;
  trip_date_end: string;
  phone_number: string;
  currency?: 'EUR' | 'USD' | 'UGX' | 'GBP';
}

export interface UpdateBookingRequest {
  booking_status?: BookingStatus;
  trip_date_start?: string;
  trip_date_end?: string;
  number_of_travelers?: number;
  payment_id?: number | null;
}

export interface BookingFilters {
  booking_status?: BookingStatus;
  upcoming?: boolean;
  active?: boolean;
  search?: string;
  destination_id?: number;
  start_date?: string;
  end_date?: string;
}

// ============================================
// API RESPONSE STRUCTURES
// ============================================

export interface CreateBookingResponse {
  booking: Booking;
  payment_reference: string;
  message: string;
}

export interface VerifyPaymentResponse {
  booking: Booking;
  payment_status?: PaymentStatus;
  message: string;
}

export interface BookingStatistics {
  totals: {
    bookings: number;
    travelers: number;
    revenue: number;
    avg_booking_value: number;
  };
  by_status: Record<BookingStatus, number>;
  by_currency: Array<{
    currency: string;
    total: number;
  }>;
  monthly_bookings: Array<{
    month: string;
    count: number;
  }>;
  monthly_revenue: Array<{
    month: string;
    total: number;
  }>;
  top_destinations: Array<{
    destination: string;
    bookings: number;
    revenue: number;
  }>;
  recent_bookings: Array<{
    id: number;
    reference: string;
    user: string;
    destination: string;
    status: BookingStatus;
    status_color: string;
    amount: number;
    date: string;
  }>;
}

// ============================================
// PAGINATION
// ============================================

export interface PaginatedBookings {
  current_page: number;
  data: Booking[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// ============================================
// BOOKING STATE
// ============================================

export interface BookingState {
  // User bookings
  userBookings: Booking[];

  // Admin bookings (paginated)
  adminBookings: PaginatedBookings | null;

  // Current booking being viewed/created
  currentBooking: Booking | null;

  // Statistics (admin)
  statistics: BookingStatistics | null;

  // UI state
  isLoading: boolean;
  isCreating: boolean;
  isVerifying: boolean;
  error: string | null;
  errors: Record<string, string[]> | null;
}

// ============================================
// PAYMENT POLLING
// ============================================

export interface PaymentPollingConfig {
  bookingId: number;
  maxAttempts: number;
  intervalMs: number;
  onSuccess: (booking: Booking) => void;
  onFailure: (message: string) => void;
  onTimeout: () => void;
}

export type LaravelPaginatedResponse<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    path: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
};

// Type guard to check if response is paginated
export function isPaginatedResponse<T>(data: any): data is LaravelPaginatedResponse<T> {
    return (
        data &&
        typeof data === 'object' &&
        Array.isArray(data.data) &&
        'current_page' in data &&
        'last_page' in data &&
        'total' in data
    );
}




// Helper to extract pagination meta from Laravel response
export function extractPaginationMeta<T>(
    data: LaravelPaginatedResponse<T>
): PaginationMeta {
    return {
        current_page: data.current_page,
        last_page: data.last_page,
        per_page: data.per_page,
        total: data.total,
        from: data.from ?? undefined,
        to: data.to ?? undefined,
    };
}

// ============================================
// DESTINATION TYPES (Fixed)
// ============================================
export interface Destination {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: 'Tropical paradise' | 'Adventure' | 'Cultural' | 'Luxury';
  location: string;
  country: string;
  price_per_person: number;
  booking_fee: number;
  max_capacity: number;
  start_date: string;
  end_date: string;
  duration_days: number;
  images: Array<{
    public_id: string;
    url: string;
  }>;
  amenities?: string[];
  is_active: boolean;
  rating?: number;
  created_at?:number,
  updated_at?:number
  reviews_count?: number;
  average_rating?: number;
  reviews: Array<{
    id: number,
    user_id: number
    destination_id: number,
    rating: 1 | 2 | 3 | 4 | 5,
    comment: string,
    created_at: string,
    user: {
        id: number,
        first_name: string,
        last_name: string,
    }
  }>;

}



export interface CategoryType {
  id: string;
  name: string;
  icon: string;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface PriceRange {
  min: string;
  max: string;
}

export interface FilterState {
  activeCategory: string;
  searchTerm: string;
  dateRange: DateRange;
  priceRange: PriceRange;
}

export interface DestinationStore {
  destinations: Destination[];
  isLoading: boolean;
  error: string | null;
}

// Prop types for components
export interface HeroSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export interface CategoryFiltersProps {
  categories: CategoryType[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export interface AdvancedFiltersProps {
  dateRange: DateRange;
  priceRange: PriceRange;
  onDateRangeChange: (range: DateRange) => void;
  onPriceRangeChange: (range: PriceRange) => void;
  onClose: () => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

export interface DestinationCardProps {
  destination: Destination;
}

export interface DestinationGridProps {
  destinations: Destination[];
}

export interface EmptyStateProps {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export interface LoadingSpinnerProps {
  message?: string;
}

export type GalleryImage = Pick<
  Destination,
  | 'id'
  | 'name'
  | 'location'
  | 'country'
  | 'rating'
  | 'duration_days'
  | 'max_capacity'
  | 'amenities'
  | 'category'
  | 'images'
>;

export type DestinationFilter = {
    category?: string;
    country?: string;
    search?: string;
    min_price?: number;
    max_price?: number;
    date?: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
    page?: number;
    per_page?: number;
};

export interface CategoryType {
  id: string;
  name: string;
  icon: string;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface PriceRange {
  min: string;
  max: string;
}

export interface FilterState {
  activeCategory: string;
  searchTerm: string;
  dateRange: DateRange;
  priceRange: PriceRange;
}
