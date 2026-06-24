import type { TenantInvoice } from '@/types/invoice';
import type { TenantProfile } from '@/types/tenant';

export const INVOICE_PAYMENT_INIT_API = 'api/hello/v2/payments/init';
export const INVOICE_PAYMENT_VERIFY_API = 'api/hello/v2/payments/verify_payment';

export function buildInvoicePaymentPayload(invoice: TenantInvoice, profile: TenantProfile) {
  return {
    customerId: invoice.customer_id,
    type: 'invoice',
    amount: invoice.balance ?? invoice.total ?? 0,
    paymentForIds: [invoice.invoice_id],
    paymentMode: 'Razorpay',
    paymentMethod: 'Upi',
    isTenantApp: true,
    propertyName: profile.propertyInfo?.name,
  };
}

export function buildInvoicePaymentParams(invoice: TenantInvoice, profile: TenantProfile) {
  const amount = invoice.balance ?? invoice.total ?? 0;

  return {
    type: 'invoice',
    paymentFor: invoice.invoice_id,
    amount: String(amount),
    description: 'Invoice payment from tenant app',
    email: profile.userInfo?.email ?? '',
    mobile: profile.userInfo?.mobile ?? '',
    name: profile.userInfo?.name ?? '',
    propertyName: profile.propertyInfo?.name ?? '',
    initApi: INVOICE_PAYMENT_INIT_API,
    verifyApi: INVOICE_PAYMENT_VERIFY_API,
    payload: JSON.stringify(buildInvoicePaymentPayload(invoice, profile)),
  };
}
