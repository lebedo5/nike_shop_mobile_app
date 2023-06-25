import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductsList } from "../../screens/products-list/products-list";
import { BottomNavBar } from "../../components/bottom-nav-bar/bottom-nav-bar";
import { ShoppingCart } from "../../screens/shopping-cart/shopping-cart";

export type InternalNavigatorParamList = {
	ProductsList: undefined
	ProductDetail: undefined
	ShoppingCart: undefined
}


const Stack = createNativeStackNavigator<InternalNavigatorParamList>();
const Tab = createBottomTabNavigator<InternalNavigatorParamList>();

export const InternalDrawerNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName={'ProductsList'}
			backBehavior={'history'}
			screenOptions={{ headerShown: false }}
			tabBar={(props) => <BottomNavBar {...props} />}
		>
			<Stack.Screen
				name={"ProductsList"}
				component={ProductsList}
			/>
			<Stack.Screen name={"ShoppingCart"} component={ShoppingCart} />
		</Tab.Navigator>
	)
}
