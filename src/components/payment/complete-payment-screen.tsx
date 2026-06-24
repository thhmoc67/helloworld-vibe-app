import { postInitiatePayment, postVerifyPayment } from '@/api/checkout';
import config from '@/config';
import { PaymentErrorView } from '@/components/payment/payment-error-view';
import { PaymentSuccessView } from '@/components/payment/payment-success-view';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import {
  CFEnvironment,
  CFPaymentGatewayService,
  CFSession,
  RazorpayCheckout,
} from '@/utils/payment-gateway';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

type PaymentStatus = 'loading' | 'success' | 'failed';

type InitPaymentData = {
  paymentObj: {
    paymentSessionId?: string;
    orderId?: string;
    razaorpayKey?: string;
    notes?: Record<string, unknown>;
    transactionId?: string;
  };
  amount?: number;
  id?: string;
  data?: Record<string, unknown>;
};

function parseRazorpayError(error: unknown): string {
  try {
    if (typeof error === 'string') {
      const parsed = JSON.parse(error) as {
        error?: { description?: string };
        description?: string;
      };
      return parsed?.error?.description || parsed?.description || 'Payment failed';
    }
    if (error && typeof error === 'object') {
      const record = error as { error?: { description?: string }; description?: string };
      if (record.error) return record.error.description || String(record.error);
      if (record.description) return record.description;
    }
  } catch {
    return 'Payment failed. Please try again later.';
  }
  return 'Payment failed. Please try again later.';
}

export function CompletePaymentScreen() {
  const params = useLocalSearchParams();
  const [status, setStatus] = useState<PaymentStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const initDataRef = useRef<InitPaymentData | null>(null);

  const amount = params.amount ? parseFloat(String(params.amount)) : 0;
  const paymentType = (params.type as string) || 'invoice';
  const initApi = (params.initApi as string) || 'api/hello/v2/payments/init';
  const verifyApi = (params.verifyApi as string) || 'api/hello/v2/payments/verify_payment';
  const email = (params.email as string) || '';
  const mobile = (params.mobile as string) || '';
  const description = (params.description as string) || 'Payment';

  let paymentPayload: Record<string, unknown> = {};
  if (params.payload) {
    try {
      paymentPayload =
        typeof params.payload === 'string'
          ? (JSON.parse(params.payload) as Record<string, unknown>)
          : (Array.isArray(params.payload) ? {} : (params.payload as Record<string, unknown>));
    } catch {
      paymentPayload = {};
    }
  }

  const handlePaymentSuccess = useCallback(() => {
    setStatus('success');
  }, []);

  useEffect(() => {
    if (!CFPaymentGatewayService) return;

    CFPaymentGatewayService.setCallback({
      onVerify() {
        handlePaymentSuccess();
      },
      onError(error) {
        setStatus('failed');
        setErrorMessage(error?.getMessage?.() || 'Payment failed');
      },
    });

    return () => {
      CFPaymentGatewayService?.removeCallback();
      CFPaymentGatewayService?.removeEventSubscriber();
    };
  }, [handlePaymentSuccess]);

  function buildVerifyPayload(
    initData: InitPaymentData,
    razorpayData: { razorpay_payment_id: string; razorpay_signature: string },
  ) {
    const request: Record<string, unknown> = {
      ...paymentPayload,
      transactionId: initData.paymentObj.transactionId,
      amount,
      paymentMethod: 'UPI',
      razorpayPaymentId: razorpayData.razorpay_payment_id,
      razorpaySignature: razorpayData.razorpay_signature,
    };

    if (paymentType === 'invoice') {
      return request;
    }

    return request;
  }

  async function verifyPayment(
    initData: InitPaymentData,
    razorpayData: { razorpay_payment_id: string; razorpay_signature: string },
  ) {
    try {
      const verifyPayload = buildVerifyPayload(initData, razorpayData);
      const { success, message } = await postVerifyPayment(verifyApi, verifyPayload);
      if (success) {
        handlePaymentSuccess();
      } else {
        setStatus('failed');
        setErrorMessage(message || 'Payment verification failed');
      }
    } catch (error) {
      setStatus('failed');
      setErrorMessage(error instanceof Error ? error.message : 'Payment verification failed');
    }
  }

  async function startCashfreeCheckout(initData: InitPaymentData) {
    if (!CFPaymentGatewayService || !CFSession || !CFEnvironment) {
      setStatus('failed');
      setErrorMessage('Payment gateway not available. Please use a development build.');
      return;
    }

    try {
      const session = new CFSession(
        initData.paymentObj.paymentSessionId ?? '',
        initData.paymentObj.orderId ?? '',
        config.BASE_URL === 'https://api.thehelloworld.com'
          ? CFEnvironment.PRODUCTION
          : CFEnvironment.SANDBOX,
      );
      CFPaymentGatewayService.doWebPayment(session);
    } catch (error) {
      setStatus('failed');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to open payment gateway');
    }
  }

  async function startRazorpayCheckout(initData: InitPaymentData) {
    if (!RazorpayCheckout) {
      setStatus('failed');
      setErrorMessage('Payment gateway not available. Please use a development build.');
      return;
    }

    try {
      const options = {
        description,
        image: 'https://hello-assets-items.s3.ap-south-1.amazonaws.com/icons/logo-icon.png',
        currency: 'INR',
        key: initData.paymentObj.razaorpayKey ?? '',
        amount: Math.round((initData.amount ?? amount) * 100),
        name: 'HelloWorld Technologies',
        contact: mobile,
        email: email.trim(),
        order_id: initData.paymentObj.orderId,
        notes: { ...(initData.paymentObj.notes ?? {}) },
      };

      const razorpayData = await RazorpayCheckout.open(options);
      await verifyPayment(initData, razorpayData);
    } catch (error) {
      setStatus('failed');
      setErrorMessage(parseRazorpayError(error));
    }
  }

  function openGateway(initData: InitPaymentData) {
    if (initData.paymentObj.paymentSessionId) {
      void startCashfreeCheckout(initData);
      return;
    }
    void startRazorpayCheckout(initData);
  }

  const initPayment = useCallback(async () => {
    setStatus('loading');
    setErrorMessage('');

    const { data, success, message: apiMessage, payments } = await postInitiatePayment(
      initApi,
      paymentPayload,
    );

    if (!success) {
      setStatus('failed');
      setErrorMessage(apiMessage || 'Failed to initiate payment.');
      return;
    }

    const paymentObj = (payments ?? data?.paymentObj ?? {}) as InitPaymentData['paymentObj'];
    const initData: InitPaymentData = {
      paymentObj,
      amount,
      id: data?.id as string | undefined,
      data: data as Record<string, unknown> | undefined,
    };
    initDataRef.current = initData;

    setTimeout(() => {
      openGateway(initData);
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    void initPayment();
  }, [initPayment]);

  if (status === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={palette.lime[700]} />
        <Typography variant="text" size="sm" color={palette.gray[600]} style={styles.loadingText}>
          Processing payment...
        </Typography>
      </View>
    );
  }

  if (status === 'failed') {
    return <PaymentErrorView message={errorMessage} onRetry={initPayment} />;
  }

  return <PaymentSuccessView isInvoicePayment={paymentType === 'invoice'} />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.white,
    gap: 12,
  },
  loadingText: {
    marginTop: 8,
  },
});
