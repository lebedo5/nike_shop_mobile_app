import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStack } from "./navigation/app-navigation";


export default function App() {
  return (
    <NavigationContainer >
      <AppStack />
    </NavigationContainer>
  );
}
