import {Blog, BlogFilter, Comment2, PaginationMeta} from "@/types";
import {observable} from "@legendapp/state";
import {synced} from "@legendapp/state/sync";
import {ObservablePersistLocalStorage} from "@legendapp/state/persist-plugins/local-storage";
import {auth$} from "@/store/auth.store";
import {api} from "@/hooks/api";
import {redirect} from "next/navigation";

type BlogStore = {
    // Public blogs (approved)
    blogs: Blog[];
    blogsMeta: PaginationMeta | null;

    // Single blog detail
    currentBlog: Blog | null;

    // User's blogs
    myBlogs: Blog[];
    myBlogsMeta: PaginationMeta | null;

    // Admin: pending blogs
    pendingBlogs: Blog[];
    pendingBlogsMeta: PaginationMeta | null;

    // Admin: all blogs
    allBlogs: Blog[];
    allBlogsMeta: PaginationMeta | null;

    // Loading states
    isLoading: boolean;
    isLoadingDetail: boolean;
    isSubmitting: boolean;

    // Error states
    error: string | null;
    errors: Record<string, string[]> | null;

    // Filters
    filters: BlogFilter;
};

export const $blogStore = observable<BlogStore>(
    synced({
        initial: {
            blogs: [],
            blogsMeta: null,
            currentBlog: null,
            myBlogs: [],
            myBlogsMeta: null,
            pendingBlogs: [],
            pendingBlogsMeta: null,
            allBlogs: [],
            allBlogsMeta: null,
            isLoading: false,
            isLoadingDetail: false,
            isSubmitting: false,
            error: null,
            errors: null,
            filters: {},
        },
        persist: {
            name: "blogState",
            plugin: ObservablePersistLocalStorage
        }
    },
    )
)

// State managers for API calls
const listStateManager = {
    isLoading: $blogStore.isLoading,
    error: $blogStore.error,
    errors: $blogStore.errors,
};

const detailStateManager = {
    isLoading: $blogStore.isLoadingDetail,
    error: $blogStore.error,
    errors: $blogStore.errors,
};

const submitStateManager = {
    isLoading: $blogStore.isSubmitting,
    error: $blogStore.error,
    errors: $blogStore.errors,
};

/**
 * Fetch public blogs (approved only)
 */
export const fetchBlogs =async (filters?: BlogFilter)=>{
    try {
        $blogStore.filters.set(filters || {});
        const response= await api.get<Blog[]>(
            "/blogs",
             {params: filters as any},
            listStateManager
        )
        if(response.success && response.data){
            $blogStore.blogs.set([...response.data])
            //@ts-ignore
            $blogStore.blogsMeta.set(response.meta || null);
        }
        return response;

    }catch(error){
        console.log(`failed to fetch blogs: ${error}`);
    }
}

/**
 * Fetch specific blog by ${id}
 */

export const fetchBlogDetails = async (blogid:number)=>{
    try {
        const response =await api.get<Blog>(
            `/blogs/${blogid}`,
            {},
            detailStateManager
        )
        if(response.success && response.data){
            $blogStore.currentBlog.set(response.data)
        }
        return response;
    }catch(error){
        console.error(`failed to fetch details: ${error}`);
    }
}

/**
 * Refresh current blog
 */
export async function refreshCurrentBlog() {
    const currentBlog = $blogStore.currentBlog.get();
    if (currentBlog) {
        return fetchBlogDetails(currentBlog.id);
    }
}

/**
 * Fetch user's own blogs
 */

export const fetchUserBlogs = async ()=>{
    const token = auth$.token.get();
    try {
        const response = await api.get<Blog[]>(
            '/my-blogs',
            //@ts-ignore
            {token},
            listStateManager
        )
        if(response.success && response.data){
            $blogStore.myBlogs.set(response.data);
            // @ts-ignore
            $blogStore.myBlogsMeta.set(response.meta || null);
        }
        return response;
    }catch(error){
        console.error(`failed to fetch user blogs: ${error}`);
    }
}


/**
 * Fetch user's own blogs
 */
export const createBlog = async (formData:FormData) => {
    const token = auth$.token.get();
    if (token) {
        try {
            const response= await api.postFormData<Blog>(
                '/blogs'
                ,formData
                ,{token}
                ,submitStateManager

            )
            if(response.success && response.data){
                $blogStore.myBlogs.set([response.data, ...$blogStore.myBlogs.get()]);
            }

            return response;

        }
        catch(error){
            console.error(`failed to create blog: ${error}`);
        }
    }
}

/**
 * Update existing blog post
 */
