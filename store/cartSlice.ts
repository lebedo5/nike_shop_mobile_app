import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
	items: [],
	deliveryFee: 15,
	freeDeliveryFrom: 200,
}

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addCartItem: (state, action) => {
			const newProduct = action.payload.product;
			const equalItem = state.items.find(item => item.product.id === newProduct.id)
			if(equalItem) {
				equalItem.quantity += 1
			} else {
				state.items.push({ product: newProduct, quantity: 1 });
			}

		},
		changeQuantity: (state, action) => {
			const { productId, amount } = action.payload
			const cartItem = state.items.find(item => item.product.id === productId)

			if(cartItem) {
				cartItem.quantity += amount
			}

			if(cartItem.quantity <= 0) {
				state.items = state.items.filter(item => item !== cartItem)
			}
		},
	}
})

export const selectNumberOfItem = (state) => state.cart.items.reduce(
	(sum, cartItem) => sum + cartItem.quantity, 0
)
export const selectSubTotal = (state) => state.cart.items.reduce(
	(sum, cartItem) => sum + cartItem.product.price * cartItem.quantity, 0
)

const cartSelector = (state) => state.cart;

export const selectDeliveryPrice = createSelector(
	cartSelector,
	selectSubTotal, (cart, subtotal) => subtotal > cart.freeDeliveryFrom ? 0 : cart.deliveryFee
)

export const totalPrice = createSelector(
	selectSubTotal,
	selectDeliveryPrice, (subtotal, delivery) => subtotal + delivery
)

