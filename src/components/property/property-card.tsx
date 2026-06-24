import { Image, type ImageSource } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { SymbolView } from 'expo-symbols';

import { Button } from '@/components/ui/button';
import { fontStyleForWeight } from '@/constants/fonts';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import { useOptionalPropertyActions } from '@/providers/property-actions-provider';
import { useOptionalWishlist } from '@/providers/wishlist-provider';
import { useSelectedCity } from '@/stores/auth-store';
import type { PropertyBadge, PropertyListing } from '@/types/property';
import { COMING_SOON_IMAGE_URI } from '@/utils/images';
import { getImageUriFromSource, shareProperty } from '@/utils/share-property';

function resolvePropertyImages(images: PropertyListing['images']) {
  const validImages = images.filter((image) => {
    if (typeof image === 'number') return true;
    if (typeof image === 'object' && image !== null && 'uri' in image) {
      return Boolean(image.uri);
    }
    return true;
  });

  if (validImages.length > 0) {
    return validImages;
  }

  return [{ uri: COMING_SOON_IMAGE_URI }];
}

type PropertyCardProps = {
  property: PropertyListing;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onRequestCallback?: () => void;
  onTakeTour?: () => void;
  onFavoritePress?: () => void;
  onSharePress?: () => void;
  isFavorite?: boolean;
};