export async function updateBlog(blogId: number, formData: FormData) {
    const token = auth$.token.get();
    if (token) {
        try {
            const response = await api.putFormData<Blog>(
                `/blogs/${blogId}`,
                formData,
                {token},
                submitStateManager
            );

            if (response.success && response.data) {
                // Update in my blogs list
                const myBlogs = $blogStore.myBlogs.get();
                const index = myBlogs.findIndex(b => b.id === blogId);
                if (index !== -1) {
                    myBlogs[index] = response.data;
                    $blogStore.myBlogs.set([...myBlogs]);
                }

                // Update current blog if viewing
                if ($blogStore.currentBlog.get()?.id === blogId) {
                    $blogStore.currentBlog.set(response.data);
                }
            }

            return response;
        } catch (err) {
            console.error("Failed to update blog:", err);
        }
    }
}

/**
 * Delete Blog post
 */
export async function deleteBlog(blogId: number) {
    const token = auth$.token.get();
    if (token) {
        try {


            const response = await api.delete(
                `/blogs/${blogId}`
                , {token},
                submitStateManager
            );
            if (response.success && response.data) {
                //Remove blog from myBlogs
                const myBlogs = $blogStore.myBlogs.get().filter(b => b.id === blogId);
                $blogStore.myBlogs.set(myBlogs);

                //Remove blog from all blogs
                const allBlogs = $blogStore.myBlogs.get().filter(b => b.id === blogId);
                $blogStore.allBlogs.set(allBlogs);

                if ($blogStore.currentBlog.get()?.id === blogId) {
                    $blogStore.currentBlog.set(response.data);
                    redirect('/blogs')
                }

            }
            return response;
        }catch (error) {
            console.error(`failed to delete blog: ${error}`);
        }
    }
}

/**
 * Toggle Blog like
 */
export async function toggleBlogLike(blogId:number) {
    const token = auth$.token.get();
    if (token) {
        try {
            const response =
                await api.post<{liked: boolean; total_likes: number}>(
                `/blogs/${blogId}/like`
                ,{}
                ,{token}
            )
            if(response.success && response.data){
                // Update current blog
                const currentBlog = $blogStore.currentBlog.get();
                if (currentBlog && currentBlog.id === blogId) {
                    currentBlog.is_liked = response.data.liked;
                    currentBlog.likes_count = response.data.total_likes;
                    $blogStore.currentBlog.set({ ...currentBlog });
                }

                // Update in blogs list
                updateBlogInList('blogs', blogId, {
                    is_liked: response.data.liked,
                    likes_count: response.data.total_likes
                });
            }
            return response;
        }catch(error){
            console.error("Failed to toggle blog like:", error);
        }
    }
}

/**
 * Update a blog in a specific list
 */
function updateBlogInList(
    listKey: 'blogs' | 'myBlogs' | 'pendingBlogs' | 'allBlogs',
    blogId: number,
    updates: Partial<Blog>
) {
    const list = $blogStore[listKey].get();
    const index = list.findIndex(b => b.id === blogId);
    if (index !== -1) {
        list[index] = { ...list[index], ...updates };
        $blogStore[listKey].set([...list]);
    }
}

/**
 * Add comment to blog
 */
export async function addComment(blogId: number, content: string) {
    const token = auth$.token.get();
    if (token) {
        try {
            const response = await api.post<Comment2>(
                `/blogs/${blogId}/comments`,
                { content },
                { token },
                submitStateManager
            );
            if (response.success && response.data) {
                // Add to current blog's comments
                const currentBlog = $blogStore.currentBlog.get();
                if (currentBlog && currentBlog.id === blogId) {
                    currentBlog.comments = [response.data, ...(currentBlog.comments || [])];
                    currentBlog.comments_count += 1;
                    $blogStore.currentBlog.set({ ...currentBlog });
                }
            }
            return response;
        }catch(error) {
            console.error(`failed to add comment: ${error}`);
        }
    }


}

/**
 * Toggle like on a comment
 */
export async function toggleCommentLike(commentId: number) {
    const token = auth$.token.get();
    if (token) {
        try {
            const response =await api.post<{ liked: boolean; total_likes: number }>(
                `/comments/${commentId}/like`,
                {},
                { token },
                submitStateManager
            )
            if(response.success && response.data) {
                const currentBlog = $blogStore.currentBlog.get();
                if (currentBlog?.comments) {
                    const comments = currentBlog.comments.map(comment => {
                        if (comment.id === commentId) {
                            // @ts-ignore
                            return { ...comment, likes_count: response.data.total_likes };
                        }
                        return comment;
                    });
                    currentBlog.comments = comments;
                    $blogStore.currentBlog.set({ ...currentBlog });
                }
            }
            return response;
        }catch(error) {
            console.error(`failed to toggle comment like like:${commentId}`);
        }
    }
}

