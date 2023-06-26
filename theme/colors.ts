import { palette } from "./pallete";

export const colors = {
	/**
	 * The palette is available to use, but prefer using the name.
	 * This is only included for rare, one-off cases. Try to use
	 * semantic names as much as possible.
	 */
	palette,
	/**
	 * A helper for making something see-thru.
	 */
	transparent: "rgba(0, 0, 0, 0)",
	/**
	 * The default text color in many components.
	 */
	text: palette.textColor,
	/**
	 * Secondary text information.
	 */
	textDim: palette.separatorTextColor,
	/**
	 * The default color of the screen background.
	 */
	background: palette.white,
	title: palette.purple,
}
