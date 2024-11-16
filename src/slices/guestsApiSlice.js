import { apiSlice } from "./apiSlice";
const GUESTS_URL = "/api/guests";

export const guestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addGuest: builder.mutation({
      query: (data) => ({
        url: `${GUESTS_URL}/add-guests`,
        method: "POST",
        body: data,
      }),
    }),
    getGuests: builder.query({
      query: () => `${GUESTS_URL}/get-guests`,
    }),
    getGuestById: builder.query({ // Add this endpoint
      query: (id) => `${GUESTS_URL}/${id}`,
    }),
    updateGuest: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${GUESTS_URL}/update-guest/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteGuest: builder.mutation({
      query: (id) => ({
        url: `${GUESTS_URL}/delete-guest/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddGuestMutation,
  useGetGuestsQuery,
  useGetGuestByIdQuery,
  useUpdateGuestMutation,
  useDeleteGuestMutation,
} = guestApiSlice;
