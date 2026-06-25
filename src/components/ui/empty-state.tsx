import { Image } from 'expo-image';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Typography } from '@/components/ui/typography';
import { EmptyStateAssets } from '@/constants/assets';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

type EmptyStateProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  /** Fill available space and center content (full-screen empty views). */
  fill?: boolean;
  /** Smaller illustration and tighter spacing for cards and sections. */
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function EmptyState({
  title,
  subtitle,
  actionLabel,
  onAction,
  fill = false,
  compact = false,
  style,
}: EmptyStateProps) {
  const showAction = Boolean(actionLabel && onAction);

  return (
    <View style={[styles.root, fill && styles.fill, compact && styles.compactRoot, style]}>
      <Image
        source={EmptyStateAssets.default}
        style={[styles.image, compact && styles.imageCompact]}
        contentFit="contain"
        accessibilityIgnoresInvertColors
      />

      <View style={styles.copy}>
        <Typography
          variant="text"
          size={compact ? 'md' : 'lg'}
          weight="bold"
          style={styles.title}>
          {title}
        </Typography>
        {subtitle ? (
          <Typography
            variant={compact ? 'label' : 'text'}
            size="sm"
            color={palette.gray[600]}
            style={styles.subtitle}>
            {subtitle}
          </Typography>
        ) : null}
      </View>

      {showAction ? (
        <Pressable
          style={[styles.actionButton, compact && styles.actionButtonCompact]}
          onPress={onAction}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}>
          <Typography variant="text" size="sm" weight="bold" color={palette.lime[800]}>
            {actionLabel}
          </Typography>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 16,
  },
  fill: {
    flex: 1,
    paddingVertical: 24,
  },
  compactRoot: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
  image: {
    width: 163,
    height: 230,
  },
  imageCompact: {
    width: 120,
    height: 168,
  },
  copy: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 20,
  },
  actionButton: {
    minHeight: 44,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: Radius.full,
    backgroundColor: palette.lime[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonCompact: {
    minHeight: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
