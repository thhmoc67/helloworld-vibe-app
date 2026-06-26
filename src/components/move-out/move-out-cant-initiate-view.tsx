import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import {
  MOVE_OUT_FOOTER_CLEARANCE,
  moveOutContent,
  moveOutFooter,
} from '@/constants/move-out-layout';
import { callHelpDesk } from '@/utils/support-phone';

type MoveOutCantInitiateViewProps = {
  reason: string;
  onGoToDashboard: () => void;
};

export function MoveOutCantInitiateView({ reason, onGoToDashboard }: MoveOutCantInitiateViewProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          moveOutContent.horizontal,
          { paddingBottom: insets.bottom + MOVE_OUT_FOOTER_CLEARANCE },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.iconBlock}>
          <Typography variant="display" size="xs" weight="bold" color={palette.red[500]} style={styles.icon}>
            ✕
          </Typography>
          <Typography variant="text" size="xl" weight="bold" color={palette.gray[800]} style={styles.title}>
            Oops, you cannot initiate move-out
          </Typography>
          <Typography variant="text" size="sm" weight="medium" color={palette.red[500]} style={styles.reason}>
            {reason}
          </Typography>
        </View>

        <Typography variant="text" size="sm" color={palette.gray[500]} style={styles.contact}>
          <Pressable onPress={callHelpDesk} accessibilityRole="button">
            <Typography variant="text" size="sm" weight="bold" color={palette.blue[800]} style={styles.contactLink}>
              Contact us
            </Typography>
          </Pressable>{' '}
          for any queries
        </Typography>
      </ScrollView>

      <View style={[moveOutFooter.bar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <Button label="Go to Dashboard" onPress={onGoToDashboard} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: 24,
    paddingTop: 8,
  },
  iconBlock: {
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    fontSize: 64,
    lineHeight: 72,
  },
  title: {
    textAlign: 'center',
  },
  reason: {
    textAlign: 'center',
    lineHeight: 22,
  },
  contact: {
    textAlign: 'center',
  },
  contactLink: {
    textDecorationLine: 'underline',
  },
});
