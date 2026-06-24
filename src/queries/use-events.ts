import { useQuery } from '@tanstack/react-query';

import { getEventsList, type EventListType } from '@/api/community';
import type { CommunityEventsTab } from '@/constants/community';

function listTypeForTab(tab: CommunityEventsTab): EventListType {
  if (tab === 'past') return 'previous';
  return 'upcoming';
}

function filterRegistered(events: Awaited<ReturnType<typeof getEventsList>>['data']) {
  return events.filter((event) => event.is_registered || event.registered);
}

export function useCommunityEvents(tab: CommunityEventsTab, city?: string) {
  return useQuery({
    queryKey: ['community-events', tab, city ?? ''],
    queryFn: async () => {
      const result = await getEventsList(city ?? '', listTypeForTab(tab));
      if (!result.success) return [];
      if (tab === 'registered') return filterRegistered(result.data);
      return result.data;
    },
  });
}

export function useUpcomingEvents(city?: string) {
  return useQuery({
    queryKey: ['community-events', 'upcoming', city ?? ''],
    queryFn: () => getEventsList(city ?? '', 'upcoming'),
    select: (result) => result.data ?? [],
  });
}
