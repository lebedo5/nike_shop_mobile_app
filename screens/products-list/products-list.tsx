import { StyleSheet, Text, Image, Dimensions, FlatList, Pressable, View } from "react-native"
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Screen } from "../../components/screen/screen";
import { Header } from "../../components/header/header";
import { Feather } from '@expo/vector-icons';
import { useRef } from "react";
import { FFBottomSheetRef } from "../../components/bottom-sheet/bottom-sheet";
import { ProductDetails } from "../../components/product-detail/product-detail";
import { size } from "../../utils/size";
import { useSelector, useDispatch } from "react-redux";
import { productSlice } from "../../store/productsSlice";
import { selectNumberOfItem } from '../../store/cartSlice'

const { width } =  Dimensions.get("window")
export const ProductsList = () => {
	const navigation = useNavigation()
	const products = useSelector(state => state.products.products)
	const numberOfItems = useSelector(selectNumberOfItem)
	const dispatch = useDispatch()
	const openMenu = () => {
		navigation.dispatch(DrawerActions.openDrawer())
	}

	const productDetailsRef = useRef<FFBottomSheetRef>(null);

	const closeDetails = () => {
		productDetailsRef.current?.hide();
	}

	const openProductDetails = (item) => {
		//update selected product
		dispatch(productSlice.actions.setSelectedProduct(item.id))
		productDetailsRef?.current?.show();
	}

	return (
		<Screen preset={"fixed"} style={styles.container}>
			<Header
				leftComponent={
					<Pressable onPress={openMenu}>
						<Feather name="menu" size={24} color="black" />
					</Pressable>
				}
				headerText={'Product'}
				rightComponent={
					<Pressable style={styles.shoppingBlock} onPress={() => navigation.navigate("ShoppingCart")}>
						<Feather name="shopping-cart" size={24} color="black" />
						{Boolean(numberOfItems) && <Text style={styles.shoppingCartText}>{numberOfItems}</Text>}
					</Pressable>
				}
			/>
			<FlatList
				data={products}
				numColumns={2}
				contentContainerStyle={styles.listComponent}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => {
					return (
						<Pressable onPress={() => openProductDetails(item)} style={styles.itemContainer}>
							<Image
								source={{ uri: item.image }}
								style={styles.imageStyle}
							/>
							<View style={styles.textBlock}>
								<Text style={styles.titleProduct}>{item.name}</Text>
							</View>
						</Pressable>
					)
				}}
			/>
			<ProductDetails productDetailsRef={productDetailsRef} onClose={closeDetails}/>
		</Screen>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageStyle: {
		width: "100%",
		aspectRatio: 1,
	},
	itemContainer: {
		flexDirection: "column",
		width: "50%",
		padding: size(6),
	},
	listComponent: {
		justifyContent: 'space-between',
		width: width - size(32),
		alignItems: 'center',
	},
	shoppingCartText: {
		fontWeight: "500",
		color: "black",
		paddingLeft: size(10)
	},
	shoppingBlock: {
		flexDirection: 'row',
		alignItems: "center"
	},
	textBlock: {
		position: "absolute",
		bottom: 8,
		alignSelf: 'center',
		backgroundColor: 'rgba(149, 167, 232, 0.4)',
		paddingHorizontal: size(24),
		paddingVertical: size(6),
		borderRadius: size(6)
	},
	titleProduct: {
		color: "black",
		fontSize: 14,
		fontWeight: '600'}
});
