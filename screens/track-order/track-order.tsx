import { useGetOrderQuery } from "../../store/apiSlice";
import { Screen } from "../../components/screen/screen";
import { TextInput, View, StyleSheet, ActivityIndicator, Text, FlatList, Image } from "react-native";
import { palette } from "../../theme/pallete";
import { fontSize, size } from "../../utils/size";
import { useMemo, useState } from "react";

export const TrackOrder = () => {
	const [ref, setRef] = useState<string>("")
	// "fc734"
	const { data, isLoading } = useGetOrderQuery(ref)

	const isOrderData = useMemo(() => {
		if(data?.status !== "OK") {
			return (
				<View style={{
					justifyContent: "center",
					alignItems: "center",
					paddingVertical: size(20)
				}}>
					<Text>Order not found</Text>
				</View>
			)
		} else {
			return (
				<View>
					<FlatList
						data={data?.data?.items}
						renderItem={({ item }) => {
							return (
								<View style={styles.block}>
									<Image source={{ uri: item.product.image }} style={styles.image} />
									<View>
										<Text style={styles.name}>{item.product.name} - {item.quantity}</Text>
										<Text style={styles.price}>{item.product.price} $</Text>
									</View>
								</View>
							)}}
						ListFooterComponent={() => data?.data?.items && (
							<View style={styles.totalContainer}>
								<View style={styles.row}>
									<Text style={[styles.subTotal, styles.bold]}>Total</Text>
									<Text style={[styles.fullPrice, styles.bold]}>{data?.data?.total} US$</Text>
								</View>
							</View>
						)}
					/>

				</View>
			)
		}
	}, [data?.data])

	return (
		<Screen style={styles.root} preset={"fixed"}>
			<View>
				<TextInput
					style={styles.input}
					value={ref}
					onChangeText={(val) => setRef(val)}
					placeholder={"Your order reference"}
					autoCorrect={false}
				/>
				{isLoading && <ActivityIndicator/>}
				{isOrderData}
			</View>
		</Screen>
	)
}

const styles = StyleSheet.create({
	root: {
		paddingHorizontal: size(32),
		marginTop: size(20)
	},
	input: {
		borderColor: palette.separatorTextColor,
		borderWidth: 1,
		padding: size(10),
		borderRadius: size(6),
		marginBottom: size(20)
	},
	image: {
		width: "40%",
		aspectRatio: 1,
		marginRight: size(20)
	},
	name: {
		fontWeight: "500",
		fontSize: 18,
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
		color: 'gray',
		letterSpacing: 2
	},
	bold: {
		fontSize: size(16),
		fontWeight: '600',
		color: 'black'
	},
	totalContainer: {
		marginVertical: size(20),
		paddingTop: size(10),
		borderColor: "gainsboro",
		borderTopWidth: size(1)
	},
	price: {
		fontSize: fontSize(16),
		fontWeight: '500',
		letterSpacing: 2
	},
	block: { flexDirection: "row", alignItems: 'center' }
})
