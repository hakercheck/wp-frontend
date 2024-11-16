import { apiSlice } from "./apiSlice";
const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => `${ADMIN_URL}/get-users`,
    }),
    getUserById: builder.query({
      query: (id) => `${ADMIN_URL}/get-user/${id}`,
    }),
    updateUserByAdmin: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${ADMIN_URL}/update-user/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserByAdminMutation,
  useDeleteUserMutation,
} = adminApiSlice;
