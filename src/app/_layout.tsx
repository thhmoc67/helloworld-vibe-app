import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { FontAssets } from '@/constants/fonts';
import { AppProviders } from '@/providers/app-providers';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(FontAssets);

  useEffect(() => {
    if (fontError) {
      console.error('Failed to load fonts:', fontError);
    }
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AppProviders>
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="index" options={{ animation: 'none' }} />
        <Stack.Screen name="login" />
        <Stack.Screen name="otp" />
        <Stack.Screen name="select-city" />
        <Stack.Screen name="search" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="srp" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="hdp" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="booking" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="booking-success" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="menu" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="component-showcase" options={{ animation: 'slide_from_right' }} />
      </Stack>
    </AppProviders>
  );
}
