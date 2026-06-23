import { StyleSheet, View } from 'react-native';

import { ProfileIcon } from '@/components/profile-icon';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';

type ProfileSummaryProps = {
  mobile: string;
};

export function ProfileSummary({ mobile }: ProfileSummaryProps) {
  const formattedMobile = mobile ? `+91-${mobile}` : '+91-';

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <ProfileIcon name="profile" size={28} color={palette.gray[800]} />
      </View>
      <Typography variant="text" size="lg" weight="medium" style={styles.mobile}>
        {formattedMobile}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 8,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: palette.lime[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobile: {
    color: palette.black,
  },
});
