import { describe, expect, it } from 'vitest';
import { calculateEstimate, estimateFromForeignAmount, DEFAULT_CURRENCY, CURRENCIES, RATES_DZD } from './pricing';

describe('calculateEstimate', () => {
  it('uses the low fixed commission below 3,000 DA', () => expect(calculateEstimate(2999)).toEqual({ amountDzd: 2999, commissionDzd: 350, totalDzd: 3350 }));
  it('uses the standard fixed commission at 3,000 DA', () => expect(calculateEstimate(3000)).toEqual({ amountDzd: 3000, commissionDzd: 550, totalDzd: 3550 }));
  it('uses the standard fixed commission at 10,000 DA', () => expect(calculateEstimate(10000)).toEqual({ amountDzd: 10000, commissionDzd: 550, totalDzd: 10550 }));
  it('uses six percent above 10,000 DA', () => expect(calculateEstimate(10001)).toEqual({ amountDzd: 10001, commissionDzd: 600.06, totalDzd: 10610 }));
  it('rejects zero, negative and non-numeric values', () => { expect(calculateEstimate(0)).toBeNull(); expect(calculateEstimate(-1)).toBeNull(); expect(calculateEstimate(Number.NaN)).toBeNull(); });
});

describe('estimateFromForeignAmount', () => {
  it('defaults to USD and only offers USD and EUR', () => { expect(DEFAULT_CURRENCY).toBe('USD'); expect([...CURRENCIES]).toEqual(['USD', 'EUR']); });
  it('uses the fixed 260 DA rate', () => { expect(RATES_DZD.USD).toBe(260); expect(RATES_DZD.EUR).toBe(260); });
  it('adds the low commission for a small order', () => expect(estimateFromForeignAmount(5, 'USD')?.totalDzd).toBe(1650));
  it('keeps the low commission just under 3,000 DA', () => expect(estimateFromForeignAmount(10, 'EUR')?.totalDzd).toBe(2950));
  it('adds the standard commission for a mid-size order', () => expect(estimateFromForeignAmount(15, 'EUR')?.totalDzd).toBe(4450));
  it('applies six percent above 10,000 DA', () => expect(estimateFromForeignAmount(40, 'USD')?.totalDzd).toBe(11030));
  it('rejects empty and invalid amounts', () => { expect(estimateFromForeignAmount(0, 'USD')).toBeNull(); expect(estimateFromForeignAmount(Number.NaN, 'EUR')).toBeNull(); });
});
