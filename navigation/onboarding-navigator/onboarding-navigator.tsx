import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Onboarding } from "../../screens/onboarding/onboarding";

export type OnboardingNavigatorParamList = {
	Onboarding: undefined;
	WelcomeToFlipFam: undefined;
};

const Stack = createNativeStackNavigator<OnboardingNavigatorParamList>();


export const OnboardingNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: 'transparent' }, headerShown: false }}>
			{/*<Stack.Screen name="WelcomeToFlipFam" component={null} />*/}
			<Stack.Screen name="Onboarding" component={Onboarding} />
		</Stack.Navigator>
	)
}
