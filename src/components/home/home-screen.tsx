import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';

import { HwIcon } from '@/components/hw-icon';
import { PropertyCard } from '@/components/property/property-card';
import { Typography } from '@/components/ui/typography';
import { ImageAssets } from '@/constants/assets';
import { fontFamilyForWeight } from '@/constants/fonts';
import {
  FEED_ITEMS,
  NEIGHBORHOODS,
  VIBE_TAGS,
} from '@/constants/home';
import { SAMPLE_PROPERTY } from '@/constants/sample-property';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import { useSelectedCity } from '@/stores/auth-store';

type ImageKey = keyof typeof ImageAssets;

function resolveImage(key: ImageKey) {
  return ImageAssets[key];
}

function SectionTitle({
  prefix,
  highlight,
}: {
  prefix: string;
  highlight: string;
}) {
  return (
    <Text style={styles.sectionTitle}>
      {prefix}
      <Text style={styles.sectionHighlight}>{highlight}</Text>
    </Text>
  );
}

function CarouselDots({ count, active }: { count: number; active: number }) {
  return (
    <View style={styles.dots}>
      {Array.from({ length: count }, (_, index) => (
        <View
          key={index}
          style={[styles.dot, index === active && styles.dotActive]}
        />
      ))}
    </View>
  );
}

