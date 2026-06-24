import { HELP_DESK_PHONE } from '@/constants/tenant';

export const SOS_CONFIG = {
  /** India unified emergency number */
  emergencyHelpline: '112',
  helpDeskPhone: HELP_DESK_PHONE,
  helpDeskHours: 'Available 11 AM-8 PM',
  emergencySubtitle: 'Police • Ambulance • Fire',
} as const;
