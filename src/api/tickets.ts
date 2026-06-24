import { http } from '@/api/http';
import type { SupportIssueCategory, SupportTicket } from '@/types/ticket';

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
