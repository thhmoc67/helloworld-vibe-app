import { MOVE_OUT_MAX_DAYS, MOVE_OUT_NOTICE_DAYS } from '@/constants/move-out';
import { formatDisplayDate } from '@/utils/tenant-format';

export function getEarliestMoveOutDate(noticeDays = MOVE_OUT_NOTICE_DAYS) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + noticeDays);
  return date;
}

export function getLatestMoveOutDate(maxDays = MOVE_OUT_MAX_DAYS) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + maxDays);
  return date;
}

export function formatMoveOutNotice(earliestDate: Date, latestDate?: Date) {
  const earliest = formatDisplayDate(earliestDate.toISOString());
  if (latestDate) {
    const latest = formatDisplayDate(latestDate.toISOString());
    return `30-day notice applies. Select a move-out date between ${earliest} and ${latest}.`;
  }
  return `30-day notice applies. Earliest move-out: ${earliest}.`;
}

export function getMoveOutChecklistStatusLabel(status?: string) {
  if (status === 'completed') {
    return { label: 'Completed', color: 'success' as const };
  }
  if (status === 'initiated') {
    return { label: 'Filled By PM', color: 'link' as const };
  }
  return { label: 'Pending', color: 'warning' as const };
}
