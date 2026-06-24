import { ScrollView, StyleSheet, View } from 'react-native';

import { ProfileInfoCard, ProfileSupportNote } from '@/components/profile/profile-info-card';
import { ProfileStackScreen } from '@/components/profile/profile-stack-screen';
import { Typography } from '@/components/ui/typography';
import { useTenantProfile } from '@/stores/tenant-store';

export function PersonalDetailsScreen() {
  const profile = useTenantProfile();
  const user = profile?.userInfo;

  return (
    <ProfileStackScreen title="Personal Details">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Typography variant="text" size="md" weight="bold">
          Account Information
        </Typography>

        <ProfileInfoCard label="Name" value={user?.name} />

        <View style={styles.row}>
          <ProfileInfoCard label="Mobile" value={user?.mobile} />
          <ProfileInfoCard label="Gender" value={user?.gender} />
        </View>

        <ProfileInfoCard label="Email" value={user?.email} />

        <ProfileSupportNote />
      </ScrollView>
    </ProfileStackScreen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    gap: 12,
    paddingBottom: 32,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
