import { apiSlice } from "./apiSlice";
const ITEMS_URL = "/api/vendor";

export const itemApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addItem: builder.mutation({
      query: (data) => ({
        url: `${ITEMS_URL}/add-items`,
        method: "POST",
        body: data,
      }),
    }),
    getItems: builder.query({
      query: () => `${ITEMS_URL}/get-items`,
    }),
    getItemById: builder.query({
      query: (id) => `${ITEMS_URL}/${id}`,
    }),
    updateItem: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${ITEMS_URL}/update-item/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `${ITEMS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddItemMutation,
  useGetItemsQuery,
  useGetItemByIdQuery,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemApiSlice;
