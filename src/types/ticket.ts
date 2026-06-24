export type SupportTicket = {
  id: string;
  ticket_number?: string | number;
  subject?: string;
  status?: string;
  createdTime?: string;
  created_at?: string;
  [key: string]: unknown;
};

export type SupportIssueCategory = {
  id: string | number;
  name: string;
  icon?: string;
};
