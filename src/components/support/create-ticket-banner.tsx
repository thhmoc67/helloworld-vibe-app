import { useRouter } from 'expo-router';
import { Linking, Pressable, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

const CARE_EMAIL = 'care@thehelloworld.com';

export function CreateTicketBanner() {
  const router = useRouter();

  function handleCreateNew() {
    router.push('/ticket-categories');
  }

  function handleEmailPress() {
    void Linking.openURL(`mailto:${CARE_EMAIL}?subject=Need help&body=Please tell us about your issue`);
  }

  return (
    <View style={styles.banner}>
      <View style={styles.circle} />
      <View style={styles.content}>
        <Typography variant="text" size="lg" weight="bold" color={palette.gray[900]}>
          Support Center
        </Typography>

        <Button
          label="Create New"
          variant="outline"
          onPress={handleCreateNew}
          style={styles.createButton}
        />

        <Typography variant="text" size="xs" color={palette.gray[700]} style={styles.info}>
          Raise and track tickets here. For updates, check your email or write to{' '}
          <Pressable onPress={handleEmailPress} accessibilityRole="link">
            <Typography variant="text" size="xs" weight="bold" color={palette.gray[900]} style={styles.email}>
              {CARE_EMAIL}
            </Typography>
          </Pressable>
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: palette.yellow[400],
    borderRadius: Radius.md,
    padding: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 30,
    borderColor: palette.white,
    opacity: 0.3,
    bottom: -60,
    right: -40,
  },
  content: {
    gap: 12,
  },
  createButton: {
    alignSelf: 'flex-start',
    backgroundColor: palette.white,
    borderColor: palette.gray[300],
  },
  info: {
    lineHeight: 18,
  },
  email: {
    textDecorationLine: 'underline',
  },
});
