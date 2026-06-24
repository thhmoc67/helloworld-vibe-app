import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';

import { DashboardSectionHeader } from '@/components/tenant/dashboard/dashboard-section-header';
import { HwCarousel } from '@/components/ui/carousel';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import type { CommunityEvent } from '@/api/community';
import { formatDisplayDate } from '@/utils/tenant-format';

const EVENT_FALLBACK_IMAGE =
  'https://hello-assets-items.s3.ap-south-1.amazonaws.com/images/coming-soon.jpg';

type DashboardEventsSectionProps = {
  events: CommunityEvent[];
  isLoading?: boolean;
};

function EventCard({ event, width }: { event: CommunityEvent; width: number }) {
  const router = useRouter();
  const attendees = event.people_attending ?? event.attendees_count ?? 0;

  return (
    <Pressable
      style={[styles.card, { width }]}
      onPress={() =>
        router.push({
          pathname: '/community-event',
          params: { id: String(event.id) },
        })
      }
      accessibilityRole="button">
      <Image
        source={{ uri: event.display_image || EVENT_FALLBACK_IMAGE }}
        style={styles.image}
        contentFit="cover"
      />
      <View style={styles.copy}>
        <Typography variant="text" size="md" weight="medium" numberOfLines={2}>
          {event.name}
        </Typography>
        <Typography variant="text" size="sm" color={palette.gray[600]}>
          {formatDisplayDate(event.start_date)}
        </Typography>
        <View style={styles.attendeesRow}>
          <Typography variant="label" size="xs" color={palette.gray[500]}>
            {attendees} People attending
          </Typography>
        </View>
      </View>
    </Pressable>
  );
}

export function DashboardEventsSection({ events, isLoading }: DashboardEventsSectionProps) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const cardWidth = width - 72;
  const carouselHeight = 280;

  return (
    <View style={styles.section}>
      <DashboardSectionHeader
        title="What's Happening"
        subtitle="Meet people, learn something new, or just have fun."
        actionLabel="View All"
        onActionPress={() => router.push('/community-events')}
      />

      {isLoading ? (
        <ActivityIndicator color={palette.lime[700]} style={styles.loader} />
      ) : events.length > 0 ? (
        <HwCarousel
          data={events}
          width={cardWidth}
          height={carouselHeight}
          renderItem={({ item }) => <EventCard event={item} width={cardWidth} />}
        />
      ) : (
        <View style={styles.empty}>
          <Typography variant="text" size="sm" color={palette.gray[500]}>
            No upcoming events right now
          </Typography>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 16,
  },
  card: {
    backgroundColor: palette.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: palette.gray[200],
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
  },
  copy: {
    padding: 16,
    gap: 6,
  },
  attendeesRow: {
    marginTop: 4,
  },
  loader: {
    marginVertical: 24,
  },
  empty: {
    paddingVertical: 24,
    alignItems: 'center',
  },
});
