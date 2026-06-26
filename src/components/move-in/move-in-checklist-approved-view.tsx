import { Linking, Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProfileStackScreen } from '@/components/profile/profile-stack-screen';
import { Typography } from '@/components/ui/typography';
import { HELP_DESK_PHONE } from '@/constants/tenant';
import palette from '@/constants/palette';

export function MoveInChecklistApprovedView() {
  const insets = useSafeAreaInsets();

  function handleContactUs() {
    const url =
      Platform.OS === 'android' ? `tel:${HELP_DESK_PHONE}` : `telprompt:${HELP_DESK_PHONE}`;
    void Linking.openURL(url);
  }

  return (
    <ProfileStackScreen title="Move-in Checklist" centerTitle style={styles.screen}>
      <View style={[styles.content, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <View style={styles.iconCircle}>
          <Typography variant="display" size="xs" weight="bold" color={palette.lime[600]}>
            ✓
          </Typography>
        </View>
        <Typography variant="text" size="xl" weight="bold" style={styles.heading}>
          Checklist has been approved
        </Typography>
        <Typography variant="text" size="sm" color={palette.gray[500]} style={styles.footer}>
          <Pressable onPress={handleContactUs} accessibilityRole="link">
            <Typography variant="text" size="sm" weight="bold" color={palette.blue[800]} style={styles.link}>
              Contact us
            </Typography>
          </Pressable>
          {' for any queries'}
        </Typography>
      </View>
    </ProfileStackScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: palette.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    gap: 12,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: palette.lime[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  heading: {
    textAlign: 'center',
    color: palette.gray[900],
  },
  footer: {
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 8,
  },
  link: {
    textDecorationLine: 'underline',
  },
});
