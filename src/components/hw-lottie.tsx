import LottieView, { type LottieViewProps } from 'lottie-react-native';
import { Image } from 'expo-image';
import { Platform, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { ImageAssets } from '@/constants/assets';

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
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, style]}>
        <Image source={ImageAssets.splashIcon} style={styles.fallback} contentFit="contain" />
      </View>
    );
  }

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
  fallback: {
    width: '100%',
    height: '100%',
  },
});
