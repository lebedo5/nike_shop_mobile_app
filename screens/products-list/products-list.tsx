import { StyleSheet, Text, Image, Dimensions, FlatList, Pressable, View, ActivityIndicator } from "react-native"
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Screen } from "../../components/screen/screen";
import { Header } from "../../components/header/header";
import { Feather } from '@expo/vector-icons';
import { useRef, useState } from "react";
import { FFBottomSheetRef } from "../../components/bottom-sheet/bottom-sheet";
import { ProductDetails } from "../../components/product-detail/product-detail";
import { size } from "../../utils/size";
import { useSelector } from "react-redux";
import { selectNumberOfItem } from '../../store/cartSlice'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGetProductsQuery } from "../../store/apiSlice";

const { width } =  Dimensions.get("window")
export const ProductsList = () => {
	const navigation = useNavigation()
	const numberOfItems = useSelector(selectNumberOfItem)
	const productDetailsRef = useRef<FFBottomSheetRef>(null);
	const [productId, setProductId] = useState<string | null>(null);

	const { bottom } = useSafeAreaInsets()

	const { data } = useGetProductsQuery();
	const product = data;
	const openMenu = () => {
		navigation.dispatch(DrawerActions.openDrawer())
	}

	const closeDetails = () => {
		productDetailsRef.current?.hide();
		setProductId(null)
	}

	const openProductDetails = (item) => {
		//update selected product
		setProductId(item._id);
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
				data={product?.data}
				numColumns={2}
				contentContainerStyle={[styles.listComponent, { paddingBottom: bottom }]}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => {
					return (
						<Pressable onPress={() => openProductDetails(item)} style={styles.itemContainer}>
							<Image
								source={{ uri: item.image }}
								style={styles.imageStyle}
							/>
						</Pressable>
					)
				}}
			/>
			<ProductDetails productId={productId} productDetailsRef={productDetailsRef} onClose={closeDetails}/>
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
		borderRadius: size(10),
		overflow: 'hidden'
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
