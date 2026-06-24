import { useQuery } from '@tanstack/react-query';

import { getTenantInvoices } from '@/api/invoice';
import { filterInvoices } from '@/utils/tenant-format';

export function useTenantInvoices() {
  return useQuery({
    queryKey: ['tenant-invoices'],
    queryFn: getTenantInvoices,
    select: (invoices) => filterInvoices(invoices),
  });
}
