import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { TenantScreenHeader } from '@/components/tenant/tenant-screen-header';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

export default function TicketDetailsScreen() {
  const router = useRouter();
  const { subject = 'Support ticket', ticketNumber = '', status = 'Open' } =
    useLocalSearchParams<{
      subject?: string;
      ticketNumber?: string;
      status?: string;
    }>();

  return (
    <View style={styles.root}>
      <TenantScreenHeader title={subject} onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Typography variant="label" size="xs" color={palette.gray[500]}>
          Ticket ID: {ticketNumber}
        </Typography>
        <View style={styles.badge}>
          <Typography variant="label" size="xs" weight="medium" color={palette.blue[800]}>
            {status}
          </Typography>
        </View>
        <View style={styles.messageCard}>
          <Typography variant="label" size="xs" color={palette.gray[500]}>
            HelloWorld Support
          </Typography>
          <Typography variant="text" size="sm" style={styles.message}>
            Thanks for reaching out. Our team will update you on this ticket via email.
          </Typography>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.gray[50],
  },
  content: {
    padding: 24,
    gap: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: palette.blue[100],
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  messageCard: {
    backgroundColor: palette.white,
    borderRadius: Radius.md,
    padding: 16,
    gap: 8,
    marginTop: 8,
  },
  message: {
    lineHeight: 22,
  },
});
