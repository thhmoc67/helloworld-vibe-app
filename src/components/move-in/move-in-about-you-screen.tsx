import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProfileStackScreen } from '@/components/profile/profile-stack-screen';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { VibeSelectionList } from '@/components/vibe/vibe-selection-list';
import palette from '@/constants/palette';
import {
  MOVE_IN_INTEREST_OPTIONS,
  MOVE_IN_INTERESTS_MAX,
} from '@/constants/vibes';
import { useTenantStore } from '@/stores/tenant-store';
import { resetRootRoute } from '@/utils/navigation-reset';

export function MoveInAboutYouScreen() {
  const insets = useSafeAreaInsets();
  const savedInterests = useTenantStore((state) => state.moveInInterests);
  const setMoveInInterests = useTenantStore((state) => state.setMoveInInterests);
  const [selectedIds, setSelectedIds] = useState<string[]>(savedInterests);

  function handleContinue() {
    if (selectedIds.length === 0) {
      Alert.alert('Select interests', 'Pick at least one interest to continue.');
      return;
    }

    setMoveInInterests(selectedIds);
    resetRootRoute('/move-in-steps');
  }

  return (
    <ProfileStackScreen title="A Little About You" centerTitle style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled">
        <Typography variant="display" size="xs" weight="bold" style={styles.title}>
          Tell Us What You Enjoy
        </Typography>
        <Typography variant="text" size="sm" color={palette.gray[600]} style={styles.subtitle}>
          Pick up to {MOVE_IN_INTERESTS_MAX} interests to personalize your HelloWorld experience.
        </Typography>

        <VibeSelectionList
          vibes={MOVE_IN_INTEREST_OPTIONS}
          selectedIds={selectedIds}
          onChange={setSelectedIds}
          variant="onLight"
          scrollable={false}
          maxSelection={MOVE_IN_INTERESTS_MAX}
          onMaxReached={() =>
            Alert.alert(
              'Limit reached',
              `You can select up to ${MOVE_IN_INTERESTS_MAX} interests.`,
            )
          }
          style={styles.vibeList}
        />
      </ScrollView>

      <View style={styles.footerWrap}>
        <LinearGradient
          colors={['rgba(255,255,255,0)', palette.white]}
          style={styles.footerFade}
          pointerEvents="none"
        />
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <Button
            label="Continue"
            onPress={handleContinue}
            disabled={selectedIds.length === 0}
          />
        </View>
      </View>
    </ProfileStackScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: palette.white,
  },
  scroll: {
    paddingTop: 8,
    paddingBottom: 120,
    gap: 16,
  },
  title: {
    color: palette.gray[900],
  },
  subtitle: {
    lineHeight: 22,
  },
  vibeList: {
    marginTop: 4,
  },
  footerWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  footerFade: {
    height: 28,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 8,
    backgroundColor: palette.white,
  },
});
