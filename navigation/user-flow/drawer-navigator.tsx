import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../../screens/home/home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type InternalNavigatorParamList = {
	Home: undefined
}


const Stack = createNativeStackNavigator<InternalNavigatorParamList>();
const Tab = createBottomTabNavigator<InternalNavigatorParamList>();

export const InternalDrawerNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName={'Home'}
			backBehavior={'history'}
			screenOptions={{ headerShown: false }}
			// tabBar={(props) => <BottomNavBar {...props} />}
		>
			<Stack.Screen name={"Home"} component={Home} />
		</Tab.Navigator>
	)
}
