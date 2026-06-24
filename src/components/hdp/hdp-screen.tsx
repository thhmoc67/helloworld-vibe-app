import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { HdpAmenityPills } from '@/components/hdp/hdp-amenity-pills';
import { HdpFaqList } from '@/components/hdp/hdp-faq-list';
import { HdpFooterBar } from '@/components/hdp/hdp-footer-bar';
import { HdpVisitSheet } from '@/components/hdp/hdp-visit-sheet';
import { HdpHeroCarousel } from '@/components/hdp/hdp-hero-carousel';
import { HdpPropertyHeader } from '@/components/hdp/hdp-property-header';
import { HdpRatingCard } from '@/components/hdp/hdp-rating-card';
import { HdpSectionNav } from '@/components/hdp/hdp-section-nav';
import { HdpVibeMatchCard } from '@/components/hdp/hdp-vibe-match-card';
import { ScrollRevealHeader } from '@/components/navigation/scroll-reveal-header';
import { PropertyCard } from '@/components/property/property-card';
import { HwCarousel } from '@/components/ui/carousel';
import { Typography } from '@/components/ui/typography';
import { mapApiPropertyToListing } from '@/api/property';
import {
  HDP_SAMPLE_AMENITIES,
  HDP_SAMPLE_FAQ,
  type HdpSectionId,
} from '@/constants/hdp';
import { SAMPLE_PROPERTIES } from '@/constants/sample-property';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import { usePropertyDetail } from '@/queries/use-property-detail';
import { usePropertyCategories } from '@/queries/use-property-categories';
import { useWishlist } from '@/providers/wishlist-provider';
import { formatPropertyImageUrl, getPropertyImageKeys } from '@/utils/images';
import { shareProperty } from '@/utils/share-property';

const SHEET_OVERLAP = 40;
const FOOTER_HEIGHT = 96;
const HERO_HEIGHT = 400;
const HEADER_REVEAL_THRESHOLD = HERO_HEIGHT - SHEET_OVERLAP;

function formatRent(amount?: number) {
  if (!amount || amount <= 0) return '₹—';
  return `₹${amount.toLocaleString('en-IN')}/mo`;
}

function formatDeposit(months?: number) {
  if (!months || months <= 0) return '1 months rent';
  return `${months} month${months > 1 ? 's' : ''} rent`;
}

function genderLabel(gender?: string) {
  if (!gender) return undefined;
  const value = gender.toLowerCase();
  if (value.includes('female') || value.includes('women')) return 'Female Only';
  if (value.includes('male') || value.includes('men')) return 'Men Only';
  return gender;
}

function buildAmenities(property: Record<string, any> | null) {
  const fromApi = [
    ...(Array.isArray(property?.rent_includes) ? property.rent_includes : []),
    ...(Array.isArray(property?.amenities) ? property.amenities : []),
    ...(Array.isArray(property?.services) ? property.services : []),
  ]
    .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    .map((item) => item.trim());

  return fromApi.length > 0 ? fromApi : [...HDP_SAMPLE_AMENITIES];
}

