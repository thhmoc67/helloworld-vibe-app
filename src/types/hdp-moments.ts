export type HdpMomentItem = {
  id: string;
  label: string;
  imageUri: string;
  eventId?: number;
};

export type HdpApiEvent = {
  id?: number;
  name?: string;
  display_image?: string;
  event_start_date?: string;
};
