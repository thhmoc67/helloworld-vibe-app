import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { HwCarousel } from '@/components/ui/carousel';
import { GradientText } from '@/components/ui/gradient-text';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import type { HdpMomentItem } from '@/types/hdp-moments';

const CARD_HEIGHT = 320;
const CARD_GAP = 12;
const MOMENTS_GRADIENT = [palette.lightBlue, palette.purpleScale[500]] as const;

type HdpMomentsSectionProps = {
  propertyName: string;
  moments: HdpMomentItem[];
  carouselWidth: number;
};

function MomentCard({
  moment,
  cardWidth,
  onPress,
}: {
  moment: HdpMomentItem;
  cardWidth: number;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[styles.card, { width: cardWidth }]}
      accessibilityRole={onPress ? 'button' : 'image'}>
      <Image source={{ uri: moment.imageUri }} style={styles.cardImage} contentFit="cover" />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)']}
        style={styles.cardOverlay}>
        <Typography variant="text" size="md" weight="bold" color={palette.white}>
          {moment.label}
        </Typography>
      </LinearGradient>
    </Pressable>
  );
}

export function HdpMomentsSection({ propertyName, moments, carouselWidth }: HdpMomentsSectionProps) {
  const router = useRouter();
  const cardWidth = carouselWidth - CARD_GAP;
  const slideWidth = cardWidth + CARD_GAP;

  if (moments.length === 0) {
    return null;
  }

  function handleMomentPress(moment: HdpMomentItem) {
    if (!moment.eventId) return;
    router.push({
      pathname: '/community-event',
      params: { id: String(moment.eventId) },
    });
  }

  return (
    <View style={styles.section}>
      <View style={styles.titleRow}>
        <GradientText
          variant="text"
          size="xl"
          weight="bold"
          colors={MOMENTS_GRADIENT}
          style={styles.momentsWord}>
          Moments
        </GradientText>
        <Typography variant="text" size="xl" weight="bold" style={styles.titleSuffix}>
          {' '}
          at {propertyName}
        </Typography>
      </View>

      <HwCarousel
        data={moments}
        width={slideWidth}
        height={CARD_HEIGHT + 36}
        showPagination={moments.length > 1}
        style={styles.carousel}
        renderItem={({ item }) => (
          <MomentCard
            moment={item}
            cardWidth={cardWidth}
            onPress={item.eventId ? () => handleMomentPress(item) : undefined}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 16,
  },
  titleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
  },
  momentsWord: {
    fontStyle: 'italic',
  },
  titleSuffix: {
    color: palette.gray[900],
    flexShrink: 1,
  },
  carousel: {
    marginHorizontal: -4,
  },
  card: {
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: palette.gray[100],
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
});
