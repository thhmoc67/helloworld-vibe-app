import { StyleSheet, View } from 'react-native';

import { ProfileIcon } from '@/components/profile-icon';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';

type ProfileSummaryProps = {
  mobile?: string;
  name?: string;
  propertyLabel?: string;
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
  }
  return (parts[0]?.slice(0, 2) ?? '?').toUpperCase();
}

export function ProfileSummary({ mobile, name, propertyLabel }: ProfileSummaryProps) {
  if (name) {
    return (
      <View style={styles.container}>
        <View style={styles.initialsAvatar}>
          <Typography variant="text" size="md" weight="bold" color={palette.blue[700]}>
            {getInitials(name)}
          </Typography>
        </View>
        <View style={styles.copy}>
          <Typography variant="text" size="lg" weight="bold" style={styles.name}>
            {name}
          </Typography>
          {propertyLabel ? (
            <Typography variant="text" size="sm" color={palette.gray[600]}>
              {propertyLabel}
            </Typography>
          ) : null}
        </View>
      </View>
    );
  }

  const formattedMobile = mobile ? `+91-${mobile}` : '+91-';

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <ProfileIcon name="profile" size={28} color={palette.gray[800]} />
      </View>
      <Typography variant="text" size="lg" weight="medium" style={styles.name}>
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
  initialsAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: palette.blue[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  name: {
    color: palette.black,
  },
});
