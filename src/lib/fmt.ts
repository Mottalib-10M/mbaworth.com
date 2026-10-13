/** Formatters with no dependency on routes or data (safe from page files, minis and calculators). */
import { formatMoney, formatNumber } from './format';
/** $1,234 (no cents, RECETTE §4.1). */
export const usd = (n: number, d = 0) => formatMoney(n, d);
export const num = (n: number, d = 0) => formatNumber(n, d);
/** A share 0..1 as a percentage: 0.3792 → "37.9%". */
export const pct = (share: number, d = 1) => `${formatNumber(share * 100, d)}%`;
/** A value already in percent (as the schools publish it): 40 → "40%", 28.2 → "28.2%". */
export const p = (x: number) => `${formatNumber(x, Number.isInteger(x) ? 0 : 1)}%`;
/** An amount in a school's own currency: "€109,860", "£123,950", "CN¥488,000". */
const cache = new Map<string, Intl.NumberFormat>();
export const money = (v: number, cur: string) => {
  if (!cache.has(cur)) cache.set(cur, new Intl.NumberFormat('en-US', { style: 'currency', currency: cur, maximumFractionDigits: 0, minimumFractionDigits: 0 }));
  return cache.get(cur)!.format(v);
};
/** Years with one decimal: 3.42 → "3.4 years"; 1 → "1.0 year". */
export const yrs = (y: number) => `${formatNumber(y, 1)} ${y >= 0.95 && y < 1.05 ? 'year' : 'years'}`;
/** "August 7, 2026" from an ISO date. */
export const day = (iso: string) => new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
/** "A, B and C". */
export const listOf = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
/** Kind of a salary figure, in words. */
export const kindLabel = (k: string | null | undefined) => (k === 'base-median' ? 'median base salary' : k === 'base-mean' ? 'average base salary' : k === 'total-mean' ? 'average total pay' : k === 'total-median' ? 'median total pay' : k === 'mean' ? 'average salary' : 'salary');
