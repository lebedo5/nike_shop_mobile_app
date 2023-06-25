import * as React from 'react';
import { useMemo } from 'react';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';

/**
 * Describe your component here
 */
export const BottomSheetBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  const theme: any = useTheme();

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [0, 1], [0.3, 1], Extrapolate.CLAMP),
  }));

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: theme.uiGrey,
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return <Animated.View style={containerStyle} />;
};
