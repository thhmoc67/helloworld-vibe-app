import { useQuery } from '@tanstack/react-query';

import { getReferralDetails, getReferralTerms } from '@/api/referral';

export function useReferralDetails() {
  return useQuery({
    queryKey: ['referral-details'],
    queryFn: () => getReferralDetails(true),
  });
}

export function useReferralTerms() {
  return useQuery({
    queryKey: ['referral-terms'],
    queryFn: getReferralTerms,
  });
}
