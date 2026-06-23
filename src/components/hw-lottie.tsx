import LottieView, { type LottieViewProps } from 'lottie-react-native';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

type HwLottieProps = {
  source: LottieViewProps['source'];
  style?: StyleProp<ViewStyle>;
  autoPlay?: boolean;
  loop?: boolean;
};

export function HwLottie({
  source,
  style,
  autoPlay = true,
  loop = true,
}: HwLottieProps) {
  return (
    <View style={[styles.container, style]}>
      <LottieView
        source={source}
        autoPlay={autoPlay}
        loop={loop}
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});