function formatRent(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

function BadgePill({
  badge,
  style,
}: {
  badge: PropertyBadge;
  style?: StyleProp<ViewStyle>;
}) {
  const isFillingFast = badge.variant === 'filling-fast';

  return (
    <View style={[styles.badge, isFillingFast ? styles.badgeOrange : styles.badgePink, style]}>
      {isFillingFast ? (
        <SymbolView name="exclamationmark.triangle.fill" size={12} tintColor="#B54708" />
      ) : null}
      <Text style={[styles.badgeText, isFillingFast ? styles.badgeTextOrange : styles.badgeTextPink]}>
        {badge.label}
      </Text>
    </View>
  );
}

export function PropertyCard({
  property,
  style,
  onPress,
  onRequestCallback,
  onTakeTour,
  onFavoritePress,
  onSharePress,
  isFavorite,
}: PropertyCardProps) {
  const wishlist = useOptionalWishlist();
  const propertyActions = useOptionalPropertyActions();
  const city = useSelectedCity();
  const propertyId = Number(property.id);
  const favorited = isFavorite ?? (Number.isFinite(propertyId) ? wishlist?.isWishlisted(propertyId) : false);

  const cardImages = resolvePropertyImages(property.images);
  const imageCount = cardImages.length;
  const [imageIndex, setImageIndex] = useState(0);
  const [useFallbackImage, setUseFallbackImage] = useState(false);
  const currentImage = useFallbackImage
    ? { uri: COMING_SOON_IMAGE_URI }
    : (cardImages[imageIndex] ?? cardImages[0]);

  function showPreviousImage() {
    if (imageCount <= 1) return;
    setUseFallbackImage(false);
    setImageIndex((index) => (index === 0 ? imageCount - 1 : index - 1));
  }

  function showNextImage() {
    if (imageCount <= 1) return;
    setUseFallbackImage(false);
    setImageIndex((index) => (index === imageCount - 1 ? 0 : index + 1));
  }

  function handleFavoritePress() {
    if (onFavoritePress) {
      onFavoritePress();
      return;
    }
    if (Number.isFinite(propertyId)) {
      void wishlist?.toggleWishlist(propertyId, property.name);
    }
  }

  function handleSharePress() {
    if (onSharePress) {
      onSharePress();
      return;
    }
    void shareProperty({ name: property.name, id: property.id });
  }

  function handleRequestCallback() {
    if (onRequestCallback) {
      onRequestCallback();
      return;
    }
    if (!Number.isFinite(propertyId)) return;
    propertyActions?.openRequestCallback({
      propertyId,
      propertyName: property.name,
      location: property.location,
      city,
    });
  }

  function handleTakeTour() {
    if (onTakeTour) {
      onTakeTour();
      return;
    }
    if (!Number.isFinite(propertyId)) return;
    propertyActions?.openScheduleVisit({
      propertyId,
      propertyName: property.name,
      location: property.location,
      city,
      startingRent: property.startingRent,
      imageUri: getImageUriFromSource(cardImages[0]),
    });
  }

  return (
    <View style={[styles.cardShadow, style]}>
      <View style={styles.card}>
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [pressed && onPress ? styles.cardPressed : null]}
          accessibilityRole={onPress ? 'button' : undefined}>
          <View style={styles.mediaSection}>
        <Image
          source={currentImage}
          style={styles.heroImage}
          contentFit="cover"
          onError={() => setUseFallbackImage(true)}
        />

        {imageCount > 1 ? (
          <>
            <Pressable
              onPress={(event) => {
                event.stopPropagation();
                showPreviousImage();
              }}
              style={[styles.carouselButton, styles.carouselButtonLeft]}
              accessibilityRole="button"
              accessibilityLabel="Previous photo">
              <SymbolView name="chevron.left" size={14} weight="semibold" tintColor={palette.white} />
            </Pressable>
            <Pressable
              onPress={(event) => {
                event.stopPropagation();
                showNextImage();
              }}
              style={[styles.carouselButton, styles.carouselButtonRight]}
              accessibilityRole="button"
              accessibilityLabel="Next photo">
              <SymbolView name="chevron.right" size={14} weight="semibold" tintColor={palette.white} />
            </Pressable>
            <View style={styles.dotsRow}>
              {cardImages.map((_, index) => (
                <View
                  key={`dot-${property.id}-${index}`}
                  style={[styles.dot, index === imageIndex ? styles.dotActive : null]}
                />
              ))}
            </View>
          </>
        ) : null}

        {property.badges && property.badges.length > 0 ? (
          <View style={styles.badgesOverlay} pointerEvents="box-none">
            {property.badges.map((badge) => (
              <BadgePill
                key={`${property.id}-${badge.label}`}
                badge={badge}
                style={badge.variant === 'women-only' ? styles.badgeRight : styles.badgeLeft}
              />
            ))}
          </View>
        ) : null}
      </View>

      <LinearGradient
        colors={['#7C3AED', '#38BDF8']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.vibeBar}>
        <Text style={styles.vibeText}>✨ {property.vibeMatchPercent}% Vibe Match</Text>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {property.name}
          </Text>
          <View style={styles.ratingPill}>
            <Text style={styles.ratingText}>
              {property.rating.toFixed(1)} ★
            </Text>
          </View>
        </View>

        <View style={styles.subtitleRow}>
          <Text style={styles.subtitle} numberOfLines={1}>
            {property.location}
          </Text>
          <View style={styles.iconActions}>
            <Pressable
              onPress={(event) => {
                event.stopPropagation();
                handleFavoritePress();
              }}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={favorited ? 'Remove from wishlist' : 'Add to wishlist'}>
              <SymbolView
                name={favorited ? 'heart.fill' : 'heart'}
                size={20}
                tintColor={favorited ? palette.red[500] : palette.gray[800]}
              />
            </Pressable>
            <Pressable
              onPress={(event) => {
                event.stopPropagation();
                handleSharePress();
              }}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Share property">
              <SymbolView name="square.and.arrow.up" size={20} tintColor={palette.gray[800]} />
            </Pressable>
          </View>
        </View>

        <View style={styles.roomTypesPill}>
          <SymbolView name="bed.double.fill" size={16} tintColor={palette.gray[700]} />
          <Text style={styles.roomTypesText} numberOfLines={1}>
            {property.roomTypes.join(' · ')}
          </Text>
        </View>

        <View style={styles.rentBlock}>
          <Text style={styles.rentLabel}>Starting Rent</Text>
          <Text style={styles.rentValue}>{formatRent(property.startingRent)}</Text>
        </View>
      </View>
        </Pressable>

        <View style={styles.actionsRow}>
          <Button
            label="Request Callback"
            variant="outline"
            onPress={(event) => {
              event.stopPropagation();
              handleRequestCallback();
            }}
            style={styles.actionButton}
          />
          <Button
            label="Take a Tour"
            onPress={(event) => {
              event.stopPropagation();
              handleTakeTour();
            }}
            style={styles.actionButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    borderRadius: 16,
    backgroundColor: palette.white,
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 6,
  },
  card: {
    backgroundColor: palette.white,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.96,
  },
  mediaSection: {
    position: 'relative',
    height: 220,
    backgroundColor: palette.gray[100],
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  carouselButton: {
    position: 'absolute',
    top: '50%',
    marginTop: -18,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(16, 24, 40, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselButtonLeft: {
    left: 12,
  },
  carouselButtonRight: {
    right: 12,
  },
  dotsRow: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
  },
  dotActive: {
    width: 18,
    backgroundColor: palette.white,
  },
  badgesOverlay: {
    ...StyleSheet.absoluteFill,
  },
  badgeLeft: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  badgeRight: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
  badgeOrange: {
    backgroundColor: '#FEF0C7',
  },
  badgePink: {
    backgroundColor: '#FCE7F3',
  },
  badgeText: {
    fontSize: 12,
    lineHeight: 16,
    ...fontStyleForWeight('medium'),
  },
  badgeTextOrange: {
    color: '#B54708',
  },
  badgeTextPink: {
    color: '#C11574',
  },
  vibeBar: {
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vibeText: {
    fontSize: 13,
    lineHeight: 18,
    ...fontStyleForWeight('bold'),
    color: palette.white,
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 0,
    gap: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 20,
    lineHeight: 28,
    ...fontStyleForWeight('bold'),
    color: palette.black,
  },
  ratingPill: {
    backgroundColor: '#E0F2FE',
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  ratingText: {
    fontSize: 13,
    lineHeight: 18,
    ...fontStyleForWeight('bold'),
    color: palette.blue[800],
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  subtitle: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    ...fontStyleForWeight('medium'),
    color: palette.gray[600],
  },
  iconActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roomTypesPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: palette.gray[100],
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: '100%',
  },
  roomTypesText: {
    flexShrink: 1,
    fontSize: 13,
    lineHeight: 18,
    ...fontStyleForWeight('medium'),
    color: palette.gray[700],
  },
  rentBlock: {
    gap: 2,
    marginTop: 2,
  },
  rentLabel: {
    fontSize: 12,
    lineHeight: 18,
    ...fontStyleForWeight('medium'),
    color: palette.gray[500],
  },
  rentValue: {
    fontSize: 24,
    lineHeight: 32,
    ...fontStyleForWeight('bold'),
    color: palette.black,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  actionButton: {
    flex: 1,
    flexBasis: 0,
    minHeight: 44,
    paddingHorizontal: 12,
  },
});
