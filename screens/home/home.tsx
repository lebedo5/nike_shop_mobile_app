import { StyleSheet, Text, View, Image, Dimensions, FlatList, Button } from "react-native"
import products from "../../data/products";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const { width } =  Dimensions.get("window")
export const Home = () => {
	const navigation = useNavigation()
	const openMenu = () => {
		navigation.dispatch(DrawerActions.openDrawer())
	}
	return (
		<View style={styles.container}>
			<Button title={"open drawer menu"} />
			<FlatList
				data={products}
				numColumns={2}
				contentContainerStyle={styles.listComponent}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => {
					return (
						<View style={styles.itemContainer}>
							<Image
								source={{ uri: item.image }}
								style={styles.imageStyle}
							/>
							<Text>{item.name}</Text>
						</View>
					)
				}}
			/>
			<Button onPress={openMenu} title={"open drawer menu"} />
		</View>
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
		padding: 5,
	},
	listComponent: {
		justifyContent: 'space-between',
		width: width - 32,
		alignItems: 'center',
		paddingTop: 60
	}
});
