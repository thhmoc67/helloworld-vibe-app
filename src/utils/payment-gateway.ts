let RazorpayCheckout: typeof import('react-native-razorpay').default | null = null;
let CFPaymentGatewayService: {
  setEventSubscriber: (subscriber: {
    onReceivedEvent: (eventName: string, map: Map<string, string>) => void;
  }) => void;
  setCallback: (callbacks: {
    onVerify: (orderID: string) => void;
    onError: (error: { getMessage?: () => string }, orderID: string) => void;
  }) => void;
  removeCallback: () => void;
  removeEventSubscriber: () => void;
  doWebPayment: (session: unknown) => void;
} | null = null;
let CFSession:
  | (new (paymentSessionId: string, orderId: string, environment: string) => unknown)
  | null = null;
let CFEnvironment: { PRODUCTION: string; SANDBOX: string } | null = null;

try {
  RazorpayCheckout = require('react-native-razorpay').default;
} catch {
  console.warn('Razorpay module not available — development build required');
}

try {
  const cashfreeSDK = require('react-native-cashfree-pg-sdk');
  CFPaymentGatewayService = cashfreeSDK.CFPaymentGatewayService;
} catch {
  console.warn('Cashfree SDK module not available — development build required');
}

try {
  const cashfreeContract = require('cashfree-pg-api-contract');
  CFSession = cashfreeContract.CFSession;
  CFEnvironment = cashfreeContract.CFEnvironment;
} catch {
  console.warn('Cashfree contract module not available — development build required');
}

export function isPaymentGatewayAvailable() {
  return Boolean(RazorpayCheckout || CFPaymentGatewayService);
}

export { CFEnvironment, CFPaymentGatewayService, CFSession, RazorpayCheckout };
