import { describe, expect, it } from 'vitest';
import { calculateEstimate } from './pricing';

describe('calculateEstimate', () => {
  it('uses the low fixed commission below 2,000 DA', () => expect(calculateEstimate(1999)).toEqual({ amountDzd: 1999, commissionDzd: 350, totalDzd: 2350 }));
  it('uses the standard fixed commission at 2,000 DA', () => expect(calculateEstimate(2000)).toEqual({ amountDzd: 2000, commissionDzd: 550, totalDzd: 2550 }));
  it('uses the standard fixed commission at 9,000 DA', () => expect(calculateEstimate(9000)).toEqual({ amountDzd: 9000, commissionDzd: 550, totalDzd: 9550 }));
  it('uses eight percent above 9,000 DA', () => expect(calculateEstimate(9001)).toEqual({ amountDzd: 9001, commissionDzd: 720.08, totalDzd: 9730 }));
  it('rejects zero, negative and non-numeric values', () => { expect(calculateEstimate(0)).toBeNull(); expect(calculateEstimate(-1)).toBeNull(); expect(calculateEstimate(Number.NaN)).toBeNull(); });
});
