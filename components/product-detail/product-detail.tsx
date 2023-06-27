import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
	Pressable, Alert, ActivityIndicator
} from "react-native";
import { FFBottomSheet, FFBottomSheetRef } from "../bottom-sheet/bottom-sheet";
import { MutableRefObject } from "react";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartSlice } from "../../store/cartSlice";
import { useGetProductQuery } from "../../store/apiSlice";

export interface ProductDetailsProps {
	onClose: any;
	productDetailsRef: MutableRefObject<FFBottomSheetRef>;
	productId: string | null
}

export const ProductDetails = ({ onClose, productDetailsRef, productId }: ProductDetailsProps) => {
	const { width } = useWindowDimensions()

	const styles = fromStyle(width)

	const { data } = useGetProductQuery(productId);
	const dispatch = useDispatch()
	const addCart = () => {
		Alert.alert("Congratulations!", "you have added sneakers to the cart")
		dispatch(cartSlice.actions.addCartItem({ product: data?.data }))
	}

	const close = () => {
		// onClose();
	};

	return (
		<FFBottomSheet
			bottomSheetModalRef={productDetailsRef}
			onDismiss={close}
			snapPoints={['95%']}
		>
			{data?.data ? <BottomSheetScrollView>
				<FlatList
					data={data?.data?.images}
					horizontal
					renderItem={({item}) => (
						<Image
							source={{uri: item}}
							style={styles.imageStyle}
						/>
					)}
					pagingEnabled
					showsHorizontalScrollIndicator={false}
				/>

				<View style={styles.descriptionBlock}>
					<Text style={styles.title}>{data?.data?.name}</Text>
					<Text style={styles.price}>${data?.data?.price}</Text>
					<Text style={styles.description}>{data?.data?.description}</Text>
				</View>

				<Pressable onPress={addCart} style={styles.button}>
					<Text style={styles.buttonText}>Add to cart</Text>
				</Pressable>
			</BottomSheetScrollView> : <ActivityIndicator />}
		</FFBottomSheet>
	);
};

const fromStyle = (width) => StyleSheet.create({
	imageStyle: {
		width: width,
		aspectRatio: 1,
	},
	descriptionBlock: {
		padding: 20
	},
	title: {
		fontSize: 34,
		fontWeight: '500',
		marginVertical: 10
	},
	price: {
		fontSize: 16,
		fontWeight: '500',
		letterSpacing: 2
	},
	description: {
		marginVertical: 10,
		fontSize: 18,
		lineHeight: 30,
		fontWeight: '300'
	},
	button: {
		position: 'absolute',
		backgroundColor: "black",
		bottom: 30,
		width: "90%",
		alignSelf: "center",
		padding: 20,
		borderRadius: 100,
		alignItems: "center"
	},
	buttonText: {
		color: "white",
		fontWeight: "500",
		fontSize: 16
	}
});
