import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/typography';
import { DashboardImages } from '@/constants/assets';
import { DASHBOARD_RENT_CARD_GRADIENT } from '@/constants/dashboard';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import { formatDisplayDate, formatShortMonthYear, priceFormatter } from '@/utils/tenant-format';

type DashboardRentCardProps = {
  dueDate?: string;
  amount: number;
  onPayPress: () => void;
};

export function DashboardRentCard({ dueDate, amount, onPayPress }: DashboardRentCardProps) {
  return (
    <LinearGradient
      colors={[...DASHBOARD_RENT_CARD_GRADIENT.colors]}
      start={DASHBOARD_RENT_CARD_GRADIENT.start}
      end={DASHBOARD_RENT_CARD_GRADIENT.end}
      style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.copy}>
          <Typography variant="text" size="lg" weight="medium">
            Rent for {formatShortMonthYear(dueDate) || 'this month'}
          </Typography>
          <Typography variant="text" size="sm" color={palette.gray[600]}>
            Due by {formatDisplayDate(dueDate)}
          </Typography>
          <Typography variant="display" size="sm" weight="bold" color={palette.red[700]} style={styles.amount}>
            {priceFormatter(amount)}
          </Typography>
        </View>
        <Image source={DashboardImages.rentCalendar} style={styles.illustration} contentFit="contain" />
      </View>
      <Pressable style={styles.payButton} onPress={onPayPress} accessibilityRole="button">
        <Typography variant="text" size="sm" weight="bold" color={palette.gray[800]}>
          Pay Now
        </Typography>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.md,
    padding: 16,
    gap: 16,
    shadowColor: '#0A0D12',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  amount: {
    marginTop: 8,
  },
  illustration: {
    width: 88,
    height: 88,
  },
  payButton: {
    minHeight: 36,
    borderRadius: Radius.sm,
    backgroundColor: palette.lime[400],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
