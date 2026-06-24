declare module 'react-native-razorpay' {
  export interface CheckoutOptions {
    description?: string;
    image?: string;
    currency?: string;
    key: string;
    amount: number;
    name?: string;
    contact?: string;
    email?: string;
    order_id?: string;
    notes?: Record<string, unknown>;
  }

  export interface SuccessResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }

  export default class RazorpayCheckout {
    static open(options: CheckoutOptions): Promise<SuccessResponse>;
  }
}
