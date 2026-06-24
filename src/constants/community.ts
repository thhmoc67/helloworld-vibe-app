export type CommunityEventsTab = 'upcoming' | 'past' | 'registered';

export const COMMUNITY_EVENT_TABS: { id: CommunityEventsTab; label: string }[] = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' },
  { id: 'registered', label: 'Registered' },
];

export const COMMUNITY_TAB_HEADINGS: Record<CommunityEventsTab, string> = {
  upcoming: 'Weekend plans? We got you!',
  past: 'Moments from the community',
  registered: 'See you there 👀',
};

export const EVENT_REQUEST_CATEGORIES = [
  'Sports',
  'Food & Drinks',
  'Festive',
  'Arts & culture',
  'Outdoor',
  'Others',
] as const;

export const EVENT_FALLBACK_IMAGE =
  'https://hello-assets-items.s3.ap-south-1.amazonaws.com/images/coming-soon.jpg';
