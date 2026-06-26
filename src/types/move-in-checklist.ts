export type ChecklistSection = Record<string, boolean | string | undefined>;

export type MoveInChecklistItems = Record<string, ChecklistSection>;

export type MoveInChecklistData = {
  items: MoveInChecklistItems;
  submitted?: boolean;
  status?: boolean;
};

export type MoveInChecklistResponse = {
  success?: boolean;
  data?: MoveInChecklistData;
  message?: string;
};

export type UpdateMoveInChecklistPayload = {
  booking_id: string;
  data: { items: MoveInChecklistItems };
};

export type UpdateMoveInChecklistResponse = {
  success?: boolean;
  message?: string;
};
