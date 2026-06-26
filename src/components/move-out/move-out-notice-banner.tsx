import { StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

type MoveOutNoticeBannerProps = {
  children: string;
};

export function MoveOutNoticeBanner({ children }: MoveOutNoticeBannerProps) {
  return (
    <View style={styles.banner}>
      <Typography variant="text" size="xs" weight="medium" color={palette.red[900]} style={styles.text}>
        {children}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: palette.yellow[50],
    borderRadius: Radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    lineHeight: 18,
  },
});
