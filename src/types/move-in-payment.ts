export type MoveInPaymentLineItem = {
  paid: boolean;
  title: string;
  amount: number;
};

export type MoveInPaymentLineValue = {
  paid?: boolean;
  amount?: number;
};

export type MoveInPaymentDetails = {
  finalAmount?: number;
  cgst?: number;
  sgst?: number;
  [key: string]: MoveInPaymentLineValue | number | undefined;
};

export type MoveInPaymentDetailsResponse = {
  success: boolean;
  data?: MoveInPaymentDetails;
  message?: string;
};
