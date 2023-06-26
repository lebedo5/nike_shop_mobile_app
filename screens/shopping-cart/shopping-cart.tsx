import { FlatList, Text, View, StyleSheet, Pressable } from "react-native"
import { CartListItem } from "../../components/card-list-item/cart-list-item";
import { Header } from "../../components/header/header";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectDeliveryPrice, selectSubTotal, totalPrice } from "../../store/cartSlice";
import { EmptyShoppingCart } from "../../components/empty-shopping-cart/empty-shopping-cart";
import { Screen } from "../../components/screen/screen"
import { size } from "../../utils/size";
const ShoppingCartTotal = () => {
	const subtotal = useSelector(selectSubTotal);
	const deliveryFee = useSelector(selectDeliveryPrice)
	const total = useSelector(totalPrice)

	return (
		<View style={styles.totalContainer}>
			<View style={styles.row}>
				<Text style={styles.subTotal}>Subtotal</Text>
				<Text style={styles.fullPrice}>{subtotal} US$</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.subTotal}>Delivery</Text>
				<Text style={styles.fullPrice}>{deliveryFee} US$</Text>
			</View>
			<View style={styles.row}>
				<Text style={[styles.subTotal, styles.bold]}>Total</Text>
				<Text style={[styles.fullPrice, styles.bold]}>{total} US$</Text>
			</View>
		</View>
	)
}

export const ShoppingCart = () => {
	const navigation = useNavigation()

	const carts = useSelector(state => state.cart.items)
	const cancel = async () => {
		navigation.goBack();
	};

	return (
		<Screen preset={'scroll'} style={styles.root}>
			<Header
				leftComponent={
					<Pressable onPress={cancel}>
						<Feather name="arrow-left" size={24} color="black" />
					</Pressable>
				}
				headerText={'Shopping Cart'}
			/>
			<FlatList
				data={carts}
				contentContainerStyle={styles.root}
				renderItem={({ item }) => <CartListItem cartItem={item} />}
				ListFooterComponent={carts.length ? ShoppingCartTotal : null}
				ListEmptyComponent={EmptyShoppingCart}
			/>
		</Screen>
	)
}

const styles = StyleSheet.create({
	root: { flex: 1 },
	totalContainer: {
		margin: size(20),
		paddingTop: size(10),
		borderColor: "gainsboro",
		borderTopWidth: size(1)
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: size(2)
	},
	subTotal: {
		fontSize: size(16),
		color: 'gray'
	},
	fullPrice: {
		fontSize: size(16),
		color: 'gray'
	},
	bold: {
		fontSize: size(16),
		fontWeight: '600',
		color: 'black'
	},
	button: {
		position: 'absolute',
		backgroundColor: "black",
		bottom: size(20),
		width: "90%",
		alignSelf: "center",
		padding: size(20),
		borderRadius: size(100),
		alignItems: "center"
	},
	buttonText: {
		color: "white",
		fontWeight: "500",
		fontSize: size(16)
	}
})