export function HdpScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { id, name, image } = useLocalSearchParams<{
    id: string;
    name?: string;
    image?: string;
  }>();

  const propertyId = id ?? '';
  const { data, isLoading, isError } = usePropertyDetail(propertyId);
  const { data: categories = [] } = usePropertyCategories(propertyId);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const numericPropertyId = Number(propertyId);
  const [activeSection, setActiveSection] = useState<HdpSectionId>('about');
  const [showFooter, setShowFooter] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [visitSheetOpen, setVisitSheetOpen] = useState(false);
  const [visitSheetTab, setVisitSheetTab] = useState<'schedule' | 'book'>('schedule');
  const scrollY = useSharedValue(0);
  const lastScrollYRef = useRef(0);

  const updateFooterVisibility = useCallback((currentY: number) => {
    const previousY = lastScrollYRef.current;
    const scrollingDown = currentY > previousY;
    const isAtTop = currentY <= 0;

    if (isAtTop) {
      setShowFooter(true);
    } else if (scrollingDown && currentY > 24) {
      setShowFooter(false);
    } else if (!scrollingDown) {
      setShowFooter(true);
    }

    lastScrollYRef.current = currentY;
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentY = event.contentOffset.y;
      scrollY.value = currentY;
      runOnJS(updateFooterVisibility)(currentY);
    },
  });

  const property = data?.success ? (data.data as Record<string, any>) : null;
  const googleRating = data?.googleData?.google_rating ?? property?.google_rating ?? 4.5;

  const displayName = property?.display_name ?? property?.name ?? name ?? 'Property';
  const locality =
    property?.address?.locality || property?.locality || property?.city || 'your area';
  const address =
    property?.address?.line2 ||
    property?.address?.line1 ||
    property?.address?.locality ||
    property?.locality ||
    '';
  const description =
    property?.nearby_description?.trim() || property?.description?.trim() || '';

  const imageKeys = getPropertyImageKeys(property);
  const carouselImages = useMemo(() => {
    const uris =
      imageKeys.length > 0
        ? imageKeys.map((key) => ({ uri: formatPropertyImageUrl(key, 'hdp') }))
        : typeof image === 'string' && image.length > 0
          ? [{ uri: image }]
          : [];

    return uris;
  }, [image, imageKeys]);

  const rent = formatRent(
    property?.min_rent ?? property?.starting_rent ?? property?.price ?? property?.rent,
  );
  const startingRent =
    property?.min_rent ?? property?.starting_rent ?? property?.price ?? property?.rent;
  const deposit = formatDeposit(property?.security_deposit_months);
  const minStayMonths =
    property?.lock_in_period ?? property?.minimum_stay ?? property?.min_stay_months ?? 3;
  const roomTypes = useMemo(() => {
    const fromProperty = [
      ...(Array.isArray(property?.room_types) ? property.room_types : []),
      ...(Array.isArray(property?.sharing_types) ? property.sharing_types : []),
    ].filter((item): item is string => typeof item === 'string');

    return fromProperty.length > 0 ? fromProperty : undefined;
  }, [property]);
  const amenities = buildAmenities(property);
  const vibeMatch = property?.vibe_match ?? property?.vibeMatch ?? 92;
  const visitsToday = property?.visits_today ?? property?.visit_count ?? 7;
  const reviewCount = property?.review_count ?? property?.reviews_count ?? 127;

  const similarListings = useMemo(() => {
    const raw =
      (data as Record<string, unknown> | undefined)?.similarProperties ??
      (data as Record<string, unknown> | undefined)?.similar_properties ??
      property?.similarProperties ??
      property?.similar_properties;

    if (Array.isArray(raw) && raw.length > 0) {
      return raw.map((item) => mapApiPropertyToListing(item));
    }

    return SAMPLE_PROPERTIES;
  }, [data, property]);

  const showError = !isLoading && (isError || (data && !data.success && !property));

  function handleShare() {
    void shareProperty({ name: displayName, id: propertyId });
  }

  function handleFavoritePress() {
    if (!Number.isFinite(numericPropertyId)) return;
    void toggleWishlist(numericPropertyId, displayName);
  }

  function openMaps() {
    const mapUrl = property?.map_url;
    if (mapUrl) {
      Linking.openURL(mapUrl).catch(() => undefined);
    }
  }

  return (
    <View style={styles.root}>
      <ScrollRevealHeader
        title={isLoading ? (name ?? 'Property') : showError ? (name ?? 'Property') : displayName}
        scrollY={scrollY}
        threshold={HEADER_REVEAL_THRESHOLD}
        onBack={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace('/');
          }
        }}
        onRightPress={handleShare}
        rightIcon="square.and.arrow.up"
        rightAccessibilityLabel="Share property"
      />

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={palette.helloLime} />
        </View>
      ) : showError ? (
        <View style={styles.loader}>
          <Typography variant="text" size="md" color={palette.textSecondary} style={styles.errorText}>
            Unable to load this property right now.
          </Typography>
          <Pressable onPress={() => router.back()} style={styles.backLink}>
            <Typography variant="text" size="sm" weight="medium" color={palette.blue[600]}>
              Go back
            </Typography>
          </Pressable>
        </View>
      ) : (
        <>
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingBottom: FOOTER_HEIGHT + 32 }}>
            <HdpHeroCarousel images={carouselImages} />

            <View style={styles.sheet}>
              <HdpPropertyHeader
                name={displayName}
                genderLabel={genderLabel(property?.gender)}
                location={address || locality}
                rentLabel={rent}
                depositLabel={deposit}
                onLocationPress={openMaps}
                isFavorite={Number.isFinite(numericPropertyId) ? isWishlisted(numericPropertyId) : false}
                onFavoritePress={handleFavoritePress}
              />

              <HdpRatingCard
                propertyName={displayName}
                locality={locality}
                rating={Number(googleRating) || 4.8}
                visitsToday={visitsToday}
                reviewCount={reviewCount}
              />

              <HdpVibeMatchCard matchPercent={vibeMatch} />

              <HdpSectionNav activeId={activeSection} onChange={setActiveSection} />

              <View style={styles.section}>
                <Typography variant="text" size="xl" weight="bold">
                  About this Place
                </Typography>
                {description ? (
                  <>
                    <Typography variant="text" size="md" color={palette.textPrimary}>
                      {showFullDescription || description.length <= 220
                        ? description
                        : `${description.slice(0, 220)}…`}
                    </Typography>
                    {description.length > 220 ? (
                      <Pressable onPress={() => setShowFullDescription((value) => !value)}>
                        <Typography variant="text" size="sm" weight="medium" color={palette.blue[600]}>
                          {showFullDescription ? 'Show less' : 'Read more'}
                        </Typography>
                      </Pressable>
                    ) : null}
                  </>
                ) : (
                  <Typography variant="text" size="md" color={palette.textSecondary}>
                    Discover a thoughtfully designed coliving space with community, comfort, and convenience.
                  </Typography>
                )}
              </View>

              <View style={styles.section}>
                <Typography variant="text" size="xl" weight="bold" style={styles.sectionTitle}>
                  Amenities Included
                </Typography>
                <HdpAmenityPills items={amenities} />
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeaderRow}>
                  <Typography variant="text" size="xl" weight="bold">
                    What Residents Say
                  </Typography>
                  <View style={styles.googleBadge}>
                    <Typography variant="text" size="xs" weight="medium" color={palette.gray[800]}>
                      Google
                    </Typography>
                  </View>
                </View>
                <View style={styles.reviewSummary}>
                  <View>
                    <Typography variant="display" size="sm" weight="bold">
                      {Number(googleRating).toFixed(1)}★
                    </Typography>
                    <Typography variant="text" size="sm" weight="medium">
                      Exceptional
                    </Typography>
                    <Typography variant="text" size="xs" color={palette.textSecondary}>
                      Based on {reviewCount} reviews
                    </Typography>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <Typography variant="text" size="xl" weight="bold" style={styles.sectionTitle}>
                  More Places you&apos;ll Like
                </Typography>
                <HwCarousel
                  data={similarListings}
                  width={width - 48}
                  height={520}
                  showPagination
                  renderItem={({ item }) => (
                    <PropertyCard
                      property={item}
                      style={{ width: width - 48, alignSelf: 'center' }}
                      onPress={() =>
                        router.push({
                          pathname: '/hdp',
                          params: {
                            id: item.id,
                            name: item.name,
                            image:
                              typeof item.images[0] === 'object' &&
                              item.images[0] &&
                              'uri' in item.images[0]
                                ? item.images[0].uri
                                : undefined,
                          },
                        })
                      }
                    />
                  )}
                />
              </View>

              <View style={styles.section}>
                <Typography variant="text" size="xl" weight="bold" style={styles.sectionTitle}>
                  Frequently Asked Questions
                </Typography>
                <HdpFaqList items={HDP_SAMPLE_FAQ} />
              </View>
            </View>
          </Animated.ScrollView>

          <HdpFooterBar
            visible={showFooter}
            onRequestCallback={() => {
              setVisitSheetTab('schedule');
              setVisitSheetOpen(true);
            }}
            onTakeTour={() => {
              setVisitSheetTab('schedule');
              setVisitSheetOpen(true);
            }}
          />
        </>
      )}

      {!isLoading && !showError ? (
        <HdpVisitSheet
            visible={visitSheetOpen}
            onClose={() => setVisitSheetOpen(false)}
            propertyId={propertyId}
            propertyName={displayName}
            property={property}
            propertyLocation={address || locality}
            imageUri={
              typeof carouselImages[0] === 'object' && carouselImages[0] && 'uri' in carouselImages[0]
                ? carouselImages[0].uri
                : undefined
            }
            rentLabel={rent}
            depositLabel={deposit}
            startingRent={typeof startingRent === 'number' ? startingRent : undefined}
            minStayMonths={typeof minStayMonths === 'number' ? minStayMonths : 3}
            roomTypes={roomTypes}
            categories={categories}
            initialTab={visitSheetTab}
          />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.white,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  errorText: {
    textAlign: 'center',
  },
  backLink: {
    padding: 8,
  },
  sheet: {
    marginTop: -SHEET_OVERLAP,
    backgroundColor: palette.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 24,
    paddingHorizontal: 24,
    gap: 24,
    overflow: 'hidden',
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    marginBottom: 4,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  googleBadge: {
    backgroundColor: '#FECDCA',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  reviewSummary: {
    backgroundColor: palette.gray[50],
    borderRadius: Radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.gray[200],
  },
});
