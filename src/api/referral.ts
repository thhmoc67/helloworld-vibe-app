import { http } from '@/api/http';
import type { ReferralDetails, ReferralLog, ReferralTerms } from '@/types/referral';

function parseReferralDetails(payload: unknown): ReferralDetails {
  const body = (payload as { data?: unknown })?.data ?? payload;
  const record = body as {
    referralDetail?: {
      id?: string;
      amount?: number;
      totalAmount?: number;
      referrals?: number;
      referralCount?: number;
    };
    logs?: ReferralLog[];
  };

  const referralDetail = record?.referralDetail;
  const logs = Array.isArray(record?.logs) ? record.logs : [];
  const creditReferrals = logs.filter((log) => log.actionType === 'credit').length;

  return {
    referralCode: referralDetail?.id,
    balanceCredits: referralDetail?.amount,
    totalCredits: referralDetail?.totalAmount ?? referralDetail?.amount,
    friendsJoined: referralDetail?.referrals ?? referralDetail?.referralCount ?? creditReferrals,
    logs,
  };
}

export async function getReferralDetails(withLogs = true): Promise<ReferralDetails> {
  try {
    const { data } = await http.get('referral/history', {
      params: withLogs ? { log: 'yes' } : undefined,
    });
    return parseReferralDetails(data);
  } catch {
    return { logs: [] };
  }
}

export async function getReferralTerms(): Promise<ReferralTerms> {
  try {
    const { data } = await http.get('hello/const', {
      params: { ctype: 'referral' },
    });
    const body = (data as { data?: ReferralTerms })?.data ?? data;
    return body as ReferralTerms;
  } catch {
    return {};
  }
}
