import { observable } from "@legendapp/state";
import { synced } from "@legendapp/state/sync";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { api } from "@/hooks/api";
import type {
  Booking,
  BookingState,
  CreateBookingRequest,
  CreateBookingResponse,
  VerifyPaymentResponse,
  BookingFilters,
  PaginatedBookings,
  BookingStatistics,
  UpdateBookingRequest,
} from "@/types";
import { auth$ } from "./auth.store";

export const bookings$= observable<BookingState>(
  synced(
    {
      initial:{
        userBookings: [],
        adminBookings: null,
        currentBooking: null,
        statistics: null,
        isLoading: false,
        isCreating: false,
        isVerifying: false,
        error: null,
        errors: null,

      },
      persist:{
        name: "bookingState",
        plugin: ObservablePersistLocalStorage
      }
    }

  )
)

const loadingStateManager = {
  isLoading: { set: (value: boolean) => bookings$.isLoading.set(value) },
  error: { set: (value: string | null) => bookings$.error.set(value) },
  errors: { set: (value: Record<string, string[]> | null) => bookings$.errors.set(value) },
};

const creatingStateManager = {
  isLoading: { set: (value: boolean) => bookings$.isCreating.set(value) },
  error: { set: (value: string | null) => bookings$.error.set(value) },
  errors: { set: (value: Record<string, string[]> | null) => bookings$.errors.set(value) },
};

const verifyingStateManager = {
  isLoading: { set: (value: boolean) => bookings$.isVerifying.set(value) },
  error: { set: (value: string | null) => bookings$.error.set(value) },
  errors: { set: (value: Record<string, string[]> | null) => bookings$.errors.set(value) },
};

/**
 * @GET /bookings
 * Fetch user's bookings with optional filters
 */

export const fetchUserBookings = async(filters?:BookingFilters)=>{
  const token = auth$.token.get();
  if(token){
    try{
      const response = await api.get<Booking[]>(
        "/bookings",
        { token, params: filters as any },
        loadingStateManager
      );

      if(response.success && response.data){
        bookings$.userBookings.set([...response.data])

      }
      return response

    }catch(error){
      console.error("failed to fetch blogs!")
    }
  }
}

/**
 * @POST /bookings
 * Create a new booking with payment
 * This initiates the MTN MoMo payment flow
 */
export const createBooking = async (data:CreateBookingRequest)=>{
const token = auth$.token.get();
  if(token){

  try
  {
    const response = await api.post<CreateBookingResponse>(
      "/bookings",
      data,
      {token},
      creatingStateManager
    )
    if( response.data && response.success){
      const {booking} = response.data;

      // add created booking to user bookigs
      const currentBookings=bookings$.userBookings.peek()
      bookings$.userBookings.set([booking,...currentBookings])

      //add the booking to currentBookings
      bookings$.currentBooking.set(booking)
    }

  }
  catch(error){
    console.error("Failed to create Booking "+ error)
  }
}

}

/**
 * @GET /bookings/{bookingId}
 * Get a specific booking by ID
 */
export const fetchBooking = async (bookingId: number)=>{
  const token = auth$.token.get();
  if(token){
    const response = await api.get<Booking>(
      `/bookings/${bookingId}`,
      {token},
      loadingStateManager
    )
    if(response.data && response.success){
      bookings$.currentBooking.set(response.data);

      // Update in user bookings if exists
      const currentBookings = bookings$.userBookings.peek();
      const updatedBookings = currentBookings.map((b) =>
        b.id === bookingId ? response.data! : b
      );
      bookings$.userBookings.set(updatedBookings);
    }
  }
}

/**
 * @Get /bookings/reference/${reference}
 * booking by reference number
 */
export async function fetchBookingByReference(  reference: string) {
  const token = auth$.token.get();
  if(token){
  const response = await api.get<Booking>(
    `/bookings/reference/${reference}`,
    { token },
    loadingStateManager
  );

  if (response.success && response.data) {
    bookings$.currentBooking.set(response.data);
  }
  return response;
}

}

/**
 * @Post /bookings/${bookingId}/verify-payment
 * Verify payment status for a booking
 * This checks with MTN MoMo for payment confirmation
 */
export async function verifyPayment(bookingId: number) {
  const token = auth$.token.get();
  if(token){
  const response = await api.post<VerifyPaymentResponse>(
    `/bookings/${bookingId}/verify-payment`,
    {},
    { token },
    verifyingStateManager
  );

  if (response.success && response.data) {
    const { booking } = response.data;

    // Update current booking
    bookings$.currentBooking.set(booking);

    // Update in user bookings list
    const currentBookings = bookings$.userBookings.peek();
    const updatedBookings = currentBookings.map((b) =>
      b.id === bookingId ? booking : b
    );
    bookings$.userBookings.set(updatedBookings);
  }

  return response;
}

}

/**
 * Cancel a booking
 */
