export const TabBarIcons = {
  home: require('../../assets/bundled/tab-bar/home.svg').default,
  myVisits: require('../../assets/bundled/tab-bar/my-visits.svg').default,
  wishlist: require('../../assets/bundled/tab-bar/wishlist.svg').default,
  contact: require('../../assets/bundled/tab-bar/contact.svg').default,
  dashboard: require('../../assets/bundled/tab-bar/dashboard.svg').default,
  explore: require('../../assets/bundled/tab-bar/explore.svg').default,
  payments: require('../../assets/bundled/tab-bar/payments.svg').default,
  support: require('../../assets/bundled/tab-bar/support.svg').default,
} as const;

export type TabBarIconName = keyof typeof TabBarIcons;

export const PROSPECT_TAB_ROUTES = {
  home: { label: 'Home', icon: 'home' as const },
  'my-visits': { label: 'My Visits', icon: 'myVisits' as const },
  wishlist: { label: 'Wishlist', icon: 'wishlist' as const },
  contact: { label: 'Contact', icon: 'contact' as const },
} as const;

export const TENANT_TAB_ROUTES = {
  dashboard: { label: 'Dashboard', icon: 'dashboard' as const },
  explore: { label: 'Explore', icon: 'explore' as const },
  payments: { label: 'Payments', icon: 'payments' as const },
  support: { label: 'Support', icon: 'support' as const },
} as const;

export const TAB_ROUTES = {
  ...PROSPECT_TAB_ROUTES,
  ...TENANT_TAB_ROUTES,
} as const;

export type ProspectTabRouteName = keyof typeof PROSPECT_TAB_ROUTES;
export type TenantTabRouteName = keyof typeof TENANT_TAB_ROUTES;
export type TabRouteName = keyof typeof TAB_ROUTES;

export const PROSPECT_TAB_ORDER: ProspectTabRouteName[] = [
  'home',
  'my-visits',
  'wishlist',
  'contact',
];

export const TENANT_TAB_ORDER: TenantTabRouteName[] = [
  'dashboard',
  'explore',
  'payments',
  'support',
];

/** Native tab bar content height (icons + labels), excluding safe area. */
export const TAB_BAR_HEIGHT = 76;

/** Extra breathing room below the last item on tab screens. */
export const TAB_SCREEN_EXTRA_PADDING = 24;
