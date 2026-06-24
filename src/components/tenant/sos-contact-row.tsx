import { Pressable, StyleSheet, View } from 'react-native';

import { DashboardIcon } from '@/components/dashboard/dashboard-icon';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import { openPhoneCall } from '@/utils/contact-links';

type SosContactRowProps = {
  title: string;
  subtitle: string;
  phone: string;
  isLast?: boolean;
};

export function SosContactRow({ title, subtitle, phone, isLast }: SosContactRowProps) {
  return (
    <View style={[styles.row, !isLast && styles.rowBorder]}>
      <View style={styles.copy}>
        <Typography variant="text" size="md" weight="bold">
          {title}
        </Typography>
        <Typography variant="text" size="sm" color={palette.gray[600]}>
          {subtitle}
        </Typography>
      </View>
      <Pressable
        style={styles.callButton}
        onPress={() => openPhoneCall(phone)}
        accessibilityRole="button"
        accessibilityLabel={`Call ${title}`}>
        <DashboardIcon name="call" size={18} color={palette.gray[800]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 16,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.gray[200],
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: palette.lime[300],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
