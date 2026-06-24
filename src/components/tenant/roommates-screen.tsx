import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { ProfileStackScreen } from '@/components/profile/profile-stack-screen';
import { RoommateCard } from '@/components/tenant/mates/roommate-card';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { useRoomMates } from '@/queries/use-roommates';
import { useTenantProfile } from '@/stores/tenant-store';

export function RoommatesScreen() {
  const profile = useTenantProfile();
  const { data: roommates, isLoading, isRefetching, refetch } = useRoomMates('ROOMMATE');

  const propertyFallback = [profile?.propertyInfo?.address?.flatNo, profile?.propertyInfo?.name]
    .filter(Boolean)
    .join(' · ');

  return (
    <ProfileStackScreen title="My Roommates" centerTitle style={styles.screenBody}>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={palette.lime[700]} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />}>
          {roommates?.length ? (
            roommates.map((mate) => (
              <RoommateCard
                key={mate.id ?? mate.mobile}
                mate={mate}
                propertyFallback={propertyFallback}
              />
            ))
          ) : (
            <View style={styles.empty}>
              <Typography variant="text" size="sm" color={palette.gray[500]}>
                You have not added any roommate yet
              </Typography>
            </View>
          )}
        </ScrollView>
      )}
    </ProfileStackScreen>
  );
}

const styles = StyleSheet.create({
  screenBody: {
    paddingHorizontal: 0,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 12,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    paddingVertical: 48,
    alignItems: 'center',
  },
});
