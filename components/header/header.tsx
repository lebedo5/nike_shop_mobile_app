import React from 'react';
import { StyleSheet, View, ViewStyle, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontSize, size } from "../../utils/size";
import { HeaderProps } from "./header.props";
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: 'center' };
const LEFT: ViewStyle = { width: size(32) };
const RIGHT: ViewStyle = { width: size(32) };
export const HeaderHeight = size(48);

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
	const {
		leftIcon,
		leftButtonText,
		headerText,
		titleStyle,
		leftComponent,
		rightComponent,
		style,
	} = props;
	const header = headerText || '';

	const { top } = useSafeAreaInsets();

	const theme: any = useTheme();
	const styles = fromStyles(theme);
	const headerTopSpacing = top || size(16);

	const headerStyles = Object.assign({}, styles.root, style);

	return (
		<View style={[headerStyles, { height: headerTopSpacing }]}>
			{leftComponent ? leftComponent : <View style={LEFT} />}
			<View style={TITLE_MIDDLE}>
				<Text style={[styles.title, titleStyle]}>{header}</Text>
			</View>
			{rightComponent ? rightComponent : leftIcon || leftButtonText ? null : <View style={RIGHT} />}
		</View>
	);
}

const fromStyles = (theme) =>
	StyleSheet.create({
		root: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingBottom: size(8),
			paddingHorizontal: size(22),
			justifyContent: 'flex-start',
			backgroundColor: theme.card,
			borderBottomLeftRadius: size(8),
			borderBottomRightRadius: size(8),
		},
		button: {},
		buttonText: {
			color: 'black',
			fontWeight: 'bold',
			fontSize: fontSize(13),
		},
		buttonTextDisabled: {
			color: theme.grayTextColor,
		},
		title: {
			fontSize: fontSize(13),
			textTransform: 'uppercase',
			fontWeight: 'bold',
			textAlign: 'center',
		},
		subTitle: {
			fontSize: fontSize(13),
			color: theme.secondaryTextColor,
			textAlign: 'center',
		},
	});
