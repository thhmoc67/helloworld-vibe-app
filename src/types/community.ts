export type CommunityEventLocation = {
  lat?: number;
  long?: number;
  propertyName?: string;
  street?: string;
};

export type CommunityEventDetail = {
  id: number;
  name: string;
  description?: string;
  display_image?: string;
  event_start_date?: string;
  event_end_date?: string;
  start_date?: string;
  amount?: number;
  location?: CommunityEventLocation;
  people_attending?: number;
  attendees_count?: number;
  what_to_bring?: string;
  is_registered?: boolean;
};

export type CommunityEventDetailResponse = {
  details: CommunityEventDetail;
  paymentData?: {
    total: number;
  };
};
