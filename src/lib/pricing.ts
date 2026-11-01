export const PRICING_CONFIG = {
  lowThresholdDzd: 2000,
  highThresholdDzd: 9000,
  lowCommissionDzd: 350,
  standardCommissionDzd: 550,
  highCommissionRate: 0.08,
  roundingDzd: 10,
  maxAmount: 1_000_000,
  staleAfterDays: 7,
} as const;

export type PriceEstimate = { amountDzd: number; commissionDzd: number; totalDzd: number };

export function calculateEstimate(amountDzd: number): PriceEstimate | null {
  if (!Number.isFinite(amountDzd) || amountDzd <= 0) return null;
  const commissionDzd = amountDzd < PRICING_CONFIG.lowThresholdDzd
    ? PRICING_CONFIG.lowCommissionDzd
    : amountDzd <= PRICING_CONFIG.highThresholdDzd
      ? PRICING_CONFIG.standardCommissionDzd
      : amountDzd * PRICING_CONFIG.highCommissionRate;
  const totalDzd = Math.ceil((amountDzd + commissionDzd) / PRICING_CONFIG.roundingDzd) * PRICING_CONFIG.roundingDzd;
  return { amountDzd, commissionDzd, totalDzd };
}
