import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import palette from '@/constants/palette';
import { useTabBarInset } from '@/hooks/use-tab-bar-inset';

type TabScreenProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  edges?: Edge[];
};

export function TabScreen({
  children,
  style,
  contentStyle,
  edges = ['top', 'left', 'right'],
}: TabScreenProps) {
  const bottomInset = useTabBarInset();

  return (
    <SafeAreaView style={[styles.safe, style]} edges={edges}>
      <View style={[styles.content, { paddingBottom: bottomInset }, contentStyle]}>{children}</View>
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
  },
});
