import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseUrl = 'http://localhost:3000/';

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => 'products',
		}),
		getProduct: builder.query({
			query: (id) => `products/${id}`,
		}),
		//used mutation when post, patch to update some date
		createOrder: builder.mutation({
			query: (newOrder) => (
				{
					url: "orders",
					method: "POST",
					body: newOrder
				}
			)
		}),
		getOrder: builder.query({
			query: (ref) => `orders/${ref}`
		})
	})
})

export const { useGetProductQuery, useGetProductsQuery, useGetOrderQuery, useCreateOrderMutation } = apiSlice;
