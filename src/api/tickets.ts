import { http } from '@/api/http';
import type {
  CreateTicketParams,
  CreateTicketResult,
  SupportTicket,
  TicketCategory,
  TicketCategoryFaq,
  TicketConversation,
} from '@/types/ticket';

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

export async function getKbCategories(): Promise<{
  data: TicketCategory[];
  message?: string;
}> {
  try {
    const { data } = await http.get('api/hello/list/issues');
    const issues = data?.data ?? data;
    if (!Array.isArray(issues)) {
      return { data: [], message: data?.message };
    }

    const helloworldRoot = issues.find(
      (item: { permalink?: string }) => item.permalink === 'thehelloworld',
    );
    const categories = Array.isArray(helloworldRoot?.child) ? helloworldRoot.child : [];

    return { data: categories, message: data?.message };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch categories';
    return { data: [], message };
  }
}

export async function getCategoryDescription(categoryId: string): Promise<{
  data: TicketCategoryFaq[];
  message?: string;
}> {
  try {
    const { data } = await http.get('api/hello/list/issues/category', {
      params: { categoryId },
    });
    const faqs = data?.data ?? data;
    return {
      data: Array.isArray(faqs) ? faqs : [],
      message: data?.message,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch category help';
    return { data: [], message };
  }
}

export async function postCreateTicket(payload: CreateTicketParams): Promise<CreateTicketResult> {
  try {
    const { data } = await http.post('api/hello/ticket/create', {
      category: payload.category,
      subCategory: payload.subCategory,
      subject: payload.subCategory,
      description: payload.description,
      classification: '',
      email: payload.email,
      propertyName: payload.propertyName,
      city: payload.city,
      bookingId: payload.bookingId,
      propertyId: payload.propertyId,
    });

    const ticketNumber =
      data?.data?.ticketNumber ??
      data?.data?.ticket_number ??
      data?.ticketNumber ??
      data?.ticket_number ??
      (data?.success !== false && typeof data?.message === 'string' && data.message.trim()
        ? data.message.trim()
        : undefined);

    return {
      success: data?.success !== false && Boolean(ticketNumber || data?.success),
      ticketNumber: ticketNumber ? String(ticketNumber) : undefined,
      message: data?.message ?? data?.error,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create ticket';
    return { success: false, message };
  }
}
