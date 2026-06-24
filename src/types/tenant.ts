export type TenantProfile = {
  bookingId: string;
  bookingCreationDate?: string;
  userInfo: {
    name: string;
    mobile: string;
    email: string;
    gender?: string;
    image?: string | null;
    isVerified?: boolean;
    bookingStatus?: string;
  };
  userAddress?: Record<string, unknown>;
  userEmergencyContact?: Record<string, unknown>;
  propertyInfo: {
    name: string;
    moveInDate?: string;
    rentStartDate?: string;
    bedNo?: string;
    propertyId?: string;
    sharingType?: string;
    roomType?: string;
    moveOutDate?: string;
    address?: { flatNo?: string };
    propertyManager?: { name: string; mobile: string };
    isSmartMeterEnabled?: boolean;
    imageUrl?: string;
    locality?: string;
  };
  paymentInfo?: {
    rent: number;
    isTokenPaid?: boolean;
    isSdCleared?: boolean;
    isPartialRentCleared?: boolean;
    sd?: number;
  };
  documents?: Record<string, unknown>;
  creditInfo?: {
    referralCode?: string;
    totalCredits?: number;
    balanceCredits?: number;
    friendsJoined?: number;
  };
};
