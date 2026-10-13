/** Mini: a market sizing in four multiplications. */
import type { MiniSpec } from '../mini-types';
import { usd, num } from './_kit';
export default function sizing(): MiniSpec {
  return {
    title: 'Market sizing in four steps',
    cta: 'Train on more drills',
    inputs: [{ id: 'p', label: 'Households or people', def: 130000000, max: 9000000000 }, { id: 's', label: 'Share who buy', def: 20, unit: '%', max: 100, decimals: 1 }, { id: 'f', label: 'Purchases per year', def: 4, max: 1000, decimals: 1 }, { id: 'c', label: 'Price', def: 30, unit: '$', max: 1000000, decimals: 2 }],
    run: (v) => { const m = v.p * (v.s / 100) * v.f * v.c; return { head: ['Market per year', m >= 1e9 ? `$${num(m / 1e9, 1)} billion` : m >= 1e6 ? `$${num(m / 1e6, 1)} million` : usd(m)], rows: [['Buyers', num(v.p * (v.s / 100))], ['Purchases', num(v.p * (v.s / 100) * v.f)]] }; },
  };
}
