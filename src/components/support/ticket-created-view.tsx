import { useRouter } from 'expo-router';
import { Linking, Platform, Pressable, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { HELP_DESK_PHONE } from '@/constants/tenant';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

type TicketCreatedViewProps = {
  ticketNumber: string;
};

export function TicketCreatedView({ ticketNumber }: TicketCreatedViewProps) {
  const router = useRouter();

  function handleGoHome() {
    router.replace('/(tabs)/support');
  }

  function handleContactUs() {
    const url =
      Platform.OS === 'android' ? `tel:${HELP_DESK_PHONE}` : `telprompt:${HELP_DESK_PHONE}`;
    void Linking.openURL(url);
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Typography variant="display" size="xs" weight="bold" color={palette.lime[600]}>
          ✓
        </Typography>
      </View>

      <Typography variant="text" size="md" color={palette.gray[600]}>
        Ticket ID: {ticketNumber}
      </Typography>
      <Typography variant="text" size="xl" weight="bold" style={styles.heading}>
        We have received your request
      </Typography>
      <Typography variant="text" size="sm" color={palette.gray[500]} style={styles.desc}>
        Our team will contact you soon regarding the ticket you created.
      </Typography>

      <Button label="Go to Support" onPress={handleGoHome} style={styles.button} />

      <Typography variant="text" size="sm" color={palette.gray[500]} style={styles.footer}>
        <Pressable onPress={handleContactUs} accessibilityRole="link">
          <Typography variant="text" size="sm" weight="bold" color={palette.blue[800]} style={styles.link}>
            Contact us
          </Typography>
        </Pressable>
        {' for any queries'}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 8,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: Radius.full,
    backgroundColor: palette.lime[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heading: {
    textAlign: 'center',
    color: palette.gray[900],
    marginTop: 4,
  },
  desc: {
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 4,
  },
  button: {
    width: '100%',
    marginTop: 24,
  },
  footer: {
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 22,
  },
  link: {
    textDecorationLine: 'underline',
  },
});
