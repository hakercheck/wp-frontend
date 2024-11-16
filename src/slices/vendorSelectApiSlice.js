import { apiSlice } from "./apiSlice";

const BASE_URL = import.meta.env.VITE_API_URL || "";
const VENDOR_SELECT_URL = `${BASE_URL}/api/vendorSelect`;

export const vendorSelectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVendorSelections: builder.query({
      query: () => `${VENDOR_SELECT_URL}`,
    }),
    getVendorDisplaysForClient: builder.query({
      query: () => `${VENDOR_SELECT_URL}/vendor-selection`,
    }),
    updateVendorSelect: builder.mutation({
      query: ({ vendorID, clientID }) => ({
        url: `${VENDOR_SELECT_URL}/update-vendor-select/${vendorID}/${clientID}`,
        method: "PUT",
        body: { vendorID, clientID },
      }),
    }),
    removeDuplicates: builder.mutation({
      query: () => ({
        url: `${VENDOR_SELECT_URL}/remove-duplicates`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetVendorSelectionsQuery,
  useGetVendorDisplaysForClientQuery,
  useUpdateVendorSelectMutation,
  useRemoveDuplicatesMutation,
} = vendorSelectApiSlice;
