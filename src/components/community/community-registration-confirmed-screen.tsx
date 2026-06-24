import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TenantScreenHeader } from '@/components/tenant/tenant-screen-header';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { DashboardImages } from '@/constants/assets';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

export function CommunityRegistrationConfirmedScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { name = 'Event' } = useLocalSearchParams<{ name?: string }>();

  return (
    <View style={styles.root}>
      <TenantScreenHeader title="Registration Confirmed!" onBack={() => router.back()} />

      <View style={styles.content}>
        <Image source={DashboardImages.referralIllustration} style={styles.illustration} contentFit="contain" />
        <Typography variant="text" size="xl" weight="medium" style={styles.title}>
          You're on the guest list!
        </Typography>
        <Typography variant="text" size="sm" color={palette.gray[600]} style={styles.subtitle}>
          Show this to HelloWorld staff at the venue
        </Typography>

        <View style={styles.ticket}>
          <Typography variant="label" size="xs" color={palette.gray[500]}>
            Event
          </Typography>
          <Typography variant="text" size="md" weight="medium">
            {name}
          </Typography>
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Button label="Back to Events" variant="outline" onPress={() => router.replace('/community-events')} />
        <Button label="Go to Dashboard" onPress={() => router.replace('/(tabs)/dashboard')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.gray[50],
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  illustration: {
    width: 200,
    height: 200,
    marginBottom: 8,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  ticket: {
    width: '100%',
    marginTop: 24,
    backgroundColor: palette.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: palette.gray[200],
    padding: 20,
    gap: 8,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.gray[200],
    backgroundColor: palette.white,
  },
});
