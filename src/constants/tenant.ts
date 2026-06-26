import { DashboardIconName } from '@/components/dashboard/dashboard-icon';

export const TENANT_QUICK_ACTIONS: {
  id: string;
  label: string;
  icon: DashboardIconName;
}[] = [
  { id: 'sos', label: 'SOS', icon: 'sos' },
  { id: 'visitors', label: 'Visitors', icon: 'visitor' },
  { id: 'roommates', label: 'Roommates', icon: 'roommate' },
  { id: 'refer', label: 'Refer & Earn', icon: 'refer' },
];

export const SUPPORT_CATEGORIES = [
  { id: 'booking', label: 'Booking' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'payments', label: 'Payments' },
  { id: 'food', label: 'Food' },
  { id: 'repairs', label: 'Repairs' },
  { id: 'abuse', label: 'Abuse' },
  { id: 'move-out', label: 'Move out' },
  { id: 'other', label: 'Other' },
] as const;

export const HELP_DESK_PHONE = '8880008888';
export const HELP_DESK_PHONE_DISPLAY = '888 000 88 88';
