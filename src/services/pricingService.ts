/**
 * Dynamic pricing calculation
 * Formula:
 * Total = ((Base + Distance × Rate) × Surge) × (1 - PoolDiscount)
 */

export function calculateFare(
  distanceKm: number,
  demand: number,
  supply: number,
  pooled: boolean
): number {

  const baseFare = 100;
  const rate = 12;

  const surge =
    1 + Math.min(((demand - supply) / Math.max(supply, 1)) * 0.5, 2.0);

  const poolDiscount = pooled ? 0.3 : 0;

  const total =
    ((baseFare + distanceKm * rate) * surge) *
    (1 - poolDiscount);

  return Math.round(total);
}
