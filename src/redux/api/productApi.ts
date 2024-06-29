import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../../types/productType";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product, { limit: number; skip: number }>({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
    }),
    getProductsById: builder.query<number>({
      query: (id) => `products/${id}`,
    }),
    getProductcategory: builder.query({
      query: () => `products/categories`,
    }),
    updateProduct: builder.mutation<
      Product,
      { id: number; payload: UpdateProductPayload }
    >({
      query: ({ id, payload }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductsByIdQuery } = productApi;
