import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import type { SupportTicket } from '@/types/ticket';
import { formatDisplayDate, isActiveTicket } from '@/utils/tenant-format';

type SupportTicketCardProps = {
  ticket: SupportTicket;
};

export function SupportTicketCard({ ticket }: SupportTicketCardProps) {
  const router = useRouter();
  const active = isActiveTicket(ticket.status);
  const createdAt = ticket.createdTime ?? ticket.created_at;

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/ticket-details',
          params: {
            id: String(ticket.id),
            subject: ticket.subject ?? 'Support ticket',
            ticketNumber: String(ticket.ticket_number ?? ticket.id),
            status: ticket.status ?? 'Open',
            createdTime: createdAt ?? '',
          },
        })
      }
      accessibilityRole="button">
      <View style={styles.headerRow}>
        <Typography variant="text" size="sm" weight="medium" style={styles.subject} numberOfLines={1}>
          {ticket.subject ?? 'Support request'}
        </Typography>
        <View style={[styles.badge, active ? styles.badgeActive : styles.badgeResolved]}>
          <Typography
            variant="label"
            size="xs"
            weight="medium"
            color={active ? palette.blue[800] : palette.lime[800]}>
            {active ? 'In Progress' : 'Resolved'}
          </Typography>
        </View>
      </View>
      <Typography variant="label" size="xs" color={palette.gray[500]}>
        Raised on {formatDisplayDate(createdAt)}
      </Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: palette.gray[200],
    padding: 16,
    gap: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  subject: {
    flex: 1,
  },
  badge: {
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeActive: {
    backgroundColor: palette.blue[100],
  },
  badgeResolved: {
    backgroundColor: palette.lime[50],
  },
});
