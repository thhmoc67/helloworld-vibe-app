import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import palette from '@/constants/palette';

type HdpFooterBarProps = {
  visible?: boolean;
  onRequestCallback?: () => void;
  onTakeTour?: () => void;
};

export function HdpFooterBar({
  visible = true,
  onRequestCallback,
  onTakeTour,
}: HdpFooterBarProps) {
  const insets = useSafeAreaInsets();

  if (!visible) return null;

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 16) }]}>
      <View style={styles.row}>
        <Button
          label="Request Callback"
          variant="outline"
          onPress={onRequestCallback}
          style={styles.button}
        />
        <Button label="Take a Tour" onPress={onTakeTour} style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: palette.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.gray[200],
    paddingHorizontal: 24,
    paddingTop: 16,
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
  },
});
