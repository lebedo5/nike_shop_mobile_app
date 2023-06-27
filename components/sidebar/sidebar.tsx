import * as React from 'react';
import { Pressable, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { DrawerActions, useNavigation, useTheme } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";
import { fontSize, size } from "../../utils/size";
import { TrackOrder } from "../../screens/track-order/track-order";

interface LinkItemProps {
  title: string;
  icon?: string;
  screen?: string;
}

const SIDEBAR_LINKS: Array<LinkItemProps> = [
  {
    title: 'Products List',
    icon: 'list',
    screen: 'ProductsList',
  },
  {
    title: 'Shopping Cart',
    icon: 'shopping-cart',
    screen: 'ShoppingCart',
  },
  {
    title: 'Track Order',
    icon: 'shopping-cart',
    screen: 'TrackOrder',
  },
];

export const Sidebar = function Sidebar() {
  const theme: any = useTheme();
  const styles = fromStyles(theme);

  const navigator = useNavigation();

  const toScreen = ({ screen }: LinkItemProps) => {
    if (screen) {
      navigator.navigate(screen);
    }
  };


  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {SIDEBAR_LINKS.map((link, index) => (
        <Pressable key={index.toString()} style={styles.linkBlock} onPress={() => toScreen(link)}>
          <View
            style={[styles.sidebarMenuItem]}
            key={index.toString()}
          >
            {link.icon && <Feather name={link.icon} size={20} color={'black'} />}
            <Text style={styles.sidebarMenuItemTitle}>{link.title}</Text>
          </View>
        </Pressable>
      ))}
    </SafeAreaView>
  );
}

const fromStyles = (theme) =>
  StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    linkBlock: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: size(20)
    },
    sidebarMenuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: size(10),
    },
    sidebarMenuItemTitle: {
      paddingLeft: size(16),
      fontWeight: '400',
      fontSize: fontSize(18),
      lineHeight: fontSize(24),
      color: theme.primaryTextColor,
    },
  });
