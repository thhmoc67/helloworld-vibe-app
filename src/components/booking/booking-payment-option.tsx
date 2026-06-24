import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/typography';
import { formatBookingAmount } from '@/utils/booking-payment';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

type BookingPaymentOptionProps = {
  label: string;
  amount: number;
  description: string;
  selected: boolean;
  required?: boolean;
  badge?: string;
  disabled?: boolean;
  onPress?: () => void;
};

export function BookingPaymentOption({
  label,
  amount,
  description,
  selected,
  required,
  badge,
  disabled,
  onPress,
}: BookingPaymentOptionProps) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={[
        styles.card,
        selected && styles.cardSelected,
        disabled && styles.cardDisabled,
      ]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected, disabled }}>
      <View style={styles.row}>
        <View style={[styles.radio, selected && styles.radioSelected]}>
          {selected ? (
            <SymbolView name="checkmark" size={12} weight="bold" tintColor={palette.white} />
          ) : null}
        </View>

        <View style={styles.copy}>
          <View style={styles.titleRow}>
            <Typography variant="text" size="sm" weight="bold">
              {label}
            </Typography>
            {badge ? (
              <View style={styles.badge}>
                <Typography variant="text" size="xs" weight="medium" color={palette.helloLime}>
                  {badge}
                </Typography>
              </View>
            ) : null}
          </View>
          <Typography variant="text" size="xs" color={palette.gray[600]}>
            {description}
          </Typography>
        </View>

        <Typography variant="text" size="sm" weight="bold">
          {formatBookingAmount(amount)}
        </Typography>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: palette.gray[200],
    borderRadius: Radius.md,
    padding: 14,
    backgroundColor: palette.white,
  },
  cardSelected: {
    borderColor: palette.lime[300],
    backgroundColor: palette.lime[50],
  },
  cardDisabled: {
    opacity: 0.95,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: palette.gray[300],
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  radioSelected: {
    borderColor: palette.helloLime,
    backgroundColor: palette.helloLime,
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: palette.lime[100],
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
});
