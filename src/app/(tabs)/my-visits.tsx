import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';

export default function MyVisitsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <Typography variant="heading" weight="bold">
          My Visits
        </Typography>
        <Typography variant="body" color={palette.textSecondary} style={styles.subtitle}>
          Scheduled property visits will appear here.
        </Typography>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 8,
  },
  subtitle: {
    textAlign: 'center',
  },
});
