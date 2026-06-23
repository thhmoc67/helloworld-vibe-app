import type { ProfileIconName } from '@/constants/profile-icons';

export type MenuItem = {
  id: string;
  label: string;
  icon: ProfileIconName;
};

export type MenuSection = {
  id: string;
  title: string;
  items: MenuItem[];
};

export const MENU_SECTIONS: MenuSection[] = [
  {
    id: 'activity',
    title: 'My Activity & Support',
    items: [
      { id: 'contact-us', label: 'Contact Us', icon: 'support' },
      { id: 'my-visits', label: 'My Visits', icon: 'myVisits' },
      { id: 'my-wishlist', label: 'My Wishlist', icon: 'wishlist' },
      { id: 'community-events', label: 'Community Events', icon: 'communityEvents' },
    ],
  },
  {
    id: 'about',
    title: 'About & Policies',
    items: [
      { id: 'for-homeowners', label: 'For Homeowners', icon: 'forHomeowners' },
      { id: 'helloworld-living', label: 'Helloworld Living', icon: 'helloworldLiving' },
      { id: 'about', label: 'About', icon: 'about' },
      { id: 'privacy-policy', label: 'Privacy Policy', icon: 'privacyPolicy' },
      { id: 'tenancy-policy', label: 'Tenancy Policy', icon: 'tenancyPolicy' },
      { id: 'logout', label: 'Logout', icon: 'logout' },
    ],
  },
];
