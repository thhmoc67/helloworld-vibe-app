import { Linking, Pressable, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

type ProfileInfoCardProps = {
  label: string;
  value?: string | null;
};

export function ProfileInfoCard({ label, value }: ProfileInfoCardProps) {
  return (
    <View style={styles.card}>
      <Typography variant="label" size="xs" color={palette.gray[500]}>
        {label}
      </Typography>
      <Typography variant="text" size="sm" weight="medium" color={palette.gray[900]}>
        {value?.trim() ? value : '—'}
      </Typography>
    </View>
  );
}

type ProfileSupportNoteProps = {
  onEmailPress?: () => void;
};

export function ProfileSupportNote({ onEmailPress }: ProfileSupportNoteProps) {
  return (
    <View style={styles.noteWrap}>
      <Typography variant="text" size="xs" color={palette.gray[600]} style={styles.note}>
        The personal details can&apos;t be tweaked once saved on the database. In case of any
        additional change, write to:
      </Typography>
      <Pressable
        onPress={() => {
          if (onEmailPress) {
            onEmailPress();
            return;
          }
          void Linking.openURL(
            'mailto:care@thehelloworld.com?subject=Need help for&body=Please tell us',
          );
        }}
        accessibilityRole="link">
        <Typography variant="text" size="sm" weight="medium" color={palette.lime[700]}>
          care@thehelloworld.com
        </Typography>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    minWidth: '46%',
    backgroundColor: palette.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: palette.gray[200],
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 4,
  },
  noteWrap: {
    gap: 8,
    paddingTop: 16,
  },
  note: {
    lineHeight: 18,
  },
});
