import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { ImageAssets } from '@/constants/assets';
import { fontStyleForWeight } from '@/constants/fonts';
import palette from '@/constants/palette';

type CallbackRequestSuccessProps = {
  onDone: () => void;
};

export function CallbackRequestSuccess({ onDone }: CallbackRequestSuccessProps) {
  return (
    <LinearGradient
      colors={['#EAF7FE', palette.white]}
      locations={[0, 0.55]}
      style={styles.gradient}>
      <View style={styles.content}>
        <Image
          source={ImageAssets.otpIllustration}
          style={styles.illustration}
          contentFit="contain"
        />
        <Text style={styles.title}>You're in good hands 🤝</Text>
        <Text style={styles.description}>
          We've received your request.{'\n'}Expect a call shortly.
        </Text>
        <Button label="Done" onPress={onDone} style={styles.doneButton} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  illustration: {
    width: 220,
    height: 180,
  },
  title: {
    marginTop: 20,
    fontSize: 22,
    lineHeight: 30,
    ...fontStyleForWeight('bold'),
    color: palette.black,
    textAlign: 'center',
  },
  description: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    ...fontStyleForWeight('medium'),
    color: palette.gray[600],
    textAlign: 'center',
  },
  doneButton: {
    marginTop: 28,
    width: '100%',
    minHeight: 52,
  },
});
