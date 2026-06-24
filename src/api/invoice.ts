import { http } from '@/api/http';
import type { TenantInvoice } from '@/types/invoice';

export async function getTenantInvoices(): Promise<TenantInvoice[]> {
  const { data } = await http.get('api/hello/invoices/get');
  const invoiceList =
    data?.invoiceList ?? data?.data?.invoiceList ?? data?.data ?? data ?? [];

  if (Array.isArray(invoiceList)) {
    return invoiceList;
  }

  if (invoiceList && typeof invoiceList === 'object') {
    const list = invoiceList.list ?? invoiceList.invoices ?? [];
    return Array.isArray(list) ? list : [];
  }

  return [];
}
