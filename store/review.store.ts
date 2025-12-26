import {CreateReviewRequest, CreateReviewResponse, DeleteReviewResponse, Review, UpdateReviewRequest, UpdateReviewResponse,} from "@/types"
import {observable} from "@legendapp/state";
import {synced} from "@legendapp/state/sync";
import {ObservablePersistLocalStorage} from "@legendapp/state/persist-plugins/local-storage";
import { api } from "@/hooks/api";
import { auth$ } from "./auth.store";


interface ReviewsState {
  byDestination: Record<number, Review[]>;
  isLoading: boolean;
  error: string | null;
  errors: Record<string, string[]> | null;
}

export const review$ =observable<ReviewsState>(
  synced({
    initial:{
      byDestination:{},
      isLoading: false,
      error: null,
      errors: null
    }
    ,
  persist:
  {
    name:"reviewState",
    plugin: ObservablePersistLocalStorage
  }

  })
)

const listStateManager = {
    isLoading: review$.isLoading,
    error: review$.error,
    errors: review$.errors,
};

const detailStateManager = {
    isLoading: review$.isLoading,
    error: review$.error,
    errors: review$.errors,
};

const submitStateManager = {
    isLoading: review$.isLoading,
    error: review$.error,
    errors: review$.errors,
};
/**
 * get reviews by destinationId
 * @GET api/destinations/${destinationid}/reviews
 */

export const getReviews= async(destinationId:number)=>{
  try{
    const response = await api.get<Review[]>(
      `/destinations/${destinationId}/reviews`,
      {},
      listStateManager
    )
    if(response.success && response.data){
      review$.byDestination[destinationId].set(response.data)
    }
    return response

  }catch(error){
    console.error("failed to fetch Reviews\n" + error)
  }

}

/**
 * Create destination Review
 * @POST /destinations/{destinationId}/reviews
 */
export const createReviews= async(data:CreateReviewRequest,destinationId:number)=>{
  const token = auth$.token.get()
  if(token){
    try{
      const response = await api.post<CreateReviewResponse>(
        `/destinations/${destinationId}/reviews`,
          data,
        {token},
        submitStateManager
      )

      if(response.success && response.data){
        const currentReviews = review$.byDestination[destinationId].peek() || null;
        review$.byDestination[destinationId].set([
          response.data.review,
          ...currentReviews
        ])
      }
      return response;
    }
    catch(error){
        console.error(error)
    }
  }
}

/**
 * Update a Review
 * @PUT /reviews/{review}
 */

export const updateReview= async(data:UpdateReviewRequest, destinationId:number,reviewId:number)=>{
  const token =auth$.token.get();
  if(token){
    try{
    const response = await api.put<UpdateReviewResponse>(
      `/reviews/${reviewId}`,
      data,
      {token},
      submitStateManager
    )

    if(response.success && response.data){
      const currentReviews= review$.byDestination[destinationId].peek() || null;
      const updatedReviews = currentReviews.map((review)=> review.id===reviewId ? response.data!.review:review)
      review$.byDestination[destinationId].set(updatedReviews)
    }
    return response;
  }catch(err){
    console.error(err)
  }
  }
}

/**
 * @DELETE /reviews/{reviewId}
 * Delete review
 */

export const DeleteReview = async (reviewId:number,destinationId: number,)=>{
  const token = auth$.token.get();
  if(token){
    try{
      const response = await api.delete<DeleteReviewResponse>(
        `/reviews/${reviewId}`,
        {token},
        detailStateManager
      )

      if(response.data && response.success){
        const currentReviews = review$.byDestination[destinationId].peek() || null;
        const updatedReviews = currentReviews.filter((review)=>review.id !== reviewId)
        review$.byDestination[destinationId].set(updatedReviews)
      }
      return response;
    }catch(error){
      console.error(`Failed to delete Review`)
    }
  }
}

/**
 * Clear all Errors from review$ state
 */
export function clearErrors() {
  review$.error.set(null);
  review$.errors.set(null);
}

/**
 * Get review for a specific destination (reactive)
 */
export function getDestinationreview(destinationId: number) {
  return review$.byDestination[destinationId];
}

/**
 * Calculate average rating for a destination
 */
export function getAverageRating(destinationId: number): number {
  const reviewList = review$.byDestination[destinationId].peek() || [];
  if (reviewList.length === 0) return 0;

  const sum = reviewList.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviewList.length;
}
