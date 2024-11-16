import { apiSlice } from "./apiSlice";

const BASE_URL = import.meta.env.VITE_API_URL || "";
const VENDOR_DISPLAY_URL = `${BASE_URL}/api/vendorDisplay`;

export const vendorDisplayApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addVendorDisplay: builder.mutation({
      query: (data) => ({
        url: `${VENDOR_DISPLAY_URL}/add-display-items`,
        method: "POST",
        body: data,
      }),
    }),
    getVendorDisplays: builder.query({
      query: () => `${VENDOR_DISPLAY_URL}/get-display-items`,
    }),
    getVendorDisplayById: builder.query({
      query: (id) => `${VENDOR_DISPLAY_URL}/display/${id}`,
    }),
    updateVendorDisplay: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${VENDOR_DISPLAY_URL}/update-display-item/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteVendorDisplay: builder.mutation({
      query: (id) => ({
        url: `${VENDOR_DISPLAY_URL}/display/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddVendorDisplayMutation,
  useGetVendorDisplaysQuery,
  useGetVendorDisplayByIdQuery,
  useUpdateVendorDisplayMutation,
  useDeleteVendorDisplayMutation,
} = vendorDisplayApiSlice;
