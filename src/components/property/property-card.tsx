import { Image, type ImageSource } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { SymbolView } from 'expo-symbols';

import { Button } from '@/components/ui/button';
import { fontStyleForWeight } from '@/constants/fonts';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import type { PropertyBadge, PropertyListing } from '@/types/property';

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
  isFavorite = false,
}: PropertyCardProps) {
  const imageCount = property.images.length;
  const [imageIndex, setImageIndex] = useState(0);
  const currentImage = property.images[imageIndex] ?? property.images[0];

  function showPreviousImage() {
    if (imageCount <= 1) return;
    setImageIndex((index) => (index === 0 ? imageCount - 1 : index - 1));
  }

  function showNextImage() {
    if (imageCount <= 1) return;
    setImageIndex((index) => (index === imageCount - 1 ? 0 : index + 1));
  }

  return (
    <View style={[styles.cardShadow, style]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.card, pressed && onPress ? styles.cardPressed : null]}
        accessibilityRole={onPress ? 'button' : undefined}>
      <View style={styles.mediaSection}>
        <Image source={currentImage} style={styles.heroImage} contentFit="cover" />

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
              {property.images.map((_, index) => (
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
                onFavoritePress?.();
              }}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}>
              <SymbolView
                name={isFavorite ? 'heart.fill' : 'heart'}
                size={20}
                tintColor={palette.gray[800]}
              />
            </Pressable>
            <Pressable
              onPress={(event) => {
                event.stopPropagation();
                onSharePress?.();
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

        <View style={styles.actionsRow}>
          <Button
            label="Request Callback"
            variant="outline"
            onPress={onRequestCallback}
            style={styles.actionButton}
          />
          <Button label="Take a Tour" onPress={onTakeTour} style={styles.actionButton} />
        </View>
      </View>
      </Pressable>
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
    paddingBottom: 16,
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
    marginTop: 4,
  },
  actionButton: {
    flex: 1,
    minHeight: 44,
  },
});
