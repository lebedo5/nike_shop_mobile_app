import { StyleSheet, View, Text, Button } from "react-native";
import { fontSize } from "../../utils/size";
import { useNavigation } from "@react-navigation/native";

export const EmptyShoppingCart = () => {
	const navigation = useNavigation()

	return (
		<View style={styles.root}>
			<Text style={styles.title}>The basket is empty</Text>
			<Button onPress={() => navigation.navigate("ProductsList")} title={"Return to the selection"} />
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: 'center',
		alignItems: "center",
	},
	title: {
		fontSize: fontSize(22),

	}
})