/**
 * Reply to a comment
 */
export async function replyToComment(commentId: number, content: string) {
  const token = auth$.token.get();
  if (token) {
      try {
          const response = await api.post(`/comments/${commentId}/reply`, {content},{token})
          if(response.success && response.data) {
              // Add reply to comment in current blog
              const currentBlog = $blogStore.currentBlog.get();
              if (currentBlog?.comments) {
                  const comments = currentBlog.comments.map(comment => {
                      if (comment.id === commentId) {
                          return {
                              ...comment,
                              replies: [response.data, ...comment.replies],
                              replies_count: comment.replies_count + 1
                          };
                      }
                      return comment;
                  });
                  currentBlog.comments = comments;
                  $blogStore.currentBlog.set({ ...currentBlog });
              }
              return response;
          }
      }catch(error) {
          console.error(`failed to reply to comment: ${error}`);
      }
  }

}

/**
 * Delete Comment
 */
export async function deleteComment(commentId:number) {
    const token = auth$.token.get();
    if (token) {
        try {
            const response = await api.delete(
                `/comments/${commentId}`,
                { token },
                submitStateManager
            )
            if(response.success && response.data) {
                const currentBlog = $blogStore.currentBlog.get();
                if (currentBlog?.comments) {
                    currentBlog.comments = currentBlog.comments.filter(c => c.id !== commentId);
                    currentBlog.comments_count -= 1;
                    $blogStore.currentBlog.set({ ...currentBlog });
                }
            }
            return response;
        }catch(error) {
        console.error(`failed to delete comment: ${error}`);
        }
    }
}


/**
 * Get pending Blogs for Admin
 */
export const getPendingBlogs=async () => {
    const token = auth$.token.get();
    if(token) {
        try {
            const response =await api.get<Blog[]>(
                `/admin/blogs/pending`,
                {token},
                listStateManager
                )
            if(response.success && response.data) {
                $blogStore.pendingBlogs.set(response.data);
                // @ts-ignore
                $blogStore.pendingBlogsMeta.set(response.meta || null);

            }
            return response;
        }catch(error) {
            console.error(`failed to add comment: ${error}`);
        }
    }

}

/**
 *
 * @param filters
 * get all Blogs for admin
 */
export async function getAllBlogsForAdmin() {
    const token = auth$.token.get();
    if (token) {
        try {
            const response = await api.get<Blog[]>(
                "/admin/blogs"
                ,{token},
                listStateManager
            )
            if(response.success && response.data) {
                $blogStore.allBlogs.set(response.data);
                //@ts-ignore
                $blogStore.allBlogsMeta.set(response.meta || null);
            }
            return response;
        }catch(error) {
            console.error(`failed to get all blogs ${error}`);
        }
    }
}


export async function updateBlogApprovalStatus(
    blogId: number,
    action: 'approve' | 'reject',
    notes?: string,
) {
    const token = auth$.token.get();
    if (token) {
        try {
            const response = await api.patch(
                `/admin/blogs/${blogId}/approval`,
                {action,notes},
                {token}
            )
            if(response.success && response.data) {
                // Remove from pending list
                const pendingBlogs = $blogStore.pendingBlogs.get().filter(b => b.id !== blogId);
                $blogStore.pendingBlogs.set(pendingBlogs);

                // Update in all blogs list
                const allBlogs = $blogStore.allBlogs.get();
                const index = allBlogs.findIndex(b => b.id === blogId);
                if (index !== -1) {
                    allBlogs[index] = response.data;
                    $blogStore.allBlogs.set([...allBlogs]);
                }
                // Update current blog if viewing
                if ($blogStore.currentBlog.get()?.id === blogId) {
                    $blogStore.currentBlog.set(response.data);
                }
            }
        }catch(error) {
            console.error("Failed to update blog approval status:", error)
        }
    }
}

/**
 * Clear all blog data
 */
export function clearBlogStore() {
    $blogStore.set({
        blogs: [],
        blogsMeta: null,
        currentBlog: null,
        myBlogs: [],
        myBlogsMeta: null,
        pendingBlogs: [],
        pendingBlogsMeta: null,
        allBlogs: [],
        allBlogsMeta: null,
        isLoading: false,
        isLoadingDetail: false,
        isSubmitting: false,
        error: null,
        errors: null,
        filters: {},
    });
}

/**
 * Clear current blog detail
 */
export function clearCurrentBlog() {
    $blogStore.currentBlog.set(null);
}

/**
 * Clear errors
 */
export function clearBlogErrors() {
    $blogStore.error.set(null);
    $blogStore.errors.set(null);
}