export const PRICING_CONFIG = {
  lowThresholdDzd: 2000,
  highThresholdDzd: 9000,
  lowCommissionDzd: 350,
  standardCommissionDzd: 550,
  highCommissionRate: 0.08,
  roundingDzd: 10,
  maxAmount: 1_000_000,
} as const;

export const CURRENCIES = ['USD', 'EUR'] as const;
export type Currency = (typeof CURRENCIES)[number];
export const DEFAULT_CURRENCY: Currency = 'USD';

// Taux fixe : nombre de DA pour 1 unité de la devise. Il n'est volontairement pas affiché sur le site.
// Pour le modifier, changez uniquement les valeurs ci-dessous (une valeur par devise).
export const RATES_DZD: Record<Currency, number> = { USD: 260, EUR: 260 };

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

export function estimateFromForeignAmount(amount: number, currency: Currency): PriceEstimate | null {
  return calculateEstimate(amount * RATES_DZD[currency]);
}
