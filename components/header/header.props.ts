import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { AnyObject } from '../../../../../flip-fam-v4/app/types/any';

export interface HeaderProps {
  /**
   * header non-i18n
   */
  headerText?: string;
  subTitle?: string;
  subTitleParams?: AnyObject | undefined;
  leftComponent?: any;
  rightComponent?: any;

  /**
   * Icon that should appear on the left
   */
  leftIcon?: any;
  leftButtonText?: string;
  leftButtonDisabled?: boolean;
  /**
   * Icon that should appear on the right
   */
  rightIcon?: any;
  rightButtonText?: string;
  rightButtonDisabled?: boolean;
  rightIconColor?: string;
  /**
   * Container style overrides.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Title style overrides.
   */
  titleStyle?: StyleProp<TextStyle>;

  /**
   * What happens when you press the left icon
   */
  onLeftPress?(): void;

  /**
   * What happens when you press the right icon
   */
  onRightPress?(): void;
}
