export const REFERRAL_DISCLAIMER =
  'Referral rewards are subject to applicable taxes & program terms.';

export function getReferralHowItWorksSteps(friendDiscount = 1000, referrerReward = 2000) {
  return [
    {
      step: 1,
      title: 'Share your code',
      description: 'Send your referral code to a friend looking for a PG',
    },
    {
      step: 2,
      title: 'Friend moves in',
      description: `They use your code and get ₹${friendDiscount.toLocaleString('en-IN')} off their first rent`,
    },
    {
      step: 3,
      title: `You earn ₹${referrerReward.toLocaleString('en-IN')}`,
      description:
        'Points credited to your wallet after their move-in and they complete 30 days at a HelloWorld property.',
    },
  ] as const;
}
