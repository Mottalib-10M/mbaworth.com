/** Mini: break-even volume. */
import type { MiniSpec } from '../mini-types';
import { usd, num } from './_kit';
export default function breakeven(): MiniSpec {
  return {
    title: 'Break-even: how many units cover the fixed costs',
    cta: 'Train on more drills',
    inputs: [{ id: 'f', label: 'Fixed costs', def: 500000, unit: '$', max: 1e11 }, { id: 'p', label: 'Price per unit', def: 50, unit: '$', max: 1e7, decimals: 2 }, { id: 'c', label: 'Variable cost per unit', def: 30, unit: '$', max: 1e7, decimals: 2 }],
    run: (v) => { const m = v.p - v.c; return { head: ['Break-even volume', m > 0 ? num(Math.ceil(v.f / m)) : 'never'], rows: [['Contribution per unit', usd(m)], ['Break-even revenue', m > 0 ? usd(Math.ceil(v.f / m) * v.p) : 'n/a']] }; },
  };
}
