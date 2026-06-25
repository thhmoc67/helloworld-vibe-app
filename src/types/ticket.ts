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
