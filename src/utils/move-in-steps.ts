import type { BookingStatus, MoveInStep } from '@/types/booking-status';
import type { TenantProfile } from '@/types/tenant';

function isProfileComplete(profile?: TenantProfile | null) {
  const user = profile?.userInfo;
  return Boolean(user?.name?.trim() && user?.email?.trim() && user?.gender?.trim());
}

export function buildMoveInSteps(
  status: BookingStatus,
  profile?: TenantProfile | null,
): MoveInStep[] {
  const tokenPaid = profile?.paymentInfo?.isTokenPaid ?? true;

  return [
    {
      id: 'booking-token',
      title: 'Booking & Token Payment',
      description: 'Your booking has been created.',
      completed: Boolean(status['booking date']) && tokenPaid,
    },
    {
      id: 'advance-charges',
      title: 'Advance Rent · Security Deposit · Move-in Charges',
      description: 'Complete payment is mandatory before move-in.',
      actionLabel: 'Complete Payment',
      route: '/(tabs)/payments',
      completed: status.payment,
    },
    {
      id: 'personal-profile',
      title: 'A Little About You',
      description: 'Your interests help us build the right community around you.',
      actionLabel: 'Complete profile',
      route: '/profile/personal-details',
      completed: isProfileComplete(profile),
    },
    {
      id: 'emergency-contact',
      title: 'Emergency Contact',
      description: 'Add a contact we can reach in an emergency.',
      actionLabel: 'Add Contact',
      route: '/profile/emergency-contact',
      completed: status['emergency details'],
    },
    {
      id: 'document-verification',
      title: 'Document Verification',
      description: "You'll be redirected to our partner portal for KYC Verification",
      actionLabel: 'Verify',
      completed: status.is_kyc_cleared,
    },
    {
      id: 'bank-details',
      title: 'Bank Details',
      description: 'Add an account to receive refunds',
      actionLabel: 'Add Details',
      route: '/profile/bank-details',
      completed: status.bank_details,
    },
    {
      id: 'move-in-checklist',
      title: 'Move-in Checklist',
      description: 'Review and confirm the amenities in your room.',
      actionLabel: 'Review Amenities',
      route: '/profile/booking-details',
      completed: status.checklist_status,
    },
    {
      id: 'agreement-signing',
      title: 'Agreement E-Signing',
      description:
        'Your rental agreement will be shared over your registered Email once onboarding is completed.',
      completed: status.signed_document,
    },
  ];
}

export function partitionMoveInSteps(steps: MoveInStep[]) {
  const completed = steps.filter((step) => step.completed);
  const pending = steps.filter((step) => !step.completed);
  return { completed, pending, total: steps.length, doneCount: completed.length };
}

export function formatMoveInDeadline(isoDate: string) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th';

  const monthYear = date.toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  });

  return `${day}${suffix} ${monthYear}`;
}

export function buildMoveInPendingMessage(pendingCount: number) {
  const label = pendingCount === 1 ? 'step' : 'steps';
  return `Just ${pendingCount} quick ${label} left before you can collect your keys and move in.`;
}

export function buildProgressMessage(doneCount: number, total: number, moveInDate: string) {
  const remaining = Math.max(total - doneCount, 0);
  const deadline = formatMoveInDeadline(moveInDate);

  if (remaining === 0) {
    return `You're all set for your move-in on ${deadline}.`;
  }

  if (doneCount >= total - 2) {
    return `Almost there! Just a few more steps before your move-in on ${deadline}`;
  }

  return `Complete the remaining ${remaining} steps before your move-in on ${deadline} to avoid booking cancellation.`;
}
