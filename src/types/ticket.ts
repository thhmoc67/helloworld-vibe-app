export type SupportTicket = {
  id: string;
  ticket_number?: string | number;
  subject?: string;
  status?: string;
  createdTime?: string;
  created_at?: string;
  [key: string]: unknown;
};

export type TicketConversation = {
  id: string;
  summary: string;
  createdTime: string;
  visibility: string;
  status: string;
  type: string;
  author: {
    type: string;
  };
};

export type SupportIssueCategory = {
  id: string | number;
  name: string;
  icon?: string;
};

export type TicketCategoryChild = {
  name: string;
  id: string;
  isVisibleInHC?: boolean;
};

export type TicketCategory = {
  name: string;
  visibility: string;
  child: TicketCategoryChild[];
  isVisibleInHC?: boolean;
};

export type TicketCategoryFaq = {
  title: string;
  summary: string;
  status?: string;
};

export type CreateTicketParams = {
  category: string;
  subCategory: string;
  subCategoryId?: string;
  description: string;
  email: string;
  propertyName?: string;
  city?: string;
  bookingId?: string;
  propertyId?: string;
};

export type CreateTicketResult = {
  success: boolean;
  ticketNumber?: string;
  message?: string;
};
