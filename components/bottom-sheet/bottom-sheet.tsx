import * as React from 'react';
import {
  FC,
  forwardRef,
  MutableRefObject,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BackHandler, Platform, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
  BottomSheetHandleProps,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { SharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetBackdrop } from "../bottom-sheet-backdrop/bottom-sheet-backdrop";
import { size } from "../../utils/size";

const isAndroid = Platform.OS === 'android';

export interface FFBottomSheetProps {
  bottomSheetModalRef: MutableRefObject<any>;
  children: ReactNode;
  handleComponent: FC<BottomSheetHandleProps> | null;
  onDismiss?: () => void;
  footer?: () => ReactElement<any, any>;
  snapPoints?: Array<string | number> | SharedValue<Array<string | number>>;
  onSnapChange?: (index: number) => void;
  isStatic?: boolean;
  bottomSheetViewStyle?: ViewStyle | null;
  detached?: boolean;
  bottomInset?: number;
  fitToContentHeight?: boolean;
}

export interface FFBottomSheetRef {
  show: () => void;
  hide: () => void;
  isVisible: () => boolean;
}

export const FFBottomSheet = forwardRef(function FFBottomSheet(props: FFBottomSheetProps) {
  const {
    bottomSheetModalRef,
    children,
    handleComponent,
    onDismiss,
    onSnapChange,
    snapPoints = ['75%'],
    bottomSheetViewStyle,
    footer,
    detached,
    fitToContentHeight = false,
  } = props;
  const theme: any = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const [activeSnapIndex, setActiveSnapIndex] = useState(0);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const hide = () => {
    setActiveSnapIndex(-1);
    bottomSheetRef?.current?.close();
  };
  const show = () => {
    setActiveSnapIndex(0);
    bottomSheetRef?.current?.present();
  };

  const isVisible = useCallback(() => {
    return activeSnapIndex > -1;
  }, [activeSnapIndex]);

  useImperativeHandle(bottomSheetModalRef, () => ({
    show,
    hide,
    isVisible,
  }));

  const onSnapChangeHandler = (idx) => {
    setActiveSnapIndex(idx);
    if (onSnapChange) onSnapChange(idx);
  };

  const onBackButtonPress = useCallback(() => {
    hide();
    return true;
  }, [activeSnapIndex]);

  useEffect(() => {
    if (isAndroid && activeSnapIndex > -1) {
      BackHandler.addEventListener('hardwareBackPress', onBackButtonPress);
    } else {
      BackHandler.removeEventListener('hardwareBackPress', onBackButtonPress);
    }

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackButtonPress);
    };
  }, [activeSnapIndex]);

  const snapPointsMemo = useMemo(() => (fitToContentHeight ? ['CONTENT_HEIGHT'] : snapPoints), [snapPoints]);

  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(snapPointsMemo);

  const ffSheetProps = useMemo(() => {
    if (fitToContentHeight) {
      return {
        snapPoints: animatedSnapPoints,
        handleHeight: animatedHandleHeight,
        contentHeight: animatedContentHeight,
      };
    } else {
      return {
        snapPoints: snapPointsMemo,
      };
    }
  }, [fitToContentHeight]);

  return (
    <BottomSheetModal
      {...ffSheetProps}
      ref={bottomSheetRef}
      keyboardBehavior={'interactive'}
      index={activeSnapIndex}
      handleComponent={handleComponent}
      backdropComponent={BottomSheetBackdrop}
      onChange={onSnapChangeHandler}
      onDismiss={onDismiss}
      footerComponent={footer}
      backgroundStyle={bottomSheetViewStyle || { backgroundColor: theme.backgroundColor }}
      topInset={top}
      containerStyle={{ paddingBottom: bottom }}
      detached={detached}
      enableContentPanningGesture={!detached}
    >
      {fitToContentHeight ? (
        <BottomSheetView style={{ paddingBottom: bottom || size(30) }} onLayout={handleContentLayout}>
          {children}
        </BottomSheetView>
      ) : (
        children
      )}
    </BottomSheetModal>
  );
});
