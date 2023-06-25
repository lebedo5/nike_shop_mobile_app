import React from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenProps } from './screen.props';
import { isNonScrolling, presets } from './screen.presets';
import { size } from "../../utils/size";

const isIos = Platform.OS === 'ios';

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets();
  const preset = presets.fixed;
  const style = props.style || {};
  const { topOffset = 24 } = props;
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor || 'transparent' } : {};
  const insetStyle = { paddingTop: props.unsafe ? size(topOffset) : insets.top };

  return (
    <View style={[preset.outer, backgroundStyle]}>
      <StatusBar barStyle={isIos ? 'dark-content' : 'light-content'} />
      <View style={[preset.outer, style, insetStyle]}>{props.children}</View>
    </View>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const { unsafe = true } = props;
  const insets = useSafeAreaInsets();
  const preset = presets.scroll;
  const style = props.style || {};
  const { topOffset = 0 } = props;
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {};
  const insetStyle = { paddingTop: unsafe ? size(topOffset) : insets.top };

  return (
    <>
      <StatusBar barStyle={isIos ? 'dark-content' : 'light-content'} />
      <View style={[preset.outer, backgroundStyle, insetStyle]}>
        <SafeAreaView style={preset.outer}>
          <ScrollView style={[preset.outer, backgroundStyle]} contentContainerStyle={[preset.inner, style]}>
            {props.children}
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />;
  } else {
    return <ScreenWithScrolling {...props} />;
  }
}
