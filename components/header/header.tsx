import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontSize, size } from "../../utils/size";
import { HeaderProps } from "./header.props";

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
	const {
		leftIcon,
		headerText,
		leftComponent,
		rightComponent,
	} = props;
	const header = headerText || '';

	const { top } = useSafeAreaInsets();

	const headerTopSpacing = top || size(16);

	const headerStyles = Object.assign({}, styles.root);

	return (
		<View style={[headerStyles, { height: headerTopSpacing }]}>
			{leftComponent ? leftComponent : <View style={styles.left} />}
			<View style={styles.titleMiddle}>
				<Text style={styles.title}>{header}</Text>
			</View>
			{rightComponent ? rightComponent : leftIcon ? null : <View style={styles.right} />}
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: size(8),
		paddingHorizontal: size(22),
		justifyContent: 'flex-start',
		borderBottomLeftRadius: size(8),
		borderBottomRightRadius: size(8),
	},
	title: {
		fontSize: fontSize(13),
		textTransform: 'uppercase',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	titleMiddle: {
		flex: 1,
		justifyContent: 'center'
	},
	left: { width: size(32) },
	right: { width: size(32) }
});
