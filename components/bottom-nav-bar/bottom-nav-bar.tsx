import React, { useMemo } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native';
import { fontSize, isSmallDevice, size } from "../../utils/size";
import { Shadow } from 'react-native-shadow-2';
import { Feather } from "@expo/vector-icons";
import { palette } from "../../theme/pallete";


export interface FFTabProps {
  icon: string;
  title: string;
  routeName: string;
}

const tabs: Array<FFTabProps> = [
  {
    icon: "list",
    title: 'Products List',
    routeName: 'ProductsList',
  },
  {
    icon: "shopping-cart",
    title: 'Shopping Cart',
    routeName: 'ShoppingCart',
  }
];

const { width } = Dimensions.get("window")
const TAB_WIDTH = isSmallDevice ? size(65) : size(55);

export const BottomNavBar = ({ state }) => {
  const theme =  useTheme();
  const styles = fromStyle(theme);
  const navigate = useNavigation();

  return (
    <Shadow>
      <View style={styles.inner}>
        <View style={styles.container}>
          {tabs.map((tab, index) => {
            const isActive = useMemo(() => {
              const activeScreen = state.routes[state.index].name;
              return activeScreen === tab.routeName
            }, [state]);

            const goToScreen = () => {
              navigate.navigate(tab.routeName);
            };

            return (
              <Pressable style={styles.tab} onPress={goToScreen}>
                {isActive ? <View style={styles.designElement} /> : null}
                <View style={styles.iconBlock}>
                  <Feather name={tab.icon} size={24} color={isActive ? palette.purple : palette.iconColor} />
                </View>
                <Text style={[styles.title, isActive ? { color: palette.purple } : { color: palette.iconColor }]}>{tab.title}</Text>
              </Pressable>
            )
          })}
        </View>
      </View>
    </Shadow>
  );
};

const fromStyle = (theme) =>
  StyleSheet.create({
    inner: {
      flexDirection: 'row',
      paddingHorizontal: size(8),
      paddingBottom: size(isSmallDevice ? 0 : 10),
      borderTopLeftRadius: size(20),
      borderTopRightRadius: size(20),
      width: '100%',
      justifyContent: 'center',
      height: size(isSmallDevice ? 70 : 90),
    },
    tab: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: TAB_WIDTH,
      marginHorizontal: size(25),
    },
    title: {
      textAlign: 'center',
      fontSize: fontSize(12),
      fontWeight: "600"
    },
    designElement: {
      width: '100%',
      height: size(3),
      backgroundColor: palette.purple,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      borderRadius: size(32),
    },
    iconBlock: {
      height: size(34),
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      width: width - size(32),
      flexDirection: 'row',
    }
  });
