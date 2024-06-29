import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category, Product, ProductsData } from "../../types/productType";
import { UpdateProductPayload } from "./../../types/productType";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsData, { limit: number; skip: number }>({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
    }),
    getProductsById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
    }),
    getProductcategory: builder.query<Category[], void>({
      query: () => "products/categories",
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

export const {
  useGetProductsQuery,
  useGetProductsByIdQuery,
  useGetProductcategoryQuery,
  useUpdateProductMutation,
} = productApi;
