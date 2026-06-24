import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { VibeChip } from '@/components/vibe/vibe-chip';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import { VIBE_OPTIONS } from '@/constants/vibes';

type HdpVibeMatchCardProps = {
  matchPercent: number;
  matchedVibeIds?: string[];
};

export function HdpVibeMatchCard({
  matchPercent,
  matchedVibeIds = ['chill', 'creative'],
}: HdpVibeMatchCardProps) {
  const matchedVibes = VIBE_OPTIONS.filter((vibe) => matchedVibeIds.includes(vibe.id));

  return (
    <LinearGradient
      colors={[palette.gray[800], '#3B4760']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.card}>
      <View style={styles.header}>
        <Typography variant="text" size="lg" weight="bold" color={palette.white}>
          Your Vibe Match
        </Typography>
        <Typography variant="text" size="xs" color={palette.gray[300]}>
          Based on vibes you picked
        </Typography>
      </View>

      <View style={styles.scoreRow}>
        <Typography variant="display" size="sm" weight="bold" color={palette.lime[300]}>
          {matchPercent}%
        </Typography>
        <Typography variant="text" size="sm" color={palette.gray[200]} style={styles.scoreCaption}>
          match with this property
        </Typography>
      </View>

      <View style={styles.chips}>
        {matchedVibes.map((vibe) => (
          <VibeChip
            key={vibe.id}
            label={vibe.label}
            emoji={vibe.emoji}
            selected
            variant="onDark"
            onPress={() => undefined}
          />
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.md,
    padding: 20,
    gap: 16,
  },
  header: {
    gap: 4,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  scoreCaption: {
    flex: 1,
    paddingBottom: 4,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
