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

export const TENANT_MENU_SECTIONS: MenuSection[] = [
  {
    id: 'account',
    title: 'Account',
    items: [
      { id: 'move-in-steps', label: 'Your Move-in Steps', icon: 'bookingDetails' },
      { id: 'personal-details', label: 'Personal Details', icon: 'personalDetails' },
      {
        id: 'booking-details',
        label: 'Booking Details & Rental Agreements',
        icon: 'bookingDetails',
      },
      { id: 'bank-details', label: 'Bank Details', icon: 'bankDetails' },
      { id: 'emergency-contact', label: 'Emergency Contact Details', icon: 'emergencyContact' },
    ],
  },
  {
    id: 'activity',
    title: 'Activity',
    items: [
      { id: 'my-payments', label: 'My Payments', icon: 'myPayments' },
      { id: 'support', label: 'Support', icon: 'tenantSupport' },
      { id: 'my-visits', label: 'My Visits', icon: 'tenantMyVisits' },
      { id: 'my-wishlist', label: 'My Wishlist', icon: 'tenantWishlist' },
      { id: 'referral', label: 'Referral', icon: 'referral' },
      { id: 'community-events', label: 'Community Events', icon: 'tenantCommunityEvents' },
      { id: 'move-out', label: 'Move Out', icon: 'moveOut' },
    ],
  },
  {
    id: 'more',
    title: 'More',
    items: [
      { id: 'about', label: 'About', icon: 'tenantAbout' },
      { id: 'privacy-policy', label: 'Privacy Policy', icon: 'tenantPrivacyPolicy' },
      { id: 'tenancy-policy', label: 'Tenancy Policy', icon: 'tenantTenancyPolicy' },
      { id: 'logout', label: 'Logout', icon: 'tenantLogout' },
    ],
  },
];
