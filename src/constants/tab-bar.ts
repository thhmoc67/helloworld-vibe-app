export const TabBarIcons = {
  home: require('../../assets/bundled/tab-bar/home.svg').default,
  myVisits: require('../../assets/bundled/tab-bar/my-visits.svg').default,
  wishlist: require('../../assets/bundled/tab-bar/wishlist.svg').default,
  contact: require('../../assets/bundled/tab-bar/contact.svg').default,
} as const;

export type TabBarIconName = keyof typeof TabBarIcons;

export const TAB_ROUTES = {
  home: { label: 'Home', icon: 'home' as const },
  'my-visits': { label: 'My Visits', icon: 'myVisits' as const },
  wishlist: { label: 'Wishlist', icon: 'wishlist' as const },
  contact: { label: 'Contact', icon: 'contact' as const },
} as const;

export type TabRouteName = keyof typeof TAB_ROUTES;
