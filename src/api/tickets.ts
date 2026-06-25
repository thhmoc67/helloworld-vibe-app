import { http } from '@/api/http';
import type { SupportIssueCategory, SupportTicket, TicketConversation } from '@/types/ticket';

export async function getSupportTickets(): Promise<{
  data: SupportTicket[] | null;
  message?: string;
}> {
  try {
    const { data } = await http.get('api/hello/ticket/list');
    const tickets = data?.data ?? data;
    return {
      data: Array.isArray(tickets) ? tickets : [],
      message: data?.message,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch tickets';
    return { data: null, message };
  }
}

export async function getTicketConversations(ticketId: string): Promise<{
  data: TicketConversation[] | null;
  success: boolean;
  message?: string;
}> {
  try {
    const { data } = await http.get('api/hello/ticket/list/conversations', {
      params: { ticketId },
    });
    const conversations = data?.data ?? data;
    return {
      success: true,
      data: Array.isArray(conversations) ? conversations : [],
      message: data?.message,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch conversations';
    return { success: false, data: null, message };
  }
}

export async function postTicketComment(
  ticketId: string,
  comment: string,
): Promise<{ success: boolean; message?: string }> {
  try {
    const { data } = await http.put(`hello/tickets/comment?ticket_id=${ticketId}`, {
      ticket_data: {
        comment,
        tags: [],
        attachments: [],
      },
    });
    return {
      success: data?.success !== false,
      message: data?.message,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send message';
    return { success: false, message };
  }
}

export async function reopenSupportTicket(
  ticketId: string,
): Promise<{ success: boolean; message?: string }> {
  try {
    const { data } = await http.put('api/hello/ticket/update', {
      ticketId,
      status: 'OPEN',
    });
    return {
      success: data?.success !== false,
      message: data?.message,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to reopen ticket';
    return { success: false, message };
  }
}

export async function getKbIssues(): Promise<SupportIssueCategory[]> {
  try {
    const { data } = await http.get('api/hello/list/issues');
    const issues = data?.data ?? data;
    return Array.isArray(issues) ? issues : [];
  } catch {
    return [];
  }
}

export async function postCreateTicket(payload: Record<string, unknown>) {
  const { data } = await http.post('api/hello/ticket/create', payload);
  return data;
}
