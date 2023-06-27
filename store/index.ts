import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from './productsSlice'
import { cartSlice } from "./cartSlice";
import { apiSlice } from "./apiSlice";
export const store = configureStore({
	reducer: {
		products: productSlice.reducer,
		cart: cartSlice.reducer,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware)
})
