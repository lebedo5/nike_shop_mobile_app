import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnboardingNavigator } from "./onboarding-navigator/onboarding-navigator";
import { NavigationContainer } from "@react-navigation/native";
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
			<Stack.Screen name={'OnboardingFlow'} component={OnboardingNavigator} />
			<Stack.Screen name={'userFlow'} component={UserFlowNavigation} />
		</Stack.Navigator>
	)
}
// type NavigationProps = Partial<React.ComponentProps<typeof NavigationContainer>>;

// export const AppNavigator = (props: NavigationProps) => {
// 	// const { theme } = useCustomTheme();
//
// 	// useBackButtonHandler(canExit);
// 	return (
// 		// @ts-ignore
// 		<NavigationContainer ref={navigationRef} theme={theme === 'light' ? FFLightTheme : FFDarkTheme}>
// 			<AppStack {...props} />
// 		</NavigationContainer>
// 	);
// };
