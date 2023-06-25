import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserFlowNavigation } from "./user-flow/user-flow-navigation";

type NavigatorParamList =  {
	OnboardingFlow: undefined,
	userFlow: undefined
}

const Stack = createNativeStackNavigator<NavigatorParamList>();

export const AppStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName={'userFlow'}
		>
			<Stack.Screen name={'userFlow'} component={UserFlowNavigation} />
		</Stack.Navigator>
	)
}
