import { LinearGradient } from 'expo-linear-gradient';
import { SymbolView } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

import { GradientText } from '@/components/ui/gradient-text';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

type VibeMatchItem = {
  id: string;
  label: string;
  emoji: string;
  percent: number;
};

type HdpVibeMatchCardProps = {
  matchPercent: number;
  propertyName?: string;
  selectedVibeCount?: number;
  vibeMatches?: VibeMatchItem[];
  workplaces?: string[];
  colleges?: string[];
  extraCount?: number;
  onShowMore?: () => void;
};

const DEFAULT_VIBE_MATCHES: VibeMatchItem[] = [
  { id: 'chill', label: 'Chill', emoji: '😎', percent: 87 },
  { id: 'night-owl', label: 'Night Owl', emoji: '🌙', percent: 97 },
  { id: 'gaming', label: 'Gamers', emoji: '🎮', percent: 78 },
  { id: 'creative', label: 'Creative', emoji: '🎨', percent: 84 },
];

const DEFAULT_WORKPLACES = ['Google', 'Microsoft', 'Amazon', 'Swiggy'];
const DEFAULT_COLLEGES = ['IIT Bombay', 'BITS Pilani', 'NIT Trichy'];

const RING_GRADIENT = [palette.blue[400], palette.purpleScale[600]] as const;

function MatchScoreRing({ percent, size = 76 }: { percent: number; size?: number }) {
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(percent, 0), 100) / 100;
  const dashOffset = circumference * (1 - progress);

  return (
    <View style={[styles.ringWrap, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Defs>
          <SvgLinearGradient id="vibeRing" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={RING_GRADIENT[0]} />
            <Stop offset="1" stopColor={RING_GRADIENT[1]} />
          </SvgLinearGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={palette.gray[200]}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#vibeRing)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.ringLabel}>
        <GradientText variant="text" size="sm" weight="bold" colors={RING_GRADIENT}>
          {Math.round(percent)}%
        </GradientText>
      </View>
    </View>
  );
}

function VibeMatchTile({ item }: { item: VibeMatchItem }) {
  return (
    <View style={styles.vibeTile}>
      <Typography variant="text" size="lg" style={styles.vibeEmoji}>
        {item.emoji}
      </Typography>
      <Typography variant="text" size="xs" weight="medium" color={palette.gray[800]}>
        {item.label}
      </Typography>
      <GradientText variant="text" size="xl" weight="bold" colors={RING_GRADIENT}>
        {item.percent}%
      </GradientText>
      <Typography variant="text" size="xs" color={palette.gray[400]}>
        Match
      </Typography>
    </View>
  );
}

function ResidentInfoCard({
  icon,
  title,
  items,
  extraCount,
}: {
  icon: string;
  title: string;
  items: string[];
  extraCount: number;
}) {
  return (
    <View style={styles.residentCard}>
      <Typography variant="text" size="xs" color={palette.gray[500]}>
        {icon} {title}
      </Typography>
      <View style={styles.residentRow}>
        <Typography
          variant="text"
          size="sm"
          weight="bold"
          color={palette.gray[900]}
          style={styles.residentText}>
          {items.join(' • ')}
        </Typography>
        <View style={styles.extraBadge}>
          <Typography variant="text" size="xs" weight="bold" color={palette.gray[800]}>
            +{extraCount}
          </Typography>
        </View>
      </View>
    </View>
  );
}

export function HdpVibeMatchCard({
  matchPercent,
  propertyName = 'this property',
  selectedVibeCount = 5,
  vibeMatches = DEFAULT_VIBE_MATCHES,
  workplaces = DEFAULT_WORKPLACES,
  colleges = DEFAULT_COLLEGES,
  extraCount = 31,
  onShowMore,
}: HdpVibeMatchCardProps) {
  return (
    <LinearGradient
      colors={[palette.blue[50], palette.purpleScale[50]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.headerCopy}>
          <Typography variant="text" size="md" weight="bold" color={palette.gray[900]}>
            How well this home matches your vibe
          </Typography>
          <Typography variant="text" size="xs" color={palette.gray[600]}>
            Based on the {selectedVibeCount} vibes you selected
          </Typography>
        </View>
        <MatchScoreRing percent={matchPercent} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.vibeRow}>
        {vibeMatches.map((item) => (
          <VibeMatchTile key={item.id} item={item} />
        ))}
      </ScrollView>

      <View style={styles.residentList}>
        <ResidentInfoCard
          icon="🏢"
          title="Residents work at"
          items={workplaces}
          extraCount={extraCount}
        />
        <ResidentInfoCard
          icon="🎓"
          title="From colleges like"
          items={colleges}
          extraCount={extraCount}
        />
      </View>

      <View style={styles.footer}>
        <Typography variant="text" size="sm" weight="medium" color={palette.blue[900]} style={styles.footerText}>
          See what residents at {propertyName} are usually into
        </Typography>
        <Pressable
          onPress={onShowMore}
          style={({ pressed }) => [styles.showMore, pressed && styles.showMorePressed]}
          accessibilityRole="button"
          accessibilityLabel="Show more resident interests">
          <Typography variant="text" size="sm" weight="bold" color={palette.blue[500]}>
            Show More
          </Typography>
          <SymbolView name="chevron.down" size={12} weight="semibold" tintColor={palette.blue[500]} />
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.gray[200],
    padding: 16,
    gap: 16,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerCopy: {
    flex: 1,
    gap: 4,
    paddingRight: 8,
  },
  ringWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringLabel: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vibeRow: {
    gap: 10,
    paddingRight: 4,
  },
  vibeTile: {
    width: 96,
    minHeight: 118,
    borderRadius: Radius.md,
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 12,
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  vibeEmoji: {
    fontSize: 22,
    lineHeight: 28,
  },
  residentList: {
    gap: 10,
  },
  residentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },
  residentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  residentText: {
    flex: 1,
    lineHeight: 20,
  },
  extraBadge: {
    minWidth: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  footerText: {
    flex: 1,
    lineHeight: 20,
  },
  showMore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
  },
  showMorePressed: {
    opacity: 0.85,
  },
});