export async function cancelBooking(bookingId: number) {
  const token = auth$.token.get();
  if(token){
  const response = await api.post<{ booking: Booking; message: string }>(
    `/bookings/${bookingId}/cancel`,
    {},
    { token },
    loadingStateManager
  );

  if (response.success && response.data) {
    const { booking } = response.data;

    // Update current booking
    if (bookings$.currentBooking.peek()?.id === bookingId) {
      bookings$.currentBooking.set(booking);
    }

    // Update in user bookings list
    const currentBookings = bookings$.userBookings.peek();
    const updatedBookings = currentBookings.map((b) =>
      b.id === bookingId ? booking : b
    );
    bookings$.userBookings.set(updatedBookings);
  }

  return response;
}
}

//==========================
  //ADMIN ONlY
//=========================
/**
 * @GET /admin/bookings
 * Fetch all bookings with filters (Admin only)
 */
export async function fetchAdminBookings(filters?: BookingFilters & { page?: number }
) {
  const token = auth$.token.get();
  if(token){
  const response = await api.get<PaginatedBookings>(
    "/admin/bookings",
    { token, params: filters as any },
    loadingStateManager
  );

  if (response.success && response.data) {
    bookings$.adminBookings.set(response.data);
  }

  return response;
}
}

/**
 * @GET /admin/bookings/statistics
 * Fetch booking statistics (Admin only)
 */
export async function fetchStatistics() {
   const token = auth$.token.get();
  if(token){
  const response = await api.get<BookingStatistics>(
    "/admin/bookings/statistics",
    { token },
    loadingStateManager
  );

  if (response.success && response.data) {
    bookings$.statistics.set(response.data);
  }

  return response;
}
}

/**
 * Confirm a booking (Admin only)
 */
export async function confirmBooking(bookingId: number) {
  const token = auth$.token.get();
  if(token){
  const response = await api.post<{ booking: Booking; message: string }>(
    `/admin/bookings/${bookingId}/confirm`,
    {},
    { token },
    loadingStateManager
  );

  if (response.success && response.data) {
    updateBookingInLists(response.data.booking);
  }

  return response;
}
}

/**
 * Complete a booking (Admin only)
 */
export async function completeBooking(bookingId: number) {
  const token = auth$.token.get();
  if(token){
  const response = await api.post<{ booking: Booking; message: string }>(
    `/admin/bookings/${bookingId}/complete`,
    {},
    { token },
    loadingStateManager
  );

  if (response.success && response.data) {
    updateBookingInLists(response.data.booking);
  }

  return response;
}

}

/**
 * Update a booking (Admin only)
 */
export async function updateBooking(
  bookingId: number,
  data: UpdateBookingRequest,
  token: string
) {
  const response = await api.put<{ booking: Booking; message: string }>(
    `/admin/bookings/${bookingId}`,
    data,
    { token },
    loadingStateManager
  );

  if (response.success && response.data) {
    updateBookingInLists(response.data.booking);
  }

  return response;
}

/**
 * @Delete a booking (Admin only)
 */
export async function deleteBooking(bookingId: number) {
  const token = auth$.token.get();
  if(token){
  const response = await api.delete<{ message: string }>(
    `/admin/bookings/${bookingId}`,
    { token },
    loadingStateManager
  );

  if (response.success) {
    // Remove from admin bookings
    const adminBookings = bookings$.adminBookings.peek();
    if (adminBookings) {
      const filtered = adminBookings.data.filter((b) => b.id !== bookingId);
      bookings$.adminBookings.set({
        ...adminBookings,
        data: filtered,
      });
    }

    // Remove from user bookings
    const userBookings = bookings$.userBookings.peek();
    bookings$.userBookings.set(userBookings.filter((b) => b.id !== bookingId));

    // Clear current booking if it's the deleted one
    if (bookings$.currentBooking.peek()?.id === bookingId) {
      bookings$.currentBooking.set(null);
    }
  }
  return response;
}
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * @Update booking in all lists (user bookings, admin bookings, current booking)
 */
function updateBookingInLists(booking: Booking) {
  // Update current booking
  if (bookings$.currentBooking.peek()?.id === booking.id) {
    bookings$.currentBooking.set(booking);
  }

  // Update in user bookings
  const userBookings = bookings$.userBookings.peek();
  const updatedUserBookings = userBookings.map((b) =>
    b.id === booking.id ? booking : b
  );
  bookings$.userBookings.set(updatedUserBookings);

  // Update in admin bookings
  const adminBookings = bookings$.adminBookings.peek();
  if (adminBookings) {
    const updatedData = adminBookings.data.map((b) =>
      b.id === booking.id ? booking : b
    );
    bookings$.adminBookings.set({
      ...adminBookings,
      data: updatedData,
    });
  }
}

/**
 * Clear all errors
 */
export function clearErrors() {
  bookings$.error.set(null);
  bookings$.errors.set(null);
}

/**
 * Clear current booking
 */
export function clearCurrentBooking() {
  bookings$.currentBooking.set(null);
}


