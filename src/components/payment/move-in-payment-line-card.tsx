import { StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import type { MoveInPaymentLineItem } from '@/types/move-in-payment';
import { priceFormatter } from '@/utils/tenant-format';

type MoveInPaymentLineCardProps = MoveInPaymentLineItem & {
  index: number;
};

export function MoveInPaymentLineCard({
  paid,
  title,
  amount,
  index,
}: MoveInPaymentLineCardProps) {
  const foreground = paid ? palette.gray[900] : palette.white;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: paid ? palette.white : palette.blue[800] },
      ]}>
      {index % 2 === 0 ? <View style={styles.circleRight} /> : <View style={styles.circleLeft} />}
      <View style={styles.titleRow}>
        <Typography variant="text" size="sm" weight="medium" color={foreground} style={styles.capitalize}>
          {title}
        </Typography>
        <Typography variant="text" size="sm" weight="medium" color={foreground}>
          {paid ? 'Paid' : 'Remaining'}
        </Typography>
      </View>
      <Typography variant="text" size="lg" weight="bold" color={foreground} style={styles.price}>
        {priceFormatter(amount)}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: Radius.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: palette.gray[200],
    overflow: 'hidden',
  },
  circleRight: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'transparent',
    borderWidth: 25,
    borderColor: palette.white,
    position: 'absolute',
    top: -60,
    left: -60,
    opacity: 0.2,
  },
  circleLeft: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'transparent',
    borderWidth: 25,
    borderColor: palette.white,
    position: 'absolute',
    top: -60,
    right: -60,
    opacity: 0.2,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  price: {
    marginTop: 10,
  },
  capitalize: {
    textTransform: 'capitalize',
    flex: 1,
  },
});
