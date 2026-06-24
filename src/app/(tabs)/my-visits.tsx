import { StyleSheet, View } from 'react-native';

import { TabScreen } from '@/components/navigation/tab-screen';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';

export default function MyVisitsScreen() {
  return (
    <TabScreen>
      <View style={styles.content}>
        <Typography variant="heading" weight="bold">
          My Visits
        </Typography>
        <Typography variant="body" color={palette.textSecondary} style={styles.subtitle}>
          Scheduled property visits will appear here.
        </Typography>
      </View>
    </TabScreen>
  );
}

const styles = StyleSheet.create({
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
