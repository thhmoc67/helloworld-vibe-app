import type { TicketConversation } from '@/types/ticket';

export function getTicketMessageText(summary?: string) {
  return summary?.split('----')[0]?.trim() ?? '';
}

export function formatTicketMessageTime(value: string, isSupport = false) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  if (isSupport) {
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function getVisibleConversations(conversations: TicketConversation[]) {
  return [...conversations]
    .filter(
      (item) =>
        item.visibility === 'public' &&
        item.status === 'SUCCESS' &&
        item.type !== 'comment' &&
        getTicketMessageText(item.summary),
    )
    .sort(
      (left, right) =>
        new Date(left.createdTime).getTime() - new Date(right.createdTime).getTime(),
    );
}
