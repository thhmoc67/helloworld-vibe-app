export type TenantInvoice = {
  invoice_id: string;
  invoice_number?: string;
  title?: string;
  description?: string;
  total?: number;
  balance?: number;
  status?: string;
  due_date?: string;
  paid_date?: string;
  customer_id?: string;
  invoice_url?: string;
  [key: string]: unknown;
};
