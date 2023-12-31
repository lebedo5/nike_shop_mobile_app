import { createDrawerNavigator } from "@react-navigation/drawer";
import { InternalDrawerNavigator } from "./drawer-navigator";
import { Sidebar } from "../../components/sidebar/sidebar";


export type UserFlowNavigatorParamList = {
	internal: undefined;
};

const Drawer = createDrawerNavigator<UserFlowNavigatorParamList>();

export const UserFlowNavigation = () => {
	return (
		<Drawer.Navigator
			useLegacyImplementation={true}
			screenOptions={{
				drawerType: 'front',
				headerShown: false,
				swipeEnabled: false,
			}}
			backBehavior={'history'}
			drawerContent={(props) => <Sidebar {...props} />}
		>
			<Drawer.Screen name="internal" component={InternalDrawerNavigator} />
		</Drawer.Navigator>
	)
}
