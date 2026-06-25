import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HwParallaxCarousel } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { LocalityCardImage } from '@/components/locality/locality-card-image';
import { ImageAssets } from '@/constants/assets';
import { NEIGHBORHOODS } from '@/constants/home';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import { formatAmenityLabel } from '@/utils/amenity-format';

const DAY_CARDS = [
  {
    id: 'morning',
    title: '☀️ Morning',
    place: 'Blue Tokai Coffee',
    distance: '3 min walk',
    link: 'View Cafes Nearby',
    image: ImageAssets.loginBento1,
  },
  {
    id: 'workout',
    title: '💪 Workout',
    place: 'Cult Fit Indiranagar',
    distance: '5 min walk',
    link: 'View Gyms Nearby',
    image: ImageAssets.loginBento2,
  },
] as const;

const AMENITIES = ['CCTV Camera', 'Biometric Access', 'Community Events'] as const;

type CityDetailsTabProps = {
  locality: string | null;
  city: string;
};

export function CityDetailsTab({ locality, city }: CityDetailsTabProps) {
  const placeLabel = locality ?? city;
  const aboutTitle = locality ? `About ${locality}` : `About ${city}`;

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Typography variant="text" size="xl" weight="bold">
          A Day from here
        </Typography>
        <Typography variant="text" size="sm" weight="medium" color={palette.helloLime}>
          📍 Show on Maps
        </Typography>
      </View>
      <Typography variant="text" size="sm" color={palette.textSecondary}>
        What living at {placeLabel} actually looks like.
      </Typography>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayRow}>
        {DAY_CARDS.map((card) => (
          <View key={card.id} style={styles.dayCard}>
            <Typography variant="text" size="sm" weight="bold">
              {card.title}
            </Typography>
            <Image source={card.image} style={styles.dayImage} contentFit="cover" />
            <Typography variant="text" size="md" weight="medium">
              {card.place}
            </Typography>
            <Typography variant="text" size="xs" color={palette.textSecondary}>
              {card.distance}
            </Typography>
            <Typography variant="text" size="xs" weight="bold" color={palette.helloLime}>
              {card.link} ›
            </Typography>
          </View>
        ))}
      </ScrollView>

      <Typography variant="text" size="xl" weight="bold" style={styles.sectionTitle}>
        Included Across Our Homes
      </Typography>
      <View style={styles.amenitiesRow}>
        {AMENITIES.map((item) => (
          <View key={item} style={styles.amenityItem}>
            <View style={styles.amenityIcon} />
            <Typography variant="text" size="xs" weight="medium" style={styles.amenityLabel}>
              {formatAmenityLabel(item)}
            </Typography>
          </View>
        ))}
      </View>

      <Typography variant="text" size="xl" weight="bold" style={styles.sectionTitle}>
        {aboutTitle}
      </Typography>
      <Typography variant="text" size="sm" color={palette.textSecondary}>
        {placeLabel} sits close to daily essentials, transit links, and social spots across {city}. It
        is a practical base if you want a balanced coliving experience with easy commutes and a lively
        neighborhood feel.
      </Typography>
      <Typography variant="text" size="sm" weight="medium" color={palette.blue[600]}>
        Read More
      </Typography>

      <Typography variant="text" size="xl" weight="bold" style={styles.sectionTitle}>
        Popular {city} Localities
      </Typography>
      <HwParallaxCarousel
        data={[...NEIGHBORHOODS]}
        width={220}
        height={180}
        renderItem={({ item }) => (
          <View style={styles.localityCard}>
            <LocalityCardImage imageKey={item.image} style={styles.localityImage} />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.75)']}
              style={styles.localityOverlay}>
              <Typography variant="text" size="md" weight="bold" color={palette.white}>
                {item.name}
              </Typography>
              <Typography variant="text" size="xs" color={palette.gray[200]}>
                Starting {item.price} | {item.properties} Properties
              </Typography>
            </LinearGradient>
          </View>
        )}
      />
    </View>
  );
}

export function SrpContactBar() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.contactBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <Button label="Contact Us" onPress={() => {}} style={styles.contactButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    marginTop: 8,
  },
  dayRow: {
    gap: 12,
    paddingVertical: 4,
  },
  dayCard: {
    width: 220,
    borderWidth: 1,
    borderColor: palette.blue[300],
    borderRadius: Radius.md,
    padding: 12,
    gap: 8,
    backgroundColor: palette.white,
  },
  dayImage: {
    width: '100%',
    height: 88,
    borderRadius: Radius.sm,
  },
  amenitiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  amenityItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  amenityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: palette.blue[100],
  },
  amenityLabel: {
    textAlign: 'center',
  },
  localityCard: {
    width: 220,
    height: 180,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  localityImage: {
    width: '100%',
    height: '100%',
  },
  localityOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    gap: 4,
  },
  contactBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: palette.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.gray[200],
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
  },
  contactButton: {
    width: '100%',
  },
});
