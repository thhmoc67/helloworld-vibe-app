import { StyleSheet, View } from 'react-native';

import { ProfileStackScreen } from '@/components/profile/profile-stack-screen';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';

type ProfilePlaceholderScreenProps = {
  title: string;
  description?: string;
};

export function ProfilePlaceholderScreen({
  title,
  description = 'This section is coming soon.',
}: ProfilePlaceholderScreenProps) {
  return (
    <ProfileStackScreen title={title}>
      <View style={styles.content}>
        <Typography variant="text" size="md" color={palette.gray[600]} style={styles.description}>
          {description}
        </Typography>
      </View>
    </ProfileStackScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
  },
});
