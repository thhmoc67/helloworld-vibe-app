import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { DashboardImages } from '@/constants/assets';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

type CommunityPromoCardProps = {
  onRequestPress: () => void;
};

export function CommunityPromoCard({ onRequestPress }: CommunityPromoCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.copy}>
        <Typography variant="text" size="md" weight="medium">
          Want to see something fun?
        </Typography>
        <Typography variant="text" size="sm" color={palette.gray[600]}>
          Tell us what you'd like.
        </Typography>
        <Button label="Request Event" variant="outline" onPress={onRequestPress} style={styles.button} />
      </View>
      <Image source={DashboardImages.referralIllustration} style={styles.illustration} contentFit="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.lime[50],
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: palette.lime[200],
    padding: 16,
    gap: 12,
    overflow: 'hidden',
  },
  copy: {
    flex: 1,
    gap: 8,
  },
  button: {
    alignSelf: 'flex-start',
    marginTop: 4,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  illustration: {
    width: 120,
    height: 104,
  },
});
