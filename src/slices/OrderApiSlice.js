import {apiSlice} from "./apiSlice";

const BASE_URL = import.meta.env.VITE_API_URL || ""; // Fallback could cause empty base URL
const ORDER_URL = `${BASE_URL}/api/order`;

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllItems: builder.query({
            query: (vendorID) => `${ORDER_URL}/item-selection/${vendorID}`,
        }),
    })
});

export const { useGetAllItemsQuery } = orderApiSlice;
