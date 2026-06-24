import { http } from '@/api/http';
import type { LocalitySuggestResponse } from '@/types/search';

export async function fetchLocalitySuggestions(params: {
  city: string;
  keyword: string;
}): Promise<LocalitySuggestResponse> {
  try {
    const { data } = await http.get<LocalitySuggestResponse>('/v3/locality/suggest', {
      params,
    });
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Search failed';
    return { success: false, message };
  }
}
