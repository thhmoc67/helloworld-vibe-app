import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HwLottie } from '@/components/hw-lottie';
import { Typography } from '@/components/ui/typography';
import { LottieAssets } from '@/constants/assets';
import palette from '@/constants/palette';
import { useAuthHydrated, useIsAuthenticated } from '@/stores/auth-store';

export default function SplashScreen() {
  const router = useRouter();
  const hydrated = useAuthHydrated();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!hydrated) return;

    const timer = setTimeout(() => {
      router.replace(isAuthenticated ? '/(tabs)/home' : '/login');
    }, 2800);

    return () => clearTimeout(timer);
  }, [hydrated, isAuthenticated, router]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <View style={styles.logoWrap}>
          <HwLottie source={LottieAssets.loginLogo} style={styles.lottie} loop />
        </View>
        <Typography variant="heading" weight="medium" style={styles.tagline}>
          Find your Vibe!
        </Typography>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  logoWrap: {
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: 280,
    height: 280,
  },
  tagline: {
    marginTop: 8,
    textAlign: 'center',
  },
});
