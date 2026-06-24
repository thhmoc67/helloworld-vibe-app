import { Pressable, StyleSheet, View } from 'react-native';

import { DashboardIcon } from '@/components/dashboard/dashboard-icon';
import { HwIcon } from '@/components/hw-icon';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import type { RoomMate } from '@/types/roommate';
import { openPhoneCall, openWhatsApp } from '@/utils/contact-links';
import { getMatePropertyLabel } from '@/utils/roommate-format';

type RoommateCardProps = {
  mate: RoomMate;
  propertyFallback?: string;
};

export function RoommateCard({ mate, propertyFallback }: RoommateCardProps) {
  const propertyLabel = getMatePropertyLabel(mate, propertyFallback);

  return (
    <View style={styles.card}>
      <View style={styles.copy}>
        <Typography variant="text" size="md" weight="bold">
          {mate.name}
        </Typography>
        {propertyLabel ? (
          <Typography variant="text" size="sm" color={palette.gray[600]}>
            {propertyLabel}
          </Typography>
        ) : null}
      </View>

      <View style={styles.actions}>
        <Pressable
          style={styles.actionButton}
          onPress={() => openWhatsApp(mate.mobile)}
          accessibilityRole="button"
          accessibilityLabel={`WhatsApp ${mate.name}`}>
          <HwIcon name="whatsapp" size={20} color={palette.white} />
        </Pressable>
        <Pressable
          style={styles.actionButton}
          onPress={() => openPhoneCall(mate.mobile)}
          accessibilityRole="button"
          accessibilityLabel={`Call ${mate.name}`}>
          <DashboardIcon name="call" size={18} color={palette.gray[800]} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.white,
    borderRadius: Radius.md,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: palette.lime[300],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
