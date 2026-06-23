export const ProfileIcons = {
  support: require('../../assets/bundled/profile/support.svg').default,
  myVisits: require('../../assets/bundled/profile/my-visits.svg').default,
  wishlist: require('../../assets/bundled/profile/wishlist.svg').default,
  communityEvents: require('../../assets/bundled/profile/community-events.svg').default,
  forHomeowners: require('../../assets/bundled/profile/for-homeowners.svg').default,
  helloworldLiving: require('../../assets/bundled/profile/helloworld-living.svg').default,
  about: require('../../assets/bundled/profile/about.svg').default,
  privacyPolicy: require('../../assets/bundled/profile/privacy-policy.svg').default,
  tenancyPolicy: require('../../assets/bundled/profile/tenancy-policy.svg').default,
  logout: require('../../assets/bundled/profile/logout.svg').default,
  profile: require('../../assets/bundled/profile/profile.svg').default,
} as const;

export type ProfileIconName = keyof typeof ProfileIcons;