export function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const city = useSelectedCity();
  const [selectedVibes, setSelectedVibes] = useState<string[]>(
    VIBE_TAGS.map((tag) => tag.id),
  );
  const [showFeedback, setShowFeedback] = useState(true);
  const [neighborhoodIndex, setNeighborhoodIndex] = useState(0);
  const [feedIndex, setFeedIndex] = useState(0);

  const cardWidth = width - 48;

  function toggleVibe(id: string) {
    setSelectedVibes((current) =>
      current.includes(id) ? current.filter((v) => v !== id) : [...current, id],
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        <LinearGradient
          colors={[palette.grey, palette.primeBlue]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <View style={styles.headerTop}>
            <Pressable
              onPress={() => router.push('/select-city')}
              style={styles.locationRow}
              accessibilityRole="button"
              accessibilityLabel="Change city">
              <Typography variant="text" size="xs" color={palette.gray[300]}>
                You are in
              </Typography>
              <View style={styles.cityRow}>
                <Typography variant="text" size="sm" weight="bold" color={palette.lime[300]}>
                  {city}
                </Typography>
                <SymbolView
                  name="chevron.down"
                  size={12}
                  weight="semibold"
                  tintColor={palette.lime[300]}
                />
              </View>
            </Pressable>

            <Pressable
              onPress={() => router.push('/menu')}
              style={styles.profileButton}
              accessibilityRole="button"
              accessibilityLabel="Open profile menu">
              <HwIcon name="profile" size={20} color={palette.white} />
            </Pressable>
          </View>

          <Text style={styles.hero}>
            Coliving that Matches Your{' '}
            <Text style={styles.heroItalic}>Vibe!</Text>
          </Text>

          <View style={styles.searchBar}>
            <TextInput
              placeholder="Search for Locality, Office or College"
              placeholderTextColor={palette.textPlaceholder}
              style={styles.searchInput}
              editable={false}
            />
            <SymbolView name="magnifyingglass" size={18} tintColor={palette.gray[500]} />
          </View>

          <Typography
            variant="text"
            size="xs"
            color={palette.gray[300]}
            style={styles.vibeHint}>
            ✨ Add your vibe for better matches (optional)
          </Typography>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.vibeRow}>
            {VIBE_TAGS.map((tag) => {
              const selected = selectedVibes.includes(tag.id);
              return (
                <Pressable
                  key={tag.id}
                  onPress={() => toggleVibe(tag.id)}
                  style={[styles.vibePill, selected && styles.vibePillSelected]}>
                  <Text style={styles.vibeEmoji}>{tag.emoji}</Text>
                  <Text style={[styles.vibeLabel, selected && styles.vibeLabelSelected]}>
                    {tag.label}
                  </Text>
                  {selected ? (
                    <SymbolView
                      name="checkmark.circle.fill"
                      size={16}
                      tintColor={palette.lime[400]}
                    />
                  ) : null}
                </Pressable>
              );
            })}
          </ScrollView>
        </LinearGradient>

        <View style={styles.body}>
          <SectionTitle prefix="Find your " highlight="Neighborhood!" />
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / (cardWidth + 12));
              setNeighborhoodIndex(index);
            }}
            contentContainerStyle={styles.carouselContent}
            snapToInterval={cardWidth + 12}
            decelerationRate="fast">
            {NEIGHBORHOODS.map((item) => (
              <View key={item.id} style={[styles.neighborhoodCard, { width: cardWidth }]}>
                <Image
                  source={resolveImage(item.image)}
                  style={styles.neighborhoodImage}
                  contentFit="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.75)']}
                  style={styles.neighborhoodOverlay}>
                  <Typography variant="text" size="lg" weight="bold" color={palette.white}>
                    {item.name}
                  </Typography>
                  <View style={styles.neighborhoodMeta}>
                    <Typography variant="text" size="xs" color={palette.gray[200]}>
                      Starting {item.price} | {item.properties} Properties
                    </Typography>
                    <SymbolView name="arrow.right" size={12} tintColor={palette.white} />
                  </View>
                </LinearGradient>
              </View>
            ))}
          </ScrollView>
          <CarouselDots count={NEIGHBORHOODS.length} active={neighborhoodIndex} />

          <SectionTitle prefix="This could be your " highlight="Home!" />
          <PropertyCard property={SAMPLE_PROPERTY} style={{ width: cardWidth, alignSelf: 'center' }} />
          <CarouselDots count={3} active={0} />

          <SectionTitle prefix="Straight from the " highlight="Feed!" />
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const feedCardWidth = 160;
              const index = Math.round(event.nativeEvent.contentOffset.x / (feedCardWidth + 12));
              setFeedIndex(index);
            }}
            contentContainerStyle={styles.carouselContent}
            snapToInterval={172}
            decelerationRate="fast">
            {FEED_ITEMS.map((item) => (
              <View key={item.id} style={styles.feedCard}>
                <Image
                  source={resolveImage(item.image)}
                  style={styles.feedImage}
                  contentFit="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.6)']}
                  style={styles.feedOverlay}>
                  <Typography variant="text" size="sm" weight="bold" color={palette.white}>
                    {item.caption}
                  </Typography>
                </LinearGradient>
                <View style={styles.videoBadge}>
                  <SymbolView name="play.fill" size={10} tintColor={palette.white} />
                </View>
              </View>
            ))}
          </ScrollView>
          <CarouselDots count={FEED_ITEMS.length} active={feedIndex} />
        </View>
      </ScrollView>

      {showFeedback ? (
        <View style={[styles.feedbackBanner, { bottom: insets.bottom + 72 }]}>
          <Typography variant="text" size="xs" color={palette.textSecondary} style={styles.feedbackText}>
            How was your visit to HW Mahaveer? ›
          </Typography>
          <Pressable
            onPress={() => setShowFeedback(false)}
            accessibilityLabel="Dismiss feedback"
            hitSlop={8}>
            <SymbolView name="xmark" size={14} tintColor={palette.gray[500]} />
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  locationRow: {
    gap: 2,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    fontSize: 28,
    lineHeight: 36,
    fontFamily: fontFamilyForWeight('bold'),
    color: palette.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  heroItalic: {
    fontStyle: 'italic',
    color: palette.lime[200],
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.white,
    borderRadius: Radius.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamilyForWeight('regular'),
    color: palette.textPrimary,
    padding: 0,
  },
  vibeHint: {
    marginBottom: 10,
  },
  vibeRow: {
    gap: 8,
    paddingBottom: 4,
  },
  vibePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  vibePillSelected: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderColor: palette.lime[400],
  },
  vibeEmoji: {
    fontSize: 14,
  },
  vibeLabel: {
    fontSize: 13,
    fontFamily: fontFamilyForWeight('medium'),
    color: palette.gray[200],
  },
  vibeLabelSelected: {
    color: palette.white,
  },
  body: {
    marginTop: -20,
    backgroundColor: palette.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 20,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: fontFamilyForWeight('bold'),
    color: palette.textPrimary,
    marginBottom: 4,
  },
  sectionHighlight: {
    fontStyle: 'italic',
    color: palette.blue[600],
  },
  carouselContent: {
    gap: 12,
    paddingRight: 20,
  },
  neighborhoodCard: {
    height: 200,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  neighborhoodImage: {
    ...StyleSheet.absoluteFill,
  },
  neighborhoodOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    gap: 4,
  },
  neighborhoodMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.gray[300],
  },
  dotActive: {
    width: 18,
    backgroundColor: palette.lime[500],
  },
  feedCard: {
    width: 160,
    height: 220,
    borderRadius: Radius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  feedImage: {
    width: '100%',
    height: '100%',
  },
  feedOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
  },
  videoBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackBanner: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: palette.gray[100],
    borderRadius: Radius.sm,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  feedbackText: {
    flex: 1,
  },
});
